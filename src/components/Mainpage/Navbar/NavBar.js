import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../../firebaseConfig";
import './NavBar.css'

function NavBar(){

    return(
        <div className="navbar-div">
            <div className="appname">
                <h1>My Journal</h1>
            </div>
            <div className="user-display">
                <h1>John Doe</h1>
            </div>
            <div className="logout-button">
                <button onClick={signOut(auth)}>Log Out</button>
            </div>
        </div>
    )
}

export default NavBar