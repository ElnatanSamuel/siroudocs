import React from "react";

const NavigationLifecyclePage: React.FC = () => {
  return (
    <div className="doc-prose">
      <h1>Navigation Lifecycle</h1>
      <p>
        Every navigation in Sirou follows a strict, asynchronous lifecycle. This
        ensures that guards are resolved and data is loaded before the UI state
        updates.
      </p>

      <h2 id="lifecycle-stages">Lifecycle Stages</h2>

      <h3 id="guard-phase">1. Guard Phase</h3>
      <p>
        The router executes all registered global and route specific guards. If
        any guard returns a redirect or denies access, the transition is
        interrupted.
      </p>

      <h3 id="loader-phase">2. Loader Phase</h3>
      <p>
        Once access is granted, Sirou executes the <code>loaders</code> defined
        for the target route in parallel. This eliminates "waterfall" fetching
        inside components.
      </p>

      <h3 id="state-phase">3. State Phase</h3>
      <p>
        After all asynchronous logic resolves, the router updates its internal
        state. This is the moment reactive stores (<code>$page</code> in Svelte,
        hooks in React) emit their new values.
      </p>

      <h2 id="key-features">Key Features</h2>

      <h3 id="concurrent-loading">Concurrent Loading</h3>
      <p>
        Loaders run in parallel with the transition, ensuring the screen only
        changes when the data is ready.
      </p>

      <h3 id="graceful-abort">Graceful Abort</h3>
      <p>
        If a new navigation starts before the current one finishes, any pending
        loaders from the previous transition are automatically cancelled.
      </p>

      <h3 id="custom-errors">Custom Errors</h3>
      <p>
        Hook into the <code>onError</code> lifecycle to handle failed guards or
        network errors globally.
      </p>
    </div>
  );
};

export default NavigationLifecyclePage;
