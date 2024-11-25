import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <h1 className="title">Chat App</h1>
        <div className="box">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
