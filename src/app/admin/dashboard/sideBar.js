"use client";

import React from "react";
import { useState } from "react";
import "./style.css";
//to do list
import { LuListTodo } from "react-icons/lu";
//bin
import { RiDeleteBin6Line } from "react-icons/ri";
//archive
import { MdOutlineArchive } from "react-icons/md";
//current
import { IoFileTrayFullOutline } from "react-icons/io5";

const sideBar = () => {
  const sideBarStyle = (p) => ({
    margin: "0% 2%",
    backgroundColor: "transparent",
    width: "100%",
    height: "25%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "start",
  });

  return (
    <div style={{ width: "20%", height: "87vh" }}>
      <div
        id="sideBar"
        style={sideBarStyle("p")}
        // className="classNames(classes.buttons)"
      >
        <button
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <IoFileTrayFullOutline />
          <p style={{ margin: "0px 5%" }}>current</p>
        </button>

        <button
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <MdOutlineArchive />
          <p style={{ margin: "0px 5%" }}>archive</p>
        </button>

        <button
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <LuListTodo />
          <p style={{ margin: "0px 5%" }}>to do list</p>
        </button>

        <button
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <RiDeleteBin6Line />
          <p style={{ margin: "0px 5%" }}>bin</p>
        </button>
      </div>
    </div>
  );
};

export default sideBar;
