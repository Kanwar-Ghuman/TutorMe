"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Spinner } from "@nextui-org/react";

import StatusStudentCard from "@/components/tutorme/home/teacher/statusStudentCard";

const Scrollbar = () => {
  const [requests, setRequests] = useState([]);
  const [studentArr, setStudentArr] = useState([]);
  const [updateArr, setUpdateArr] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/teacher/past-tutor-requests");
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
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

  const innerSearch = (student, value) => {
    return (
      student.name.includes(value) ||
      student.email.includes(value) ||
      student.subjects.some((subject) => subject.includes(value))
    );
  };

  const display = (returnArr, reverse) => {
    let myTempArr = JSON.parse(JSON.stringify(returnArr));
    if (reverse) {
      myTempArr.reverse();
    }
    setListStudent(myTempArr);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  function toRatioStatus(status) {
    if (status == "completed") {
      return 100;
    }

    if (status == "Mr.Decker") {
      return 75;
    }
    if (status == "tutor") {
      return 50;
    }
    if (status == "student") {
      return 25;
    }
    return 0;
  }

  return (
    <div>
      {/* /search */}
      <div className="flex flex-row ml-[5%] justify-start items-center w-full mt-[3%]">
        <Input
          type="text"
          id="inputSearch"
          placeholder="Search"
          className="w-[80%]"
          onKeyUp={(event) => {
            search(event.target.value);
          }}
        />
      </div>
      <div className="flex flex-col overflow-hidden max-h-[90%] w-full justify-start ml-[3%]">
        {requests.map((request) => (
          <StatusStudentCard
            id={request.id}
            studentName={request.student}
            tutorName={request.tutorName}
            subject={request.subject}
            status="student"
            statusNum={toRatioStatus("Mr.Decker")}
            key={"502033"}
          />
        ))}
      </div>
    </div>
  );
};

export default Scrollbar;
