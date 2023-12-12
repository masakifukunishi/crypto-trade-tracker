import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import { store } from "./store/store";
import Home from "./pages/Home";
import Chart from "./pages/Chart";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/errors/NotFound";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
