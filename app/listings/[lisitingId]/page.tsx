import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  lisitingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const lisiting = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!lisiting) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  console.log(lisiting);

  return (
    <div>
      <ListingClient
        listing={lisiting}
        currentUser={currentUser}
        reservations={reservations}
      />
    </div>
  );
};

export default ListingPage;
