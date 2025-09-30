import { useEffect, useState } from "react";
import { Heder } from "../../Component/Heder/Heder";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router";
import { AppContext } from "../../Context/Context";
import { useContext } from "react";
import { supabase } from "../../../supabaseClient";
export const CartPage = () => {
  const { inCart, setInCart } = useContext(AppContext);

  const [finalItems, setFinalItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // calculate new price after discount
    const newPrice = inCart.map((item) => ({
      ...item,

      newPrice:
        item.discount > 0
          ? item.price - (item.price * item.discount) / 100
          : item.price,
    }));
    setFinalItems(newPrice);
  }, [inCart]);

  // delete order from cart
  const deleteItem = (id) => {
    const filteredItems = inCart.filter((item) => item.id !== id);
    setInCart(filteredItems);
    localStorage.setItem("cartItems", JSON.stringify(filteredItems));
  };

  // calculate total price
  const totalPrice = finalItems.reduce(
    (total, item) => total + item.newPrice * item.quantity,
    0
  );

  // الاوردرات اللي المستخدم طلبهاا
  const userPhone = localStorage.getItem("userPhone");
  useEffect(() => {
    const fetchOrders = async () => {
      const { error, data } = await supabase
        .from("orders")
        .select(
          `
          id,
          items,
          total,
          status,
          created_at,
          customers(name, phone, location)
        `
        )
        .eq("customers.phone", userPhone)
        // السطر ده علشان نرتب الاوردر حسب التاريخ
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return;
      } else {
        console.log("success");
        setOrders(data);
      }
    };
    fetchOrders();
  }, []);
  console.log(orders);

  return (
    <>
      <Heder />
      <div className="cart_page my-30 container mx-auto">
        <h1 className="text-center my-2 text-3xl md:text-4xl font-bold">
          Cart Shopping
        </h1>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="order_block my-5 p-5 border rounded-xl"
            >
              <h2 className="text-xl font-bold mb-3">
                Status Order : <span className="text-amber-500">{order.status}</span>
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                Date: {new Date(order.created_at).toLocaleString()}
              </p>

              {order.items.map((item, idx) => (
                <div key={idx} className="cart_content">
                  <div className="flex flex-col gap-3 mt-3 w-full">
                    <div className="cart_item w-full sm:w-5/6  mx-auto flex justify-between items-center py-3 rounded-xl">
                      <div className="flex gap-3">
                        <img
                          className="w-15 sm:w-20 h-auto rounded-xl"
                          src={item.image}
                          alt={item.name}
                        />
                        <div className="name_price">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                            {item.name}
                          </h3>
                          <p className="text-lg font-bold">
                            {item.price * item.quantity} $
                          </p>
                        </div>
                      </div>
                      <div className="quant_dele flex items-center gap-2">
                        <span className="px-3 py-1 rounded bg-amber-500">
                          x{item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-4/5 h-px mx-auto bg-white my-4"></div>
                </div>
              ))}

              <p className="font-bold text-right pr-5">
                Total: <span className="text-amber-500">{order.total}$</span>
              </p>
            </div>
          ))
        ) : (
          <h1 className="text-center my-5 text-lg font-semibold text-gray-600">
            No Orders Found
          </h1>
        )}

        {finalItems.length > 0
          ? finalItems.map((item, idx) => (
              <div key={idx} className="cart_content">
                <div className="flex flex-col gap-3 mt-5 w-full">
                  <div className="cart_item w-full sm:w-5/6  mx-auto flex justify-between items-center p-3 rounded-xl">
                    <div className="flex gap-3">
                      <img
                        className="w-15 sm:w-20 h-auto rounded-xl"
                        src={item.image}
                        alt={item.name}
                      />
                      <div className="name_price">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                          {item.name}
                        </h3>
                        <p className="text-lg font-bold">
                          {item.newPrice * item.quantity} $
                        </p>
                      </div>
                    </div>
                    <div className="quant_dele flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={10}
                        defaultValue={item.quantity}
                        className="w-10 text-center border rounded-lg"
                      />
                      <span>
                        <AiTwotoneDelete
                          onClick={() => deleteItem(item.id)}
                          className="text-2xl cursor-pointer hover:text-red-900"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-4/5 h-px mx-auto bg-white my-4"></div>
              </div>
            ))
          : ""}

        {finalItems.length == 0 && orders.length == 0 && (
          <h1 className="text-center my-5 text-lg font-semibold text-gray-600">
            Your Cart is empty
          </h1>
        )}

        {/* /////////////////////////// */}

        {finalItems.length > 0 ? (
          <div className="w-60 sm:w-3/7 my-10 md:2/5 mx-auto rounded-xl bg-amber-50 text-black">
            <p className="text-xl md:text-2xl font-bold m-3 pt-5 ">
              Total Price :{" "}
              <span className="text-xl text-amber-500">{totalPrice}</span>$
            </p>
            <Link to={"/userDetails"}>
              <button className="w-5/6 ml-5 md:ml-10 my-3   bg-amber-500 p-2 rounded-xl text-white font-bold hover:bg-amber-600 cursor-pointer  ">
                Order Now
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
