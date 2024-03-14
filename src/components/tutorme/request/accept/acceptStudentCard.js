"use client";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function student() {
  let studentName = "John";
  let tutorName = "Steve";
  const [isHoveredAccept, setIsHoveredAccept] = useState(false);
  const [isHoveredDecline, setIsHoveredDecline] = useState(false);

  const cardStyle = {
    display: "flex",
    width: "95%",
    innerHeight: "20%",
    backgroundColor: "#C7F5D3",
    margin: "1% auto",
    borderRadius: "10px 10px",
    border: "1px solid black",
    // boxShadow: '1px 1px 2px 1px black'
  };

  let acceptStyle = (color) => ({
    // width: '40%',
    backgroundColor: color,
    filter: isHoveredAccept ? "brightness(95%)" : "brightness(80%)",
    borderLine: "black",
    borderRadius: "5px 5px",
    borderLine: "black",
    boxShadow: "1px 1px 2px 1px black",
    // fontSize: 'fit-content',
    width: "40%",
  });

  let declineStyle = (color) => ({
    // width: '40%',
    backgroundColor: color,
    filter: isHoveredDecline ? "brightness(95%)" : "brightness(80%)",
    borderLine: "black",
    borderRadius: "5px 5px",
    borderLine: "black",
    boxShadow: "1px 1px 2px 1px black",
    width: "40%",
  });

  const handleMouseEnterAccept = () => {
    setIsHoveredAccept(true);
  };

  const handleMouseLeaveAccept = () => {
    setIsHoveredAccept(false);
  };

  const handleMouseEnterDecline = () => {
    setIsHoveredDecline(true);
  };

  const handleMouseLeaveDecline = () => {
    setIsHoveredDecline(false);
  };

  return (
    <Card className="m-4 transition-shadow hover:shadow-md hover:cursor-pointer">
      <CardContent className="p-4">
        <div className="flex justify-between">
            <div>
                <span className="font-bold">Student:</span> {studentName}
                <br/>
                <span className="font-bold">Tutor:</span> {tutorName}
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

export default student;

//   return (
//     <div
//       style={hoverStyle}
//       onMouseEnter={handleMouseEnterAccept}
//       onMouseLeave={handleMouseLeaveAccept}
//     >
//       Hover over me
//     </div>
//   );
// };
