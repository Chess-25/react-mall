import React, { memo } from "react";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";
import store from "@/store";

import Nav from "@/components/nav";

const Main = memo((props) => {
  const { route } = props;
  return (
    <Provider store={store}>
      <HashRouter>
        {renderRoutes(route.routes)}
        <Nav />
      </HashRouter>
    </Provider>
  );
});

export default Main;
