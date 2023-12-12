import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const userFromLocalStorage = localStorage.getItem("user");
const initialUserState = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {};

const initialState = {
    user: initialUserState,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = {}
            localStorage.removeItem("jwt")
            localStorage.removeItem("user")
            window.location.href = '/login';
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(authLogin.fulfilled, (state,action) => {
            
            localStorage.setItem("jwt", action.payload.token)
            localStorage.setItem("user", JSON.stringify(action.payload.data.user) )
            state.user = action.payload.data.user
            state.loading = 'succeeded'

        }),
        builder.addCase(authLogin.pending, (state) => {
            state.loading= "pending"
        }),
        builder.addCase(authLogin.rejected, (state,action) => {
            console.log(action.error)
            state.loading = 'failed'

        }),
        builder.addCase(updateUserInfo.fulfilled, (state,action) => {
            state.loading = "succeeded"
            localStorage.setItem("user", JSON.stringify(action.payload.data) )
            state.user = action.payload.data

        }),
        builder.addCase(updateUserInfo.pending, (state) => {
            state.loading = "pending"

        })
    }
})


export const authLogin = createAsyncThunk("auth/login", async(payload, { rejectWithValue }) => {
    try {
        const res = await fetch("https://buymore-lzh0.onrender.com/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            // Handle non-2xx status codes
            const errorDetail = await res.json();
            throw new Error(` ${errorDetail.message}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in authLogin:", error);
        return rejectWithValue(error.message);
    }
});


export const updateUserInfo = createAsyncThunk("auth/updateUserInfo", async(payload) => {
    const res = await fetch("https://buymore-lzh0.onrender.com/user", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json()

    return data

})



export const {logout} = authSlice.actions


export default authSlice.reducer