import { MainNav } from './mainNav'
import { UserNav } from './userNav'

export default function Navbar() {
  return (
    <>
      <div className="flex flex-col">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <div className='flex align-center'>
              <h1 className="text-lg font-semibold tracking-wide text-primary mr-12">
                NHS <span className="text-yellow-500">TutorMe</span>
              </h1>
              <MainNav />
            </div>
           
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}