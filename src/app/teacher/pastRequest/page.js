"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineEmail, MdOutlineDeleteForever } from "react-icons/md";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { PiBooks } from "react-icons/pi";
import { RxDividerVertical } from "react-icons/rx";
import { IoEllipsisVerticalOutline } from "react-icons/io5";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Skeleton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter, 
  useDisclosure,
  Progress,
} from "@nextui-org/react";

import { CiEdit } from "react-icons/ci";

const PastRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const handleModifyClick = (request) => {
    setSelectedRequest(request);
    onOpen();
  };

  const handleSaveClick = () => {
    onClose();
  };

  if (loading) {
    return (
      <div className="flex flex-row flex-wrap w-full py-5">
        {Array.from({ length: 9 }).map((_, index) => (
          <Card key={index} className="w-[1500px] sm:w-[300px] h-[220px] mb-4 p-4 space-y-5 mx-5">
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
              </Skeleton>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap flex-row w-full p-5 "> 
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-2xl text-black-500">No Requests Found</p>
        </div>
      ) : (
        requests.map((request) => (
          <Card key={request.id} className="w-[1500px] mb-8 sm:w-[400px] h-[330px] mx-[3.2rem] bg-white shadow-md  hover:shadow-[#FACC14] border border-black transition-transform duration-200 ease-in-out hover:scale-105 overflow-hidden">
            <strong>
              <CardHeader className="text-black-700 text-m items-center justify-center">
                {request.student}
              </CardHeader>
            </strong>
            <CardBody className="text-black gap-4 overflow-hidden">
              <div className="flex items-center gap-1 mr-8">   
                <p>Email</p>    
                <IoEllipsisVerticalOutline size={20}/> 
                <p>{request.studentEmail}</p>
                <MdOutlineEmail/>     
                </div>
              <div className="flex items-center gap-1">
                <p>Subject</p>
                <IoEllipsisVerticalOutline size={20}/>
                <p>{request.subject}</p>
                <PiBooks />
              </div>
              <div className="flex items-center gap-1">
                <p>Gender</p>
                <IoEllipsisVerticalOutline size={20}/>
                {request.genderPref === "F" ? (
                  <p>Female</p>
                ): (request.genderPref === "M" ? (
                  <p>Male</p>
                ): (<p>No Preference</p>))} 
              </div>
              <div className="">
                <p className="text-center pb-2">Status</p>
              {request.subject === "Chemistry" ? (<div>
                <p className="text-center pb-2" >Completed</p>
                <Progress color="success" aria-label="Loading..." value={100} className="max-w-md"/></div>) : (request.subject === "AP Physics" ? (<div> 
                <p className="text-center pb-2">Confirmed</p>
                <Progress color="warning" aria-label="Loading..." value={75} className="max-w-md"/></div>) : (<div><p className="text-center pb-2">Pending</p><Progress color="danger" aria-label="Loading..." value={30} className="max-w-md"/></div>))}

              </div>
                  </CardBody>
            <CardFooter className="justify-end gap-4">
            <Button
              color="danger"
              variant="bordered"
              size="sm"
              icon={MdOutlineDeleteForever}
              endContent={<MdOutlineDeleteForever size="20"/>}
              
            >
              
            </Button>  
            <Button
              auto color="primary" icon={CiEdit} size="sm"
              endContent={<CiEdit size="20"/>}
              onClick={() => handleModifyClick(request)}
            >
            </Button>
            </CardFooter>
            
          </Card>
        ))
      )}
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
                      <strong>Student Name:</strong> {selectedRequest.student}
                    </p>
                    <p>
                      <strong>Subject:</strong> {selectedRequest.subject}
                    </p>
                    <p>
                      <strong>Gender Preference:</strong>{" "}
                      {selectedRequest.genderPref === "M"
                        ? "Male"
                        : selectedRequest.genderPref === "F"
                        ? "Female"
                        : "No Preference"}
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
 export default PastRequests;
