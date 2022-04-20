import React, {useEffect, useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {auth, sendPasswordReset} from "./Config/Config.js";


const Reset = () => {
    const [email, setEmail] = useState("");
    const [user, loading, arror] = useAuthState(auth);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (loading) return;
    //     if(user) navigate("/");
    // }, [user, loading]);
  return (
      <>
      <div className =" reset login-main">
    <div className = " reset-pwd login-form">
        <p className = "  reset reg-link ">  Reset Password </p>
        <input type="text" className ="login-parts" name = "mail" value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder = "  Enter Email"/>
        <button className = "login-parts" onClick ={() => sendPasswordReset(email)}>
            Send password reset mail
        </button>
    <div className = " reset new-sign">
        new to Gochat? <Link to ="/signup" className = "reg-link">Register</Link>
    </div>
    </div>
    </div>
    </>
  )
}

export default Reset;