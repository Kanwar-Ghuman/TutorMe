"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

export default function acceptStudentCard(props) {
  return (
    <Card className="m-4 transition-shadow hover:shadow-md hover:cursor-pointer">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex flex-col space-y-3">
            <div>
              <span className="font-bold">Student:</span> {props.studentName}
            </div>
            <div>
              <span className="font-bold">Tutor:</span> {props.tutorName}
            </div>

            <CardDescription>Click to view more information</CardDescription>
          </div>
          <div className="flex flex-col space-y-4">
            <Button variant="success" className="bg-green-500	hover:bg-green-400">Accept</Button>
            <Button variant="destructive" className="bg-red-600	hover:bg-red-500">Decline</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
