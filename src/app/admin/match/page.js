"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const TutorMatchApproval = () => {
  const [pendingMatches, setPendingMatches] = useState([]);

  const fetchPendingMatches = async () => {
    try {
      const response = await fetch(
        "/api/admin/past-tutor-requests?status=pending"
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData.error}`
        );
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      setPendingMatches(data);
    } catch (error) {
      console.error("Error fetching pending matches:", error);
      setPendingMatches([]);
    }
  };

  useEffect(() => {
    fetchPendingMatches();
  }, []);

  const handleApprove = async (id) => {
    // Implement approval logic here
    console.log(`Approving request ${id}`);
  };

  const handleDeny = async (id) => {
    // Implement denial logic here
    console.log(`Denying request ${id}`);
  };

  return (
    <div>
      <h2>Pending Tutor Matches</h2>
      {pendingMatches.length > 0 ? (
        pendingMatches.map((match) => (
          <div key={match.id}>
            <p>Student: {match.student}</p>
            <p>Student Email: {match.studentEmail}</p>
            <p>Subject: {match.subject}</p>
            <p>Teacher: {match.teacher.user.name}</p>
            <p>Tutor: {match.tutor ? match.tutor.name : "Not assigned yet"}</p>
            <p>Gender Preference: {match.genderPref || "None"}</p>
            <p>Additional Info: {match.additionalInfo || "None"}</p>
            <Button onClick={() => handleApprove(match.id)}>Approve</Button>
            <Button onClick={() => handleDeny(match.id)}>Deny</Button>
          </div>
        ))
      ) : (
        <p>No pending matches found.</p>
      )}
    </div>
  );
};

export default TutorMatchApproval;
