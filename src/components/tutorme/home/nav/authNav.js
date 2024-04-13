import { MainNav } from "./mainNav";
import { UserNav } from "./userNav";
import { BsThreeDots } from "react-icons/bs";

export default function authNav() {
  return (
    <>
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 justify-between">
            <BsThreeDots className="flex md:hidden m-2" />
            <div className="flex align-center">
              <h1 className="text-xl sm:text-3xl md:text-3xl lg:text-2xl font-bold tracking-wide font-inter-bold ">
                TutorMe Beta
              </h1>
            </div>
            <div className=" hidden md:flex  align-center">
              <h2 className="text-xl sm:text-3xl md:text-3xl lg:text-2xl font-bold tracking-wide font-inter-bold">
                <span className="text-yellow-text">Franklin</span> NHS
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
