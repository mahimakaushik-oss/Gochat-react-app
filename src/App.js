import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "../src/Home.js";
import Signup from "./Signup";
import Navbar from './navbar.js';
import Login from './login.js';
import Reset from './Reset.js';
import {CometChat} from "@cometchat-pro/chat";
import Dashboard from './dashboard.js';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <div className ="mainhome">
      <Navbar />
    <Routes>
        <Route exact path = "/" element = {<Home/>} />
        <Route path = "signup" element = {<Signup />} />
        <Route path = "login" element = {<Login />} />
        <Route path = "reset" element = {<Reset />} />
        <Route path = "dashboard" element = {<Dashboard />} />
    </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App;