"use client";

import React, { useState, useEffect } from "react";

import {
  subjectsOptions,
  formatOptionLabel,
  customStyles,
  getSubjectIcon,
  getSubjectColor,
  getStageColor,
} from "@/components/utils/common";
import { useToast } from "@/hooks/use-toast";
import StudentCard from "./studentCard";
import { IoFilter, IoSearchOutline } from "react-icons/io5";
import { MdAssignment, MdOutlineDeleteForever } from "react-icons/md";
import { useEmailSender } from "@/hooks/useEmailSender";
import { CiEdit } from "react-icons/ci";
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
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Switch,
} from "@nextui-org/react";
import Select from "react-select";
import { CheckIcon } from "lucide-react";

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

  const [selectedSubject, setSelectedSubject] = useState([]);

  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [viewMode, setViewMode] = useState("table");

  const [pendingMatches, setPendingMatches] = useState([]);

  const { toast } = useToast();

  // Modfiying state vars
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editGenderPref, setEditGenderPref] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  //modify func:
  const handleModifyClick = (request) => {
    setSelectedRequest(request);
    setEditName(request.student);
    setEditEmail(request.studentEmail);
    setEditSubject(request.subject);
    setEditGenderPref(request.genderPref);
    onOpen();
  };

  const { sendMatchEmail } = useEmailSender();

  useEffect(() => {
    const fetchAndMatch = async () => {
      try {
        const [requestsResponse, matchesResponse] = await Promise.all([
          fetch("/api/admin/past-tutor-requests"),
          fetch(
            "/api/admin/past-tutor-requests?status=pending,PENDING_CONFIRMATION"
          ),
        ]);

        if (!requestsResponse.ok || !matchesResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [requestsData, matchesData] = await Promise.all([
          requestsResponse.json(),
          matchesResponse.json(),
        ]);

        setStudentArr(requestsData);
        setUpdateArr(requestsData);
        display(requestsData, isReversed);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchAndMatch();
  }, []);

  const handleAssign = (student) => {
    setSelectedStudent(student);
    setSelectedTutor(null);
    onOpen();
  };

  const handleTutorChange = (selectedOption) => {
    setSelectedTutor(selectedOption);
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

    myTempArr.sort((a, b) => {
      if (
        a.status === "PENDING_CONFIRMATION" &&
        b.status !== "PENDING_CONFIRMATION"
      ) {
        return -1;
      }
      if (
        b.status === "PENDING_CONFIRMATION" &&
        a.status !== "PENDING_CONFIRMATION"
      ) {
        return 1;
      }
      return 0;
    });

    if (reverse) {
      myTempArr.reverse();
    }

    setListStudent(myTempArr);
  };

  const updateMatchesAndRequests = (id, match) => {
    setPendingMatches((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, ...match } : request
      )
    );
    setStudentArr((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, ...match } : request
      )
    );
    setUpdateArr((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, ...match } : request
      )
    );
    setListStudent((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, ...match } : request
      )
    );
  };

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
      if (!match.matchedTutorId) {
        toast({
          title: "Error",
          description: "No Tutor Found for this request",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      if (match.matchedTutorId) {
        const tutorResponse = await fetch(
          `/api/admin/tutors/${match.matchedTutorId}`
        );
        if (tutorResponse.ok) {
          const tutorData = await tutorResponse.json();
          match.matchedTutor = tutorData;
        }
      }
      updateMatchesAndRequests(id, match);
    } catch (error) {
      console.error("Error matching tutor:", error);
      toast({
        title: "Error",
        description: "No Tutor Found for this request",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  const handleApprove = async (id) => {
    try {
      const response = await fetch("/api/tutor-match", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "approve", matchId: id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to approve request");
      }

      const { match } = await response.json();

      setListStudent((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: "APPROVED" } : request
        )
      );

      toast({
        title: "Success",
        description: "Match approved successfully",
        variant: "default",
        className: "bg-green-500 text-white",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error approving request:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to approve match",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDeny = async (id) => {
    try {
      const response = await fetch("/api/tutor-match", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "deny", matchId: id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to deny request");
      }

      setListStudent((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: "DENIED" } : request
        )
      );
    } catch (error) {
      console.error("Error denying request:", error);
    }
  };

  const handleSubjectChange = (selectedOption) => {
    setSelectedSubject(selectedOption);
    filterRequests(selectedOption);
  };

  const filterRequests = (subject) => {
    if (!subject) {
      setListStudent(studentArr);
      setNoResults(false);
      return;
    }

    const filtered = studentArr.filter((request) =>
      request.subject.toLowerCase().includes(subject.value.toLowerCase())
    );

    setListStudent(filtered);
    setNoResults(filtered.length === 0);
  };

  const getStatusTooltip = (status) => {
    switch (status) {
      case "PENDING":
        return "Waiting for initial match";
      case "MATCHED":
        return "Waiting for both parties to confirm";
      case "STUDENT_CONFIRMED":
        return "Waiting for tutor confirmation";
      case "TUTOR_CONFIRMED":
        return "Waiting for student confirmation";
      case "PENDING_ADMIN":
        return "Both parties confirmed - Waiting for admin approval";
      case "APPROVED":
        return "Match approved and finalized";
      default:
        return status;
    }
  };

  const renderCell = React.useCallback(
    (request, columnKey) => {
      switch (columnKey) {
        case "student":
          return (
            <User
              name={request.student}
              description={request.studentEmail}
              avatarProps={{
                src: null,
                name: request.student
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2),
                color: "primary",
              }}
            />
          );
        case "subject":
          return (
            <Chip
              size="md"
              className={cn(
                getSubjectColor(request.subject),
                "flex items-center gap-1 px-2"
              )}
              endContent={getSubjectIcon(request.subject)}
            >
              {request.subject}
            </Chip>
          );
        case "status":
          return (
            <Tooltip content={getStatusTooltip(request.status)}>
              <Chip
                size="sm"
                className={
                  request.status === "APPROVED"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }
              >
                {request.status === "APPROVED"
                  ? "Approved"
                  : request.status === "PENDING_CONFIRMATION"
                  ? "Pending Confirmation"
                  : request.status === "STUDENT_CONFIRMED"
                  ? "Student Confirmed"
                  : request.status === "TUTOR_CONFIRMED"
                  ? "Tutor Confirmed"
                  : request.status === "PENDING_ADMIN"
                  ? "Pending Admin"
                  : "Pending"}
              </Chip>
            </Tooltip>
          );
        case "tutor":
          return (
            request.tutor?.name || request.matchedTutor?.name || "Not Assigned"
          );
        case "actions":
          if (request.status === "APPROVED") {
            return (
              <div className="flex gap-3 items-center justify-start">
                <Chip size="sm" className="bg-gray-100 text-gray-600">
                  No Actions Needed
                </Chip>
              </div>
            );
          }
          if (request.status === "PENDING_ADMIN") {
            return (
              <div className="flex gap-3 items-center justify-start">
                <Tooltip content="Approve Request">
                  <span
                    className="text-2xl cursor-pointer text-green-500"
                    onClick={() => handleApprove(request.id)}
                  >
                    <MdAssignment />
                  </span>
                </Tooltip>
                <Tooltip content="Deny Request">
                  <span
                    className="text-2xl cursor-pointer text-red-500"
                    onClick={() => handleDeny(request.id)}
                  >
                    <MdOutlineDeleteForever />
                  </span>
                </Tooltip>
              </div>
            );
          }
          return (
            <div className="flex gap-3 items-center justify-start">
              {request.status === "PENDING" && (
                <Tooltip content="Match Tutor">
                  <span
                    className="text-2xl text-primary cursor-pointer active:opacity-50"
                    onClick={() => handleMatch(request.id)}
                  >
                    <MdAssignment />
                  </span>
                </Tooltip>
              )}
              {request.status === "PENDING_CONFIRMATION" && (
                <>
                  <Tooltip content="Approve Match">
                    <span
                      className="text-2xl cursor-pointer active:opacity-50 text-green-500"
                      onClick={() => handleApprove(request.id)}
                    >
                      <CheckIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Deny Match">
                    <span
                      className="text-2xl cursor-pointer active:opacity-50 text-red-500"
                      onClick={() => handleDeny(request.id)}
                    >
                      <MdOutlineDeleteForever />
                    </span>
                  </Tooltip>
                </>
              )}
              <Tooltip content="Manually Assign Tutor">
                <span
                  className="text-2xl text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleModifyClick(request)}
                >
                  <CiEdit />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return request[columnKey];
      }
    },
    [handleApprove, handleDeny, handleMatch, handleModifyClick]
  );

  const columns = [
    { name: "STUDENT", uid: "student" },
    { name: "SUBJECT", uid: "subject" },
    { name: "STATUS", uid: "status" },
    { name: "TUTOR", uid: "tutor" },
    { name: "ACTIONS", uid: "actions" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestsResponse, matchesResponse] = await Promise.all([
          fetch("/api/admin/past-tutor-requests"),
          fetch(
            "/api/admin/past-tutor-requests?status=pending,PENDING_CONFIRMATION"
          ),
        ]);

        if (!requestsResponse.ok || !matchesResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [requestsData, matchesData] = await Promise.all([
          requestsResponse.json(),
          matchesResponse.json(),
        ]);

        setStudentArr(requestsData);
        setUpdateArr(requestsData);
        display(requestsData, isReversed);

        const matchesWithTutors = await Promise.all(
          matchesData.map(async (match) => {
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
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center">
      <>
        <div className="flex flex-row m-4 justify-center items-center w-full z-50">
          <div className="flex justify-end items-center">
            <Switch
              checked={viewMode === "table"}
              onChange={() =>
                setViewMode(viewMode === "card" ? "table" : "card")
              }
            >
              {viewMode === "card" ? "Card View" : "Table View"}
            </Switch>
          </div>
          <Select
            className="min-w-[15%] h-10 px-4 basic-multi-select"
            classNamePrefix="select"
            options={subjectsOptions}
            placeholder={
              <div className="flex items-center">
                <IoFilter className="mr-2" />
                <span>Filter</span>
              </div>
            }
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            onChange={handleSubjectChange}
            value={selectedSubject}
            isClearable={true}
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
          ) : viewMode === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 sm:gap-x-10 gap-x-20 gap-y-10 p-4 mx-auto max-w-7xl">
              {listStudent.map((student) => (
                <StudentCard
                  key={student.id}
                  id={student.id}
                  student={student.student}
                  studentEmail={student.studentEmail}
                  subject={student.subject}
                  genderPref={student.genderPref}
                  teacherName={student.teacher?.user?.name}
                  matchedTutor={student.matchedTutor}
                  tutor={student.tutor}
                  status={student.status}
                  onMatch={handleMatch}
                  onApprove={handleApprove}
                  onDeny={handleDeny}
                  onAssign={handleAssign}
                />
              ))}
            </div>
          ) : (
            <Table aria-label="Tutor requests table">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={listStudent}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{renderCell(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
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
                      value={selectedTutor}
                      onChange={handleTutorChange}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder="Select Tutor"
                      options={tutors.map((tutor) => ({
                        value: tutor.id,
                        label: tutor.name,
                      }))}
                      maxMenuHeight={200}
                      menuPlacement="auto"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
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
