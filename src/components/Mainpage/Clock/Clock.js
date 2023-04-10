import React, { useState } from "react";
import "./Clock.css"

function Clock(){

    let time = new Date().toLocaleTimeString()
    const [currentTime, setCurrentTime] = useState(time)

    const updatedTime = ()=>{
        let time = new Date().toLocaleTimeString()
        setCurrentTime(time)
    }
    setInterval(updatedTime,1000)

    return(
        <div>
            <h1>{currentTime}</h1>
        </div>
    )
}

export default Clock