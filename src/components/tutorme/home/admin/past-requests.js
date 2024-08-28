"use client";

import React, { useState, useEffect } from "react";
import StudentCard from "./studentCard";
import { IoFilter, IoSearchOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import {
  Button,
  Input,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Select from "react-select";

const PastRequests = () => {
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
  const [tutors, setTutors] = useState([]);

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

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/admin/past-tutor-requests");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudentArr(data);
        setUpdateArr(data);
        display(data, isReversed);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch tutor requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/tutors");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTutors(data);
      } catch (error) {
        console.error("Failed to fetch tutors:", error);
      }
    };

    fetchData();
  }, []);

  const handleAssign = (student) => {
    setSelectedStudent(student);

    onOpen();
  };

  const search = (value) => {
    const searchTerm = value.toLowerCase().trim();
    const returnArr = studentArr.filter((student) =>
      innerSearch(student, searchTerm)
    );
    setUpdateArr(returnArr);
    setNoResults(returnArr.length === 0);
    display(returnArr, isReversed);
  };

  const innerSearch = (student, searchTerm) => {
    const searchFields = [
      student.student,
      student.studentEmail,
      student.subject,
      student.teacher?.user?.name,
    ];

    return searchFields.some(
      (field) => field && field.toLowerCase().includes(searchTerm)
    );
  };

  const display = (returnArr, reverse) => {
    let myTempArr = JSON.parse(JSON.stringify(returnArr));
    if (reverse) {
      myTempArr.reverse();
    }
    setListStudent(myTempArr);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // ... existing code ...

  return (
    <div className="h-full w-full flex flex-col items-center">
      <>
        <div className="flex flex-row m-4 justify-center items-center w-full">
          <Select
            className="w-[20%] h-10 px-4 basic-multi-select z-50"
            classNamePrefix="select"
            options={subjectsOptions}
            placeholder={
              <div className="flex items-center">
                <IoFilter className="mr-2" />
                <span>Filter</span>
              </div>
            }
          />
          <Input
            type="text"
            id="inputSearch"
            placeholder="Search for request"
            className="w-[60%]"
            onKeyUp={(event) => {
              search(event.target.value);
            }}
            startContent={
              <IoSearchOutline className="text-gray-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
        <div className="w-full overflow-y-auto max-h-[calc(100vh-120px)]">
          {noResults ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500 text-lg">No results found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 sm:gap-x-10 gap-x-20 gap-y-10 p-4 mx-auto max-w-7xl">
              {listStudent.map((student) => (
                <StudentCard
                  id={student.id}
                  student={student.student}
                  studentEmail={student.studentEmail}
                  subject={student.subject}
                  genderPref={student.genderPref}
                  teacherName={student.teacher?.user?.name}
                  key={student.id}
                  onAssign={handleAssign}
                />
              ))}
            </div>
          )}
        </div>
      </>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Assign Tutor
              </ModalHeader>
              <ModalBody>
                <>
                  <div className="mb-4">
                    <p className="pb-2">
                      Manually assign a tutor for this request
                    </p>
                    <Select
                      value={editSubject}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select Tutor"
                      options={tutors.map((tutor) => ({
                        value: tutor.id,
                        label: tutor.name,
                      }))}
                      maxMenuHeight={200} // Limit the height of the dropdown menu
                      menuPlacement="auto" // Automatically adjust menu placement
                      menuPortalTarget={document.body} // Render menu in a portal
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensure menu appears on top
                      }}
                    />
                  </div>
                </>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  disabled={isProcessing}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  //onPress={handleSaveClick}
                  disabled={formLoading || success || isProcessing}
                  className={cn("", {
                    "bg-green-500": success,
                    "hover:bg-green-600": success,
                  })}
                >
                  {formLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Please wait
                    </>
                  ) : success ? (
                    "Success"
                  ) : (
                    "Save"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PastRequests;
