import { Outlet } from "react-router-dom"
import FiltersWrapper from "./FiltersWrapper"
import useProductInfo from "../hooks/useProductInfo";
import { useEffect, useState } from "react";

function ProductLayout() {
    const { resultLength, breadcrumb } = useProductInfo();
    const [showFilters, setShowFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 500);
        if (window.innerWidth >= 500) {
          setShowFilters(false); // Automatically hide FiltersWrapper on larger screens
        }
      };
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
       <div className="">
         {isMobile && (
            <button className="p-2 flex justify-self-start" onClick={() => setShowFilters(!showFilters)}>☰</button>
        )}
        <div className="grid grid-cols-4 relative  ">
            
            {(showFilters || !isMobile) && <FiltersWrapper className={isMobile ? "h-full overflow-y-auto  rounded-lg ps-5 absolute left-0 z-50 bg-white border-2 py-10" : ""} />}
            <div className="col-span-4 sm:col-span-3 ps-5">
                <p className="col-span-4 text-slate-700 text-start font-bold mb-5"> Home {breadcrumb} </p>
                <p className="col-span-4 text-start   mb-5"> {resultLength} results listed </p>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4  sm:gap-4">
                    <Outlet/>
                </div>
            </div>
        </div>
       </div>
    )
}

export default ProductLayout
