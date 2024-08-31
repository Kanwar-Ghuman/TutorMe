"use client";

import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { CiEdit } from "react-icons/ci";
import { Chip } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { getSubjectColor, getSubjectIcon } from "@/components/utils/common";
export default function AcceptStudentCard({
  id,
  studentName,
  tutorName,
  subjects,
  onDelete,
  onModify,
}) {
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
              <div className="flex items-center flex-wrap">
                <span className="font-bold mr-2">Subjects:</span>
                {subjects.map((subject, index) => (
                  <span key={index} className="flex items-center mr-2">
                    <Chip
                      size="md"
                      className={cn(
                        getSubjectColor(subject),
                        "flex items-center gap-1 px-2 mt-1"
                      )}
                      endContent={getSubjectIcon(subject)}
                    >
                      {subject}
                    </Chip>
                  </span>
                ))}
              </div>
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
