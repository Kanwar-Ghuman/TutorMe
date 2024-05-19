"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@nextui-org/button";
import { CiEdit } from "react-icons/ci";

export default function AcceptStudentCard({
  id,
  studentName,
  tutorName,
  subjects,
  onDelete,
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
            <div>
              <span className="font-bold">Email:</span> {tutorName}
            </div>
            <div>
              <span className="font-bold">Subjects:</span> {subjects.join(", ")}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Button color="primary" endContent={<CiEdit />}>
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
