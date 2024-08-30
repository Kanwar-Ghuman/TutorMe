"use client";

import TutorCard from "@/components/tutorme/home/teacher/teacherRequest";
import { Input } from "@nextui-org/react";
import { IoFilter, IoSearchOutline } from "react-icons/io5";
import {
  subjectsOptions,
  customStyles,
  formatOptionLabel,
} from "@/components/utils/common";

import Select from "react-select";

const TeacherPastRequests = () => {
  const tutors = [
    {
      name: "John Doe",
      email: "john@example.com",
      tutorName: "Mr. Smith",
      subject: "IM",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      tutorName: "Ms. Johnson",
      subject: "Precalc",
    },
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      tutorName: "Dr. Brown",
      subject: "Calc",
    },
    {
      name: "Bob Brown",
      email: "bob@example.com",
      tutorName: "Prof. White",
      subject: "Physics",
    },
    {
      name: "Carol White",
      email: "carol@example.com",
      tutorName: "Mr. Green",
      subject: "Biology",
    },
    {
      name: "David Green",
      email: "david@example.com",
      tutorName: "Ms. Black",
      subject: "Chemistry",
    },
    {
      name: "Eve Black",
      email: "eve@example.com",
      tutorName: "Dr. Blue",
      subject: "Language",
    },
    {
      name: "Frank Blue",
      email: "frank@example.com",
      tutorName: "Prof. Yellow",
      subject: "Other",
    },
    {
      name: "Grace Yellow",
      email: "grace@example.com",
      tutorName: "Mr. Purple",
      subject: "IM",
    },
    {
      name: "Hank Purple",
      email: "hank@example.com",
      tutorName: "Ms. Orange",
      subject: "Precalc",
    },
  ];

  // Add more tutor objects as needed

  return (
    <>
      <div className="h-full flex flex-col ">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-8 ">
          {tutors.map((tutor, index) => (
            <TutorCard
              key={index}
              name={tutor.name}
              email={tutor.email}
              tutorName={tutor.tutorName}
              subject={tutor.subject}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TeacherPastRequests;
