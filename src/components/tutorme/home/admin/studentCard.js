"use client";

import React from "react";
import { MdOutlineEmail, MdOutlineDeleteForever } from "react-icons/md";
import { IoEllipsisVerticalOutline, IoLanguageOutline } from "react-icons/io5";
import { TbMath } from "react-icons/tb";
import { HiMiniBeaker } from "react-icons/hi2";
import { PiBooks } from "react-icons/pi";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Progress,
} from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";

const StudentCard = ({
  id,
  student,
  studentEmail,
  subject,
  genderPref,
  onDelete,
  onModify,
}) => {
  const getSubjectIcon = (subject) => {
    if (
      ["IM1", "IM2", "IM3", "Precalc", "Calc AB", "Calc BC"].includes(subject)
    ) {
      return <TbMath size={20} className="mt-1" />;
    } else if (
      [
        "Physics",
        "Chemistry",
        "Biology",
        "AP Physics",
        "AP Chemistry",
        "AP Biology",
      ].includes(subject)
    ) {
      return <HiMiniBeaker size={20} className="mt-1" />;
    } else if (subject.includes("Spanish") || subject.includes("German")) {
      return <IoLanguageOutline size={20} className="mt-1" />;
    }
    return <PiBooks size={20} />;
  };

  return (
    <Card className="w-full h-[320px] bg-white shadow-md hover:shadow-[#FACC14] border border-black transition-transform duration-200 ease-in-out hover:scale-105">
      <CardHeader className="text-black-700  items-center justify-center">
        <strong>{student}</strong>
      </CardHeader>
      <CardBody className="text-black gap-4 overflow-hidden">
        <div className="flex items-center gap-1">
          <p className="mr-[.9rem]">Email</p>
          <IoEllipsisVerticalOutline size={20} className="mt-1" />
          <p>{studentEmail}</p>
          <MdOutlineEmail size={20} className="mt-1" />
        </div>
        <div className="flex items-center gap-1">
          <p>Subject</p>
          <IoEllipsisVerticalOutline size={20} className="mt-1" />
          <p>{subject}</p>
          {getSubjectIcon(subject)}
        </div>
        <div className="flex items-center gap-1">
          <p>Gender</p>
          <IoEllipsisVerticalOutline size={20} className="mt-1" />
          {genderPref === "F" ? (
            <p>Female</p>
          ) : genderPref === "M" ? (
            <p>Male</p>
          ) : (
            <p>No Preference</p>
          )}
        </div>
        <div className="">
          <p className="text-center pb-2">Status</p>
          {subject === "Chemistry" ? (
            <div>
              <p className="text-center pb-2">Completed</p>
              <Progress color="success" value={100} className="max-w-md" />
            </div>
          ) : subject === "AP Physics" ? (
            <div>
              <p className="text-center pb-2">Confirmed</p>
              <Progress color="warning" value={75} className="max-w-md" />
            </div>
          ) : (
            <div>
              <p className="text-center pb-2">Pending</p>
              <Progress color="danger" value={30} className="max-w-md" />
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-4">
        <Button
          color="danger"
          variant="bordered"
          size="sm"
          icon={MdOutlineDeleteForever}
          endContent={<MdOutlineDeleteForever size="20" />}
          // onClick={() => onDelete(id)}
        ></Button>
        <Button
          auto
          color="primary"
          icon={CiEdit}
          size="sm"
          endContent={<CiEdit size="20" />}
          // onClick={() =>
          //   onModify({ id, student, studentEmail, subject, genderPref })
          // }
        ></Button>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
