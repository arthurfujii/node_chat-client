import { Route, HashRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import io from "socket.io-client";
export const Root = () => {
  const WS_URL = "ws://localhost:5000";
  const socket = io(WS_URL);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
};
