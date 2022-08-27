import React from "react";
import LayoutTv from "./LayoutTv";
import Sidebar from "./Sidebar";

const HeroTv = () => {
  return (
    <section className="flex">
      <Sidebar />
      <LayoutTv />
    </section>
  );
};

export default HeroTv;
