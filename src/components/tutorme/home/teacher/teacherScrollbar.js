"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Spinner } from "@nextui-org/react";
import { Loader2 } from "lucide-react";
import Select from "react-select";
import { cn } from "@/lib/utils";
import StatusStudentCard from "@/components/tutorme/home/teacher/statusStudentCard"



const Scrollbar = () => {
  const [requests, setRequests] = useState([]);
  const [studentArr, setStudentArr] = useState([]);
  const [updateArr, setUpdateArr] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formLoading, setformLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editSubjects, setEditSubjects] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/teacher/past-tutor-requests");
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const reverseStudent = () => {
    setIsReversed(!isReversed);
    display(updateArr, !isReversed);
  };

  const search = (value) => {
    const returnArr = studentArr.filter((student) =>
      innerSearch(student, value)
    );
    setUpdateArr(returnArr);
    display(returnArr, isReversed);
  };

  const innerSearch = (student, value) => {
    return (
      student.name.includes(value) ||
      student.email.includes(value) ||
      student.subjects.some((subject) => subject.includes(value))
    );
  };

  const display = (returnArr, reverse) => {
    let myTempArr = JSON.parse(JSON.stringify(returnArr));
    if (reverse) {
      myTempArr.reverse();
    }
    setListStudent(myTempArr);
  };

  const handleModifyClick = (tutor) => {
    setSelectedRequest(tutor);
    setEditName(tutor.studentName);
    setEditEmail(tutor.tutorName);
    setEditSubjects(
      tutor.subjects.map((subject) => ({ value: subject, label: subject }))
    );
    onOpen();
  };


  const subjectsOptions = [
    {
      label: "Math",
      options: [
        { value: "IM1", label: "IM1" },
        { value: "IM2", label: "IM2" },
        { value: "IM3", label: "IM3" },
        { value: "Precalc", label: "Precalculus" },
        { value: "Calc AB", label: "AP Calculus AB" },
        { value: "Calc BC", label: "AP Calculus BC" },
      ],
    },
    {
      label: "Science",
      options: [
        { value: "Physics", label: "Physics" },
        { value: "Chemistry", label: "Chemistry" },
        { value: "Biology", label: "Biology" },
        { value: "AP Physics", label: "AP Physics" },
        { value: "AP Chemistry", label: "AP Chemistry" },
        { value: "AP Biology", label: "AP Biology" },
      ],
    },
    {
      label: "Spanish",
      options: [
        { value: "Spanish 1", label: "Spanish 1" },
        { value: "Spanish 2", label: "Spanish 2" },
        { value: "Spanish 3", label: "Spanish 3" },
        { value: "Spanish 4", label: "Spanish 4" },
        { value: "Spanish 5", label: "Spanish 5" },
      ],
    },
    {
      label: "German",
      options: [
        { value: "German 1", label: "German 1" },
        { value: "German 2", label: "German 2" },
        { value: "German 3", label: "German 3" },
        { value: "German 4", label: "German 4" },
        { value: "German 5", label: "German 5" },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  function toRatioStatus (status) {
    if (status == "completed") {
        return 100
    }

    if (status == "Mr.Decker"){
        return 75
    }
    if (status == "tutor"){
        return 50
    }
    if (status =="student"){
        return 25
    }
    return 0
  }

  return (
    <div>
      {/* /search */}
        <div className="flex flex-row ml-[5%] justify-start items-center w-full mt-[3%]">
          <Input
            type="text"
            id="inputSearch"
            placeholder="Search"
            className="w-[80%]"
            onKeyUp={(event) => {
              search(event.target.value);
            }}
          />
        </div>
        <div className="flex flex-col overflow-hidden max-h-[90%] w-full justify-start ml-[3%]">
          {requests.map((request) => (
            <StatusStudentCard
              id={request.id}
              studentName={request.student}
              tutorName={request.tutorName}
              subject={request.subject}
              status = "student"
              statusNum = {toRatioStatus("Mr.Decker")}
              key={"502033"}
            />
          ))}
        </div>
    </div>
  )
}

export default Scrollbar
