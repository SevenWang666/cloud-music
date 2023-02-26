import React from "react";
import { GlobalStyle } from "./style";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config"; //renderRoutes 读取路由配置转化为 Route 标签
import routes from "./routes/index.js";
import store from "./store/index";
import { IconStyle } from "./assets/iconfont/iconfont";
import { ProviderData } from "./application/Singers/data";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <IconStyle></IconStyle>
        <ProviderData>{renderRoutes(routes)}</ProviderData>
      </HashRouter>
    </Provider>
  );
}

export default App;
