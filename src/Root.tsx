import { Route, HashRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./Context/contextProvider";
import { RoomsPage } from "./Pages/RoomsPage";
import { ChatPage } from "./Pages/ChatPage";
export const Root = () => {
  return (
    <Router>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="/rooms/:id" element={<ChatPage />} />
          </Route>
        </Routes>
      </ContextProvider>
    </Router>
  );
};
