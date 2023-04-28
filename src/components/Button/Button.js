import React from "react";
import './Button.css'

function Button({buttonText}){

    return(
        <button className="my-button">
            {buttonText}
        </button>
    )
}

export default Button