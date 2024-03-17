import React, { useState } from 'react'
// import OAuth from '../components/OAuth'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
 import { auth } from '../../firebase/FireBaseConfig';
 import OAuth from './OAuth';
import { useEcommerce } from '../../context/data/MyContext';
const ForgotPassword = () => {
  const{Mode}=useEcommerce();
  const[email,setEmail]=useState('');

  const onSubmit= async (e)=>{
    e.preventDefault();
      try {
        await sendPasswordResetEmail(auth,email);
        toast.success('Email was sent');
      } catch (error) {
        toast.error('could not send reset password');
      }
  }
  return (
    <section>
        <h3 className="text-center mt-6 font-bold text-xl uppercase" style={{color:Mode==='dark'? 'white':''}}>forgot-password</h3>
        <div className="flex justify-center items-center flex-wrap max-w-6xl mx-auto px-6 py-12  ">
          <div className="md:w-[67%] lg:w-[50%] mb-12  md:mb-6">
            <img
              src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2V5fGVufDB8fDB8fHww"
              alt="key"
              className="rounded-2xl"
            />
          </div>
          <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-8">
            <form onSubmit={onSubmit}>
            
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="text"
                placeholder="Email Address "
                className="w-full bg-white rounded-md transition-ease-in-out border-gray-400 text-xl text-gray-700 mt-2"
              />
              
              <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mt-2">
                <p style={{color:Mode==='dark'?'white':''}}> have an account?
                   <Link to='/signup' className='text-red-500 ml-2'>
                      Register
                   </Link>
                </p>
                <Link to='/forgotpassword'>
                <p className="text-blue-500 cursor-pointer">
                  sign-in-instead
                </p>
                </Link>
              </div>
              <button className="w-full bg-blue-500 mt-4 px-3 py-3 rounded-md uppercase hover:bg-blue-700 hover:transition ease-in-out text-white font-semibold shadow-md" type="submit">send reset Email</button>
            {/* <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300 ">
               <p className="text-center" style={{color:Mode==='dark'? 'white':''}}>OR</p>
            </div> */}
               {/* <OAuth/> */}
            </form>
            
          </div>
        </div>
      </section>
  )
}

export default ForgotPassword