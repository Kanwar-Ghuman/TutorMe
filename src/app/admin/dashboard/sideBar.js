"use client";
import "./style.css";
//to do list
import { BsListCheck } from "react-icons/bs";
//bin
//archive
//current

const SideButton = (props) => {
  return (
    <div
      className="ml-[5%] justify-center h-[100]"
    >
      <button className=" mt-[3%] bg-green rounded"
      >{props.theName}
        <props.theIcon />
      </button>
    </div>
  )
}

const sideBar = () => {
  return (
    <div>
      <SideButton theName="to do list" theIcon={BsListCheck} />
      {/* <SideButton theName="bin" />
      <SideButton theName="archive" />
      <SideButton theName="pending" /> */}

    </div>
  )
}



export default sideBar;
