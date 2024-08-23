"use client";

import React, { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import StudentCard from "./studentCard";

const PastRequests = () => {
  const [studentArr, setStudentArr] = useState([]);
  const [updateArr, setUpdateArr] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/admin/past-tutor-requests");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudentArr(data);
        setUpdateArr(data);
        display(data, isReversed);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch tutor requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const search = (value) => {
    const returnArr = studentArr.filter((student) =>
      innerSearch(student, value)
    );
    setUpdateArr(returnArr);
    display(returnArr, isReversed);
  };

  const innerSearch = (student, value) => {
    return (
      student.student.includes(value) ||
      student.studentEmail.includes(value) ||
      student.subject.includes(value)
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

  // ... existing code ...

  return (
    <div className="h-full w-full flex flex-col items-center">
      <>
        <div className="flex flex-row m-4 justify-center items-center w-full">
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
        <div className="w-full overflow-y-auto max-h-[calc(100vh-120px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {listStudent.map((student) => (
              <StudentCard
                id={student.id}
                student={student.student}
                studentEmail={student.studentEmail}
                subject={student.subject}
                genderPref={student.genderPref}
                teacherName={student.teacher?.user?.name}
                key={student.id}
              />
            ))}
          </div>
        </div>
      </>
    </div>
  );

  // ... existing code ...
};

export default PastRequests;
