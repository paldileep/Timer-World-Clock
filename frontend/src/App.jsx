
import { useEffect } from "react";
import Home from "./components/homeComponent/Home"
import Worldclock from "./components/worldClockComponent/Worldclock"
import { NotFound } from "./utils/Notfound";

import { Routes, Route , NavLink } from "react-router-dom"

function App() {

  return (
    <div className="container">

        <div className="navBar">

            <NavLink to="/">Timer</NavLink>
            <NavLink to="/worldclock">World Clock</NavLink>

        </div>

        <div className="componentSection">

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/worldclock" element={<Worldclock/>}/>
                <Route path="*" element={<NotFound />} />

            </Routes>  

        </div>

    </div>
  )
}

export default App
