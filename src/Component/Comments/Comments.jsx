import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import { useNavigate} from "react-router";
import { Alert } from "../Alert/Alert";
import { supabase } from "../../../supabaseClient";
export const Comments = ({ID}) => {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [userComment , setUserComment] = useState([])
  
  const navigate = useNavigate();

  // check if user signUp
    const user = JSON.parse(localStorage.getItem("user_Info"));
  const checkSignUp = async () => {

  if (!user) {
      const AlertMassage = await Alert({
        title: "Please Sign in Befor Write Your Comment ?",
        ok: "OK",
        cancel: "Cancel",
        icon: "error",
        cancelValue: true,
      });
      if (AlertMassage) {
        navigate("/sign");
      }
    } else {
      setShowComment(true);
    }
    
  };

//handelSubmite
const sendComment = async () => {
  if (comment.trim() === "") return;

  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        text: comment,
        customer_id: user.id,
        item_id: ID,
      },
    ])
    .select("*"); // عشان يرجع التعليق المضاف

  if (error) {
    console.log(error);
    return;
  }

  // تحديث الحالة مباشرة بالتعليق الجديد
  setUserComment((prev) => [data[0], ...prev]);

  setComment("");

};

// get all comments from supabase
useEffect(() => {
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments_with_users")
      .select("*")
      .eq("item_id", ID)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setUserComment(data || []);
    }
  };

  fetchComments();
}, [ID]);


  return (
    <div className="comments container mx-auto my-20 ">
      <div className={`comment_content bg-white/10 h-60 w-full rounded-2xl overflow-auto ${userComment.length == 0 ? "hidden" : ""}`} >


{userComment.map((c) => (
  <div key={c.id} className="comment_user flex justify-between p-4 ">
    <div className="flex items-center gap-3">
      <span className="w-10 h-10 bg-black flex items-center justify-center rounded-full">
        <FaUserTie />
      </span>
      <div>
        <h4 className="text-2xl font-bold text-amber-500 mb-3">
         {c.name || c.email || "Unknown User"}

        </h4>
        <p>{c.text}</p>
      </div>
    </div>
    <p className="text-white/30">
      {new Date(c.created_at).toLocaleDateString()}
    </p>
  </div>
))}


 

 
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="your Comment..."
          className={` w-full bg-white/10 mt-5  p-3 rounded-2xl outline-none ${
            showComment ? "" : "opacity-0"
          } duration-400`}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {showComment ? (
          <button
            type="submit"
            className="bg-amber-500 p-3 rounded-2xl cursor-pointer mt-3  "
            onClick={sendComment}
          >
            Send
          </button>
        ) : (
          <button
            type="submit"
            className="bg-amber-500 p-3 rounded-2xl cursor-pointer mt-3  "
            onClick={checkSignUp}
          >
            Add Comment +
          </button>
        )}
      </div>
    </div>
  );
};
