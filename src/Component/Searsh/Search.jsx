import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../Context/Context";
export const Search = ({ searsh, setSearsh, setFilteredItem }) => {
  const { getData } = useContext(AppContext);
  useEffect(() => {
    const filteredItem = getData.filter(
      (item) =>
        (item?.name || "")
          .trim()
          .toLowerCase()
          .includes(searsh.trim().toLowerCase()) ||
        (item?.price !== undefined && item?.price !== null
          ? item.price.toString().trim()
          : ""
        ).includes(searsh.trim())
    );
    setFilteredItem(filteredItem);
  }, [searsh, getData]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search Item..."
        className="bg-black p-2 rounded-lg outline-none"
        value={searsh}
        onChange={(e) => setSearsh(e.target.value)}
      />
    </div>
  );
};
