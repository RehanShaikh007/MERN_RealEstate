import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { app } from '../firebase';
import {useDispatch} from "react-redux"
import {signInSuccess} from "../redux/user/userSlice.js"
import {useNavigate} from "react-router-dom";

 
const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log("Could Not SignIn with Google", error);
            
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='border-double border-2 border-red-700 text-red-700 p-3 rounded-lg uppercase hover:bg-red-700 hover:text-white items-center flex justify-center gap-3 font-medium'>
     <span><img className='w-6' src="../../public/google.png" alt="googleicon" /></span> Continue with google
    </button>
  )
}

export default OAuth
