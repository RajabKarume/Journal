import React, { useEffect, useState } from "react";
import './MainPage.css'
import NavBar from '../Navbar/NavBar'
import Input from "../Input/Input";
import Card from "../Card/Card";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

function MainPage(){

    const [userAuth, setUserAuth] = useState(null)
    const [name, setName] = useState("")

    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
                setUserAuth(user)
                if (user){
                    setName(user.displayName)
                }
           
        })
        
    },[])

    console.log(userAuth)


    return(
        <div className="mainpage">
            <NavBar name={name} />
            <div className="display">
                <div className="input">
                    <Input />
                </div>
                <div className="card">
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default MainPage