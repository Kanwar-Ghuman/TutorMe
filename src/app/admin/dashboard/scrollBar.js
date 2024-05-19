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
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import AcceptStudentCard from "../../../components/request/accept/acceptStudentCard";

const Scrollbar = () => {
  const [studentArr, setStudentArr] = useState([]);
  const [updateArr, setUpdateArr] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const handleModifyClick = (request) => {
    setSelectedRequest(request);
    onOpen();
  };

  const handleSaveClick = () => {
    onClose();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-[87vh] flex flex-col items-center overflow-hidden">
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
            key={student.id}
          />
        ))}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modify Request
              </ModalHeader>
              <ModalBody>
                {selectedRequest && (
                  <>
                    <p>
                      <strong>Name:</strong> {selectedRequest.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedRequest.email}
                    </p>
                    <p>
                      <strong>Subjects:</strong>{" "}
                      {selectedRequest.subjects.join(", ")}
                    </p>
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
