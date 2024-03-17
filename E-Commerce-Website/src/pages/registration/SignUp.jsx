import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, firedb } from "../../firebase/FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, addDoc, collection,} from "firebase/firestore";
import { useEcommerce } from "../../context/data/MyContext";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import Loader from "../../loader/Loader";
import { useNavigate } from "react-router-dom";
 import OAuth from "./OAuth";
const SignUp = () => {
  const navigate=useNavigate();
  const{ loader,setLoader,Mode}=useEcommerce();
  const[name,setName]=useState('')
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[showPassword,setShowPassword]=useState(false);

  const signup=async(e)=>{
    e.preventDefault();
    setLoader(true);
    if(name==='' || email ==='' || password===''){
      return toast.error('all fields are required');
     }
       try {
          const users= await createUserWithEmailAndPassword(auth,email,password);
          const user={
            name:name,
            uid:users.user.uid,
            email:users.user.email,
            Time:Timestamp.now()
          }

           await addDoc(collection(firedb,'user'),user);
           toast.success('successfully signUp');
           setName('');
           setEmail('');
           setPassword('');
           setLoader(false);
           navigate('/');

       } catch (error) {
          console.log('error :',error);
          setLoader(true);
       }
  }
  return (
    // <div className=" flex justify-center items-center h-screen">
    
    //   <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
    //     <div className="">
    //       <h1 className="text-center text-white text-xl mb-4 font-bold">
    //         Signup
    //       </h1>
    //     </div>
    //     <div>
    //       <input
    //         type="text"
    //         name="name"
    //         value={name}
    //         onChange={(e)=>setName(e.target.value)}
    //         className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
    //         placeholder="Name"
    //       />
    //     </div>

    //     <div>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e)=>setEmail(e.target.value)}
    //         name="email"
    //         className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
    //         placeholder="Email"
    //       />
    //     </div>
    //     <div>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e)=>setPassword(e.target.value)}
    //         className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
    //         placeholder="Password"
    //       />
    //     </div>
    //     <div className=" flex justify-center mb-3">
    //       <button className=" bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg" onClick={signup}>
    //         Signup
    //       </button>
    //     </div>
    //     <div>
    //       <h2 className="text-white">
    //         Have an account{" "}
    //         <Link className=" text-red-500 font-bold" to={"/login"}>
    //           Login
    //         </Link>
    //       </h2>
    //     </div>
    //   </div>
    // </div>

    <section>
    <h3 className="text-center mt-6 font-bold text-xl uppercase" style={{color:Mode==='dark'? 'white':''}}>SignUp</h3>
    <div className="flex justify-center items-center flex-wrap max-w-6xl mx-auto px-6 py-12  ">
      <div className="md:w-[67%] lg:w-[50%] mb-12  md:mb-6">
        <img
          src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2V5fGVufDB8fDB8fHww"
          alt="key"
          className="rounded-2xl"
        />
      </div>
      <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-8">
        <form onSubmit={signup}>
        <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            id='name'
            className="w-full bg-white rounded-md transition-ease-in-out border-gray-400 text-xl text-gray-700"
          />
          <input
            type="text"
            value={email}
            id='email'
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email Address "
            className="w-full bg-white rounded-md transition-ease-in-out border-gray-400 text-xl text-gray-700 mt-4"
          />
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              id='password'
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="password "
              className="w-full bg-white rounded-md transition-ease-in-out border-gray-400 text-xl text-gray-700 mt-4"
            />

            {showPassword ? <FaRegEye 
               onClick={()=>setShowPassword((prev)=>!prev)}
               className="absolute right-3 top-8 cursor-pointer"
            /> : <FaRegEyeSlash 
            onClick={()=>setShowPassword((prev)=>!prev)}
             className="absolute right-3 top-8 cursor-pointer" />}
          </div>
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
            <p style={{color:Mode==='dark' ? 'white':''}}> have an account?
               <Link to='/login' className='text-red-500 ml-2'>
                  SignIn
               </Link>
            </p>
            <Link to='/forgotpassword'>
            <p className="text-blue-500 cursor-pointer">
              Forgot-password?
            </p>
            </Link>
          </div>
          <button className="w-full bg-blue-500 mt-4 px-3 py-3 rounded-md uppercase hover:bg-blue-700 hover:transition ease-in-out text-white font-semibold shadow-md" type="submit">signUp</button>
        {/* <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300 ">
           <p className="text-center" style={{color:Mode==='dark'? 'white':''}}>OR</p>
        </div>
        <OAuth/> */}
        </form>
      </div>
    </div>
  </section>
  );
};

export default SignUp;
