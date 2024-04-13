import { MainNav } from './mainNav'
import { UserNav } from './userNav'
import { BsThreeDots } from "react-icons/bs";

export default function Navbar() {
  return (
    <>
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 justify-between">
          <BsThreeDots className="flex md:hidden m-2" />
            <div className='flex align-center'>
              <h1 className="text-lg font-semibold tracking-wide text-primary md:mr-12">
                <span className="text-black">NHS</span> TutorMe
              </h1>
              <MainNav className="hidden md:flex" />
            </div>
           
            <div className="md:ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}