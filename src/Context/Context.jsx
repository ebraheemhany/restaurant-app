import { createContext , useState , useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { Alert } from "../Component/Alert/Alert";
import { Orders } from "../Dashbord/Oders/Orders";

export const AppContext = createContext();

export const ContextProvider = ({children}) => {
    // state to hold the window size
const [windowSize , setWindowSize] = useState(window.innerWidth);
//   state to hold the sidebar status
const [sideBarOpen , setSideBarOpen] = useState(true)
const [getData , setGetData] = useState([])
const [laoding , setLaoding] = useState(false);
const [topProducts , setTopProducts] = useState([])


const [inCart, setInCart] = useState(() => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
});

// get data from subapase

const fetchData = async () => {
    setLaoding(true)
const {data , error} = await supabase
.from("items_menu")// name of the table
.select("*")  // to sellect all columns

if (error) {
    console.error(error , "error")
}else {
setGetData(data)
}
setLaoding(false)
}
useEffect(() => {
fetchData();
}, [])



//  to get and update the window size
useEffect(() => {
    
    const handelResize = () => setWindowSize(window.innerWidth)

    window.addEventListener("resize" , handelResize)

     return () => {
        window.removeEventListener("resize" , handelResize)
     }

} , [])

// function to delted item from items_menu
const deleteItem = async (id) => {

const alertDelete = await Alert ({
title:"Are you suore to delete this item",
ok:"OK",
cancel:"Cancel",
 icon: "question"
})
if(!alertDelete) return ;



try {
const {error} = await supabase
.from("items_menu")
.delete()
.eq("id" , id)

if(error) {
    console.log(error)
    return;
}
setGetData((prev) => prev.filter((ele) => ele.id !== id))
}
catch(error) {
    console.error(error)
}
}

// إضافة عنصر للسلة
const AddToCart = (item) => {
  setInCart((prev) => {
    // نتأكد لو العنصر موجود بالفعل (عشان ما يتكرر)
    const exists = prev.find((cartItem) => cartItem.id === item.id);

    let updatedCart;
    if (exists) {
      // لو موجود نزود الكمية بدل ما نكرر العنصر
      updatedCart = prev.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      );
    } else {
      // لو مش موجود نضيفه مع quantity = 1
      updatedCart = [...prev, { ...item, quantity: 1 }];
    }

    // نخزن في localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    return updatedCart;
  });
};
 

// get bset Seler from products
useEffect(() => {
  const TopProducts = async () => {
    // 1. هات الـ orders من supabase
    const { data: orders, error } = await supabase
      .from("orders")
      .select("items");

    if (error) {
      console.log(error);
      return;
    }

    // 2. عد كل منتج اتباع كام مرة
    const ordersCount = {};
    orders.forEach((order) => {
      const items = order.items; // assuming stored as JSON
      items.forEach((item) => {
        if (!ordersCount[item.id]) {
          ordersCount[item.id] = 0;
        }
        ordersCount[item.id] += item.qty || 1;
      });
    });

    // 3. هات أسماء المنتجات من items_menu
    const { data: itemsMenu } = await supabase
      .from("items_menu")
      .select("*")

    // 4. اربط IDs بالأسماء واعمل فورمات
    const formattedData = itemsMenu
      .filter((i) => ordersCount[i.id]) // اختار المنتجات اللي ليها مبيعات
      .map((i) => ({
        name: i.name,
        sales: ordersCount[i.id],
      }))
      .sort((a, b) => b.sales - a.sales); // ترتيب تنازلي

    setTopProducts(formattedData);
  };

  TopProducts();
}, []);



    return (
        <AppContext.Provider value={{windowSize , setSideBarOpen , sideBarOpen , getData,setGetData, laoding ,deleteItem , AddToCart , inCart , setInCart , topProducts}}>
            {children}
        </AppContext.Provider>
    )
}



