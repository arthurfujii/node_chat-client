import { Outlet } from "react-router-dom";
import "./App.css";
import { UserComponent } from "./Components/UserComponent";

function App() {
  return (
    <>
      <section className="section">
        <div className="container is-max-tablet">
          <div className="block">
            <p className="title">Chat App</p>
            <p className="subtitle">Realtime chat w/ node.js backend.</p>
            <div className="block">
              <UserComponent />
            </div>
          </div>
          <div className="block">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
