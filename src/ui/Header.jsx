import { BsCart2, BsPerson, BsHeart,BsArrowReturnRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/svg/logo.svg"
import { useEffect } from "react";
import { logout } from "../store/authSlice";
import { setSearch } from "../store/searchSlice"
import { fetchProducts } from "../store/productsSlice";
import MiniLoader from "./MiniLoader";

function Header() {

    const total = useSelector(state => state.cart.total)
    const loading = useSelector(state => state.cart.loading)
    const search = useSelector(state => state.search.search)

    const dispatch = useDispatch()

    useEffect(() => {} , [total])



    const handleLogout = () => {
        dispatch(logout())
    }


    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            dispatch(fetchProducts())
            dispatch(setSearch('')); 
        }
    }
    return (
        <div className="flex gap-2 justify-between items-center header md:px-20 w-screen">
            <Link to="/"><img src={logo}  className="w-16 sm:w-24 sm:h-12 h-6"/></Link>
            <input 
                onChange={(e) => dispatch(setSearch(e.target.value))} 
                onKeyDown={handleSearch}
                value={search} 
                className="search-input w-3/4 flex  border border-grey-600 outline-none rounded-md  ps-1 sm:px-3" 
                placeholder="Please write the product, brand or category you are looking for." 
                type="text"  
            />
            <div className="flex gap-2 sm:gap-5 items-center">
                 <Link className="relative" to="/cart"><BsCart2 className="sm:w-5 sm:h-5  text-black"/>
                    { loading ==="pending"  && <MiniLoader /> } 
                    {total !== 0 && <div className="absolute  bg-blue-600 top-[-17px] text-white px-2 rounded-full  right-[-15px]"> {total} </div> } </Link>
                 <Link to="/profile/wishlist"><BsHeart className="sm:w-5 sm:h-5 text-black"/></Link>
                <button onClick={handleLogout} className="border-0 bg-transparent p-0"><BsArrowReturnRight className="sm:w-5 sm:h-5 text-black"/></button>
                <Link to="/profile/me" ><BsPerson className="sm:w-5 sm:h-5 text-black" /></Link>
            </div>
        </div>
    )
}

export default Header
