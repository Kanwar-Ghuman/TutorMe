"use client";

import { IoFilter, IoSearchOutline } from "react-icons/io5";
import TutorCard from "@/components/tutorme/home/teacher/teacherRequest";
import { Input } from "@/components/ui/input";

import Select from "react-select";




const Dashboard = () => {
  const tutors = [
    { name: 'John Doe', email: 'john@example.com', tutorName: 'Mr. Smith', subject: 'IM' },
    { name: 'Jane Smith', email: 'jane@example.com', tutorName: 'Ms. Johnson', subject: 'Precalc' },
    { name: 'Alice Johnson', email: 'alice@example.com', tutorName: 'Dr. Brown', subject: 'Calc' },
    { name: 'Bob Brown', email: 'bob@example.com', tutorName: 'Prof. White', subject: 'Physics' },
    { name: 'Carol White', email: 'carol@example.com', tutorName: 'Mr. Green', subject: 'Biology' },
    { name: 'David Green', email: 'david@example.com', tutorName: 'Ms. Black', subject: 'Chemistry' },
    { name: 'Eve Black', email: 'eve@example.com', tutorName: 'Dr. Blue', subject: 'Language' },
    { name: 'Frank Blue', email: 'frank@example.com', tutorName: 'Prof. Yellow', subject: 'Other' },
    { name: 'Grace Yellow', email: 'grace@example.com', tutorName: 'Mr. Purple', subject: 'IM' },
    { name: 'Hank Purple', email: 'hank@example.com', tutorName: 'Ms. Orange', subject: 'Precalc' },
  ];
    // Add more tutor objects as needed

    return (
      <>
      <div className="h-full flex flex-col  ">

      <div className="flex flex-row m-4 justify-center items-center w-full space-x-4">
                  
            <Select
              className="min-w-[15%] h-10 px-4 basic-multi-select"
              classNamePrefix="select"
              placeholder={
                <div className="flex items-center">
                  <IoFilter className="mr-2" />
                  <span>Filter</span>
                </div>
              }
            
            />
      
            <div className="relative w-2/3">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for tutor"
                className="w-full h-10 pl-10 pr-4 border"
              />
            </div>
          </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-16 ">
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

export default Dashboard;