import React from "react";
import LayoutMovie from "./LayoutMovie";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

const HeroMovie = () => {
  return (
    <section className="flex">
      <Sidebar />
      <LayoutMovie />
    </section>
  );
};

export default HeroMovie;
