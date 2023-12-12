import { Outlet } from "react-router-dom"
import Sidebar from "../ui/Sidebar"

const Profile = () => {

  

  return (
    <div className="sm:grid grid-cols-4 gap-4 col-span-3">
      <Sidebar />
      <Outlet />

    </div>
  )
}

export default Profile