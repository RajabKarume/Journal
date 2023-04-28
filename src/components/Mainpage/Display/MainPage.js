import React, { useEffect, useState } from "react";
import './MainPage.css'
import NavBar from '../Navbar/NavBar'
import Input from "../Input/Input";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import Clock from "../Clock/Clock";

function MainPage(){

    const [userAuth, setUserAuth] = useState(null)
    const [name, setName] = useState("")

    //Getting user's name
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
                setUserAuth(user)
                if (user){
                    setName(user.displayName)
                }
           
        })
        console.log(userAuth)
    },[userAuth])

    return(
        <div className="mainpage">
            <NavBar name={name} />
            <div className="display">
                <div className="clock-display">
                    <Clock />
                </div>
                <div className="input">
                    <Input />
                </div>
            </div>
        </div>
    )
}

export default MainPage