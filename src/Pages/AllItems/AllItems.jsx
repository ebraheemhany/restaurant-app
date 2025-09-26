import React from "react";
import { Heder } from "../../Component/Heder/Heder";
import { BigCard } from "../../Component/BigCard/BigCard";
import { AppContext } from "../../Context/Context";
import { useContext } from "react";
export const AllItems = () => {
const {getData} = useContext(AppContext)


  return (
    <>
      <Heder />
      <div className="all_items container mx-auto my-40">
        <div className="item_content">

          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-amber-500 ml-6">
              All Items
            </h1>
          </div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 ">

{
    getData.length > 0 ? (
        getData.map((item , idx) => {
            return(
                <BigCard item={item} idx={idx} />
            )
        })
    ) : <h1>No items Avalaple Yet</h1>
}

</div>


        </div>
      </div>
    </>
  );
};
