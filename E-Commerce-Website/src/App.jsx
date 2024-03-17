import { createBrowserRouter,createRoutesFromElements,Navigate,Route,RouterProvider} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashbord/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import Home from "./pages/home/Home";
 import { ContextProvider } from "./context/data/MyContext";
import { useEffect, useState } from "react";
import SignUp from "./pages/registration/SignUp";
import Login from "./pages/registration/Login";
import ProDuctInfo from "./components/productinfo/ProDuctInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, deleteDoc, getDocs, query, setDoc} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { onSnapshot} from 'firebase/firestore';
import { firedb } from "./firebase/FireBaseConfig";
 import { doc } from "firebase/firestore";
import { orderBy } from "firebase/firestore";
import AllProducts from "./pages/allproducts/AllProducts";
import ForgotPassword from "./pages/registration/ForgotPassword";

const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="/" element={<Home/>}/>
      <Route path="/order" element={ <protectedRoteforUser>
        <Order/>
      </protectedRoteforUser>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/dashboard" element={<protectedRouteforAdmin>
        <Dashboard/>
      </protectedRouteforAdmin>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/allproducts" element={<AllProducts/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/productinfo/:id" element={<ProDuctInfo/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/addproduct" element={<protectedRouteforAdmin>
        <AddProduct/>
      </protectedRouteforAdmin>}/>
      <Route path="/updateproduct" element={<protectedRouteforAdmin>
        <UpdateProduct/>
      </protectedRouteforAdmin>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/*" element={<NoPage/>}/>
    </Route>
))

function App() {
  const [loader,setLoader]=useState(false);
  const [Mode,setMode]=useState('light');

  const[products,setProducts]=useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  })

  const[product,setProduct]=useState([]);

  const addProducts = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("all fields are required");
    }
    setLoader(true);
    try {
      await addDoc(collection(firedb, "products"), products);
      toast.success("Product added Successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getproductData();
      setLoader(false);
    } catch (error) {
      console.log("error :", error);
      setLoader(false);
    }
  };

  const[user,setUser]=useState([]);
  const getUserData=async()=>{
    setLoader(true);
      try {
        const result= await getDocs(collection(firedb,'user'));
        const userArray=[];
             result.forEach((doc)=>{
                 userArray.push(doc.data());
             })
             setUser(userArray);
             setLoader(false);
      } catch (error) {
        console.log('error :',error);
        setLoader(false);
      }
  }

   const[order,setOrder]=useState([]);

  const getOrderData=async()=>{
    setLoader(true);
     try {
      const result= await getDocs(collection(firedb,'order'));
        const orderArray=[];
       result.forEach((doc)=>{
         orderArray.push(doc.data());
       })
       setOrder(orderArray);
       setLoader(orderArray);
     } catch (error) {
        console.log('error :',error)
        setLoader(false);
     }
  }

  const getproductData = async () => {
    setLoader(true);
         try {
           const q=query(collection(firedb,'products'),orderBy('time'));
           const data=onSnapshot(q,(QuerySnapshot)=>{
            const productArray=[];
            QuerySnapshot.forEach((doc)=>{
              productArray.push({...doc.data(),id:doc.id});
            })
            console.log('productArray',productArray)
            setProduct(productArray);
            setLoader(false)
           })

           return ()=>data;
         } catch (error) {
             console.log('comming to error to fetching data from firebase',error);
             setLoader(false);
         }
  };

  
  
  const deleteDocument= async (item)=>{
    setLoader(true);
     try {
       await deleteDoc(doc(firedb,'products',item.id))
        toast.success('item successfully deleted')
        setLoader(false);
     } catch (error) {
       console.log('error :',error);
       setLoader(false)
     }
  }
  
  const editDocument=(item)=>{
    setProducts(item);
  }

  const updateDocument= async ()=>{
    setLoader(true);
    try {
       await setDoc(doc(firedb,'products',products.id),products);
       toast.success('product updated successfully');
       setTimeout(()=>{
          window.location.href='/dashboard';
       },800)
       setLoader(false);
    } catch (error) {
        console.log("error :",error);
        setLoader(false);
    }
  }
  useEffect(()=>{
    getproductData();
    getOrderData();
    getUserData();
  },[])

    const toggle = () => {
      if (Mode === "light") {
        document.body.style.backgroundColor = "#3c3c3c";
      } else {
        document.body.style.backgroundColor = "white";
      }
    };
  
    const[searchkey,setSearchKey]=useState('');
    const[filtertype,setFilterType]=useState('');
    const[filterrupees,setFilterRupees]=useState('');
   
  return (
    <>
      <ContextProvider value={{Mode,
      setMode,
      toggle,
      loader,
      setLoader,
      products,
      setProducts,
      addProducts,
      product,
      deleteDocument,
      editDocument,
      updateDocument,
      order,
      user,
      searchkey,setSearchKey,
      filtertype,setFilterType,
      filterrupees,setFilterRupees
      }}>
         <RouterProvider router={router}/>
         <ToastContainer/>
      </ContextProvider>
       
    </>
  );
}

export default App;

  // user

 export const protectedRoteforUser=({children})=>{
     const user=localStorage.getItem('signIn');
      if(user){
        return children;
      } else{
        return <Navigate to={'/login'}/>
      }
  }
  // admin

  export const protectedRouteforAdmin=({children})=>{
      const admin= JSON.parse(localStorage.getItem('signIn'));
      if(admin.user.email==='arshi123@gmail.com'){
         return children;
      } else{
        return <Navigate to={'/login'}/>
      }
  }
 