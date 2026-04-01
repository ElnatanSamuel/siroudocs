import { useRef, useEffect } from 'react';

interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

const vertexShader = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// WebGL 1 (GLSL ES 1.00) compatible — no array constructors, no dynamic indexing
const fragmentShader = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;
uniform float colorNum;
uniform float pixelSize;
uniform sampler2D bayerTex;

vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi=floor(P.xyxy)+vec4(0,0,1,1);
  vec4 Pf=fract(P.xyxy)-vec4(0,0,1,1);
  Pi=mod289(Pi);
  vec4 ix=Pi.xzxz,iy=Pi.yyww,fx=Pf.xzxz,fy=Pf.yyww;
  vec4 i=permute(permute(ix)+iy);
  vec4 gx=fract(i*(1.0/41.0))*2.0-1.0;
  vec4 gy=abs(gx)-0.5;
  vec4 tx=floor(gx+0.5);
  gx=gx-tx;
  vec2 g00=vec2(gx.x,gy.x),g10=vec2(gx.y,gy.y);
  vec2 g01=vec2(gx.z,gy.z),g11=vec2(gx.w,gy.w);
  vec4 norm=taylorInvSqrt(vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11)));
  g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;
  float n00=dot(g00,vec2(fx.x,fy.x));
  float n10=dot(g10,vec2(fx.y,fy.y));
  float n01=dot(g01,vec2(fx.z,fy.z));
  float n11=dot(g11,vec2(fx.w,fy.w));
  vec2 fade_xy=fade(Pf.xy);
  vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);
  return 2.3*mix(n_x.x,n_x.y,fade_xy.y);
}

const int OCTAVES=4;
float fbm(vec2 p){
  float v=0.0,a=1.0,f=waveFrequency;
  for(int i=0;i<OCTAVES;i++){v+=a*abs(cnoise(p));p*=f;a*=waveAmplitude;}
  return v;
}

float pattern(vec2 p){
  vec2 p2=p-time*waveSpeed;
  return fbm(p+fbm(p2));
}

vec3 dither(vec2 uv, vec3 color){
  vec2 sc=floor(uv*resolution/pixelSize);
  // Sample 8x8 Bayer matrix from texture
  vec2 bayerUV = (mod(sc, 8.0) + 0.5) / 8.0;
  float threshold = texture2D(bayerTex, bayerUV).r - 0.25;
  float s=1.0/(colorNum-1.0);
  color+=threshold*s;
  float bias=0.2;
  color=clamp(color-bias,0.0,1.0);
  return floor(color*(colorNum-1.0)+0.5)/(colorNum-1.0);
}

void main(){
  vec2 np=pixelSize/resolution;
  vec2 pixUV=np*floor(gl_FragCoord.xy/resolution/np);

  vec2 wuv=gl_FragCoord.xy/resolution.xy;
  wuv-=0.5;
  wuv.x*=resolution.x/resolution.y;
  float f=pattern(wuv);

  if(enableMouseInteraction==1){
    vec2 m=(mousePos/resolution-0.5)*vec2(1,-1);
    m.x*=resolution.x/resolution.y;
    float d=length(wuv-m);
    float influence=1.0-smoothstep(0.0,mouseRadius,d);
    f-=0.3*influence*influence;
  }

  vec3 col=mix(vec3(0),waveColor,f);
  col=dither(gl_FragCoord.xy/resolution,col);
  gl_FragColor=vec4(col,1.0);
}
`;

// Standard 8x8 Bayer matrix values
const BAYER_8x8 = [
   0, 48, 12, 60,  3, 51, 15, 63,
  32, 16, 44, 28, 35, 19, 47, 31,
   8, 56,  4, 52, 11, 59,  7, 55,
  40, 24, 36, 20, 43, 27, 39, 23,
   2, 50, 14, 62,  1, 49, 13, 61,
  34, 18, 46, 30, 33, 17, 45, 29,
  10, 58,  6, 54,  9, 57,  5, 53,
  42, 26, 38, 22, 41, 25, 37, 21,
];

function createBayerTexture(gl: WebGLRenderingContext) {
  const data = new Uint8Array(64);
  for (let i = 0; i < 64; i++) {
    data[i] = Math.round((BAYER_8x8[i] / 64) * 255);
  }
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 8, 8, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  return tex;
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1,
}: DitherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const propsRef = useRef({ waveSpeed, waveFrequency, waveAmplitude, waveColor, colorNum, pixelSize, enableMouseInteraction, mouseRadius });
  propsRef.current = { waveSpeed, waveFrequency, waveAmplitude, waveColor, colorNum, pixelSize, enableMouseInteraction, mouseRadius };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })!;
    if (!gl) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Bayer texture
    const bayerTex = createBayerTexture(gl);
    const uBayerTex = gl.getUniformLocation(program, 'bayerTex');
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, bayerTex);
    gl.uniform1i(uBayerTex, 0);

    // Full-screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'resolution');
    const uTime = gl.getUniformLocation(program, 'time');
    const uWaveSpeed = gl.getUniformLocation(program, 'waveSpeed');
    const uWaveFrequency = gl.getUniformLocation(program, 'waveFrequency');
    const uWaveAmplitude = gl.getUniformLocation(program, 'waveAmplitude');
    const uWaveColor = gl.getUniformLocation(program, 'waveColor');
    const uMousePos = gl.getUniformLocation(program, 'mousePos');
    const uEnableMouse = gl.getUniformLocation(program, 'enableMouseInteraction');
    const uMouseRadius = gl.getUniformLocation(program, 'mouseRadius');
    const uColorNum = gl.getUniformLocation(program, 'colorNum');
    const uPixelSize = gl.getUniformLocation(program, 'pixelSize');

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      mouseRef.current.x = (e.clientX - rect.left) * dpr;
      mouseRef.current.y = (e.clientY - rect.top) * dpr;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const startTime = performance.now();

    const render = () => {
      const p = propsRef.current;
      const t = disableAnimation ? 0 : (performance.now() - startTime) / 1000;

      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uWaveSpeed, p.waveSpeed);
      gl.uniform1f(uWaveFrequency, p.waveFrequency);
      gl.uniform1f(uWaveAmplitude, p.waveAmplitude);
      gl.uniform3f(uWaveColor, p.waveColor[0], p.waveColor[1], p.waveColor[2]);
      gl.uniform2f(uMousePos, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1i(uEnableMouse, p.enableMouseInteraction ? 1 : 0);
      gl.uniform1f(uMouseRadius, p.mouseRadius);
      gl.uniform1f(uColorNum, p.colorNum);
      gl.uniform1f(uPixelSize, p.pixelSize);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
      gl.deleteTexture(bayerTex);
    };
  }, [disableAnimation]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: enableMouseInteraction ? 'auto' : 'none',
      }}
    />
  );
}
