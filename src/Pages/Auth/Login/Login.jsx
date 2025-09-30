import React, { useState } from 'react'
import { Heder } from '../../../Component/Heder/Heder'
import { supabase } from '../../../../supabaseClient';
import { Link, useNavigate } from 'react-router';
import { Alert } from '../../../Component/Alert/Alert';


export const Login = () => {
  const [sign, setSign] = useState({
    
    email: "",
    password: "",
  
  });
  const [error, setError] = useState(false);
const navegate = useNavigate()
  // const handel state change
  const handelStateChange = (e) => {
    setSign({ ...sign, [e.target.name]: e.target.value });
  };

  // function to handel submit
  const handelSubmit = async (e) => {
    e.preventDefault();
    setError(true);

    // تحقق من البيانات قبل الإرسال
    if (!sign.email || !sign.password ) {
      return;
    }
    // send data to subbase
    const { data, error } = await supabase.auth.signInWithPassword({
  email: sign.email,
  password: sign.password,
});;

    if (error) {
      console.log(error, "error");
      return;
    }
         const AlertMassage = await Alert ({
         title:"Welcome back, you have logged in successfully",
         ok:"OK",
         icon:"success",
         cancelValue:false
    
         })
   window.localStorage.setItem("user_Info" , JSON.stringify(data))      
    setError(false);
    setSign({
      name: "",
      email: "",
      password: "",
      reePass: "",
    });
    navegate("/")
  }

  return (
 <>
      <Heder />
      <div className="sign_in container">
        <div className="content_sign bg_greay mx-auto p-10 my-30 sm:w-5/6 md:w-4/5  lg:w-2/3 rounded-2xl">
          <form onSubmit={handelSubmit} className="flex flex-col">
      

            <label htmlFor="email">Email</label>
            <input
              name="email"
              className="sign_input"
              type="text"
              placeholder="Your email.."
              id="email"
              value={sign.email}
              onChange={handelStateChange}
            />
            {sign.email.length == 0 && error && (
              <p className="text-sm text-red-900">Email is requerd</p>
            )}
            <label htmlFor="pass">password</label>
            <input
              name="password"
              className="sign_input"
              type="password"
              placeholder="Password"
              id="pass"
              value={sign.password}
              onChange={handelStateChange}
            />
            {sign.password.length <= 6 && error && (
              <p className="text-sm text-red-900">
                Password must be greter than 5 char
              </p>
            )}
          
            <button
              className="w-full bg-amber-500 py-2.5 rounded-2xl cursor-pointer mt-3"
              type="submit"
            >
              Login
            </button>
            <p className="text-lg text-white mt-2">
              Create a new Account ?{" "}
              <Link to={"/sign"}>
                <span className="text-xl text-black cursor-pointer">Create</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
