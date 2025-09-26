import React, { useState } from "react";
import { Heder } from "../../../Component/Heder/Heder";
import { supabase } from "../../../../supabaseClient";
import { Link, useNavigate } from "react-router";
import {Alert} from "../../../Component/Alert/Alert"
export const Sign = () => {
  const navigate = useNavigate()
  const [sign, setSign] = useState({
    name: "",
    email: "",
    password: "",
    reePass: "",
  });
  const [error, setError] = useState(false);

  // const handel state change
  const handelStateChange = (e) => {
    setSign({ ...sign, [e.target.name]: e.target.value });
  };

// function to handel submit
const handelSubmit = async (e) => {
  e.preventDefault();
  setError(true);

  // تحقق من البيانات قبل الإرسال
  if (!sign.name || !sign.email || !sign.password || sign.password !== sign.reePass) {
    return;
  }

  // send data to supabase
  const { data, error } = await supabase.auth.signUp({
    email: sign.email,
    password: sign.password,
    options: {
      data: {
        name: sign.name, // الاسم هيتخزن في user_metadata
      },
    },
  });

  if (error) {
    console.log(error, "error");
    return;
  }

  // نخزن فقط البيانات المهمة (بدون الباسورد)
  localStorage.setItem(
    "user_Info",
    JSON.stringify({
       id: data.user.id,
      name: sign.name,
      email: sign.email,
    })
  );

  await Alert({
    title: "Welcome, your account has been created successfully",
    ok: "OK",
    icon: "success",
    cancelValue: false,
  });

  setError(false);

  setSign({
    name: "",
    email: "",
    password: "",
    reePass: "",
  });

  navigate("/");
};


  return (
    <>
      <Heder />
      <div className="sign_in container">
        <div className="content_sign bg_greay mx-auto p-10 my-30 sm:w-5/6 md:w-4/5  lg:w-2/3 rounded-2xl">
          <form onSubmit={handelSubmit} className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              className="sign_input"
              type="text"
              placeholder="Your Name.."
              id="name"
              value={sign.name}
              onChange={handelStateChange}
            />
            {sign.name.length == 0 && error && (
              <p className="text-sm text-red-900">Name is requerd</p>
            )}

            <label htmlFor="email">Email</label>
            <input
              name="email"
              className="sign_input"
              type="email"
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
            {sign.password.length <= 7 && error && (
              <p className="text-sm text-red-900">
                Password must be greter than 7 char
              </p>
            )}
            <label htmlFor="Reepass">Repeet password</label>
            <input
              name="reePass"
              className="sign_input"
              type="password"
              placeholder="Repeet password"
              id="Reepass"
              value={sign.reePass}
              onChange={handelStateChange}
            />
            {error && sign.reePass !== sign.password && (
              <p className="text-sm text-red-900">
                Repeat password must match password
              </p>
            )}
            <button
              className="w-full bg-amber-500 py-2.5 rounded-2xl cursor-pointer mt-3"
              type="submit"
            >
              Sign In
            </button>
            <p className="text-lg text-white mt-2">
              Are you have an account ?{" "}
              <Link to={"/login"}>
                <span className="text-xl text-black cursor-pointer">Login</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
