import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products : [],
    appleProducts : [],
    product : [],
    favs: [],
    brands: [],
    status: "",
    message: "",
    loadingProductDetail :""
}

const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state,action) => {
            state.loading = "success";
            state.products= action.payload.data
            state.brands =  Array.from(new Set(action.payload.data.map(product => product.brand)));
        }),
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = "pending";
        }),
        builder.addCase(fetchProduct.fulfilled, (state,action) => {
            state.loadingProductDetail = "success";
            state.product= action.payload.data
            
        }),
        builder.addCase(fetchAppleProducts.fulfilled, (state,action) => {
            state.loading = "success";
            state.appleProducts= action.payload.data
        }),
        builder.addCase(fetchProduct.pending, (state) => {
            state.loadingProductDetail = "pending";
        }),
        builder.addCase(fetchFavs.fulfilled, (state,action) => {
            console.log(action.payload.data)
            state.favs = action.payload.data.map(product => product.product)
        }),
        builder.addCase(fetchFavs.rejected, (state,action) => {
            state.status = "failed"
            state.message = action.payload.message
        }),
        builder.addCase(addFav.fulfilled, (state, action) => {
            state.favs= action.payload.data.map(product => product.product)
        }),
        builder.addCase(fetchProducts.rejected, (state) => {
            state.loading = "failed";
        })
    }
})


export const fetchProducts = createAsyncThunk('products/fetchProducts', async(param , {getState, rejectWithValue }) => {
    try{
        const { category, price,brand, discount, size } = getState().filters;
        const { search } = getState().search;

        const searchFilters = search.split(" ")

        let queryParts = [];
    
        if (category.length > 0) {
            queryParts.push(...category.map(cat => `category=${encodeURIComponent(cat).toLowerCase()}`));
          }
        if (brand.length > 0) {
            queryParts.push(...brand.map(cat => `brand=${encodeURIComponent(cat)}`));
        }
        if (size.length > 0) {
            queryParts.push(...size.map(cat => `size=${encodeURIComponent(cat)}`));
        }
      
          // Handle price
          if (price) {
            queryParts.push(`price=${encodeURIComponent(price)}`);
          }
          if(discount){
            queryParts.push(`discount=${discount}`)
          }

          if(searchFilters.length > 0) {
            queryParts.push(...searchFilters.map(cat => `search=${encodeURIComponent(cat)}`))
          }
          if(param){
            queryParts.push(`${param[0]}=${encodeURIComponent(param[1])}`);

          }
        const queryString = queryParts.join('&');
       
    
        const res = await fetch(`https://buymore-lzh0.onrender.com/products${queryString ? `?${queryString}` : ""}`)
        const data  = await res.json()
     
        return data
    }catch(error){
        return rejectWithValue(error.message);

    }
   
})


export const fetchProduct = createAsyncThunk('products/fetchProduct', async(id , {rejectWithValue }) => {
    try{
        const res = await fetch(`https://buymore-lzh0.onrender.com/products/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        })

        const data  = await res.json()
     
        return data
    }catch(error){
        return rejectWithValue(error.message);

    }
   
})


export const fetchFavs = createAsyncThunk("products/fetchFavs", async(_, {rejectWithValue}) => {
    const res = await fetch(`https://buymore-lzh0.onrender.com/favs`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json'
        }
    })
    const data  = await res.json()

    if (res.ok) {
        return data.data; // Successfully added the review
    } else {
        return rejectWithValue(data); // Forward the error message
    }
})


export const addFav = createAsyncThunk("products/addFavs", async(id) => {
    const res = await fetch(`https://buymore-lzh0.onrender.com/favs/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json'
        }
    })
    const data  = await res.json()

    return data
})

export const fetchAppleProducts = createAsyncThunk('products/fetchAppleProducts', async(_, {rejectWithValue }) => {
    try{
        const res = await fetch(`https://buymore-lzh0.onrender.com/products?brand=Apple`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            }
        })

        const data  = await res.json()
     
        return data
    }catch(error){
        return rejectWithValue(error.message);

    }
   
})

export default productsSlice.reducer




