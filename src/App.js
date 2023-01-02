import React from "react";
import {  Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";




const App = () => {
    return (
        <>
        <Navbar/>
            <Routes>
            <Route exact path="/" element={<Home  />} />
            <Route exact path="/rooms/" element={<Rooms  />} />
            <Route  exact path="/rooms/:slug" element={<SingleRoom  />} />
            <Route  path="*" element = { <Error/>}/>
            </Routes>
        </>
    )
    };
    export default App ;