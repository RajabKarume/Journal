import './LogIn.css'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db} from '../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

function SignUp(){
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const [signUpButton, setSignUpButton] = useState("Sign In")

    const handleSubmit = async (e)=> {
        e.preventDefault()
        setSignUpButton("Signing In...")
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
            try{
                console.log(res.user.uid)
                console.log(displayName)
                console.log(email)
                updateProfile(res.user,{
                    displayName
                })
                setDoc(doc(db, "users", res.user.uid),{
                    uid: res.user.uid,
                    email,
                    displayName
                })
                console.log("db done")
                navigate('/login')
            } catch(err){
                console.log("db error")
            }
        } catch (err){
            setErr(true)
            console.log("error")
        }
        setSignUpButton("Sign In")
    } 

    return(
        <div className='main-div'> 
            <div className='login-container'>
                <div className='login-h1'>
                    <h1>Sign up of an account</h1>
                </div>
                <div className='form-div'>
                    <form onSubmit={handleSubmit}>
                        <h3>Name</h3>
                        <input type='text' placeholder='Enter your name' value={displayName} onChange={(e)=> setDisplayName(e.target.value)} className='login-input' />
                        <h3>Email address</h3>
                        <input type="email" placeholder='Enter your email address' value={email} onChange={(e)=> setEmail(e.target.value)} className='login-input' />
                        <h3>Password</h3>
                        <input type='password' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)} className='login-input' />
                        <br/>
                        <Button buttonText={signUpButton} />
                        <br/>
                    </form>
                </div>
                <div>
                {err? <p>Sign Up error </p>: <p></p>}
                </div>
                <div className='span-div'>
                    <span > <Link to='/login'>LogIn to your account</Link> </span>
                </div>
            </div>
        </div>
    )
}

export default SignUp