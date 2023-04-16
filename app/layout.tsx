import { useEffect, useState } from "react";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
import Navbar from "./components/navbar/navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import RegisterModal from "./components/modals/RegisterModal";

export const metadata = {
  title: "AirBnb",
  description: "AirBnb Clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
