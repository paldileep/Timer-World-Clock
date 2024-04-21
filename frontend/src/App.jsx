
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/loginComponent/Login";
import Register from "./components/auth/registerComponent/Register";
import Home from "./components/homeComponent/Home";
import Worldclock from "./components/worldClockComponent/Worldclock";
import { NotFound } from "./utils/Notfound";

import Navbar from "./components/nav/Navbar";

function App() {

  return (
    <div className="container">

 

      <Navbar/>


      <div className="componentSection">

        <Routes>

          <Route 
            path="/"  
            element={<Home/>} />

          <Route 
            path="/worldclock" 
            element={<Worldclock />} />

          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route path="*" element={<NotFound />} />

        </Routes>

      </div>
    </div>
  );
}

export default App;


