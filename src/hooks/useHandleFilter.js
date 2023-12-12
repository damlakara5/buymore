import { useDispatch } from "react-redux";
import { resetFilters, setFilter } from "../store/filtersSlice";
import useUpdateUrlWithFilter from "./useUpdateUrlWithFilter";

export const useHandleFilter = (filterType) => {
    const dispatch = useDispatch()
    const updateUrl = useUpdateUrlWithFilter();

    const handleFilter = (e, label) => {
        if(e.target.checked){
            dispatch(setFilter({filterType, value: label})); // or `null` to reset
            updateUrl(filterType, label, true); // Add the filter

 
        }else{
            dispatch(resetFilters({filterType, value: label}))
            updateUrl(filterType, label, false); // Remove the filter

        }
    }

    return {handleFilter}
}