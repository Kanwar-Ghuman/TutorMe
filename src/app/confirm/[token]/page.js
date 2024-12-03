// src/app/confirm/[token]/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("confirming");

  useEffect(() => {
    const confirmMatch = async () => {
      try {
        const response = await fetch("/api/tutor-match", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "confirm",
            token: params.token,
            type: searchParams.get("type"),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to confirm match");
        }

        const data = await response.json();
        setStatus("confirmed");
      } catch (error) {
        console.error("Error confirming match:", error);
        setStatus("error");
      }
    };

    confirmMatch();
  }, [params.token, searchParams]);

  return (
    <div className="container mx-auto mt-10 p-4">
      {status === "confirming" && <p>Confirming your match...</p>}
      {status === "confirmed" && (
        <p>Match confirmed! Please wait for the other party to confirm.</p>
      )}
      {status === "error" && (
        <p className="text-red-500">
          There was an error confirming your match. Please try again.
        </p>
      )}
    </div>
  );
}
