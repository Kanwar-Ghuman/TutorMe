import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { MdOutlineEmail } from "react-icons/md";
import { TbMath, TbMathMax, TbMathIntegralX } from "react-icons/tb";
import { HiMiniBeaker } from "react-icons/hi2";
import { GiMaterialsScience } from "react-icons/gi";
import { Dna } from "lucide-react";
import { IoLanguageOutline } from "react-icons/io5";
import { PiBooks } from "react-icons/pi";

const TutorCard = ({ name, email, subject }) => {
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

  return (
    <Card className="w-80 bg-white shadow-lg hover:shadow-[#FACC14] border border-gray-200 transition-transform duration-200 ease-in-out hover:scale-105 rounded-lg m-4">
      <CardHeader className="flex flex-col items-center justify-center pb-2">
        <h2 className="text-xl font-bold text-black">{name}</h2>
        <div className="flex items-center gap-1 text-gray-400">
          <MdOutlineEmail size={16} />
          <p className="text-sm">{email}</p>
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