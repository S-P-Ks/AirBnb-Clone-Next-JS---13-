import { User } from "@prisma/client";
import { type } from "os";

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string,
    updatedAt: string,
    emailVerified: string | null
}