import { useEffect, useState } from "react";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
import Navbar from "./components/navbar/navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./components/providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
  title: "AirBnb",
  description: "AirBnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
