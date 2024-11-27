import { Outlet } from "react-router-dom";
import "./App.css";
import { UserComponent } from "./Components/User.component";

function App() {
  return (
    <>
      <section className="section main">
        <div className="container is-max-tablet">
          <div className="block header">
            <p className="title">Chat App</p>
            <p className="subtitle">Realtime chat w/ node.js backend.</p>
          </div>
          <div className="block">
            <UserComponent />
          </div>
          <div className="block outlet">
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
