"use client";

import React, { useState, useEffect } from "react";
import {
  subjectsOptions,
  formatOptionLabel,
  customStyles,
  getSubjectIcon,
  getSubjectColor,
} from "@/components/utils/common";
import { Controller, useForm } from "react-hook-form";
import { IoFilter, IoSearchOutline } from "react-icons/io5";
import { Form } from "@/components/ui/form";
import { EditIcon, DeleteIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Switch,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Input,
} from "@nextui-org/react";
import Link from "next/link";
import { Spinner } from "@nextui-org/react";
import { Loader2 } from "lucide-react";
import Select from "react-select";
import { cn } from "@/lib/utils";
import AcceptStudentCard from "@/components/utils/acceptStudentCard";

const TutorOverview = () => {
  const [studentArr, setStudentArr] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editSubjects, setEditSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [filteredStudents, setFilteredStudents] = useState([]);

  const [viewMode, setViewMode] = useState("card");
  const [activeRequests, setActiveRequests] = useState([]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/admin/tutors/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete request");
      }
      setListStudent((prev) => prev.filter((student) => student.id !== id));
      setFilteredStudents((prev) =>
        prev.filter((student) => student.id !== id)
      );
      setStudentArr((prev) => prev.filter((student) => student.id !== id));
      toast({
        title: "Success",
        description: "Tutor deleted successfully",
        variant: "default",
        className: "bg-green-500 text-white",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to delete tutor:", error);
      toast({
        title: "Error",
        description: "Failed to delete tutor",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  const handleModifyClick = (tutor) => {
    setSelectedRequest(tutor);
    setEditName(tutor.studentName);
    setEditEmail(tutor.tutorName);
    setEditSubjects(
      tutor.subjects.map((subject) => ({ value: subject, label: subject }))
    );
    onOpen();
  };

  const handleModifyClickTable = (tutor) => {
    setSelectedRequest(tutor);
    setEditName(tutor.name);
    setEditEmail(tutor.email);
    setEditSubjects(
      tutor.subjects.map((subject) => ({ value: subject, label: subject }))
    );
    onOpen();
  };

  const renderCell = React.useCallback(
    (tutor, columnKey) => {
      switch (columnKey) {
        case "name":
          const initials = tutor.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
          return (
            <User
              name={tutor.name}
              description={tutor.email}
              avatarProps={{
                src: null,
                name: initials,
                color: "primary",
              }}
            >
              {tutor.email}
            </User>
          );
        case "subjects":
          return (
            <div className="flex flex-wrap gap-1">
              {tutor.subjects.map((subject, index) => (
                <Chip
                  size="sm"
                  className={cn(
                    getSubjectColor(subject),
                    "flex items-center gap-1 px-2"
                  )}
                  endContent={getSubjectIcon(subject)}
                >
                  {subject}
                </Chip>
              ))}
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Modify tutor">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleModifyClickTable(tutor)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete tutor">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleDelete(tutor.id)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return tutor[columnKey];
      }
    },
    [handleModifyClickTable, handleDelete]
  );

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "SUBJECTS", uid: "subjects" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const defaultValues = {
    subjects: [],
  };
  const form = useForm({
    defaultValues,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/tutors");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStudentArr(data);
        setFilteredStudents(data);
        display(data, isReversed);
      } catch (error) {
        console.error("Failed to fetch tutor requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (studentArr.length > 0) {
      filterStudents();
    }
  }, [selectedSubjects, searchTerm, studentArr]);

  const filterStudents = () => {
    if (!studentArr) return;
    let filtered = studentArr;

    if (searchTerm) {
      filtered = filtered.filter((student) => innerSearch(student, searchTerm));
    }

    if (selectedSubjects.length > 0) {
      filtered = filtered.filter((student) =>
        selectedSubjects.every((subject) =>
          student.subjects.includes(subject.value)
        )
      );
    }

    setFilteredStudents(filtered);
  };

  const handleSubjectChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions || []); // Ensure it's always an array
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const search = (value) => {
    const searchTerm = value.toLowerCase().trim();
    const returnArr = studentArr.filter((student) =>
      innerSearch(student, searchTerm)
    );
    setFilteredStudents(returnArr);
    display(returnArr, isReversed);
  };

  const innerSearch = (student, searchTerm) => {
    const searchFields = [
      student.name,
      student.email,
      ...(student.subjects || []),
    ];

    return searchFields.some(
      (field) => field && field.toLowerCase().includes(searchTerm)
    );
  };

  const display = (returnArr, reverse) => {
    let myTempArr = JSON.parse(JSON.stringify(returnArr));
    if (reverse) {
      myTempArr.reverse();
    }
    setListStudent(myTempArr);
  };

  const handleSaveClick = async () => {
    setIsSubmitting(true);
    setError("");

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
        const errors = await response.json();
        console.log(errors.error);
        setError(JSON.stringify(errors.error));
        return;
      }

      const updatedData = await response.json();

      const formattedUpdatedData = {
        id: selectedRequest.id,
        name: updatedData.name || editName,
        email: updatedData.email || editEmail,
        subjects:
          updatedData.subjects || editSubjects.map((subject) => subject.value),
      };

      setFilteredStudents((prev) =>
        prev.map((student) =>
          student.id === selectedRequest.id ? formattedUpdatedData : student
        )
      );
      setStudentArr((prev) =>
        prev.map((student) =>
          student.id === selectedRequest.id ? formattedUpdatedData : student
        )
      );

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Failed to update tutor:", error);
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tutorsResponse, requestsResponse] = await Promise.all([
          fetch("/api/admin/tutors"),
          fetch(
            "/api/admin/past-tutor-requests?status=APPROVED,PENDING_CONFIRMATION"
          ),
        ]);

        if (!tutorsResponse.ok || !requestsResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [tutorsData, requestsData] = await Promise.all([
          tutorsResponse.json(),
          requestsResponse.json(),
        ]);

        const activeRequestsMap = new Map();
        requestsData.forEach((request) => {
          if (request.tutor || request.matchedTutor) {
            const tutorId = request.tutor?.id || request.matchedTutor?.id;
            if (!activeRequestsMap.has(tutorId)) {
              activeRequestsMap.set(tutorId, []);
            }
            activeRequestsMap.get(tutorId).push(request);
          }
        });

        const tutorsWithRequests = tutorsData.map((tutor) => ({
          ...tutor,
          activeRequests: activeRequestsMap.get(tutor.id) || [],
        }));

        setStudentArr(tutorsWithRequests);
        setFilteredStudents(tutorsWithRequests);
        display(tutorsWithRequests, isReversed);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
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
    <div className="h-full flex flex-col  ">
      {studentArr.length === 0 ? (
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
          <div className="flex flex-row m-4 justify-center items-center w-full space-x-4 z-50">
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
            <Form {...form}>
              <form>
                <Controller
                  name="subjects"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      options={subjectsOptions}
                      className="w-full h-10  basic-multi-select"
                      classNamePrefix="select"
                      placeholder={
                        <div className="flex items-center">
                          <IoFilter className="mr-2" />
                          <span>Filter</span>
                        </div>
                      }
                      isDisabled={loading}
                      isClearable={true}
                      onChange={handleSubjectChange}
                      value={selectedSubjects}
                      styles={customStyles}
                      formatOptionLabel={formatOptionLabel}
                    />
                  )}
                />
              </form>
            </Form>
            <div className=" w-2/3">
              <Input
                type="text"
                id="inputSearch"
                placeholder="Search for tutor"
                className="w-[80%] h-10 pl-5 pr-4 "
                onChange={handleSearchChange}
                value={searchTerm}
                onKeyUp={(event) => {
                  search(event.target.value);
                }}
                startContent={
                  <IoSearchOutline className="text-gray-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredStudents.length === 0 ? (
              <p className="text-2xl mt-4 text-center">
                No tutors found with this criteria
              </p>
            ) : viewMode === "card" ? (
              <div className="flex justify-center">
                <div className="space-y-4 px-4 w-full max-w-7xl">
                  {filteredStudents.map((student) => (
                    <AcceptStudentCard
                      id={student.id}
                      studentName={student.name}
                      tutorName={student.email}
                      subjects={student.subjects || []}
                      activeRequests={student.activeRequests} // Add this prop
                      onDelete={handleDelete}
                      onModify={handleModifyClick}
                      key={student.id}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Table aria-label="Tutors table">
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
                <TableBody items={filteredStudents}>
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
                  <div className="relative">
                    {isSubmitting && (
                      <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                        <Spinner size="lg" />
                      </div>
                    )}
                    <div
                      className={
                        isSubmitting ? "pointer-events-none opacity-50" : ""
                      }
                    >
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          disabled={isSubmitting}
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
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Subjects
                        </label>
                        <Select
                          isMulti
                          value={editSubjects}
                          onChange={setEditSubjects}
                          options={subjectsOptions}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          placeholder="Select subjects"
                          isDisabled={isSubmitting}
                          styles={customStyles}
                          formatOptionLabel={formatOptionLabel}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  disabled={isSubmitting}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleSaveClick}
                  disabled={isSubmitting || success}
                  className={cn("", {
                    "bg-green-500": success,
                    "hover:bg-green-600": success,
                  })}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
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

export default TutorOverview;
