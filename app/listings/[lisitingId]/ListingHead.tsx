"use client";

import Heading from "@/app/components/Heading";
import useCountries from "@/app/hooks/useCountriesHook";
import { SafeUser } from "@/app/types";
import { subtle } from "crypto";
import React from "react";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  currentUser,
  id,
  imageSrc,
  locationValue,
  title,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt={"Image"}
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
