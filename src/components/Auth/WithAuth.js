import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";

export const AuthContext = createContext()

// This ensures users can't view homepage without proper login

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState({})

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user)=>{
                setCurrentUser(user)           
        })
        return () => {
            unsub()
        }
    },[]);
    return(
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
    )
    
}