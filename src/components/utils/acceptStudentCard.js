"use client";

import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { CiEdit } from "react-icons/ci";
import { Chip, Accordion, AccordionItem } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { getSubjectColor, getSubjectIcon } from "@/components/utils/common";

export default function AcceptStudentCard({
  id,
  studentName,
  tutorName,
  subjects,
  activeRequests,
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
            {activeRequests && activeRequests.length > 0 ? (
              <Accordion
                variant="light"
                className="px-0"
                selectionMode="single"
              >
                <AccordionItem title="Current Assignments">
                  <div className="space-y-4">
                    {activeRequests.map((request) => (
                      <div
                        key={request.id}
                        className="p-2 bg-gray-50 rounded-lg shadow-sm"
                      >
                        <div className="flex flex-col space-y-1 text-sm">
                          <p>
                            <span className="font-medium">Student:</span>{" "}
                            {request.student}
                          </p>
                          <p>
                            <span className="font-medium">Subject:</span>{" "}
                            {request.subject}
                          </p>
                          <p>
                            <span className="font-medium">Status:</span>{" "}
                            <span
                              className={cn(
                                "px-2 py-0.5 rounded-full text-xs",
                                request.status === "APPROVED"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              )}
                            >
                              {request.status === "APPROVED"
                                ? "Approved"
                                : "Pending Confirmation"}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              </Accordion>
            ) : (
              <p className="text-lg text-gray-500 my-20 ">
                No Current Assignments
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-10 pt-8 mr-5">
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
