import React from "react";
 import Herosection from "../../components/heroSection/Herosection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productcard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { addCart } from "../../redux/CreateSlice";
import { Alldata } from "../../redux/CreateSlice";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
 
 
const Home = () => {

  const dispatch=useDispatch();

  const data=useSelector(Alldata);
   
   

  console.log("data",data)
  return (
    <>
        
       <Herosection/>
       <Filter/>  
       <ProductCard/>
        <div className="flex justify-center items-center">
           <Link to='/allproducts'>
           <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 p-4  ">see More</button>
           </Link>
        </div>
       <Track/>
       <Testimonial/>
    </>
  );
};

export default Home;
