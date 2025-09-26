import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import CountUp from 'react-countup';
import {supabase} from "../../../supabaseClient"
import { OrdersChart } from "../../Component/OrdersChart/OrdersChart";
import { TopProductsPie } from "../../Component/TopProductsPie/TopProductsPie";


export const DasgbordPage = () => {
 const [stats, setStats] = useState({
    visitors: 0,
    signups: 0,
   
  });
const [orders , setOrders] = useState([])


  useEffect(() => {
    const fetchStats = async () => {
      try {
        // ✅ جلب عدد الزوار
        const { count: visitors } = await supabase
          .from("visitors")
          .select("*", { count: "exact", head: true });

        // ✅ جلب عدد المستخدمين
        const { count: signups } = await supabase
          .from("customers")
          .select("*", { count: "exact", head: true });

        // ✅ جلب عدد الطلبات
        const { data } = await supabase
          .from("orders")
          .select("*");

         setOrders(data)

        setStats({
          visitors: visitors || 0,
          signups: signups || 0,
      
        });
      } catch (error) {
        console.error("Error fetching stats:", error.message);
      }
    };

    fetchStats();
  }, []);

// calculate total price
const totalPrice = orders.reduce((sum , order) => sum + (order.total || 0) , 0)


  return (
    <div className="container mx-auto my-15 ">
      <div className="dash_content w-full mx-auto">


        <div className="small_cart grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3  w-full mx-auto">
          <div className="vist bg-white/10 text-white rounded-2xl p-4 flex items-center gap-4 max-w-70">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <CiUser className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold"><CountUp start={0} end={stats.visitors} duration={5} separator="," delay={1} /></h3>
              <p className="text-xl font-bold mt-1">Visitors</p>
            </div>
          </div>

          <div className="vist bg-white/10 text-white rounded-2xl p-4 flex items-center gap-4 max-w-70">
            <div  className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <CiUser className="text-2xl text-white"/>
            </div>
            <div>
              
              <h3 className="text-3xl font-extrabold"><CountUp start={0} end={stats.signups} duration={5} separator="," delay={1} /></h3>
              <p className="text-xl font-bold mt-1">SignUps</p>
            </div>
          </div>
          <div className="vist bg-white/10 text-white rounded-2xl p-4 flex items-center gap-4 max-w-70 ">
            <div  className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <CiShoppingCart className="text-2xl text-white"/>
            </div>
            <div>
              
              <h3 className="text-3xl font-extrabold"><CountUp start={0} end={orders.length} duration={5} separator="," delay={1} /></h3>
              <p className="text-xl font-bold mt-1">Orders</p>
            </div>
          </div>
          <div className="vist bg-white/10 text-white rounded-2xl p-4 flex items-center gap-4 max-w-70">
            <div  className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <BsCurrencyDollar className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold"><CountUp start={0} end={totalPrice} duration={5} separator="," delay={1} /></h3>
              <p className="text-xl font-bold mt-1">Revenue</p>
            </div>
          </div>
        </div>


<div className="mt-10 grid grid-cols-1  md:grid-cols-[2fr_1fr] gap-5">
<div className="">
  <OrdersChart />
</div>

<div className="">
<TopProductsPie />
</div>

</div>



        
      </div>
    </div>
  );
};
