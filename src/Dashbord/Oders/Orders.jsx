import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { Loading } from "../../Component/Laoding/Laoding";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("orders").select(`
          id,
          items,
          total,
          status,
          created_at,
          customers (
            name,
            phone,
            location
          )
        `);

      if (error) {
        console.log("Error =>", error);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // update status
  const UpadateStatus = async (orderID, order_status) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: order_status })
      .eq("id", orderID);

    if (error) {
      console.log(error);
    } else {
      setOrders((prevOrder) =>
        prevOrder.map((order) =>
          order.id === orderID ? { ...order, status: order_status } : order
        )
      );
    }
  };

  return (
    <div className="orders container mx-auto p-4">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-amber-500 ml-6">
          Orders
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {loading ? (
          <Loading />
        ) : orders.length > 0 ? (
          orders.map((order, idx) => (
            <div
              key={order.id}
              className="order bg-amber-500 text-black rounded-2xl shadow-md hover:shadow-lg duration-300 p-4"
            >
              <p className="text-center font-semibold mb-2">#{idx + 1}</p>

              <p className="text-xl font-bold ml-1">{order.customers?.name}</p>
              <p className="my-2 ml-1">{order.customers?.phone}</p>
              <p className="my-2 ml-1">{order.customers?.location}</p>

              {/* عرض المنتجات */}
              <div className="my-2 ml-1">
                Orders :
                <ul className=" list-inside list-decimal">
                  {order.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.name} × {item.qty} ({item.price} جنيه)
                    </li>
                  ))}
                </ul>
              </div>

              {/* السعر والحالة */}
              <div className="flex items-center justify-between mt-2">
                <p className="ml-1 font-semibold">💰 {order.total} جنيه</p>
                <span
                  className={`mr-1 px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : order.status === "Processing"
                      ? "bg-blue-200 text-blue-800"
                      : order.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* change order status */}
              <select
                value={order.status}
                onChange={(e) => UpadateStatus(order.id, e.target.value)}
                className="w-full bg-amber-600 mt-3  rounded-xl py-2 px-3 text-black cursor-pointer focus:outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))
        ) : (
          <div>No Orders Found</div>
        )}
      </div>
    </div>
  );
};
