"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter();
  return (
    <div>
      <Image
        onClick={() => router.push("/")}
        alt="Logo"
        src={"/images/logo.jpg"}
        className="hidden md:block cursor-pointer"
        height={100}
        width={100}
      />
    </div>
  );
}

export default Logo;
