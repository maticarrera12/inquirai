
import Navbar from "@/components/navigation/navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
