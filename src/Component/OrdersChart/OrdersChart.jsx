import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "../../../supabaseClient";


export const OrdersChart = () => {
const [cartData , setCartData] = useState([])

useEffect(() => {
const fetchData = async () => {
const {data , error} = await supabase
.from("orders")
.select("id, created_at");

if(error) {
    console.log("error:" , error)
    return;
}

      //object يحتوي علي ايام الاسبوع بقيمة فاضيه
      const daysMap = {
        Mon: 0,
        Tue: 0,
        Wed: 0,
        Thu: 0,
        Fri: 0,
        Sat: 0,
        Sun: 0,
      };
   // هنعمل loop علي الايام وهنضيف فيها عدد ال orders
      data.forEach((order) => {
        // هنا هنحول التاريخ الي ايام 
        const day = new Date(order.created_at).toLocaleDateString("en-US", {
          weekday: "short",
        });
        if (daysMap[day] !== undefined) {
          daysMap[day] += 1;
        }
      });

      // حوّل الـ object لمصفوفة عشان recharts
      const formattedData = Object.keys(daysMap).map((day) => ({
        name: day,
        Order: daysMap[day],
      }));

      setCartData(formattedData);



}
fetchData()
}, [])

   return (
    <div className="bg-white/10 rounded-2xl p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-white">Orders</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={cartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Order"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
