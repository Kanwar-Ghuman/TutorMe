"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";

import { useState, useEffect } from "react";

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
  return (
    <div className="flex flex-col items-center w-full">
      {requests.map((request) => (
        <Card key={request.id} className="w-[1500px] mb-4">
          <CardHeader>{request.studentName}</CardHeader>
          <CardBody>
            <p>Email: {request.studentEmail}</p>
            <p>Subject: {request.subject}</p>
            <p>Gender Preference: {request.preferredGender}</p>
          </CardBody>
          <CardFooter>
            <Button color="success">Accept</Button>
            <Button color="primary">Modify</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PastRequests;
