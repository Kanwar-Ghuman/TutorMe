"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Skeleton,
} from "@nextui-org/react";

import { CiEdit } from "react-icons/ci";

const PastRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/teacher/past-tutor-requests");
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full">
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
    <div className="flex flex-col items-center w-full">
      {requests.map((request) => (
        <Card key={request.id} className="w-[1500px] mb-4">
          <CardHeader>{request.studentName}</CardHeader>
          <CardBody>
            <p>Email: {request.studentEmail}</p>
            <p>Subject: {request.subject}</p>
            <p>Gender Preference: {request.genderPreference}</p>
          </CardBody>
          <CardFooter className="space-x-4">
            <Button color="danger" variant="bordered">
              Delete Request
            </Button>
            <Button color="primary" endContent={<CiEdit />}>
              Modify
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PastRequests;
