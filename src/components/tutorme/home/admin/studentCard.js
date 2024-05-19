"use client";

import { Card, CardContent } from "@/components/ui/card";

const StudentCard = ({ student, studentEmail, subject, genderPref }) => {
  return (
    <Card className="m-4 w-full max-w-7xl transition-shadow hover:shadow-md hover:cursor-pointer ">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex flex-col space-y-3">
            <div>
              <span className="font-bold">Student Name:</span> {student}
            </div>
            <div>
              <span className="font-bold">Student Email:</span> {studentEmail}
            </div>
            <div>
              <span className="font-bold">Subject:</span> {subject}
            </div>
            <div>
              <span className="font-bold">Gender Preference:</span>{" "}
              {genderPref || "N/A"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
