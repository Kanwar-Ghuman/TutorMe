"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";


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
            <Button variant="success">Accept</Button>
            <Button variant="destructive">Decline</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
