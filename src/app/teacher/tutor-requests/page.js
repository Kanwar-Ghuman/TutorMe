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
import { MdOutlineDeleteForever, MdAssignment } from "react-icons/md";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { Controller, useForm } from "react-hook-form";
import { IoFilter, IoSearchOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { CalendarCheck } from "lucide-react";
import { MdOutlinePending } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Loader2, CheckIcon } from "lucide-react";
import { Form } from "@/components/ui/form";
import ReactSelect from "react-select";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Button,
  Input,
  Skeleton,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Progress,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
  User,
  Tooltip,
} from "@nextui-org/react";

import { CiEdit } from "react-icons/ci";

const TeacherTutorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [listStudent, setListStudent] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editGenderPref, setEditGenderPref] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [studentArr, setStudentArr] = useState([]);
  const [updateArr, setUpdateArr] = useState([]);
  const [isReversed, setIsReversed] = useState(false);
  const [viewMode, setViewMode] = useState("card");
  const { toast } = useToast();

  // const getTutorName = (request) => {
  //   if (request.status === "APPROVED") {
  //     if (request.tutor?.name) {
  //       return request.tutor.name;
  //     }
  //     if (request.matchedTutor?.name) {
  //       return request.matchedTutor.name;
  //     }
  //   }

  //   if (
  //     request.status === "PENDING_CONFIRMATION" &&
  //     request.matchedTutor?.name
  //   ) {
  //     return `${request.matchedTutor.name} (Pending)`;
  //   }

  //   return "No Tutor Yet";
  // };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/teacher/past-tutor-requests");
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data = await response.json();
        setStudentArr(data);
        setUpdateArr(data);
        display(data, isReversed);
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

  const defaultValues = {
    subjects: [],
  };

  const form = useForm({
    defaultValues,
  });

  const renderCell = React.useCallback((request, columnKey) => {
    switch (columnKey) {
      case "stage":
        return (
          <div className="flex justify-start items-start mx-2">
            <Tooltip
              content={
                request.subject === "Chemistry"
                  ? "Complete"
                  : request.subject === "AP Physics"
                  ? "Confirmed"
                  : "Pending"
              }
              className={cn(
                "text-white font-medium",
                getStageColor(request.subject)
              )}
            >
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  getStageColor(request.subject)
                )}
              />
            </Tooltip>
          </div>
        );
      case "student":
        const initials = request.student
          .split(" ")
          .map((name) => name[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
        return (
          <User
            name={request.student}
            description={request.studentEmail}
            avatarProps={{
              src: null,
              name: initials,
              color: "primary",
            }}
          >
            {request.studentEmail}
          </User>
        );
      case "subject":
        return (
          <div className="flex items-center gap-2">
            <Chip
              size="sm"
              className={cn(
                getSubjectColor(request.subject),
                "flex items-center gap-1 px-2"
              )}
              endContent={getSubjectIcon(request.subject)}
            >
              {request.subject}
            </Chip>
          </div>
        );
      case "teacher":
        return request.teacher?.user?.name || "Unassigned";
      case "genderPref":
        switch (request.genderPref) {
          case "F":
            return "Female";
          case "M":
            return "Male";
          default:
            return "No Preference";
        }
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Assign Tutor">
              <span
                className="text-lg text-primary cursor-pointer active:opacity-50"
                onClick={() => handleAssign(request)}
              >
                <MdAssignment />
              </span>
            </Tooltip>
            <Tooltip content="Confirm Request">
              <span
                className="text-lg  cursor-pointer active:opacity-50 text-green-500"
                onClick={() => handleAssign(request)}
              >
                <CheckIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return request[columnKey];
    }
  }, []);

  const columns = [
    { name: "STUDENT", uid: "student" },
    { name: "SUBJECT", uid: "subject" },
    { name: "GENDER PREFERENCE", uid: "genderPref" },
    { name: "ASSIGNED TUTOR", uid: "teacher" },
    { name: "STAGE", uid: "stage" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/teacher/tutor-request/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      setRequests((prev) => prev.filter((request) => request.id !== id));
      setListStudent((prev) => prev.filter((request) => request.id !== id));
      setStudentArr((prev) => prev.filter((request) => request.id !== id));

      toast({
        title: "Success",
        description: "Tutor request deleted successfully",
        variant: "default",
        className: "bg-green-500 text-white",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to delete request:", error);
    }
  };

  const handleModifyClick = (request) => {
    setSelectedRequest(request);
    setEditName(request.student);
    setEditEmail(request.studentEmail);
    setEditSubject(
      request.subject
        .split(",")
        .map((subj) => ({ value: subj.trim(), label: subj.trim() }))
    );
    setEditGenderPref(request.genderPref);
    onOpen();
  };

  const handleSaveClick = async () => {
    setFormLoading(true);
    setError("");
    setIsProcessing(true);

    const updatedRequest = {
      ...selectedRequest,
      student: editName,
      studentEmail: editEmail,
      subject: Array.isArray(editSubject)
        ? editSubject.map((subject) => subject.value).join(", ")
        : editSubject.value,
      genderPref: editGenderPref,
    };

    try {
      const response = await fetch(
        `/api/teacher/tutor-request/${selectedRequest.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRequest),
        }
      );

      if (!response.ok) {
        const errors = await response.json();
        console.log(errors.error);
        setError(JSON.stringify(errors.error));
        return;
      }

      const updatedData = await response.json();

      setRequests((prev) =>
        prev.map((request) =>
          request.id === selectedRequest.id
            ? { ...request, ...updatedRequest }
            : request
        )
      );
      setListStudent((prev) =>
        prev.map((request) =>
          request.id === selectedRequest.id
            ? { ...request, ...updatedRequest }
            : request
        )
      );
      setStudentArr((prev) =>
        prev.map((request) =>
          request.id === selectedRequest.id
            ? { ...request, ...updatedRequest }
            : request
        )
      );

      setSuccess(true);
      toast({
        title: "Success",
        description: "Tutor request modified successfully",
        variant: "default",
        className: "bg-green-500 text-white",
        duration: 3000,
      });
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Failed to update request:", error);
      setError("An unexpected error occurred.");
    } finally {
      setFormLoading(false);
      setIsProcessing(false);
    }
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
    if (reverse) {
      myTempArr.reverse();
    }
    setListStudent(myTempArr);
  };

  if (loading) {
    return (
      <div className="flex flex-col flex-wrap w-full items-center">
        <Skeleton className="rounded-lg w-2/3 mb-4">
          <div className="h-8 w-2/3 rounded-lg bg-default-300 items-center py-3"></div>
        </Skeleton>
        <div className="flex flex-row flex-wrap py-4 justify-center">
          {Array.from({ length: 9 }).map((_, index) => (
            <Card
              key={index}
              className="overflow-hidden w-[38%] h-[320px] mb-8 p-4 space-y-5 mx-[3.2rem]"
            >
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
      </div>
    );
  }

  return (
    <div className="flex flex-wrap flex-col items-start w-full p-4">
      <div className="w-full justify-center items-start flex flex-row mb-8">
        <Switch
          checked={viewMode === "table"}
          onChange={() => setViewMode(viewMode === "card" ? "table" : "card")}
        >
          {viewMode === "card" ? "Card View" : "Table View"}
        </Switch>
        <ReactSelect
          className=" w-[15%]  h-10 px-4 basic-multi-select"
          options={subjectsOptions}
          classNamePrefix="select"
          placeholder={
            <div className="flex items-center">
              <IoFilter className="mr-2" />
              <span>Filter</span>
            </div>
          }
          styles={customStyles}
          formatOptionLabel={formatOptionLabel}
          isClearable={true}
        />
        <Input
          type="text"
          id="inputSearch"
          placeholder="Search"
          className="sm:w-[50%] w-[60%]"
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
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {requests.map((request) => (
              <Card
                key={request.id}
                className="overflow-hidden w-[38%] mb-8 h-[360px] mx-3 bg-white border hover:shadow-[#FACC14] shadow-lg transition-transform duration-200 ease-in-out hover:scale-105"
              >
                <strong>
                  <CardHeader className="text-black-700 text-m items-center justify-center flex-col">
                    {request.student}
                    <p className="text-gray-400">{request.studentEmail}</p>
                  </CardHeader>
                </strong>
                <CardBody className="text-black gap-4 overflow-hidden">
                  <div className="flex items-center gap-1">
                    <p>Subject</p>
                    <IoEllipsisVerticalOutline size={20} className="mt-1" />
                    <Chip
                      size="md"
                      className={cn(
                        getSubjectColor(request.subject),
                        "flex items-center gap-1 px-2 mt-1"
                      )}
                      endContent={getSubjectIcon(request.subject)}
                    >
                      {request.subject}
                    </Chip>
                  </div>
                  <div className="flex items-center gap-1">
                    <p>Gender Preference</p>
                    <IoEllipsisVerticalOutline size={20} className="mt-1" />
                    {request.genderPref === "F" ? (
                      <p>Female</p>
                    ) : request.genderPref === "M" ? (
                      <p>Male</p>
                    ) : (
                      <p>No Preference</p>
                    )}
                  </div>
                  <div className="flex justify-start flex-row">
                    <p className="text-center">Tutor</p>
                    <IoEllipsisVerticalOutline size={20} className="mt-1" />
                    <p> {request.tutor?.name || request.matchedTutor?.name}</p>
                  </div>
                  <div>
                    {request.status === "APPROVED" ? (
                      <div>
                        <strong className="text-center pb-2 flex item-center justify-start items-center">
                          Approved
                        </strong>
                        <Progress
                          value={100}
                          className="max-w-xl"
                          classNames={{ indicator: "bg-green-500" }}
                        />
                        <div className="flex justify-between pt-1">
                          <p className="text-gray-400">
                            Tutor has been assigned!
                          </p>
                          <div className="flex justify-end">
                            <FaRegCheckCircle
                              size={25}
                              className="text-green-600"
                            />
                          </div>
                        </div>
                      </div>
                    ) : request.status === "PENDING_CONFIRMATION" ? (
                      <div>
                        <strong className="text-center pb-2 flex item-center justify-start items-center">
                          Pending Confirmation
                        </strong>
                        <Progress
                          value={75}
                          className="max-w-xl"
                          classNames={{ indicator: "bg-yellow-400" }}
                        />
                        <div className="flex justify-between pt-1">
                          <p className="text-gray-400">
                            Waiting for confirmation by Mr.Decker
                          </p>
                          <div className="flex justify-end">
                            <MdOutlinePending
                              size={30}
                              className="text-orange-600"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <strong className="text-center pb-2 flex item-center justify-start items-center">
                          Pending Match
                        </strong>
                        <Progress
                          color="danger"
                          value={30}
                          className="max-w-xl"
                        />
                        <div className="flex justify-between pt-1">
                          <p className="text-gray-400">
                            Waiting for tutor match
                          </p>
                          <div className="flex justify-end">
                            <MdOutlinePending
                              size={30}
                              className="text-red-600"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardBody>
                <CardFooter className="justify-end gap-4">
                  <Button
                    color="danger"
                    variant="bordered"
                    size="sm"
                    icon={MdOutlineDeleteForever}
                    endContent={<MdOutlineDeleteForever size="20" />}
                    onClick={() => handleDelete(request.id)}
                  ></Button>
                  <Button
                    auto
                    color="primary"
                    icon={CiEdit}
                    size="sm"
                    endContent={<CiEdit size="20" />}
                    onClick={() => handleModifyClick(request)}
                  ></Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Table aria-label="Past Requests table">
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
      <Modal isOpen={isOpen} onOpenChange={onClose} isDisabled={isProcessing}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modify Request
              </ModalHeader>
              <ModalBody>
                {selectedRequest && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Student Name
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Student Email
                      </label>
                      <input
                        type="text"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Subjects (comma separated)
                      </label>
                      <ReactSelect
                        value={editSubject}
                        onChange={(selectedOptions) =>
                          setEditSubject(selectedOptions)
                        }
                        options={subjectsOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder="Select subjects"
                        styles={customStyles}
                        formatOptionLabel={formatOptionLabel}
                        isDisabled={isProcessing}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Gender Preference
                      </label>
                      <select
                        value={editGenderPref}
                        onChange={(e) => setEditGenderPref(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        disabled={isProcessing}
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="N">No Preference</option>
                      </select>
                    </div>
                  </>
                )}
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
                  onPress={handleSaveClick}
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
export default TeacherTutorRequests;
