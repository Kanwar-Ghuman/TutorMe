"use client";

import { useState, useEffect } from "react";
import StudentCard from "@/components/tutorme/home/admin/studentCard";

const TutorMatchApproval = () => {
  const [pendingMatches, setPendingMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingMatches = async () => {
    try {
      const response = await fetch(
        "/api/admin/past-tutor-requests?status=pending,PENDING_CONFIRMATION"
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData.error}`
        );
      }
      const data = await response.json();
      const matchesWithTutors = await Promise.all(
        data.map(async (match) => {
          if (match.matchedTutorId) {
            const tutorResponse = await fetch(
              `/api/admin/tutors/${match.matchedTutorId}`
            );
            if (tutorResponse.ok) {
              const tutorData = await tutorResponse.json();
              return { ...match, matchedTutor: tutorData };
            }
          }
          return match;
        })
      );

      setPendingMatches(matchesWithTutors);
    } catch (error) {
      console.error("Error fetching pending matches:", error);
      setPendingMatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingMatches();
  }, []);

  const handleMatch = async (id) => {
    try {
      const response = await fetch("/api/tutor-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to match tutor");
      }

      const { match } = await response.json();
      if (match.matchedTutorId) {
        const tutorResponse = await fetch(
          `/api/admin/tutors/${match.matchedTutorId}`
        );
        if (tutorResponse.ok) {
          const tutorData = await tutorResponse.json();
          match.matchedTutor = tutorData;
        }
      }
      setPendingMatches((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, ...match } : request
        )
      );
    } catch (error) {
      console.error("Error matching tutor:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch("/api/tutor-match", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matchId: id, action: "approve" }),
      });

      if (!response.ok) {
        throw new Error("Failed to approve match");
      }

      const { match } = await response.json();
      setPendingMatches((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, ...match } : request
        )
      );
    } catch (error) {
      console.error("Error approving match:", error);
    }
  };

  const handleDeny = async (id) => {
    try {
      const response = await fetch("/api/tutor-match", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matchId: id, action: "deny" }),
      });

      if (!response.ok) {
        throw new Error("Failed to deny match");
      }

      const { match } = await response.json();
      setPendingMatches((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, ...match } : request
        )
      );
    } catch (error) {
      console.error("Error denying match:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Pending Tutor Matches</h2>
      {pendingMatches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingMatches.map((match) => (
            <StudentCard
              key={match.id}
              id={match.id}
              student={match.student}
              studentEmail={match.studentEmail}
              subject={match.subject}
              genderPref={match.genderPref}
              tutor={match.tutor}
              matchedTutor={match.matchedTutor}
              status={match.status}
              onMatch={handleMatch}
              onApprove={handleApprove}
              onDeny={handleDeny}
            />
          ))}
        </div>
      ) : (
        <p>No pending matches found.</p>
      )}
    </div>
  );
};

export default TutorMatchApproval;
