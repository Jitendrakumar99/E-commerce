import { createContext, useEffect, useState } from "react";
import React from 'react'
import axios from "axios";  
import toast from "react-hot-toast";
import Loader from "../component/Loader";

export const AppContext=createContext({
  addToCart: () => {},
  // addToWishList: () => {},
  removeFromCart: () => {},
});

export default function AppContextProvider({children}) {
	const [counter ,setcounter]=useState(10);
   
    
  const [Url,setUrl]=useState();
  const [data,setData]=useState(null);
  const [lod,setloader]=useState(true)
  const [Filter,setfilter]=useState(null);
  const [clone,setClone]=useState(null)
  const [search,setSearch]=useState("");
  const [getrating,setrating]=useState(null);
  const [count ,setCount]=useState(5);
  const [countwish,setwishlist]=useState(0);
  const [dis,disPer]=useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [TotalPrice,setTotalPrice]=useState(0)
  const [TotalDisPrice,setTotalDisPrice]=useState(0)
  const [Quantity,setQuantity]=useState(1);
  const [productinfo ,setProductinfo]=useState(null);
 const [WishlistItem,setwishlistItem]=useState([]);
 const [itemid,setitemid]=useState([]);
 const [showuser, setshowuser] = useState(localStorage.getItem('username') || '');
 // let api=`https://dummyjson.com/products${Url}`
 // const response = await fetch(api);
 // const data =await response.json();
 async function fetchdata(Url = "") {
  try {
    const response = await axios.get('http://localhost:9000/getProduct');
    console.log(response);
    setData(response.data);
  } catch (err) {
    console.error(err);
  } finally {
    setloader(false);
  }
}
  useEffect(() => {
    fetchdata();
  }, []); 




  const filterfun=(Filter,getrating,dis)=>
  {
    if(Filter)
    {
        if(Filter=="lessthen500")
        {
          const temp=[...data]
        const filterdata=temp.filter((value)=>value.price<10);
        // console.log(filterdata);
        setClone(filterdata)
        }
        else if(Filter=="500to1000")
        {
          const temp=[...data]
          const filterdata=temp.filter((value)=>value.price>10&&value.price<50);
          // console.log(filterdata);
          setClone(filterdata)
        }
        else if(Filter=="1000to5000")
        {
          const temp=[...data]
          const filterdata=temp.filter((value)=>value.price>50&&value.price<100);
          // console.log(filterdata);
          setClone(filterdata)
        }
        else if(Filter=="5000to10000")
        {
          const temp=[...data]
          const filterdata=temp.filter((value)=>value.price>100&&value.price<500);
          // console.log(filterdata);
          setClone(filterdata)
        }
        else if(Filter=="greater10000"){
          const temp=[...data]
          const filterdata=temp.filter((value)=>value.price>500);
          // console.log(filterdata);
          setClone(filterdata)
        }
        else{
          setClone(null);
        }
      }
       else if(getrating){
        if(getrating>0)
          {
          const temp=[...data]
          const filterdata=temp.filter((value)=>Math.floor(value.rating)==getrating);
          // console.log(filterdata);
          setClone(filterdata)
          }
          else{
            setClone(null);
          }
       } 
       else{
        if(dis>0)
          {
          const temp=[...data]
          const filterdata=temp.filter((value)=>(value.discountPercentage)>=dis);
          // console.log(filterdata);
          setClone(filterdata)
          }
          else{
            setClone(null);
          }
       }
    // setClone(clone.length ? clone : []);
      
  }
 
  useEffect(() => {
    data&&filterfun(Filter,getrating,dis)

  }, [Filter,getrating,dis]); 
// console.log(Filter);
const pricerange=[
  {
    name:"lessthen500",
    name1:"Less then 10"
  },
  {
    name:"500to1000",
    name1:"10 to 50"
  },
  {
    name:"1000to5000",
    name1:"50 to 100"
  },
  {
    name:"5000to10000",
    name1:"100 to 500"
  },
  {
    name:"greater10000",
    name1:"greater then 1000"
  },
]
const DiscountP=[
  {
    name:"less then 5%",
    name1:5
  },
  {
    name:"less then 10%",
    name1:10
  },
  {
    name:"less then 15%",
    name1:15
  },
  {
    name:"less then 20%",
    name1:20
  }
]
const rating=[
  {
    name:1,
    name1:"1⭐Rating"
  },
  {
    name:2,
    name1:"2⭐Rating"
  },
  {
    name:3,
    name1:"3⭐Rating"
  },
  {
    name:4,
    name1:"4⭐Rating"
  },
  {
    name:5,
    name1:"5⭐Rating"
  },
]


useEffect(() => {
  if (cartItems.length > 0) {

    ///total price
    let totalP =cartItems.reduce((total, item) => {
      return total + item.price;
    }, 0); 
    setTotalPrice(totalP);
  ///price after discount
  let totaldisprice=cartItems.reduce((total,item)=>
  {
    return total+((item.price*item.discountPercentage)/100)
  },0)
  setTotalDisPrice(totaldisprice);
  } 
}, [cartItems]);

useEffect(() => {
  axios.get("http://localhost:9000/get_cart_data")
  .then(res=>{
    // console.log(res.data[0]);
    const data1=res.data[0].Product_id
    console.log(data1);
    setitemid(data1);
    console.log(itemid);
    
  })
  .catch(err=>{
    console.log(err);
  })
  
}, [])

useEffect(() => {
  if(data&&itemid.length>0)
    {
      console.log(data);
       const temp=[...data];
       const itemidNumbers = itemid.map(id => parseInt(id, 10));
       const newitem=temp.filter(val=>itemidNumbers.includes(val.id));
       setCartItems(newitem)
    }
    console.log(itemid);
    
    
}, [itemid,data]); 


const RemoveFromCart=async(data,token)=>{
  axios
  .post("http://localhost:9000/removeFromCart", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    // setAddtocartchange(true);
    fetchcartdata();
    toast.success("Item removed from cart");
  })
  .catch((err) => {
    console.error("Error removing item from cart:", err);
    toast.error("Failed to remove item from cart");
  });
}

  const AddToCart =async (data,token) => {
    console.log("testing", data);
    axios
        .post("http://localhost:9000/add-to-cart", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.message);
          console.log(cartItems);
          // setAddtocartchange(false);
          fetchcartdata();
          toast.success("Item added to cart");
        })
        .catch((err) => {
          console.error("Error adding item to cart:", err);
          toast.error("Failed to add item to cart");
        });
  }
  
  const fetchUserData = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }
      const response = await axios.get('http://localhost:9000/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        console.log('User Data:', response.data.Cart); 
        setCartIds(response.data.Cart)
        return response.data;
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };
  useEffect(() => {
    fetchcartdata();
    fetchUserData();
    fetchWishListdata();
  }, [])

  
  const fetchcartdata=async()=>{
    try{
     const token=localStorage.getItem('token');
     if(!token)
      { console.log("token not recieve"); return;}
     const response=await axios.get("http://localhost:9000/getcartdata",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
     });
     if (response.status === 200) {
      console.log('User Data:', response.data); 
      setCartItems(response.data)
    }
    }
    catch(err){
      console.log("not get");
    }
  }
  const fetchWishListdata=async()=>{
    try{
     const token=localStorage.getItem('token');
     if(!token)
      { console.log("token not recieve"); return;}
     const response=await axios.get("http://localhost:9000/getWishListdata",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
     });
     if (response.status === 200) {
      console.log('wish Data:', response.data); 
      setwishlistItem(response.data)
    }
    }
    catch(err){
      console.log("not get");
    }
  }
  

// console.log(TotalPrice);
// console.log(cartItems);

let product=clone||data;  
const value={
        counter,setcounter,countwish,WishlistItem,setwishlist,product,setUrl,lod,setfilter,pricerange,rating,fetchdata,search,setSearch,disPer,clone,setrating,DiscountP,
		cartItems, setCartItems,TotalPrice,setTotalPrice,TotalDisPrice,setTotalDisPrice,Quantity,setQuantity,productinfo,setProductinfo,WishlistItem,setwishlistItem,
    showuser,setshowuser,
    addToCart: AddToCart,
    // addToWishList:AddToWishList,
    removeFromCart:RemoveFromCart
    }
//  key={data} setUrl={setUrl} lod={lod} setfilter={setfilter} pricerange={pricerange} rating={rating} fetchdata={fetchdata} search={search} setSearch={setSearch} disPer={disPer} clone={clone} setrating={setrating} DiscountP={DiscountP}
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}