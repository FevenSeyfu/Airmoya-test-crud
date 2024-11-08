import React from "react";
import Header from "@components/utility/Header/Header";
import Footer from "@components/utility/Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="min-h-screen">
        <Header />
        <main className="bg-veryLight-purple h-full flex-grow p-8 md:p-12 lg:px-20 min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-96px)]">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
