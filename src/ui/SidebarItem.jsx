import PropTypes from 'prop-types';
import {  BsArrowRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function SidebarItem({text, icon, to}) {
    return (
        <div className="bg-blue-500 sm:w-3/4 py-1  me-[2px] ps-[1px] pe-[2px] sm:me-0  rounded-md sm:text-base text-xs">
            <NavLink to={to} className={({ isActive }) => isActive ? "sm:active-icon hide-icon" : "hide-icon"} > 
            <li className="flex items-center sm:ms-10 sm:gap-3 text-white nav-li"> {icon} {text}
                <div> <BsArrowRight /> </div> 
            </li> 
            </NavLink>
        </div>  
    )
}

SidebarItem.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    to: PropTypes.string,
}


export default SidebarItem
