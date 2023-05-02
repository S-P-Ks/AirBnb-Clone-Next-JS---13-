"use client";

import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70px] flex flex-col justify-center items-center">
      <PuffLoader size={100} color="red" />
    </div>
  );
};

export default Loader;
