import React from "react";
import './Card.css'


function Card(){

    return(
        <div className="card-container">
            <div className="post-div">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
            </div>
            <div className="timestamp">
                10th Oct 2023
            </div>
        </div>
    )
}

export default Card