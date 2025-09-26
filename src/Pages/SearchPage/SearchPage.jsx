import React, { useEffect, useState } from "react";
import { Heder } from "../../Component/Heder/Heder";
import { useSearchParams } from "react-router";
import { AppContext } from "../../Context/Context";
import { useContext } from "react";
import { BigCard } from "../../Component/BigCard/BigCard";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { getData } = useContext(AppContext);

  const [resultes, setResultes] = useState([]);

  useEffect(() => {
    if (query) {
      const filtred = getData.filter(
        (ele) =>
          ele.name.toLowerCase().includes(query.toLowerCase()) ||
          ele.category.toLowerCase().includes(query.toLowerCase())
      );
      setResultes(filtred);
    }
  }, [query]);

  console.log(resultes);

  return (
    <>
      <Heder />
      <div className="my-40 container mx-auto h-[100vh]]">
        <div className="content">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-amber-500 ml-6 text-center">
              Search Resultes For :{""}
              <span className="text-xl text-white font-bold  md:text-2xl">
                {query}
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 h-full ">
            {resultes.length > 0
              ? resultes.map((item, idx) => {
                  return <BigCard item={item} idx={idx} />;
                })
              : ""}
          </div>
          {resultes.length == 0 && (
            <p className="text-center">No Resultes for your Search </p>
          )}
        </div>
      </div>
    </>
  );
};
