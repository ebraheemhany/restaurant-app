import React, { useEffect, useState } from 'react'
import {Heder} from  "../../Component/Heder/Heder"
import { useParams } from 'react-router'
import { Banner } from '../../Component/Banner/Banner';
import { Cards } from '../../Component/Cards/Cards';
import { useContext } from 'react';
import { AppContext } from '../../Context/Context';
import { supabase } from '../../../supabaseClient';
import { Loading } from '../../Component/Laoding/Laoding';
import { Comments } from '../../Component/Comments/Comments';
export const ItemDetails = () => {
    const {getData , AddToCart} = useContext(AppContext)
    const id = useParams().id;
    const [itemInfo , setItemInfo] = useState()
    const [loading , setLoading] = useState(false)

 useEffect(() => {
const fetchItem = async () => {
    
   const {data , error} = await supabase 
   .from("items_menu")
   .select("*")
  .eq("id", id) // هات المنتج اللي الـ id بتاعه بيساوي الـ param
  .single();
  setLoading(true)
 if(error) {
    console.error(error)
 }
 else {
    setItemInfo(data)
    setLoading(false)
 }
}
fetchItem();

 }, [id])

// calculate new price
const newPrice =
  itemInfo && itemInfo.price && itemInfo.discount
    ? itemInfo.price - (itemInfo.price * itemInfo.discount) / 100
    : 0;

  return (
   <>
   <Heder />
   <div className='item_details container mx-auto my-30'>
    <h1 className='text-center text-4xl font-bold mb-20 text-amber-500'>Item Detals</h1>

 {
  loading ? <Loading /> : itemInfo && (
  
         <div className='item_content block md:flex  gap-2'>

      <div className='item_iamge w-full '>
        <img className="rounded-2xl w-100 mx-auto sm:w-4/5   md:w-5/6 object-cover max-h-120 " src={itemInfo.image} alt='itemimg' />
      </div>
  <div className='item_info mt-5 sm:mt-6 w-full'>
    <h2 className='text-3xl font-bold mb-2'>{itemInfo.name}</h2>
     <p className='mb-2 text-xl'>{itemInfo.category}</p>
    <p className='mb-2 text-sm md:textlg md:max-w-4/5 md:leading-10'> {itemInfo.discription}</p>
     <div className='price mb-2'>
        <div className='flex items-center gap-5' >
            <span className='line-through'>Old Price : {itemInfo.price}$</span>
            <span className='ml-5 text-amber-500'>Discount : {itemInfo.discount}%</span>
        </div>
       <p className='newPrice font-bold mt-4'> New Price : <span className='text-xl text-amber-500'>{newPrice}$</span></p>

     </div>

     <button onClick={() => AddToCart(itemInfo)} className='w-full md:w-1/3 bg-amber-500 py-2.5 rounded-2xl cursor-pointer mt-3' >Add To Cart</button>


  </div>


    </div>
    )

 }


   </div>

   <Comments ID={id} />

  <Banner />

  <Cards title={"Offers"} data={getData} more={"/offerItems"} />

   </>
  )  
}
