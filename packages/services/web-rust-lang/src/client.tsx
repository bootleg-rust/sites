import "core-js/stable";
import "regenerator-runtime/runtime";

import "@bootleg-rust/design-system/src/theming/fonts/index.scss";

async function loadDependenciesAsync() {
  const loadReact = import(/* webpackPreload: true */ "react").then((m) => ({
    React: m.default,
  }));
  const loadApp = import(/* webpackPreload: true */ "./app");
  const loadLibComponents = import(
    /* webpackPreload: true */ "@bootleg-rust/design-system"
  );
  const loadSSRRuntime = import(
    /* webpackPreload: true */ "@ssr-kit/runtime/client"
  );

  // Not used directly but still critical-path can be good to preload.
  // When making changes to this check the build/webpack.report.html to
  // see how it affects the resulting bundles.
  // prettier-ignore
  {
    void import(/* webpackPreload: true */ "react-dom");
    void import(/* webpackPreload: true */ "react-router");
    void import(/* webpackPreload: true */ "react-router-dom");
    void import(/* webpackPreload: true */ "react-helmet-async");
    void import(/* webpackPreload: true */ "@ssr-kit/toolbox");
    void import(/* webpackPreload: true */ "@bootleg-rust/design-system");
    void import(/* webpackPreload: true */ "@bootleg-rust/features");
  }

  const allLoaded = await Promise.all([
    loadReact,
    loadApp,
    loadLibComponents,
    loadSSRRuntime,
  ]);

  const combined = Object.assign(...allLoaded);

  return combined;
}

void loadDependenciesAsync().then((asyncDeps) => {
  const { React, hydrate, ThemeProvider, App, DefaultTheme } = asyncDeps;
  hydrate({
    render() {
      return (
        <ThemeProvider theme={DefaultTheme}>
          <App />
        </ThemeProvider>
      );
    },
  });
});
