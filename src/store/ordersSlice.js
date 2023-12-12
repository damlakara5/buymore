import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        loading:  'idle' | 'pending' | 'succeeded' | 'failed',
        message: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrders.fulfilled,(state,action) => {
            state.loading = "succeeded"
            state.orders= action.payload
            localStorage.setItem("totalCart", 0)
        })
        builder.addCase(getOrders.pending,(state) => {
            state.loading = "pending"
        }),
        builder.addCase(getOrders.rejected,(state,action) => {
            state.message = action.payload.message
            state.loading = "failed"
        })
    }   
})



export const getOrders = createAsyncThunk("orders/getOrders", async( _ , {rejectWithValue}) => {
    const res = await fetch(`https://buymore-lzh0.onrender.com/order`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json',
        },
    })

    const data  = await res.json()

    
    if (res.ok) {
        return data.data; // Successfully added the review
    } else {
        return rejectWithValue(data); // Forward the error message
    }
})


export default ordersSlice.reducer