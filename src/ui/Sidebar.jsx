import { useSelector } from "react-redux"
import { BsCart2, BsPerson, BsHeart,BsArrowReturnRight, BsEnvelope} from "react-icons/bs";
import "./Sidebar.css"
import SidebarItem from "./SidebarItem";

function Sidebar() {
    const user = useSelector(state => state.auth.user)

    const userData = JSON.parse(user)

    return (
        <div className="">
            <div className="flex flex-col items-center">
                <img className="rounded-full w-32 h-32" src={userData.photo} />
                <p className="font-semibold"> {userData.name?.firstName} {userData.name?.lastName} </p>
                <p className="font-semibold flex items-center gap-2"><BsEnvelope /> {userData.email} </p>
            </div>
            <ul className="sm:space-y-2 flex sm:flex-col  items-center mt-10">
                <SidebarItem icon={<BsPerson />} text="My Profile" to="/profile/me" />
                <SidebarItem icon={<BsCart2 />} text="My Orders" to="/profile/orders" />
                <SidebarItem icon={<BsHeart />} text="Wishlist" to="/profile/wishlist" />
                <SidebarItem icon={<BsArrowReturnRight />} text="Logout" to="/login" />
                 
            </ul>
        </div>
    )
}

export default Sidebar
