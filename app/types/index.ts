import { Listing, Reservation, User } from "@prisma/client";
import { type } from "os";

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string,
    updatedAt: string,
    emailVerified: string | null
}

export type SafeReservation = Omit<Reservation, "createdAt" | "startDate" | "endDate" | "listing"> & {
    createdAt: string,
    startDate: string,
    endDate: string,
    listing: SafeListing
}

export type SafeListing = Omit<Listing, "createdAt"> & {
    createdAt: string
}