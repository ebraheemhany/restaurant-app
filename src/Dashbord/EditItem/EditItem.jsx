import { useEffect, useRef, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useNavigate, useParams } from "react-router";
import { useContext } from "react";
import { AppContext } from "../../Context/Context";

export const EditItem = () => {
const {setGetData} = useContext(AppContext)

  const id = useParams().id ;
const navigate = useNavigate();
  const [item, setItem] = useState({
    name: "",
    discription: "",
    category: "",
    image: "",
    price: 0,
    discount:0,
    avalaple: false,
  });
  const [error, setError] = useState(false);


/////////
 // علشان نتحكم في input file
  const fileInputRef = useRef(null);

// get the old data from supabase to update
useEffect(() => {
const fetchData = async () => {
const {data , error} = await supabase
.from("items_menu")
.select("*")
.eq("id" , id)
.single();
if(error) {
  console.error("error" , error)
}else {
  setItem(data)
}

}
fetchData()
}, [id])

 // دالة رفع الصورة
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    const { data, error } = await supabase.storage
      .from("restaurant-images") // name of the bucket on supabase
      .upload(`items/${Date.now()}_${file.name}`, file);

    if (error) {
      console.log("Upload error:", error.message);
    } else {
      // نجيب رابط الصورة بعد الرفع
      const { data: urlData } = supabase.storage
        .from("restaurant-images") // name of the bucket on supabase
        .getPublicUrl(data.path);

      setItem({ ...item, image: urlData.publicUrl });
    }
  };
/////////
 // handel state value change
  const handelStateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItem({ ...item, [name]: type === "checkbox" ? checked : value });
  };

// handel submite
 const handelSubmit = async (e) => {
    e.preventDefault();
    setError(true);

    // check if all filed are filled
    if (
      item.name.length == 0 ||
      item.discription.length == 0 ||
      item.category.length == 0 ||
      item.image.length == 0 ||
      item.price <= 0
    ) {
      return; // stop the function to send data to subpase
    }

    // update data and send to supabase
    const { data, error } = await supabase
    .from("items_menu")
    .update(item)
    .eq("id" , id)
    .select();
    setError(false);
    if (error) {
      console.log(error, "error");
    } else {
     // ✅ تحديث getData من الـ Context
      setGetData((prev) =>
        prev.map((ele) => (ele.id === Number(id) ? data[0] : ele))
      );

      console.log(data, "data");
      
      setItem({
        name: "",
        discription: "",
        category: "",
        image: "",
        price: 0,
        discount:0,
        avalaple: false,
      });
      
      // navigate("/dashbord/menu")
    }
  };


  return (
 <div className=" w-full ">
      <div className=" item_menu w-5xl mx-auto xl:w-4xl lg:w-2xl md:w-xl sm:w-lg  flex flex-col gap-4">
        <h1 className="text-3xl font-bold ml-10">Update</h1>

        <form
          onSubmit={handelSubmit}
          className="item_info flex flex-col gap-2 p-10 sm:p-5"
        >
          <label htmlFor="name">Name </label>
          <input
            type="text"
            placeholder="Item Name"
            id="name"
            name="name"
            value={item.name}
            onChange={handelStateChange}
            className="bg_greay p-2 rounded-xl outline-none focus: border-b-yellow-900"
          />
          {item.name.length == 0 && error == true && (
            <span className="text-red-500 text-sm">Name is Requerd</span>
          )}
          <label htmlFor="discription">Discription </label>
          <input
            type="text"
            placeholder="Item Discription"
            id="discription"
            name="discription"
            value={item.discription}
            onChange={handelStateChange}
            className="bg_greay p-2 rounded-xl outline-none focus: border-b-yellow-900"
          />
          {item.discription.length == 0 && error == true && (
            <span className="text-red-500 text-sm">discription is Requerd</span>
          )}
          <label htmlFor="category">Category </label>
          <input
            type="text"
            placeholder="Item Category"
            id="category"
            name="category"
            value={item.category}
            onChange={handelStateChange}
            className="bg_greay p-2 rounded-xl outline-none focus: border-b-yellow-900"
          />
          {item.category.length == 0 && error == true && (
            <span className="text-red-500 text-sm">Category is Requerd</span>
          )}

           {/* ///////////////////////////////// */}

         <label>Image </label>
          {/* أيقونة upload */}
          <div
            className=" cursor-pointer p-3 rounded-xl"
            onClick={() => fileInputRef.current.click()}
          >
            <img className="w-60 h-auto rounded-2xl" src="https://www.pngfind.com/pngs/m/66-661092_png-file-upload-image-icon-png-transparent-png.png" alt="upload img" />
            <span className="text-sm mt-3">
              {item.image ? "Image Uploaded ✅" : "Click to Upload Image"}
            </span>
          </div>
          {/* input مخفي */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {item.image.length === 0 && error && (
            <span className="text-red-500 text-sm">Image is Required</span>
          )}


          {/* ///////////////////////////////// */}
          <label htmlFor="price">Price </label>
          <input
            type="number"
            placeholder="Item Price"
            id="price"
            name="price"
            value={item.price}
            onChange={handelStateChange}
            className="bg_greay p-2 rounded-xl outline-none focus: border-b-yellow-900"
          />
          {item.price <= 0 && error == true && (
            <span className="text-red-500 text-sm">item price is Requerd</span>
          )}

          <label htmlFor="discount">Discount </label>
          <input
            type="number"
            placeholder="Item Price"
            id="discount"
            name="discount"
            value={item.discount}
            onChange={handelStateChange}
            className="bg_greay p-2 rounded-xl outline-none focus: border-b-yellow-900"
          />
      





          <div className="my-4">
            <label htmlFor="avalable">Avalable</label>
            <input
              type="checkbox"
              id="avalable"
              name="avalaple"
              checked={item.avalaple}
              onChange={handelStateChange}
              className="form-checkbox h-5 w-5 text-emerald-600 ml-4"
            />
          </div>

          <button
            type="submit"
            className="bg-amber-500 py-3 mt-5 rounded-xl cursor-pointer text-3xl md:text-xl"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  )
}
