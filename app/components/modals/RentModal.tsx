"use client";

import useRentModal from "@/app/hooks/useRentModal";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Map from "../Map";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum Steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [steps, setsteps] = useState(Steps.CATEGORY);
  const [isLoading, setisLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      price: 1,
      imageSrc: "",
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathRoomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setsteps((value) => value - 1);
  };

  const onNext = () => {
    setsteps((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (steps !== Steps.PRICE) {
      return onNext();
    }

    setisLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setsteps(Steps.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (steps == Steps.PRICE) {
      return "Create";
    }

    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps == Steps.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [steps]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={"Which of this best describes your place"}
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div className="col-span-1" key={item.label}>
            <CategoryInput
              onClick={(category) => {
                setCustomValue("category", category);
              }}
              selected={category == item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const Map = useMemo(
    function () {
      return dynamic(() => import("../Map"), { ssr: false });
    },
    [location]
  );

  if (steps == Steps.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"Where is your place located ?"}
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => {
            setCustomValue("location", value);
          }}
        />
        <Map center={location?.latlang} />
      </div>
    );
  }

  if (steps == Steps.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"Show some basic about your place"}
          subtitle="What amenities do you have ?"
        />
        <Counter
          title={"Guests"}
          subtitile={"How many guests ?"}
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title={"Rooms"}
          subtitile={"How many rooms do you have ?"}
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title={"Bathrooms"}
          subtitile={"How many bathrooms do you have ?"}
          value={bathRoomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (steps == Steps.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"Add photo of your places"}
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => {
            setCustomValue("imageSrc", value);
          }}
          value={imageSrc}
        />
      </div>
    );
  }

  if (steps == Steps.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet describe your place!"
        />
        <Input
          id={"title"}
          label={"Title"}
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id={"description"}
          label={"Description"}
          register={register}
          disabled={isLoading}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (steps == Steps.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much charge per night ?"
        />
        <Input
          id={"price"}
          label={"Price"}
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          formatPrice
          required
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryAction={steps == Steps.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Airbnb your home!"
      body={bodyContent}
    />
  );
};

export default RentModal;
