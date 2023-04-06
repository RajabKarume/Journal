import React, { useContext, useEffect, useState } from "react";
import './Input.css'
import { AuthContext } from "../../Auth/WithAuth";
import { setDoc, doc, getDoc,  getDocs, collection } from "firebase/firestore";
import { db,  } from "../../../firebaseConfig.js";
import SendEmail from "../SendEmail/SendEmail";
import 'firebase/functions'
// import firebase from "firebase/compat/app"
import { getFunctions, httpsCallable } from "firebase/functions";



function Input(){

    const {currentUser} = useContext(AuthContext)
    const [ entry, setEntry ] = useState('')
    const [send, setSend] = useState(false)
    const [allDocs, setAllDocs] = useState([])
    const entryCollection = collection(db, 'entries')
    const [myEntries, setMyEntries] = useState([])
    const [sendMail, setSendMail] = useState(false)
    const functions = getFunctions();


    const handleSubmit = async(e) =>{
        if (entry !==''){
            e.preventDefault()
            const newEntry = [...entry].join("")
            setSend(true)

            try{

                const entryRef = doc(db, 'entries', currentUser.uid);
                const entryDoc = await getDoc(entryRef);
                console.log(entryDoc)
                let existingEntries = entryDoc.exists() ? entryDoc.data().newEntry : [];

                existingEntries.push(newEntry);


                await setDoc(doc(db,'entries', currentUser.uid),{
                    email:currentUser.email,
                    newEntry: existingEntries,
                })
                console.log("success")

                setSendMail(true)

            } catch{
                console.log("Error adding entry")
                
            }
            e.target.reset()
            setEntry('')
            setSend(false)
        }else{
            alert('Entry cannot be blank')
        }

    }


    useEffect(()=>{
        const getEntries = async ()=> {
            const data = await getDocs(entryCollection)
            setAllDocs(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
        }
        getEntries()

        const getMyEntries = async ()=> {
            const data = await getDoc(doc(db,'entries', currentUser.uid))
            setMyEntries(data.data().newEntry)
        }
        getMyEntries()
        const otherUsers = allDocs.filter((alldoc)=>(alldoc.email !== currentUser.email))

        const otherEmails = otherUsers.map((otherUser)=>(otherUser.email))
        console.log(otherEmails)
        console.log(allDocs)

        const interval = setInterval(() => {
            const date = new Date();
            if (date.getHours() === 0 && date.getMinutes() === 0) {
                const sendEmail = httpsCallable(functions, "sendEmail");
                sendEmail({email : otherEmails, message: myEntries}).then(result =>{
                console.log(result)
                })
            }
        }, 60000); 

        return () => clearInterval(interval);
    },[])

    // console.log(allDocs)

   
    // console.log(otherEmails)
    // console.log(myEntries)
    


    return(
        <div className="input-div">
            <form onSubmit={handleSubmit}>
                <h2>Journal entry</h2>
                <input type='text' placeholder="Enter your Journal " className="message-input" value={entry} onChange={(e)=> setEntry(e.target.value)} />
                <br/>
                <button  className="send-button">{send?"Sending":'Send'}</button>
            </form>
                <SendEmail 
                setSendMail={setSendMail} 
                sendMail={sendMail}
                />
                
        </div>
    )
}

export default Input