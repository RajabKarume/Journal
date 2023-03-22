import React, { useContext, useState } from "react";
import './Input.css'
import { AuthContext } from "../../Auth/WithAuth";
import { setDoc, doc, getDoc, } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

function Input(){

    const {currentUser} = useContext(AuthContext)
    const [ entry, setEntry ] = useState('')
    // const [ addedEntry, setAddedEntry ] = useState(false)

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const newEntry = [...entry].join("")

        try{

            const entryRef = doc(db, 'entries', currentUser.uid);
            const entryDoc = await getDoc(entryRef);
            
            let existingEntries = entryDoc.exists() ? entryDoc.data().newEntry : [];

            existingEntries.push(newEntry);


            await setDoc(doc(db,'entries', currentUser.uid),{
                email:currentUser.email,
                newEntry: existingEntries,
            })
            console.log("success")
        } catch{
            console.log("Error adding entry")
            
        }

        // console.log(addedEntry)
    }
    
    return(
        <div className="input-div">
            <form onSubmit={handleSubmit}>
                <h2>Journal entry</h2>
                <input type='text' placeholder="Enter your Journal " className="message-input" value={entry} onChange={(e)=> setEntry(e.target.value)} />
                <br/>
                <button className="send-button">Send</button>
            </form>
        </div>
    )
}

export default Input