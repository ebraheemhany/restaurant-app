import React, { useState } from "react";
import { Heder } from "../../Component/Heder/Heder";
import contactImg from "../../img/contact.jpg";
import { PiMapTrifoldLight } from "react-icons/pi";
import { PiPhoneThin } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { GoStopwatch } from "react-icons/go";
import emailjs from "emailjs-com";
import { Alert } from "../../Component/Alert/Alert";
export const ContactUs = () => {
  const [massege, setMassege] = useState({
    name: "",
    email: "",
    subject: "",
    qusetion: "",
  });
  // handel State Change
  const handelState = (e) => {
    setMassege({ ...massege, [e.target.name]: e.target.value });
  };
  // handel Submite
  const handelSubmit = async (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_0hphqvn", // هتاخده من EmailJS
        "template_8j1f48p", // هتاخده من EmailJS
        e.target,
        "u-JMe5Ds6I_OVZ_hy" // هتاخده من EmailJS
      )
     
  const Alert_massege = await Alert({
    title:"Your Comment has been sended",
    ok:"Ok",
    cancel:"Cancel",
    icon:"info"
    
      })
 

setMassege({
      name: "",
    email: "",
    subject: "",
    qusetion: "",
})

  };

  return (
    <>
      <Heder />
      <div
        className="contact_us w-full h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${contactImg})` }}
      >
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-[70vh] bg-black/70" />
        <div className="relative flex  items-center justify-center z-10 h-full">
          <h1 className="text-2xl md:text-4xl font-bold">Contact US ..</h1>
        </div>

        <div className="mx-5 z-10 lg:flex gap-3 md:gap-6 mt-20 mb-30    ">
          <div className="discrption w-[98%] lg:w-1/2 mx-auto  mb-10 ">
            <h2 className="text-2xl md:text-4xl text-amber-500 font-bold my-2 ml-2">
              Get In Touch
            </h2>
            <p className="text-sm md:text-lg text-white/30">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              que commodo ligula eget dolor. Aenean massa. Cum sociis nec
              natoquers penatibus et magnis dis parturient montes, nascetur
              ridiculusser mus. Donec quam felis, ultricies nec, pellentesque
              eu, pretiumqu quis, sem. Nulla consequat massa quis enim.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-5/6 mx-auto mt-6  ">
              <div className="flex items-center gap-3">
                <PiMapTrifoldLight className="text-4xl text-amber-500" />
                <div>
                  <p className="text-white/50 text-sm md:text-lg">Location</p>
                  <p className="text-white/50 text-sm md:text-lg">
                    Giza, Alharem
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PiPhoneThin className="text-4xl text-amber-500" />
                <div>
                  <p className="text-white/50 text-sm md:text-lg">
                    (+62) 81 224 557 900
                  </p>
                  <p className="text-white/50 text-sm md:text-lg">
                    (+62) 82 222 577 912
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TfiEmail className="text-4xl text-amber-500" />
                <div>
                  <p className="text-white/50 text-sm md:text-lg">
                    Reservation@sovy.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <GoStopwatch className="text-4xl text-amber-500" />
                <div>
                  <p className="text-white/50 text-sm md:text-lg">
                    Open 04:00 pm WITA
                  </p>
                  <p className="text-white/50 text-sm md:text-lg">
                    Closed 01:00 am WITA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="massge w-[98%] lg:w-1/2 mx-auto md:mt-10 ">
            <form onSubmit={handelSubmit} className="flex flex-col">
              <div className=" block md:flex items-center gap-6 w-full">
                <input
                  type="text"
                  placeholder="Enter Your name"
                  name="name"
                  value={massege.name}
                  onChange={handelState}
                />
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                  value={massege.email}
                  onChange={handelState}
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                value={massege.subject}
                onChange={handelState}
              />
              <textarea
                type="text"
                placeholder="Your Qusetion"
                name="qusetion"
                value={massege.qusetion}
                onChange={handelState}
              />
              <button
                className="bg-amber-500 p-2 rounded-2xl my-5 w-30 cursor-pointer "
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
