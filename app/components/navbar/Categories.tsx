"use clients";

import React from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { FaSkiing } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property is close to Windmill",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This is a modern property",
  },
  {
    label: "CountrySide",
    icon: TbMountain,
    description: "This property is close to mountains",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property is close to pools",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is in the Island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to Lakes",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property is a castle",
  },
  {
    label: "Campking",
    icon: GiForestCamp,
    description: "This property has campking activitites",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "This property is close to artic region",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property has caves",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in Desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in Barn",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is close to mountains",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();

  if (pathName !== "/") {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            description={item.description}
            selected={category == item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
