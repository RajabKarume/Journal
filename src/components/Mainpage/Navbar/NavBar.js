import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../../firebaseConfig";
import './NavBar.css'
import {  useNavigate } from "react-router-dom";

function NavBar({name}){

    const navigate = useNavigate()

    const userSignOut = () => {
        try{
        signOut(auth).then(()=>{
            navigate('/')
            console.log('signed out')
        })
        } catch{
            console.log("signout error")
        }
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
                <button onClick={userSignOut}>Log Out</button>
            </div>
        </div>
    )
}

export default NavBar