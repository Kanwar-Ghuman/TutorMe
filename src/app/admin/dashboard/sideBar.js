"use client";


import React from "react";
import "./style.css";
//to do list
import { BsListCheck } from "react-icons/bs";
//bin
import { BsTrash } from "react-icons/bs";
//archive

import { BsArchive } from "react-icons/bs";
//inbox
import { BsInbox } from "react-icons/bs";

import { MdOutlineArchive } from "react-icons/md";
//current
import { IoFileTrayFullOutline } from "react-icons/io5";

// const sideBar = () => {
//   const sideBarStyle = () => ({
//     margin: "0% 2%",
//     backgroundColor: "transparent",
//     width: "100%",
//     height: "25%",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-around",
//     alignItems: "start",
//   });


const SideButton = (props) => {
  return (
    <div
      className="flex flex-row ml-[4%] h-[100] mr-[5%]"
    >
      <button
        type="button"
        className="flex gap-2 items-center flex-row rounded-lg mt-[3%] transition duration-150 hover:bg-slate-200 shadow w-full h-[4vh] "
      >
        <props.theIcon className="ml-[2vh]" />
        {props.theName}
      </button>
    </div>
  )
}

const sideBar = () => {
  return (
    <div className="flex-col mt-[3%] h-full">
      <SideButton theName="to do list" theIcon={BsListCheck} />
      <SideButton theName="bin" theIcon={BsTrash} />
      <SideButton theName="archive" theIcon={BsArchive} />
      <SideButton theName="pending" theIcon={BsInbox} />

    </div>
  )
}



export default sideBar;