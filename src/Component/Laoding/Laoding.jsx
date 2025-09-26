import React from 'react'
import { CircleLoader } from "react-spinners";

export const Loading = () => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className=" laoding_bg">
      <CircleLoader
        color="#8B4513"   // بني غامق عشان يناسب مطعم
        loading={true}    // لازم تكون boolean
        cssOverride={override}
        size={120}        // حجم اللودر
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
