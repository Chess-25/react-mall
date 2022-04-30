import React, { memo } from "react";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";
import routes from "./router";
import store from "@/store";
const App = memo(() => {
  return (
    <Provider store={store}>
      <HashRouter>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
});

export default App;
