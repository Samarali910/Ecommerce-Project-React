import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup,GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
 import { auth } from '../../firebase/FireBaseConfig';
import { toast } from 'react-toastify';
import { getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const OAuth = () => {
   
  const navigate=useNavigate();
  const googleAuth= async()=>{
     try {
      const provider=new GoogleAuthProvider();
      const result=await signInWithPopup(auth,provider);
     
     
      const user=result.user;
       console.log(user)
       const docRef=doc(db,'user',user.id);
        const docSnap= await getDoc(docRef);
       
        if(!docSnap.exists()){
              await addDoc(docRef,{
                name:user.displayName,
                email:user.email,
                timeStamp:serverTimestamp()
              })
        }
        navigate('/');
     } catch (error) {
       toast.error('could not authorized with google')
     }
  }

  // const googleAuth= async ()=>{
  //      try {
  //        signInWithRedirect(auth,new GoogleAuthProvider());
  //        const useCard=getRedirectResult(auth);
         
  //        console.log("useCard",useCard);
  //        navigate('/');
         
  //      } catch (error) {
  //         console.log('error :',error);
  //      }
  // }

  return (
   <>
     <button type='button' onClick={googleAuth} className='flex items-center justify-center w-full bg-red-500 text-white uppercase py-3 rounded-md hover:bg-red-700 shadow-lg'>
      <FcGoogle className='text-2xl bg-white rounded-full hover:transition duration-100 ease-in-out'/>
      <span className='ml-1 font-medium'> Continue with Goggle</span> 
     </button>
   </>
  )
}

export default OAuth    