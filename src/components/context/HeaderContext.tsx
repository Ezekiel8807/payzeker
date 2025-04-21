"use client";
import { getHeaderData } from "@/actions/getHeaderData";

import { createContext, useContext, useEffect, useState } from "react";

type HeaderProviderProbs = {
  children: React.ReactNode;
};

type headerInfo = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notifications: any;
};

const HeaderContext = createContext<headerInfo | null>(null);

const initial = { user: null, notifications: [] };

export const HeaderProvider = ({ children }: HeaderProviderProbs) => {
  const [headerInfo, setHeaderInfo] = useState<headerInfo>(initial);

  useEffect(() => {
    async function getHeaderUser() {
      const res = await getHeaderData();
      setHeaderInfo(res);
    }

    getHeaderUser();
  }, []);

  return (
    <HeaderContext.Provider value={headerInfo}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
