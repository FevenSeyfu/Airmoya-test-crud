import React from "react";
import Header from "@components/utility/Header/Header";
import Footer from "@components/utility/Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-full">
      <div className="min-h-screen">
        <Header />
        <main className="bg-veryLight-purple h-full flex-grow">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
