"use client";
import React, { useEffect, useState } from "react";
import { getToken } from "@/actions/action";

//compponents
import Footer from "./Footer";
import Header from "./Header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUserToken() {
      const user = await getToken();
      if (!user) return null;
      setUser(JSON.parse(user));
    }

    getUserToken();
  }, []);

  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  );
}
