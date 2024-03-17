import React from 'react'
import { useEcommerce } from '../../context/data/MyContext'
import Loader from '../../loader/Loader';
const Order = () => {
  const {order,Mode,loader}=useEcommerce();


  const userid=JSON.parse(localStorage.getItem('signIn')).user.uid;
  return (
    <>
       
       {
        order.length>0 ?  <div className=" h-auto pt-10">
            {
              order.filter(obj => obj.userid == userid).map((order) => {
                // order.cartItems.map()
                return (
                  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    {
                      order.cartData.map((item) => {
                        return (
                          <div className="rounded-lg md:w-2/3">
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: Mode === 'dark' ? '#282c34' : '', color: Mode === 'dark' ? 'white' : '', }}>
                              <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                  <h2 className="text-lg font-bold text-gray-900" style={{ color: Mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: Mode === 'dark' ? 'white' : '' }}>{item.description}</p>
                                  <p className="mt-1 text-xl text-gray-700" style={{ color: Mode === 'dark' ? 'white' : '' }}>  ₹{item.price}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
        </div> : ''
       }
        
    </>
     
       
  )
}

export default Order