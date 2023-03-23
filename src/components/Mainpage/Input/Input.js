import React, { useContext, useState } from "react";
import './Input.css'
import { AuthContext } from "../../Auth/WithAuth";
import { setDoc, doc, getDoc, } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

function Input(){

    const {currentUser} = useContext(AuthContext)
    const [ entry, setEntry ] = useState('')
    const [send, setSend] = useState(false)
    // const [ addedEntry, setAddedEntry ] = useState(false)
    const [emails, setEmails] = useState([])

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const newEntry = [...entry].join("")
        setSend(true)
        console.log(newEntry)

        try{

            const entryRef = doc(db, 'entries', 'emails');
            const entryDoc = await getDoc(entryRef);
            
            let existingEmail = entryDoc.exists() ? entryDoc.data().email : [];

            existingEmail.push(currentUser.email);


            await setDoc(doc(db,'entries', "emails"),{
                email:existingEmail
            })

            console.log(existingEmail)
            console.log("success")
            setEmails(existingEmail)

        } catch{
            console.log("Error adding entry")
            
        }
        e.target.reset()
        setEntry('')
        setSend(false)

        // console.log(addedEntry)
    }
    const handleClick = async ()=>{
        try{
        
        }catch{
            console.log("error occured")
        }
    }
    console.log(emails)
    return(
        <div className="input-div">
            <form onSubmit={handleSubmit}>
                <h2>Journal entry</h2>
                <input type='text' placeholder="Enter your Journal " className="message-input" value={entry} onChange={(e)=> setEntry(e.target.value)} />
                <br/>
                <button onClick={handleClick} className="send-button">{send?"Sending":'Send'}</button>
            </form>
        </div>
    )
}

export default Input