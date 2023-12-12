import {  Outlet } from "react-router-dom"
import Header from "./Header"
import "./AppLayout.css"
import NavigationLink from "./NavigationLink"
import { useDispatch } from "react-redux"
import { fetchProducts } from "../store/productsSlice"
import Footer from "./Footer/Footer"

function AppLayout() {
    const dispatch = useDispatch()


    return (
        <div className="grid w-screen app-layout ">
            <Header />
            <div className=" mt-5 w-screen">
                <ul className="flex px-2 justify-between mb-4 md:px-20 sm:text-base text-[10px]">
                    <NavigationLink to="/" text="Home" />
                    <NavigationLink to="products?category=men" text="Men" />
                    <NavigationLink to="products?category=women" text="Women" />
                    <NavigationLink to="products?category=jewelery" text="Jewelery" />
                    <NavigationLink to="products?category=electronics" text="Electronics" />
                    <NavigationLink to="products?category=men" text="Sports and Outdoors" />
                    <NavigationLink to="products" onClick={dispatch(fetchProducts())} text="More" />
                </ul>
                <div className="sm:px-5 md:px-20">
                    <Outlet />
                </div>
            </div>
                <Footer />
        </div>
    )
}

export default AppLayout
