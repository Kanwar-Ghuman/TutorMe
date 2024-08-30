import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { MdOutlineEmail } from "react-icons/md";
import { getSubjectIcon } from "@/components/utils/common";

const TutorCard = ({ name, email, tutorName, subject }) => {
  return (
    <Card className="w-80 bg-white shadow-lg hover:shadow-[#FACC14] border border-gray-200 transition-transform duration-200 ease-in-out hover:scale-105 rounded-lg m-4">
      <CardHeader className="flex flex-col items-center justify-center pb-2">
        <h2 className="text-xl font-bold text-black">{name}</h2>
        <div className="flex items-center gap-1 text-gray-400">
          <MdOutlineEmail size={16} />
          <p className="text-sm">{email}</p>
        </div>
        <div className="flex items-center gap-1 text-black">
          <p className="text-md pt-3 ">
            <strong>Tutor:</strong> {tutorName}
          </p>
        </div>
      </CardHeader>
      <CardBody className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">{subject}</p>
          {getSubjectIcon(subject)}
        </div>
      </CardBody>
    </Card>
  );
};
export default TutorCard;
