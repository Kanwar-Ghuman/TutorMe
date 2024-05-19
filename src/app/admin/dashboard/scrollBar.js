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
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@nextui-org/react";
import Select from "react-select";
import AcceptStudentCard from "../../../components/request/accept/acceptStudentCard";

const Scrollbar = () => {
  const [studentArr, setStudentArr] = useState([]);
  const [updateArr, setUpdateArr] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editSubjects, setEditSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/tutors");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudentArr(data);
        setUpdateArr(data);
        display(data, isReversed);
      } catch (error) {
        console.error("Failed to fetch tutor requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const handleDelete = async (id) => {
    try {
      const cardElement = document.getElementById(`card-${id}`);
      cardElement.classList.add("animate-slideOut");

      setTimeout(async () => {
        const response = await fetch(`/api/admin/tutors/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete request");
        }
        setListStudent((prev) => prev.filter((student) => student.id !== id));
      }, 500);
    } catch (error) {
      console.error("Failed to delete tutor:", error);
    }
  };

  const handleModifyClick = (tutor) => {
    setSelectedRequest(tutor);
    setEditName(tutor.studentName); // Ensure this sets the correct value
    setEditEmail(tutor.tutorName); // Ensure this sets the correct value
    setEditSubjects(
      tutor.subjects.map((subject) => ({ value: subject, label: subject }))
    );
    onOpen();
  };

  const handleSaveClick = async () => {
    const updatedTutor = {
      name: editName,
      email: editEmail,
      subjects: editSubjects.map((subject) => subject.value),
    };

    try {
      const response = await fetch(`/api/admin/tutors/${selectedRequest.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTutor),
      });

      if (!response.ok) {
        throw new Error("Failed to update tutor");
      }

      const updatedData = await response.json();
      setListStudent((prev) =>
        prev.map((student) =>
          student.id === selectedRequest.id ? updatedData : student
        )
      );
      onClose();
    } catch (error) {
      console.error("Failed to update tutor:", error);
    }
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

  return (
    <div className="h-[87vh] flex flex-col items-center overflow-hidden">
      {listStudent.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-6xl">No Current Tutors</p>
          <p className="text-2xl mt-2">
            Please go to the{" "}
            <Link href="/admin/add-tutor" passHref>
              <span className="text-primary">&quot;Add Tutor&quot; </span>
              tab.
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-row m-4 justify-between items-center w-full">
            <Input
              type="text"
              id="inputSearch"
              placeholder="Filter"
              className="w-[80%]"
              onKeyUp={(event) => {
                search(event.target.value);
              }}
            />
            <div className="flex items-center gap-[3%]">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Filter</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">first name</div>
                  <div className="grid gap-4">last name</div>
                  <div className="grid gap-4">student id</div>
                </PopoverContent>
              </Popover>
              <Button variant="outline" type="button" onClick={reverseStudent}>
                <HiOutlineArrowsUpDown />
              </Button>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden max-h-[90%] w-full items-center">
            {listStudent.map((student) => (
              <AcceptStudentCard
                id={student.id}
                studentName={student.name}
                tutorName={student.email}
                subjects={student.subjects}
                onDelete={handleDelete}
                onModify={handleModifyClick}
                key={student.id}
              />
            ))}
          </div>
        </>
      )}
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modify Tutor
              </ModalHeader>
              <ModalBody>
                {selectedRequest && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium                      text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="text"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Subjects (comma separated)
                      </label>
                      <Select
                        isMulti
                        value={editSubjects}
                        onChange={setEditSubjects}
                        options={subjectsOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select subjects"
                      />
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSaveClick}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Scrollbar;
