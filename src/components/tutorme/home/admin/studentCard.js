"use client";

import { getSubjectIcon } from "@/components/utils/common";
import { IoEllipsisVerticalOutline, IoLanguageOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { MdAssignment } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { CalendarCheck } from "lucide-react";
import { MdOutlinePending } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Progress,
} from "@nextui-org/react";

const StudentCard = ({ id, student, studentEmail, subject, genderPref }) => {
  return (
    <div>
      <Card className="w-10/12 h-[360px] bg-white shadow-md hover:shadow-[#FACC14] border border-black transition-transform duration-200 ease-in-out hover:scale-105 mx-10">
        <CardHeader className="text-black-700  items-center justify-center flex-col">
          <strong>{student}</strong>
          <div className="flex items-center gap-1 flex-row text-gray-400">
            {" "}
            <p>{studentEmail}</p>
          </div>
        </CardHeader>
        <CardBody className="text-black gap-4 overflow-hidden ">
          <div className="flex items-center gap-1">
            <p>Subject</p>
            <IoEllipsisVerticalOutline size={20} className="mt-1" />
            <p>{subject}</p>
            {getSubjectIcon(subject)}
          </div>
          <div className="flex items-center gap-1">
            <p>Gender Preference</p>
            <IoEllipsisVerticalOutline size={20} className="mt-1" />
            {genderPref === "F" ? (
              <p>Female</p>
            ) : genderPref === "M" ? (
              <p>Male</p>
            ) : (
              <p>No Preference</p>
            )}
          </div>
          <div className="flex items-start justify-start flex-row">
            <p className="text-center">Tutor</p>
            <IoEllipsisVerticalOutline size={20} className="mt-1" />
            {subject === "Chemistry" ? (
              <p>John A</p>
            ) : subject === "AP Physics" ? (
              <p>John A</p>
            ) : (
              <p>Not Yet Matched</p>
            )}
          </div>
          <div>
            {subject === "Chemistry" ? (
              <div>
                <strong className="text-center pb-2 flex item-center justify-start items-center">
                  Completed
                </strong>
                <Progress color="success" value={100} className="max-w-md" />
                <div className="flex justify-between pt-1">
                  <p className="text-gray-400">You are all good to go!</p>
                  <div className="justify-end">
                    <FaRegCheckCircle size={25} className="text-green-600" />
                  </div>
                </div>
              </div>
            ) : subject === "AP Physics" ? (
              <div>
                <strong className="text-center pb-2 flex item-center justify-start items-center">
                  Confirmed
                </strong>
                <Progress
                  color="warning"
                  value={75}
                  className="max-w-md"
                  classNames={{
                    indicator: "bg-yellow-400",
                  }}
                />
                <div className="flex justify-between pt-1">
                  <p className="text-gray-400">Waiting for you to confirm</p>
                  <div className="flex justify-end">
                    <CalendarCheck size={25} className="text-orange-600" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <strong className="text-center pb-2 flex item-center justify-start items-center">
                  Pending
                </strong>
                <Progress color="danger" value={30} className="max-w-md" />
                <div className="flex justify-between pt-1">
                  <p className="text-gray-400">Waiting for tutor to confirm</p>
                  <div className="flex justify-end">
                    <MdOutlinePending size={30} className="text-red-600" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardBody>
        {subject != "Chemistry" || subject === "AP Physics" ? (
          <CardFooter className="justify-end gap-2 mb-2">
            {subject === "AP Physics" ? (
              <Button
                auto
                className="bg-gradient-to-tr from-green-600 to-green-300 text-white"
                icon={FaCheck}
                size="md"
                endContent={<FaCheck size="15" />}
              >
                Confirm
              </Button>
            ) : subject != "Chemistry" ? (
              <Button
                className="bg-gradient-to-tr from-primary to-yellow-200"
                size="md"
                icon={MdAssignment}
                endContent={<MdAssignment size="20" />}
                onClick={() =>
                  onAssign({ id, student, studentEmail, subject, genderPref })
                }
              >
                Assign Tutor
              </Button>
            ) : (
              <></>
            )}
          </CardFooter>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};
export default StudentCard;
