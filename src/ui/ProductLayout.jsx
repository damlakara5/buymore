import { Outlet } from "react-router-dom"
import FiltersWrapper from "./FiltersWrapper"
import useProductInfo from "../hooks/useProductInfo";

function ProductLayout() {
    const { resultLength, breadcrumb } = useProductInfo();


    return (
        <div className="grid grid-cols-4  ">
            <FiltersWrapper />
            <div className=" col-span-3">
                <p className="col-span-4 text-slate-700 text-start font-bold mb-5"> Home {breadcrumb} </p>
                <p className="col-span-4 text-start   mb-5"> {resultLength} results listed </p>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2  gap-4">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default ProductLayout
