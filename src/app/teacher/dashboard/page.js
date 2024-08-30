"use client";

import TutorCard from "@/components/tutorme/home/teacher/teacherRequest";
import { Input } from "@nextui-org/react";
import { IoFilter, IoSearchOutline } from "react-icons/io5";
import { TbMath, TbMathMax, TbMathIntegralX } from "react-icons/tb";
import { HiMiniBeaker } from "react-icons/hi2";
import { GiMaterialsScience } from "react-icons/gi";
import { Dna } from "lucide-react";
import { PiBooks } from "react-icons/pi";
import { IoLanguageOutline } from "react-icons/io5";

import Select from "react-select";

const Dashboard = () => {
  const getSubjectIcon = (subject) => {
    if (["IM1", "IM2", "IM3"].includes(subject)) {
      return <TbMath size={20} />;
    } else if (subject === "Precalc") {
      return <TbMathMax size={20} />;
    } else if (["Calc AB", "Calc BC", "CalcBC", "CalcAB"].includes(subject)) {
      return <TbMathIntegralX size={20} />;
    } else if (["Physics", "AP Physics"].includes(subject)) {
      return <GiMaterialsScience size={20} />;
    } else if (["Biology", "AP Biology"].includes(subject)) {
      return <Dna size={20} />;
    } else if (["Chemistry", "AP Chemistry"].includes(subject)) {
      return <HiMiniBeaker size={20} />;
    } else if (subject.includes("Spanish") || subject.includes("German")) {
      return <IoLanguageOutline size={20} />;
    }
    return <PiBooks size={20} />;
  };

  const subjectIconMap = {
    IM: <TbMath size={20} />,
    Precalc: <TbMathMax size={20} />,
    Calc: <TbMathIntegralX size={20} />,
    Physics: <GiMaterialsScience size={20} />,
    Biology: <Dna size={20} />,
    Chemistry: <HiMiniBeaker size={20} />,
    Language: <IoLanguageOutline size={20} />,
    Other: <PiBooks size={20} />,
  };

  const subjectsOptions = [
    {
      label: "Math",
      options: [
        { value: "IM1", label: "IM1", icon: subjectIconMap.IM },
        { value: "IM2", label: "IM2", icon: subjectIconMap.IM },
        { value: "IM3", label: "IM3", icon: subjectIconMap.IM },
        {
          value: "Precalc",
          label: "Precalculus",
          icon: subjectIconMap.Precalc,
        },
        {
          value: "Calc AB",
          label: "AP Calculus AB",
          icon: subjectIconMap.Calc,
        },
        {
          value: "Calc BC",
          label: "AP Calculus BC",
          icon: subjectIconMap.Calc,
        },
      ],
    },
    {
      label: "Science",
      options: [
        { value: "Physics", label: "Physics", icon: subjectIconMap.Physics },
        {
          value: "Chemistry",
          label: "Chemistry",
          icon: subjectIconMap.Chemistry,
        },
        { value: "Biology", label: "Biology", icon: subjectIconMap.Biology },
        {
          value: "AP Physics",
          label: "AP Physics",
          icon: subjectIconMap.Physics,
        },
        {
          value: "AP Chemistry",
          label: "AP Chemistry",
          icon: subjectIconMap.Chemistry,
        },
        {
          value: "AP Biology",
          label: "AP Biology",
          icon: subjectIconMap.Biology,
        },
      ],
    },
    {
      label: "Spanish",
      options: [
        {
          value: "Spanish 1",
          label: "Spanish 1",
          icon: subjectIconMap.Language,
        },
        {
          value: "Spanish 2",
          label: "Spanish 2",
          icon: subjectIconMap.Language,
        },
        {
          value: "Spanish 3",
          label: "Spanish 3",
          icon: subjectIconMap.Language,
        },
        {
          value: "Spanish 4",
          label: "Spanish 4",
          icon: subjectIconMap.Language,
        },
        {
          value: "Spanish 5",
          label: "Spanish 5",
          icon: subjectIconMap.Language,
        },
      ],
    },
    {
      label: "German",
      options: [
        { value: "German 1", label: "German 1", icon: subjectIconMap.Language },
        { value: "German 2", label: "German 2", icon: subjectIconMap.Language },
        { value: "German 3", label: "German 3", icon: subjectIconMap.Language },
        { value: "German 4", label: "German 4", icon: subjectIconMap.Language },
        { value: "German 5", label: "German 5", icon: subjectIconMap.Language },
      ],
    },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
    }),
  };

  const formatOptionLabel = ({ value, label, icon }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      {icon}
      <span style={{ marginLeft: "10px" }}>{label}</span>
    </div>
  );
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

export default Dashboard;
