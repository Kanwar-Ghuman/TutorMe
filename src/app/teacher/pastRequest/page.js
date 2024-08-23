"use client";

import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
import { IoLanguageOutline } from "react-icons/io5";
import { TbMath } from "react-icons/tb";
import { HiMiniBeaker } from "react-icons/hi2";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { CiEdit } from "react-icons/ci";

export default function AcceptStudentCard({
  id,
  studentName,
  tutorName,
  subjects,
  onDelete,
  onModify,
}) {
  const getSubjectIcon = (subject) => {
    if (["IM1", "IM2", "IM3", "Precalc", "Calc AB", "Calc BC"].includes(subject)) {
      return <TbMath size={20} />;
    } else if ([
      "Physics",
      "Chemistry",
      "Biology",
      "AP Physics",
      "AP Chemistry",
      "AP Biology",
    ].includes(subject)) {
      return <HiMiniBeaker size={20} />;
    } else if (subject.includes("Spanish") || subject.includes("German")) {
      return <IoLanguageOutline size={20} />;
    }
    return <PiBooks size={20} />;
  };

  return (
    <Card
      id={`card-${id}`}
      className="m-4 w-full max-w-7xl transition-shadow hover:shadow-md hover:cursor-pointer"
    >
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex flex-col space-y-3">
            <div>
              <span className="font-bold">Name:</span> {studentName}
            </div>
            <div className="flex items-center">
              <span className="font-bold mr-1">Email:</span> {tutorName}
              <MdOutlineEmail size={20} className="ml-2" />
            </div>
            <div>
              <span className="font-bold">Subjects:</span>{" "}
              {subjects.map((subject, index) => (
                <span key={index} className="flex items-center inline-flex mr-2">
                  {subject}
                  <span className="ml-1">{getSubjectIcon(subject)}</span>
                  {index < subjects.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Button
              color="primary"
              endContent={<CiEdit />}
              onPress={() => onModify({ id, studentName, tutorName, subjects })}
            >
              Modify
            </Button>
            <Button
              color="danger"
              variant="bordered"
              onPress={() => onDelete(id)}
            >
              Delete Tutor
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}