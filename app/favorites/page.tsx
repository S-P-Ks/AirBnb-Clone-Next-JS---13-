import React from "react";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getFavoriteListings from "../actions/getFavoriteListing";
import getCurrentUser from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";

const page = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Favorites Found"
          subtitle="Looks like you have not favorite listing"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
