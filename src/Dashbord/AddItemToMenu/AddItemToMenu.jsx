// import {  useRef, useState } from "react";
// import { supabase } from "../../../supabaseClient";
// import { useNavigate } from "react-router";
// import { useContext } from "react";
// import { AppContext } from "../../Context/Context";
// import { Alert } from "../../Component/Alert/Alert";

import { AddItemComponent } from "../../Component/AddItemComponent/AddItemComponent";


export const AddItemToMenu = () => {


  return (
   <>
   <AddItemComponent titlePage={"Add Item"} tabelName={"items_menu"}  to={"/dashbord/menu"}/>
   </>
  );
};
