"use client";
import React from "react";
import Navbar from "@/components/tutorme/home/nav/teacherNavbar";

// import { Inter } from 'next/font/google'
// import { useState } from "react";
import SideBar from "./sideBar";
import ScrollBar from "./scrollBar";

const AcceptRequest = () => {
  // const myHeight = window.innerHeight * 0.5;
  return (
    <div
      // asChild
      style={{ height: "100vh" }}
      className="scroll-hide"
    >
      <Navbar />
      <div className="flex w-100 space-x-4 p-4">
        <div className="w-[20%] shadow-md rounded-lg">
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
