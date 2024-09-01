"use client";

import TutorCard from "@/components/tutorme/home/teacher/teacherRequest";
import { Input, Spinner } from "@nextui-org/react";
import { IoFilter, IoSearchOutline } from "react-icons/io5";
import {
  subjectsOptions,
  customStyles,
  formatOptionLabel,
} from "@/components/utils/common";

import { useEffect, useState } from "react";

import Select from "react-select";

const TeacherPastRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listStudent, setListStudent] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [studentArr, setStudentArr] = useState([]);
  const [updateArr, setUpdateArr] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [success, setSuccess] = useState(false);

  const search = (value) => {
    const searchTerm = value.toLowerCase().trim();
    const returnArr = studentArr.filter((student) =>
      innerSearch(student, searchTerm)
    );
    setUpdateArr(returnArr);
    setNoResults(returnArr.length === 0);
    display(returnArr, isReversed);
  };

  const innerSearch = (student, searchTerm) => {
    const searchFields = [
      student.student,
      student.studentEmail,
      student.subject,
      student.teacher?.user?.name,
    ];

    return searchFields.some(
      (field) => field && field.toLowerCase().includes(searchTerm)
    );
  };

  const display = (returnArr, reverse) => {
    let myTempArr = JSON.parse(JSON.stringify(returnArr));
    if (reverse) {
      myTempArr.reverse();
    }
    setListStudent(myTempArr);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/teacher/past-tutor-requests");
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setStudentArr(data);
        setUpdateArr(data);
        display(data, isReversed);
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

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="flex flex-wrap flex-col items-start w-full p-4">
          <div className="flex flex-row m-4 justify-center items-center w-full space-x-4 z-50">
            <Select
              className="min-w-[15%] h-10 px-4 basic-multi-select"
              classNamePrefix="select"
              options={subjectsOptions}
              placeholder={
                <div className="flex items-center">
                  <IoFilter className="mr-2" />
                  <span>Filter</span>
                </div>
              }
              styles={customStyles}
              formatOptionLabel={formatOptionLabel}
              isClearable={true}
            />

            <div className="w-2/3">
              <Input
                type="text"
                id="inputSearch"
                placeholder="Search"
                className=" w-[80%]"
                onKeyUp={(event) => {
                  search(event.target.value);
                }}
                startContent={
                  <IoSearchOutline className="text-gray-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
          </div>
          {noResults ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500 text-lg">No results found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-8 ">
              {listStudent.map((request) => (
                <TutorCard
                  key={request.id}
                  name={request.student}
                  email={request.studentEmail}
                  subject={request.subject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherPastRequests;
