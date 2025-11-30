import React, { useState } from "react";
import { Heder } from "../../Component/Heder/Heder";
import { supabase } from "../../../supabaseClient";
import { Alert } from "../../Component/Alert/Alert";
import {Loading} from "../../Component/Laoding/Laoding"
import { AppContext } from "../../Context/Context";
import { useContext } from "react";
import { useNavigate } from "react-router";

export const UserDetails = () => {
  const {inCart , setInCart} = useContext(AppContext)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    phone: "",
    location: "",
  });
  const [laoding, setLaoding] = useState(false);
  const [massage, setMassage] = useState(false);

  // handel state change
  const HandelStateChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  //handelSubmit
const handelSubmit = async (e) => {
  e.preventDefault();
  setMassage(true);

  // validation
  if (!user.name || !user.phone || !user.location) {
    return;
  }

  setLaoding(true);

  try {
    // 1. إضافة العميل
    const { data: customerData, error: error1 } = await supabase
      .from("customers")
      .insert([user])
      .select("id") // نجيب الـ id بتاع العميل الجديد
      .single();

    if (error1) {
      console.log(error1);
      setLaoding(false);
      return;
    }
    //  علشان نحفظ رقم العميل في local stroge
window.localStorage.setItem("userDetails", JSON.stringify(user));

    // 2. إضافة الأوردر
    const { error: error2 } = await supabase.from("orders").insert([
      {
        customer_id: customerData.id, // ربط العميل بالأوردر
        items: inCart, // نخزن السلة كـ JSON
        total: inCart.reduce(
          (sum, item) =>
            sum +
            (item.discount > 0
              ? item.price - (item.price * item.discount) / 100
              : item.price) * item.quantity,
          0
        ),
      },
    ]);

    if (error2) {
      console.log(error2);
      setLaoding(false);
      return;
    }

    // ✅ نجاح
    setLaoding(false);
    await Alert({
      title: "Thank You , Your information has been set successfully",
      ok: "OK",
      icon: "success",
      cancelValue: false,
    });

    // remove items from localStroge and setInCart
    window.localStorage.removeItem("cartItems");
    setInCart([])
    navigate("/cartPage")
    // هنخزن رقم الموبيل في local stroge علشان نجيب بيه البيانات بعدين
    window.localStorage.setItem("userPhone", user.phone)

    setMassage(false);
    setUser({ name: "", phone: "", location: "" });

  } catch (error) {
    console.log(error);
    setLaoding(false);
  }
};


  return (
    <>
      <Heder />
      <div className="user_details">
        <div className="user_Content bg_greay mx-auto p-10 my-30 sm:w-5/6 md:w-4/5  lg:w-2/3 rounded-2xl">
        {
          laoding ? <Loading /> : null
        }
          <form className="flex flex-col" onSubmit={handelSubmit}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              className="sign_input"
              type="text"
              placeholder="Your Name.."
              id="name"
              value={user.name}
              onChange={HandelStateChange}
            />
            {massage && user.name.length == 0 && (
              <p className="text-sm text-red-900 ml-2">Name is Requerd</p>
            )}
            <label htmlFor="phone">Number Phone</label>
            <input
              name="phone"
              className="sign_input"
              type="text"
              placeholder="Your Number Phone .."
              id="phone"
              value={user.phone}
              onChange={HandelStateChange}
            />
            {massage && user.phone.length == 0 && (
              <p className="text-sm text-red-900 ml-2">
                {" "}
                Your Number is Requerd
              </p>
            )}
            <label htmlFor="location">Location</label>
            <input
              name="location"
              className="sign_input"
              type="text"
              placeholder="Your Location .. "
              id="location"
              value={user.location}
              onChange={HandelStateChange}
            />
            {massage && user.location.length == 0 && (
              <p className="text-sm text-red-900 ml-2">
                Your Location is Requerd
              </p>
            )}
            <button
              className="w-full bg-amber-500 py-2.5 rounded-2xl cursor-pointer mt-3"
              type="submit"
            >
              Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
