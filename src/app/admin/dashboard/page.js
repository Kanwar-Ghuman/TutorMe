("use-client");

import { TeacherNav } from "@/components/tutorme/home/nav/teacherNav";
// import { Inter } from 'next/font/google'
// import { useState } from "react";
import ScrollBar from "./scrollBar";
import SideBar from "./sideBar";

const AcceptRequest = () => {
  // Your base page content goes here
  function mouseOver(event) {
    event.target.style.background = "red";
  }

  // const myHeight = window.innerHeight * 0.5;
  return (
    <div
      // asChild
      className="scroll-hide h-[100vh]"
    >
      <TeacherNav />
      <div className="flex w-100 space-x-4 p-4">
        <div className="w-[20%] shadow-md rounded-lg bg-slate-50">
          <SideBar />
        </div>
        <div className="w-[80%]">
          <ScrollBar />
        </div>
      </div>
    </div>
  );
};

export default AcceptRequest;
