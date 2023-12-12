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
                <ul className="flex justify-between mb-4 md:px-20 sm:text-base text-[10px]">
                    <NavigationLink to="/" text="Home" />
                    <NavigationLink to="products" text="All" onClick={dispatch(fetchProducts())} />
                    <NavigationLink to="products?category=men" text="Men" />
                    <NavigationLink to="products?category=women" text="Women" />
                    <NavigationLink to="products?category=jewelery" text="Jewelery" />
                    <NavigationLink to="products?category=electronics" text="Electronics" />
                    <NavigationLink to="" text="Pet" />
                    <NavigationLink to="" text="Sports and Outdoors" />
                    <NavigationLink to="" text="More" />
                </ul>
                <div className="md:px-20">
                    <Outlet />
                </div>
            </div>
                <Footer />
        </div>
    )
}

export default AppLayout
