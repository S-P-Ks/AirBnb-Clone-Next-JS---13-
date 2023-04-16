import React from "react";
import Image from "next/image";

function Avatar() {
  return (
    <Image
      className="rounded-full bg-white"
      src={"/images/avatar.png"}
      alt={"Avatar"}
      width={30}
      height={30}
    />
  );
}

export default Avatar;
