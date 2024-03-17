import React, { useEffect, useState } from "react";
import { useEcommerce } from "../../context/data/MyContext";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Alldata } from "../../redux/CreateSlice";
import { deleteCart } from "../../redux/CreateSlice";
import { toast } from "react-toastify";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { firedb } from "../../firebase/FireBaseConfig";
const Cart = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPinCode] = useState("");
  const [mobileno, setMobileNo] = useState("");

  const cartData = useSelector(Alldata);
  const dispatch = useDispatch();

  const { Mode, product } = useEcommerce();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  }, []);

  const deletecart = (item) => {
    dispatch(deleteCart(item));
    toast.success("item successfully deleted");
  };
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let temp = 0;
    cartData.map((item) => (temp += parseInt(item.price)));
    setTotal(temp);
  });

  const buyNow = async () => {
    if (name === "" || address === "" || pincode === "" || mobileno === "") {
      return toast.error("all fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    const addressInfo = {
      name,
      address,
      pincode,
      mobileno,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    var options = {
      key: "rzp_test_L8A9DznfyxarjD",
      key_secret: "pO2HddfcQQZUKwVDPi615UxU",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "E-Bharat",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response);
        toast.success("Payment Successful");
        const paymentId = response.razorpay_payment_id || null;

        const orderInfo = {
          cartData,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("signIn")).user.email,
          userid: JSON.parse(localStorage.getItem("signIn")).user.uid,
          paymentId,
        };

        try {
          const result = addDoc(collection(firedb, "order"), orderInfo);
          console.log("result", result);
        } catch (error) {
          console.log("error :", error);
        }
      },

      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };

  const shipping = 100;
  const grandTotal = shipping + total;
  return (
    <div
      className="h-auto bg-gray-100 pt-5 "
      style={{
        backgroundColor: Mode === "dark" ? "#282c34" : "",
        color: Mode === "dark" ? "white" : "",
      }}
    >
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
        <div className="rounded-lg md:w-2/3 ">
          {cartData.map((item, index) => (
            <div
              key={index}
              className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start"
              style={{
                backgroundColor: Mode === "dark" ? "rgb(32 33 34)" : "",
                color: Mode === "dark" ? "white" : "",
              }}
            >
              <img
                src={item.imageUrl}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2
                    className="text-lg font-bold text-gray-900"
                    style={{ color: Mode === "dark" ? "white" : "" }}
                  >
                    {item.title}
                  </h2>
                  <h2
                    className="text-sm  text-gray-900"
                    style={{ color: Mode === "dark" ? "white" : "" }}
                  >
                    {item.description}
                  </h2>
                  <p
                    className="mt-1 text-xl font-semibold text-gray-700"
                    style={{ color: Mode === "dark" ? "white" : "" }}
                  >
                    ₹{item.price}
                  </p>
                </div>
                <div
                  className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
                  onClick={() => deletecart(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
          style={{
            backgroundColor: Mode === "dark" ? "rgb(32 33 34)" : "",
            color: Mode === "dark" ? "white" : "",
          }}
        >
          <div className="mb-2 flex justify-between">
            <p
              className="text-gray-700"
              style={{ color: Mode === "dark" ? "white" : "" }}
            >
              Subtotal
            </p>
            <p
              className="text-gray-700"
              style={{ color: Mode === "dark" ? "white" : "" }}
            >
              ₹{total}
            </p>
          </div>
          <div className="flex justify-between">
            <p
              className="text-gray-700"
              style={{ color: Mode === "dark" ? "white" : "" }}
            >
              Shipping
            </p>
            <p
              className="text-gray-700"
              style={{ color: Mode === "dark" ? "white" : "" }}
            >
              ₹{shipping}
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between mb-3">
            <p
              className="text-lg font-bold"
              style={{ color: Mode === "dark" ? "white" : "" }}
            >
              Total
            </p>
            <div className>
              <p
                className="mb-1 text-lg font-bold"
                style={{ color: Mode === "dark" ? "white" : "" }}
              >
                ₹{grandTotal}
              </p>
            </div>
          </div>
          {/* <Modal  /> */}
          <Modal
            name={name}
            setName={setName}
            address={address}
            setAddress={setAddress}
            pincode={pincode}
            setPinCode={setPinCode}
            mobileno={mobileno}
            setMobileNo={setMobileNo}
            buyNow={buyNow}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
