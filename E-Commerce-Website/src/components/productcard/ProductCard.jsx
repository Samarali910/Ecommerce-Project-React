import React from "react";
import { useEcommerce } from "../../context/data/MyContext";
import { addCart} from "../../redux/CreateSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
 
const ProductCard = () => {
  const dispatch=useDispatch();
  
  
  const { Mode, product,searchkey,filtertype,filterrupees } = useEcommerce();
     console.log("product",product);
  const add=(data)=>{
    dispatch(addCart(data));
    toast.success('card added successfully');
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: Mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div class="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

       
          <div className="flex flex-wrap -m-4">
           
            {
              product.filter((obj)=>obj.title.toLowerCase().includes(searchkey)).filter((obj)=>obj.category.toLowerCase().includes(filtertype)).filter((obj)=>obj.price.toLowerCase().includes(filterrupees)).slice(0,8).map((item,index)=>(
                <div className="p-4 md:w-1/4  drop-shadow-lg " key={index}>
              <div
              onClick={()=>window.location.href=`/productinfo/${item.id}`}
                className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: Mode === "dark" ? "rgb(46 49 55)" : "",
                  color: Mode === "dark" ? "white" : "",
                }}
              >
                <div className="flex justify-center cursor-pointer">
                  <img
                    className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out"
                    src={item.imageUrl}
                    alt="blog"
                  />
                </div>
                <div className="p-5 border-t-2">
                  <h2
                    className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                    style={{ color: Mode === "dark" ? "white" : "" }}
                  >
                    E-Bharat
                  </h2>
                  <h1
                    className="title-font text-lg font-medium text-gray-900 mb-3"
                    style={{ color: Mode === "dark" ? "white" : "" }}
                  >
                    {item.description}
                  </h1>
                  {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                  <p
                    className="leading-relaxed mb-3"
                    style={{ color: Mode === "dark" ? "white" : "" }}
                  >
                    ₹ {item.price}
                  </p>
                  <div className=" flex justify-center">
                    <button
                      onClick={()=>add(item)}
                      type="button"
                      className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ))}
            

            
          </div>
       
      </div>
    </section>
  );
};

export default ProductCard;
