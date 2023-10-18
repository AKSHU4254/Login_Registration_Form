import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Components/pages/Home";
import Register from "./Components/pages/Register";
import Login from "./Components/pages/Login";
import PrivateComponent from "./Components/PrivateComponent";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
