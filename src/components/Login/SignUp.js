import './LogIn.css'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';

function SignUp(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    function handleSubmit(e){
        e.preventDefault()
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        });
        
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
                        <input type='text' placeholder='Enter your name' />
                        <h3>Email address</h3>
                        <input type="email" placeholder='Enter your email address' value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <h3>Password</h3>
                        <input type='password' placeholder='Enter your password' value={password} onChange={(e)=> setPassword(e.target.value)} />
                        <br/>
                        <button>Log In</button>
                    </form>
                </div>
                <div className='span-div'>
                    <span>Sign up for an account</span>
                </div>
            </div>
        </div>
    )
}

export default SignUp