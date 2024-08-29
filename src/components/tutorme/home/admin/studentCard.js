"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineEmail, MdOutlineDeleteForever } from "react-icons/md";
import { IoEllipsisVerticalOutline, IoLanguageOutline } from "react-icons/io5";
import { TbMath, TbMathMax, TbMathIntegralX } from "react-icons/tb";
import { HiMiniBeaker } from "react-icons/hi2";
import { GiMaterialsScience } from "react-icons/gi";
import { Dna } from "lucide-react";
import { PiBooks } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { CalendarCheck } from "lucide-react";
import { MdOutlinePending } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Progress,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  onAssign,
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
  onAssign,
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentArr, setStudentArr] = useState([]);
  const [updateArr, setUpdateArr] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editGenderPref, setEditGenderPref] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleModifyClick = (request) => {
    onOpen();
  };
  const subjectIconMap = {
    IM: <TbMath size={20} />,
    Precalc: <TbMathMax size={20} />,
    Calc: <TbMathIntegralX size={20} />,
    Physics: <GiMaterialsScience size={20} />,
    Biology: <Dna size={20} />,
    Chemistry: <HiMiniBeaker size={20} />,
    Language: <IoLanguageOutline size={20} />,
    Other: <PiBooks size={20} />,
  };

  const getSubjectIcon = (subject) => {
    if (["IM1", "IM2", "IM3"].includes(subject)) {
      return subjectIconMap.IM;
    } else if (subject === "Precalc") {
      return subjectIconMap.Precalc;
    } else if (["Calc AB", "Calc BC", "CalcBC", "CalcAB"].includes(subject)) {
      return subjectIconMap.Calc;
    } else if (["Physics", "AP Physics"].includes(subject)) {
      return subjectIconMap.Physics;
    } else if (["Biology", "AP Biology"].includes(subject)) {
      return subjectIconMap.Biology;
    } else if (["Chemistry", "AP Chemistry"].includes(subject)) {
      return subjectIconMap.Chemistry;
    } else if (subject.includes("Spanish") || subject.includes("German")) {
      return subjectIconMap.Language;
    }
    return subjectIconMap.Other;
  };

  return (
    <div>
      <Card className="w-10/12 h-[360px] bg-white shadow-md hover:shadow-[#FACC14] border border-black transition-transform duration-200 ease-in-out hover:scale-105 mx-10">
        <CardHeader className="text-black-700  items-center justify-center flex-col">
          <strong>{student}</strong>
          <div className="flex items-center gap-1 flex-row text-gray-400">
            {" "}
            <p>{studentEmail}</p>
          </div>
        </CardHeader>
        <CardBody className="text-black gap-4 overflow-hidden ">
          <div className="flex items-center gap-1">
            <p>Subject</p>
            <IoEllipsisVerticalOutline size={20} className="mt-1" />
            <p>{subject}</p>
            {getSubjectIcon(subject)}
          </div>
          <div className="flex items-center gap-1">
            <p>Gender Preference</p>
            <IoEllipsisVerticalOutline size={20} className="mt-1" />
            {genderPref === "F" ? (
              <p>Female</p>
            ) : genderPref === "M" ? (
              <p>Male</p>
            ) : (
              <p>No Preference</p>
            )}
          </div>
          <div className="flex items-start justify-start flex-row">
            <p className="text-center">Tutor</p>
            <IoEllipsisVerticalOutline size={20} className="mt-1" />
            {subject === "Chemistry" ? (
              <p>John A</p>
            ) : subject === "AP Physics" ? (
              <p>John A</p>
            ) : (
              <p>Not Yet Matched</p>
            )}
          </div>

          <div>
            {subject === "Chemistry" ? (
              <div>
                <strong className="text-center pb-2 flex item-center justify-start items-center">
                  Completed
                </strong>
                <Progress color="success" value={100} className="max-w-md" />
                <div className="flex justify-between pt-1">
                  <p className="text-gray-400">You are all good to go!</p>
                  <div className="justify-end">
                    <FaRegCheckCircle size={25} className="text-green-600" />
                  </div>
                </div>
              </div>
            ) : subject === "AP Physics" ? (
              <div>
                <strong className="text-center pb-2 flex item-center justify-start items-center">
                  Confirmed
                </strong>
                <Progress
                  color="warning"
                  value={75}
                  className="max-w-md"
                  classNames={{
                    indicator: "bg-yellow-400",
                  }}
                />
                <div className="flex justify-between pt-1">
                  <p className="text-gray-400">Waiting for you to confirm</p>
                  <div className="flex justify-end">
                    <CalendarCheck size={25} className="text-orange-600" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <strong className="text-center pb-2 flex item-center justify-start items-center">
                  Pending
                </strong>

                <Progress color="danger" value={30} className="max-w-md" />
                <div className="flex justify-between pt-1">
                  <p className="text-gray-400">Waiting for tutor to confirm</p>
                  <div className="flex justify-end">
                    <MdOutlinePending size={30} className="text-red-600" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardBody>
        {subject != "Chemistry" || subject === "AP Physics" ? (
          <CardFooter className="justify-end gap-2 mb-2">
            {subject === "AP Physics" ? (
              <Button
                auto
                className="bg-gradient-to-tr from-green-600 to-green-300 text-white"
                icon={FaCheck}
                size="md"
                endContent={<FaCheck size="15" />}

                // onClick={() =>
                //   onModify({ id, student, studentEmail, subject, genderPref })
                // }
              >
                Confirm
              </Button>
            ) : subject != "Chemistry" ? (
              <Button
                className="bg-gradient-to-tr from-primary to-yellow-200"
                size="md"
                icon={MdAssignment}
                endContent={<MdAssignment size="20" />}
                onClick={() =>
                  onAssign({ id, student, studentEmail, subject, genderPref })
                }

                // onClick={() => onDelete(id)}
              >
                Assign Tutor
              </Button>
            ) : (
              <></>
            )}
          </CardFooter>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};

export default StudentCard;
