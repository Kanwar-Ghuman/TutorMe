"use client";
//for the page to work, you need to npm install @mui/joy @emotion/react @emotion/styled


import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {Progress} from "@nextui-org/react";
import PopUp from "./popUp";

import * as React from 'react';


function statusCard (props){
  let notfound = "not found yet"


  // console.log("the subject is " + props.subject);
  return (
    <Card className="m-4 w-full h-full max-w-7xl transition-shadow hover:shadow-md hover:cursor-pointer ">
      <CardContent className="p-4 flex flex-direction-row w-full h-full">
        <div className="flex justify-between w-full h-full">
          <div className="flex flex-col space-y-3">
            <div>
              <span className="font-bold">Student Name:</span> {props.studentName}
            </div>
            <div>
              <span className="font-bold">Tutor Name:</span> {props.tutorName || notfound}
            </div>
            <div>
              <span className="font-bold">Subject:</span> {props.subject}
            </div>
            <div>
              <span className="font-bold">Gender Preference:</span>{" "}
              {props.genderPref || "N/A"}
            </div>
          </div>
        </div>
          <div class="items-center flex flex-center mr-[5%]">
            <PopUp
            status = {props.status}
            statusNum = {props.statusNum}
            />
          </div>
      </CardContent>
    </Card>
  );
};

export default statusCard;
