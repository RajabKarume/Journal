import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebaseConfig";
import './NavBar.css'
import {  useNavigate } from "react-router-dom";

function NavBar({name}){

    const navigate = useNavigate()
    const [logout, setLogout] = useState(false)

    const userSignOut = () => {
        setLogout(true)
        try{
        signOut(auth).then(()=>{
            navigate('/')
            console.log('signed out')
        })
        } catch{
            console.log("signout error")
        }
        setLogout(false)
    }
    
    return(
        <div className="navbar-div">
            <div className="appname">
                <h1>My Journal</h1>
            </div>
            <div className="user-display">
                <h1>{name}</h1>
            </div>
            <div className="logout-button">
                <button onClick={userSignOut}>{logout?"Logging Out": "LogOut"}</button>
            </div>
        </div>
    )
}

export default NavBar