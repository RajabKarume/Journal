import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../firebaseConfig";
import LogIn from "../../Login/LogIn";
import './NavBar.css'
import {  useNavigate } from "react-router-dom";

function NavBar({name}){

    const [signOutUser, setSignOutUser] = useState(false)
    const navigate = useNavigate()

    const userSignOut = () => {
        try{
        signOut(auth).then(()=>{
            setSignOutUser(true)
            navigate('/')
            console.log('signed out')
        })
        } catch{
            console.log("signout error")
        }
    }
    if (signOutUser===true){
        return(
            < LogIn />
        )
        
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