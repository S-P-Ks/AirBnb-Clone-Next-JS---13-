"use client";

import React, { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [isClientHydrated, setisClientHydrated] = useState(false);

  useEffect(() => {
    setisClientHydrated(true);
  }, []);

  if (!isClientHydrated) {
    return null;
  }

  return <div>{children}</div>;
};

export default ClientOnly;
