import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DocsLayout from "./components/DocsLayout";
import IntroductionPage from "./pages/docs/IntroductionPage";
import InstallationPage from "./pages/docs/InstallationPage";
import QuickStartPage from "./pages/docs/QuickStartPage";
import RadixTriePage from "./pages/docs/RadixTriePage";
import NavigationLifecyclePage from "./pages/docs/NavigationLifecyclePage";
import HeadlessEnginePage from "./pages/docs/HeadlessEnginePage";
import LogicGuardsPage from "./pages/docs/LogicGuardsPage";
import DataLoadersPage from "./pages/docs/DataLoadersPage";
import ReactAdapterPage from "./pages/docs/ReactAdapterPage";
import NextjsAdapterPage from "./pages/docs/NextjsAdapterPage";
import SvelteAdapterPage from "./pages/docs/SvelteAdapterPage";
import ReactNativePage from "./pages/docs/ReactNativePage";
import TypeScriptPage from "./pages/docs/TypeScriptPage";
import PatternsPage from "./pages/docs/PatternsPage";
import ComparisonPage from "./pages/docs/ComparisonPage";
import MigrationPage from "./pages/docs/MigrationPage";
import RoadmapPage from "./pages/docs/RoadmapPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<IntroductionPage />} />
            <Route path="installation" element={<InstallationPage />} />
            <Route path="quick-start" element={<QuickStartPage />} />
            <Route path="core/radix-trie" element={<RadixTriePage />} />
            <Route path="core/navigation-lifecycle" element={<NavigationLifecyclePage />} />
            <Route path="core/headless-engine" element={<HeadlessEnginePage />} />
            <Route path="features/logic-guards" element={<LogicGuardsPage />} />
            <Route path="features/data-loaders" element={<DataLoadersPage />} />
            <Route path="adapters/react" element={<ReactAdapterPage />} />
            <Route path="adapters/nextjs" element={<NextjsAdapterPage />} />
            <Route path="adapters/svelte" element={<SvelteAdapterPage />} />
            <Route path="adapters/react-native" element={<ReactNativePage />} />
            <Route path="advanced/typescript" element={<TypeScriptPage />} />
            <Route path="advanced/patterns" element={<PatternsPage />} />
            <Route path="advanced/comparison" element={<ComparisonPage />} />
            <Route path="advanced/migration" element={<MigrationPage />} />
            <Route path="roadmap" element={<RoadmapPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
