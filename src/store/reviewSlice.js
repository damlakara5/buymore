import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const reviewSlice = createSlice({
    name: "review",
    initialState: {
        rating: 0,
        review: "",
        status: "",
        message: ""
    },
    reducers: {
        changeStatus (state, action) {
            state.status = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addReview.fulfilled, (state) => {
            state.status = "success"
        }),
        builder.addCase(addReview.rejected, (state,action) => {
            state.status ="rejected"
            state.message = action.payload.message
        })
    }
})


export const addReview = createAsyncThunk("review/addReview",  async({id,review, rating},{rejectWithValue } ) => {
   try{ 
        const res = await fetch(`https://buymore-lzh0.onrender.com/reviews/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({review, rating})
        })

        const data = await res.json()

        if (res.ok) {
            return data; // Successfully added the review
        } else {
            return rejectWithValue(data); // Forward the error message
        }

        
    }catch(error){
        return rejectWithValue(error);

    }
})

export const {changeStatus} = reviewSlice.actions

export default reviewSlice.reducer