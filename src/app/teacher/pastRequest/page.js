"use client";

import React, { useState, useEffect } from "react";
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
      <div className="flex flex-col items-center w-full mt-8 p-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="w-[1500px] mb-4 p-4 space-y-5">
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
    <div className="flex flex-col items-center w-full mt-8 p-4">
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-2xl text-black-500">No Requests Found</p>
        </div>
      ) : (
        requests.map((request) => (
          <Card key={request.id} className="w-[1500px] mb-4">
            <strong>
              <CardHeader className="text-black-700 text-m">
                {request.student}
              </CardHeader>
            </strong>
            <CardBody>
              <p>Email: {request.studentEmail}</p>
              <p>Subject: {request.subject}</p>
              <p>Gender Preference: {request.genderPref} </p>
            </CardBody>
            <CardFooter className="space-x-4">
              <Button color="danger" variant="bordered">
                Delete Request
              </Button>
              <Button
                color="primary"
                endContent={<CiEdit />}
                onPress={() => handleModifyClick(request)}
              >
                Modify
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
                      <strong>Email:</strong> {selectedRequest.studentEmail}
                    </p>
                    <p>
                      <strong>Subject:</strong> {selectedRequest.subject}
                    </p>
                    <p>
                      <strong>Gender Preference:</strong>{" "}
                      {selectedRequest.genderPref}
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
