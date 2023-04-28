import React from "react";
import './Button.css'

function Button({buttonText, handleClick}){

    return(
        <div className="button-div">
            <button onClick={handleClick} className="my-button">
                {buttonText}
            </button>
        </div>
    )
}

export default Button