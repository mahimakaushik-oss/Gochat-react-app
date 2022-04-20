import react from "react";
import Navbar from "./navbar.js";
import '../src/style.css';
import Login from './login.js';

const Home = () => {
  return (
    <>
    
      <div className ="wlcm-nt">
        <p>
          Welcome to the GoChat !!
          Celebrate the endless bridge of friendship and
          Enjoy everyday with friends ;)
        </p>
      </div>
      <div className = "home-stup">
      <Login />
    </div>
    </>
  )
}

export default Home;
