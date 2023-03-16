import React from "react";
import './MainPage.css'
import NavBar from '../Navbar/NavBar'
import Input from "../Input/Input";
import Card from "../Card/Card";

function MainPage(){

    return(
        <div className="mainpage">
            <NavBar />
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