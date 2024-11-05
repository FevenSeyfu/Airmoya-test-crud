import React from "react";
import Header from "@components/utility/Header/Header";
import Footer from "@components/utility/Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="min-h-screen">
        <Header />
        <main className="bg-veryLight-purple h-full flex-grow py-3 px-4 md:py-6 md:px-8 min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-96px)]">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
