import React from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full bg-white"
      src={src ? src : "/images/avatar.png"}
      alt={"Avatar"}
      width={30}
      height={30}
    />
  );
};

export default Avatar;
