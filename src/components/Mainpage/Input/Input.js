import React, { useContext, useState } from "react";
import './Input.css'
import { AuthContext } from "../../Auth/WithAuth";
import SendEmail from "../PopupMessage/PopupMessage";
import 'firebase/functions'
import Button from "../../Button/Button";

function Input(){

    const {currentUser} = useContext(AuthContext)
    const [ entry, setEntry ] = useState('')
    const [send, setSend] = useState("Send")
    const [sendMail, setSendMail] = useState(false)
    const email = currentUser.email
    const [message, setMessage] = useState("")

    const handleSubmit = async(e) =>{
        // Prevent blank entries
        if (entry !==''){
            e.preventDefault()
            const newEntry = [...entry].join("")
            setSend("Sending")
            try{
                console.log(`${email}, ${newEntry}`)
                const response = await fetch('https://us-central1-journal-6a69e.cloudfunctions.net/addEntries', {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, newEntry})
                  });
              
                  const { id } = await response.json();
                  console.log("New entry added with ID:", id);
                
                setSendMail(true)
                setMessage("Entry submited successfully")
            } catch(error){
                setSendMail(true)
                setMessage(`Could not submit entry. ${error}`)
                console.error(error) 
            }
            e.target.reset()
            setEntry('')
            setSend("Send")
        }else{
            alert('Entry cannot be blank')
        }
    }

    return(
        <div className="input-div">
            <form onSubmit={handleSubmit}>
                <h2>Journal entry</h2>
                <input type='text' placeholder="Enter your Journal " className="message-input" value={entry} onChange={(e)=> setEntry(e.target.value)} />
                <br/>
                <Button buttonText={send} />
            </form>
                <SendEmail 
                setSendMail={setSendMail} 
                sendMail={sendMail}
                message={message}
                />
        </div>
    )
}

export default Input