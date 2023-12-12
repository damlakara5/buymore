import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: 'filters',
    initialState: {
      category: [],
      price: null,
      brand: [],
      reviews: null,
      discount: null,
      size: []
      // ... add other filters as needed
    },
    reducers: {
        setFilter: (state, action) => {
            const { filterType, value } = action.payload;

            if(filterType=== "category"){
                if (!state.category.includes(value)) {
                    state.category.push(value);
                  }
            }
            else if(filterType=== "brand"){
                if (!state.brand.includes(value)) {
                    state.brand.push(value);
                  }
            }
            else if(filterType=== "size"){
                if (!state.brand.includes(value)) {
                    state.size.push(value);
                  }
            }
            else if(filterType === "discount") {
                state.discount = "hey"
            }
            else{

                state[filterType] = value;
            }
            
          },
          resetFilters: (state, action) => {
            const { filterType, value } = action.payload;
        
            if (filterType === "category") {
                if (value === "all") {
                    state.category = []; // Reset category filter
                } else {
                    state.category = state.category.filter(item => item !== value); // Remove specific value
                }
            } else if (filterType === "brand") {
                if (value === "all") {
                    state.brand = []; // Reset brand filter
                } else {
                    state.brand = state.brand.filter(item => item !== value); // Remove specific value
                }
            } 
            else if(filterType === "size") {
                if (value === "all") {
                    state.size = []; // Reset size filter
                } else {
                    state.size = state.size.filter(item => item !== value); // Remove specific value
                }
            }
            else if(filterType === "discount"){
                state.discount = null
            }
            else {
                // Reset other filter types based on `filterType` and `value`
                if (value === "all") {
                    state[filterType] = null; // Resetting other filters to null
                }
                // Add more conditions if there are other filters to reset
            }
        },
        
    }
  });
  
  export const { setFilter, resetFilters } = filtersSlice.actions;
  export default filtersSlice.reducer;
  