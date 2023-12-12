import { useEffect, useState } from "react";
import FilterCheckbox from "./FilterCheckbox"
import { useDispatch } from "react-redux";
import { setFilter } from "../store/filtersSlice";
import SizeBoxWrapper from "./SizeBoxWrapper";
import useUpdateUrlWithFilter from "../hooks/useUpdateUrlWithFilter";

const FiltersWrapper = () => {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch("")
    const MAX = 800
    const updateUrl = useUpdateUrlWithFilter();

    const [visibility, setVisibility] = useState({
      categories: true,
      brands: true,
      genders: true,
      // ... other sections
    });

    const getBackgroundSize = () => {
        return {
            backgroundSize: `${(value * 100) / MAX}% 100%`,
        };
    };

    const sizeOptions = ["S","M","L"]
    const sizes = ["S","M","L"]

 

    useEffect(() => {
        if(value !== 0){
            dispatch(setFilter({filterType: "price", value}))
        }
    } , [value,dispatch])


    
    const toggleVisibility = (section) => {
      setVisibility(prevState => ({
        ...prevState,
        [section]: !prevState[section]
      }));
    };


    const handleSizeFilter = (size ) => {
      
      dispatch(setFilter({filterType : "size", value: size}))
      updateUrl('size', size, true); // Add the filter

    }

  return (
    <div className="flex flex-col items-start ">
      <h2 className="font-semibold text-lg mb-2 filter-header">Price</h2>
      <div className="flex items-center gap-3">
            <p>0</p>
            <input 
            type="range" 
            min="0"
            max={MAX}
            onChange={(e) => setValue(e.target.value)}
            style={getBackgroundSize()}
            value={value} />
            <p> {MAX} </p>
      </div>
      <div className="flex justify-between w-1/2">
        <h2 className="font-semibold text-lg my-4 filter-header">Categories</h2>
        <button className="bg-transparent border-0 flex items-top py-1 px-1 text-slate-400" onClick={() => toggleVisibility("categories")}> ___  </button>
      </div>
        {
          visibility["categories"] && <>
            <FilterCheckbox label="Men" filterType="category"  />
            <FilterCheckbox label="Women" filterType="category" />
            <FilterCheckbox label="Jewelery" filterType="category" />
            <FilterCheckbox label="Glasses" filterType="category" />
            <FilterCheckbox label="Electronics" filterType="category" />
            <FilterCheckbox label="Pets" filterType="category" />
            <FilterCheckbox label="Bag" filterType="category" />
          </>
        }

      <div className="flex justify-between w-1/2">
        <h2 className="font-semibold text-lg my-4 filter-header">Brands</h2>
        <button className="bg-transparent border-0 flex items-top py-1 px-1 text-slate-400" onClick={() => toggleVisibility("brands")}> ___  </button>
      </div>
      {
        visibility["brands"] && <>
        
        <FilterCheckbox label="RunningMax" filterType="brand" />
        <FilterCheckbox label="Apple" filterType="brand" />
        <FilterCheckbox label="Kallysas" filterType="brand" />
        <FilterCheckbox label="Palo Alto" filterType="brand" />
        <FilterCheckbox label="HomeControl" filterType="brand"/>
        <FilterCheckbox label="TechVision" filterType="brand"/>
        <FilterCheckbox label="KidCraft" filterType="brand"/>
        </>
      }

      
    <div className="flex justify-between w-1/2">
            <h2 className="font-semibold text-lg my-4 filter-header">Gender</h2>
            <button className="bg-transparent border-0 flex items-top py-1 px-1 text-slate-400" onClick={() => toggleVisibility("genders")}> ___  </button>
        </div>        
        {

            visibility["genders"] &&  <>
            <FilterCheckbox label="Men" />
            <FilterCheckbox label="Women" />
            <FilterCheckbox label="Child" />
          </>
        }
        <h2 className="font-semibold text-lg my-4 filter-header">Reviews</h2>
        <FilterCheckbox label="4 and up" />
        <FilterCheckbox label="3 and up " />
        <FilterCheckbox label="2 and up" />
        <FilterCheckbox label="1 and up" />
        
        <h2 className="font-semibold text-lg my-4 filter-header">Size</h2>
        <SizeBoxWrapper  setSelectedSize={handleSizeFilter}   sizeOptions={sizeOptions} sizes={sizes}/>

        <div className="mt-10"></div>
        <FilterCheckbox label="Has Discount" filterType="discount" />
    </div>
  )
}

export default FiltersWrapper