import { IoFilter, IoSearchOutline } from "react-icons/io5";
import {
  TbMath,
  TbMathMax,
  TbMathIntegralX,
  TbNoDerivatives,
} from "react-icons/tb";
import { HiMiniBeaker } from "react-icons/hi2";
import { GiMaterialsScience } from "react-icons/gi";
import { Dna, SigmaIcon } from "lucide-react";
import { PiBooks } from "react-icons/pi";
import { IoLanguageOutline } from "react-icons/io5";
import { LuSigma } from "react-icons/lu";
import { FaCalculator } from "react-icons/fa6";

export const subjectIconMap = {
  IM: <TbMath size={20} />,
  Precalc: <TbMathMax size={20} />,
  Calc: <TbMathIntegralX size={20} />,
  Physics: <GiMaterialsScience size={20} />,
  Biology: <Dna size={20} />,
  Chemistry: <HiMiniBeaker size={20} />,
  Language: <IoLanguageOutline size={20} />,
  Other: <PiBooks size={20} />,
};

export const getStageColor = (status) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-500";
    case "CONFIRMED":
      return "bg-blue-500";
    case "PENDING_CONFIRMATION":
      return "bg-yellow-500";
    case "PENDING":
    default:
      return "bg-red-500";
  }
};

export const subjectsOptions = [
  {
    label: "Math",
    options: [
      { value: "IM1", label: "IM1", icon: subjectIconMap.IM },
      { value: "IM2", label: "IM2", icon: subjectIconMap.IM },
      { value: "IM3", label: "IM3", icon: subjectIconMap.IM },
      {
        value: "Precalc",
        label: "Precalculus",
        icon: subjectIconMap.Precalc,
      },
      {
        value: "Calc AB",
        label: "AP Calculus AB",
        icon: subjectIconMap.Calc,
      },
      {
        value: "Calc BC",
        label: "AP Calculus BC",
        icon: subjectIconMap.Calc,
      },
    ],
  },
  {
    label: "Science",
    options: [
      { value: "Physics", label: "Physics", icon: subjectIconMap.Physics },
      {
        value: "Chemistry",
        label: "Chemistry",
        icon: subjectIconMap.Chemistry,
      },
      { value: "Biology", label: "Biology", icon: subjectIconMap.Biology },
      {
        value: "AP Physics",
        label: "AP Physics",
        icon: subjectIconMap.Physics,
      },
      {
        value: "AP Chemistry",
        label: "AP Chemistry",
        icon: subjectIconMap.Chemistry,
      },
      {
        value: "AP Biology",
        label: "AP Biology",
        icon: subjectIconMap.Biology,
      },
    ],
  },
  {
    label: "Spanish",
    options: [
      {
        value: "Spanish 1",
        label: "Spanish 1",
        icon: subjectIconMap.Language,
      },
      {
        value: "Spanish 2",
        label: "Spanish 2",
        icon: subjectIconMap.Language,
      },
      {
        value: "Spanish 3",
        label: "Spanish 3",
        icon: subjectIconMap.Language,
      },
      {
        value: "Spanish 4",
        label: "Spanish 4",
        icon: subjectIconMap.Language,
      },
      {
        value: "Spanish 5",
        label: "Spanish 5",
        icon: subjectIconMap.Language,
      },
    ],
  },
  {
    label: "German",
    options: [
      { value: "German 1", label: "German 1", icon: subjectIconMap.Language },
      { value: "German 2", label: "German 2", icon: subjectIconMap.Language },
      { value: "German 3", label: "German 3", icon: subjectIconMap.Language },
      { value: "German 4", label: "German 4", icon: subjectIconMap.Language },
      { value: "German 5", label: "German 5", icon: subjectIconMap.Language },
    ],
  },
];

export const getSubjectIcon = (subject) => {
  if (["IM1", "IM2", "IM3"].includes(subject)) {
    return <TbMath size={20} />;
  } else if (subject === "Precalc") {
    return <TbMathMax size={20} />;
  } else if (["Calc BC", "CalcBC"].includes(subject)) {
    return <TbMathIntegralX size={20} />;
  } else if (["Calc AB", "CalcAB"].includes(subject)) {
    return <SigmaIcon size={20} />;
  } else if (["Physics", "AP Physics"].includes(subject)) {
    return <GiMaterialsScience size={20} />;
  } else if (["Biology", "AP Biology"].includes(subject)) {
    return <Dna size={20} />;
  } else if (["Chemistry", "AP Chemistry"].includes(subject)) {
    return <HiMiniBeaker size={20} />;
  } else if (subject.includes("Spanish") || subject.includes("German")) {
    return <IoLanguageOutline size={20} />;
  }
  return <PiBooks size={20} />;
};

export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    width: "auto",
  }),
  menu: (provided) => ({
    ...provided,
    width: "auto", // This will make the menu as wide as the control
    minWidth: "100%", // Ensures the menu is at least as wide as the control
  }),
  menuList: (provided) => ({
    ...provided,
    width: "auto", // This will make the menu list as wide as the menu
  }),
};

export const formatOptionLabel = ({ value, label, icon }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    {icon}
    <span style={{ marginLeft: "10px" }}>{label}</span>
  </div>
);

export const getSubjectColor = (subject) => {
  if (
    [
      "IM1",
      "IM2",
      "IM3",
      "Precalc",
      "Calc AB",
      "Calc BC",
      "CalcBC",
      "CalcAB",
    ].includes(subject)
  ) {
    return "bg-math text-white";
  } else if (["Physics", "AP Physics"].includes(subject)) {
    return "bg-physics text-white";
  } else if (["Biology", "AP Biology"].includes(subject)) {
    return "bg-biology text-white";
  } else if (["Chemistry", "AP Chemistry"].includes(subject)) {
    return "bg-chemistry text-white";
  } else if (subject.includes("Spanish") || subject.includes("German")) {
    return "bg-language text-white";
  }
  return "bg-other text-white";
};

export const formSubjectsOptions = [
  {
    label: "Math",
    group: [
      { value: "IM1", label: "IM1" },
      { value: "IM2", label: "IM2" },
      { value: "IM3", label: "IM3" },
      {
        value: "Precalc",
        label: "Precalculus",
      },
      {
        value: "Calc AB",
        label: "AP Calculus AB",
      },
      {
        value: "Calc BC",
        label: "AP Calculus BC",
      },
    ],
  },
  {
    label: "Science",
    group: [
      { value: "Physics", label: "Physics" },
      {
        value: "Chemistry",
        label: "Chemistry",
      },
      { value: "Biology", label: "Biology" },
      {
        value: "AP Physics",
        label: "AP Physics",
      },
      {
        value: "AP Chemistry",
        label: "AP Chemistry",
      },
      {
        value: "AP Biology",
        label: "AP Biology",
      },
    ],
  },
  {
    label: "Spanish",
    group: [
      {
        value: "Spanish 1",
        label: "Spanish 1",
      },
      {
        value: "Spanish 2",
        label: "Spanish 2",
      },
      {
        value: "Spanish 3",
        label: "Spanish 3",
      },
      {
        value: "Spanish 4",
        label: "Spanish 4",
      },
      {
        value: "Spanish 5",
        label: "Spanish 5",
      },
    ],
  },
  {
    label: "German",
    group: [
      { value: "German 1", label: "German 1" },
      { value: "German 2", label: "German 2" },
      { value: "German 3", label: "German 3" },
      { value: "German 4", label: "German 4" },
      { value: "German 5", label: "German 5" },
    ],
  },
];
