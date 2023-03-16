import React from "react";
import './Input.css'

function Input(){
    
    return(
        <div>
            <form>
                <h2>Journal entry</h2>
                <input type='text' placeholder="Enter your Journal " className="message-input" />
            </form>
            <button>Send</button>
        </div>
    )
}

export default Input