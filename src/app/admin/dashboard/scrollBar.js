"use client";

import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AcceptStudentCard from "../../../components/request/accept/acceptStudentCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";

function Scrollbar() {
  const [studentArr, setStudentArr] = useState([]);
  const [updateArr, setUpdateArr] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/tutors");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudentArr(data);
        setUpdateArr(data);
        display(data, isReversed);
      } catch (error) {
        console.error("Failed to fetch tutor requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const reverseStudent = () => {
    setIsReversed(!isReversed);
    display(updateArr, !isReversed);
  };

  const search = (value) => {
    const returnArr = studentArr.filter((student) =>
      innerSearch(student, value)
    );
    setUpdateArr(returnArr);
    display(returnArr, isReversed);
  };

  const innerSearch = (arr, value) => {
    return (
      arr.name.includes(value) ||
      arr.email.includes(value) ||
      arr.subjects.some((subject) => subject.includes(value))
    );
  };

  const display = (returnArr, reverse) => {
    let myTempArr = JSON.parse(JSON.stringify(returnArr));
    if (reverse) {
      myTempArr.reverse();
    }
    setListStudent(
      myTempArr.map((student, index) => (
        <AcceptStudentCard
          studentName={student.name}
          tutorName={student.email}
          key={index}
        />
      ))
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[87vh]">
      <div className="flex flex-row m-4 justify-between items-center">
        <Input
          type="text"
          id="inputSearch"
          placeholder="Filter"
          className="w-[80%]"
          onKeyUp={(event) => {
            search(event.target.value);
          }}
        />
        <div className="flex items-center gap-[3%]">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Filter</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">first name</div>
              <div className="grid gap-4">last name</div>
              <div className="grid gap-4">student id</div>
            </PopoverContent>
          </Popover>
          <Button variant="outline" type="button" onClick={reverseStudent}>
            <HiOutlineArrowsUpDown />
          </Button>
        </div>
      </div>
      <div className="flex flex-col overflow-auto max-h-[90%]">
        {listStudent}
      </div>
    </div>
  );
}

export default Scrollbar;
