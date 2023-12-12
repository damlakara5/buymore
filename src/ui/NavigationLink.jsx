import {  NavLink } from "react-router-dom"
import PropTypes from 'prop-types';


function NavigationLink( {text, to, onClick}) {


    return (
        <NavLink to={to} onClick={onClick} className= "text-black hover:border-b-2 hover:border-blue-600">
            <li>
                {text}
            </li>
        </NavLink>
    )
}


NavigationLink.propTypes = {
    text : PropTypes.string,
    to: PropTypes.string,
    onClick: PropTypes.func
}

export default NavigationLink
