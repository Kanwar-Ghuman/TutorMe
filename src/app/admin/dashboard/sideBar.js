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

const sideBar = () => {
  const sideBarStyle = () => ({
    margin: "0% 2%",
    backgroundColor: "transparent",
    width: "100%",
    height: "25%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "start",
  });


const SideButton = (props) => {
  return (
    <div
      className="flex flex-row ml-[5%] h-[100]"
    >
      <button className="gap-2 items-center flex flex-row mb-[3%] bg-green rounded"
      >
        <props.theIcon />
        {props.theName}
      </button>
    </div>
  )
}

const sideBar = () => {
  return (
    <div className="bg-slate-300 flex-col">
      <SideButton theName="to do list" theIcon={BsListCheck} />
      <SideButton theName="bin" theIcon={BsTrash} />
      <SideButton theName="archive" theIcon={BsArchive} />
      <SideButton theName="pending" theIcon={BsInbox} />

    </div>
  )
}



export default sideBar;
