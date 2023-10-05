import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import TitleState from "./context/title/TitleState";
import { injectStore } from "./components/atoms/interceptors/AxiosInterceptor";
import { WebSocketProvider, socket } from "./context/socket/WebSocketContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WebSocketProvider value={socket}>
          <TitleState>
            <App />
          </TitleState>
        </WebSocketProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

injectStore(store);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
