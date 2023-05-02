"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range, RangeKeyDict } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";

enum Steps {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setlocation] = useState<CountrySelectValue>();
  const [step, setstep] = useState(Steps.LOCATION);
  const [guestCount, setguestCount] = useState(1);
  const [roomCount, setroomCount] = useState(1);
  const [bathroomCount, setbathroomCount] = useState(1);
  const [dateRange, setdateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setstep((val) => val - 1);
  }, []);

  const onNext = useCallback(() => {
    setstep((val) => val + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step != Steps.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setstep(Steps.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    searchModal,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step == Steps.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step == Steps.LOCATION) {
      return undefined;
    }

    return "Back";
  }, []);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where dou u wanna go ?"
        subtitle="Find the perfect location"
      />
      <CountrySelect onChange={(val) => setlocation(val)} value={location} />
      <hr />
      <Map center={location?.latlang} />
    </div>
  );

  if (step == Steps.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go ?"
          subtitle="Make sure everyone is free!"
        />
        <Calender
          value={dateRange}
          onChange={(val) => setdateRange(val.selection)}
        />
      </div>
    );
  }

  if (step == Steps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          title={"Guests"}
          subtitile={"How many guests are coming ?"}
          value={guestCount}
          onChange={(val) => setguestCount(val)}
        />
        <Counter
          title={"Rooms"}
          subtitile={"How many rooms are there ?"}
          value={roomCount}
          onChange={(val) => setroomCount(val)}
        />
        <Counter
          title={"BathRooms"}
          subtitile={"How many bathrooms are there ?"}
          value={bathroomCount}
          onChange={(val) => setbathroomCount(val)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == Steps.LOCATION ? undefined : onBack}
      title="Filters"
      body={bodyContent}
    />
  );
};

export default SearchModal;
