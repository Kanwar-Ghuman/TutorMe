"use client";

import React, { useState, useEffect } from "react";
import { MdOutlineEmail, MdOutlineDeleteForever } from "react-icons/md";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { PiBooks } from "react-icons/pi";
import { RxDividerVertical } from "react-icons/rx";
import { IoEllipsisVerticalOutline, IoLanguageOutline } from "react-icons/io5";
import { TbMath } from "react-icons/tb";
import { HiMiniBeaker } from "react-icons/hi2";
import { Controller, useForm } from "react-hook-form";
import { IoFilter, IoSearchOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { CalendarCheck } from "lucide-react";

import { TbMathIntegralX, TbMathMax } from "react-icons/tb";
import { GiMaterialsScience } from "react-icons/gi";
import { MdOutlinePending } from "react-icons/md";
import { Dna } from "lucide-react";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import ReactSelect from "react-select";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
} from "@nextui-org/react";

import { CiEdit } from "react-icons/ci";

const PastRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editGenderPref, setEditGenderPref] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const defaultValues = {
    subjects: [],
  };

  const form = useForm({
    defaultValues,
  });

  const subjectsOptions = [
    {
      label: "Math",
      options: [
        { value: "IM1", label: "IM1" },
        { value: "IM2", label: "IM2" },
        { value: "IM3", label: "IM3" },
        { value: "Precalc", label: "Precalculus" },
        { value: "Calc AB", label: "AP Calculus AB" },
        { value: "Calc BC", label: "AP Calculus BC" },
      ],
    },
    {
      label: "Science",
      options: [
        { value: "Physics", label: "Physics" },
        { value: "Chemistry", label: "Chemistry" },
        { value: "Biology", label: "Biology" },
        { value: "AP Physics", label: "AP Physics" },
        { value: "AP Chemistry", label: "AP Chemistry" },
        { value: "AP Biology", label: "AP Biology" },
      ],
    },
    {
      label: "Spanish",
      options: [
        { value: "Spanish 1", label: "Spanish 1" },
        { value: "Spanish 2", label: "Spanish 2" },
        { value: "Spanish 3", label: "Spanish 3" },
        { value: "Spanish 4", label: "Spanish 4" },
        { value: "Spanish 5", label: "Spanish 5" },
      ],
    },
    {
      label: "German",
      options: [
        { value: "German 1", label: "German 1" },
        { value: "German 2", label: "German 2" },
        { value: "German 3", label: "German 3" },
        { value: "German 4", label: "German 4" },
        { value: "German 5", label: "German 5" },
      ],
    },
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
      studentName: editName,
      studentEmail: editEmail,
      subject: Array.isArray(editSubject)
        ? editSubject.map((subject) => subject.value).join(", ")
        : editSubject.value,
      genderPreference: editGenderPref,
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

      setSuccess(true);

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

  const subjectIconMap = {
    IM: <TbMath size={20} />,
    Precalc: <TbMathMax size={20} />,
    Calc: <TbMathIntegralX size={20} />,
    Physics: <GiMaterialsScience size={20} />,
    Biology: <Dna size={20} />,
    Chemistry: <HiMiniBeaker size={20} />,
    Language: <IoLanguageOutline size={20} />,
    Other: <PiBooks size={20} />,
  };

  const getSubjectIcon = (subject) => {
    if (["IM1", "IM2", "IM3"].includes(subject)) {
      return subjectIconMap.IM;
    } else if (subject === "Precalc") {
      return subjectIconMap.Precalc;
    } else if (["Calc AB", "Calc BC"].includes(subject)) {
      return subjectIconMap.Calc;
    } else if (["Physics", "AP Physics"].includes(subject)) {
      return subjectIconMap.Physics;
    } else if (["Biology", "AP Biology"].includes(subject)) {
      return subjectIconMap.Biology;
    } else if (["Chemistry", "AP Chemistry"].includes(subject)) {
      return subjectIconMap.Chemistry;
    } else if (subject.includes("Spanish") || subject.includes("German")) {
      return subjectIconMap.Language;
    }
    return subjectIconMap.Other;
  };

  if (loading) {
    return (
      <div className="flex flex-col flex-wrap w-full p-8 items-center">
        <Skeleton className="rounded-lg w-2/3 mb-4">
          <div className="h-8 w-2/3 rounded-lg bg-default-300 items-center py-3"></div>
        </Skeleton>
        <div className="flex flex-row flex-wrap py-4">
          {Array.from({ length: 9 }).map((_, index) => (
            <Card
              key={index}
              className="overflow-hidden w-[1500px] sm:w-[375px] h-[320px] mb-8 p-4 space-y-5 mx-[3.2rem]"
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
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full ">
          <p className="text-2xl text-black-500">No Requests Found</p>
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center sm:mx-18 mx-15 after:content-[''] after:flex-[0_0_40%] after:mx-3 w-full">
          {requests.map((request) => (
            <Card
              key={request.id}
              className="overflow-hidden w-[38%] mb-8 h-[375px] mx-3 bg-white shadow-md  hover:shadow-[#FACC14] border border-black transition-transform duration-200 ease-in-out hover:scale-105"
            >
              <strong>
                <CardHeader className="text-black-700 text-m items-center justify-center">
                  {request.student}
                </CardHeader>
              </strong>
              <CardBody className="text-black gap-4 overflow-hidden">
                <div className="flex items-center gap-1">
                  <p className="mr-[.9rem]">Email</p>
                  <IoEllipsisVerticalOutline size={20} className="mt-1" />
                  <p>{request.studentEmail}</p>
                  <MdOutlineEmail size={20} className="mt-1" />
                </div>
                <div className="flex items-center gap-1">
                  <p>Subject</p>
                  <IoEllipsisVerticalOutline size={20} className="mt-1" />
                  <p>{request.subject}</p>
                  {getSubjectIcon(request.subject)}
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
                <div className="flex items-center justify-center flex-col">
                  <h1 className="text-center font-bold">Tutor</h1>
                  {request.subject === "Chemistry" ? (
                    <p>John A</p>
                  ) : request.subject === "AP Physics" ? (
                    <p>John A</p>
                  ) : (
                    <p>Not Yet Matched</p>
                  )}
                </div>
                <div>
                  {request.subject === "Chemistry" ? (
                    <div>
                      <strong className="text-center pb-2 flex item-center justify-start items-center">
                        Completed
                      </strong>
                      <Progress
                        color="success"
                        value={100}
                        className="max-w-xl"
                      />
                      <div className="flex justify-between pt-1">
                        <p className="text-gray-400">You are all good to go!</p>
                        <div className="justify-end">
                          <FaRegCheckCircle
                            size={25}
                            className="text-green-600"
                          />
                        </div>
                      </div>
                    </div>
                  ) : request.subject === "AP Physics" ? (
                    <div>
                      <strong className="text-center pb-2 flex item-center justify-start items-center">
                        Confirmed
                      </strong>
                      <Progress
                        value={75}
                        className="max-w-xl"
                        classNames={{
                          indicator: "bg-yellow-400",
                        }}
                      />
                      <div className="flex justify-between pt-1">
                        <p className="text-gray-400">
                          Waiting for Mr.Decker to confirm
                        </p>
                        <div className="flex justify-end">
                          <CalendarCheck
                            size={25}
                            className="text-orange-600"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      <strong className="text-center pb-2 flex item-center justify-start items-center">
                        Pending
                      </strong>

                      <Progress
                        color="danger"
                        value={30}
                        className="max-w-xl"
                      />
                      <div className="flex justify-between pt-1">
                        <p className="text-gray-400">
                          Waiting for tutor to confirm
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
      )}
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
export default PastRequests;
