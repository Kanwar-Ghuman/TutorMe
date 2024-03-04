import { MainNav } from './mainNav'
import { UserNav } from './userNav'

export default function Navbar() {
  return (
    <>
      <div className="flex flex-col">
        <div className="border-b">
          {/* <MainNav /> */}
          <MainNav />
        </div>
      </div>
    </>
  )
}