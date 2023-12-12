import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadStripe } from '@stripe/stripe-js';
import { getOrders } from "./ordersSlice";

const stripePromise = loadStripe("pk_test_51OEvhyG2sIVA1ynFXzTZRcISHqU8xcw4wqFHpd6Ke1WL72nGEo8jH48NZZtCHg1YXZelsBPBxCtN9Wo9Bb91CzGz00sKyZve5S")

export const SHIPPING_COST = 24

const initialState =  {
    products:  [],
    cartsId : "",
    total: localStorage.getItem("totalCart") | 0,
    totalPrice : 0,
    totalOfProducts: 0,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const shoppingCartSlice = createSlice({
    name:"cart",
    initialState,
    reducers : {
        addToCart (state,action) {
            state.products = action.payload 
            
        },
        increaseQuantity (state,action) {
            state.products.forEach(item => {
                if (item.product.id === action.payload.id && item.size === action.payload.size) {
                  if (item.quantity > 0) {
                    item.quantity += 1; // Decrease quantity by 1
                    const prices = state.products.map(item => Number(item.quantity) * Number(item.product.price))
                    state.totalOfProducts = prices.length >0 && prices.reduce((a,b) => a + b, 0)
                    state.totalPrice = Number(state.totalOfProducts) + SHIPPING_COST
                  } 
                }
              });
        },
        decreaseQuantity (state,action) {
            state.products.forEach(item => {
                if (item.product.id === action.payload.id && item.size === action.payload.size) {
                  if (item.quantity > 1) {
                    item.quantity -= 1; // Decrease quantity by 1
                    const prices = state.products.map(item => Number(item.quantity) * Number(item.product.price))
                    state.totalOfProducts = prices.length >0 && prices.reduce((a,b) => a + b, 0)
                    state.totalPrice = Number(state.totalOfProducts) + SHIPPING_COST
                  } else {
                    console.log("Product quantity is already at its minimum.");
                  }
                }
              });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addCart.fulfilled, (state) => {
            state.loading = "succeeded"
            let total = localStorage.getItem("totalCart")
            total = Number(total) + 1
            localStorage.setItem("totalCart",total )
            state.total  = Number(state.total) + 1
        }),
        builder.addCase(addCart.rejected, (state) => {
            state.loading = "failed"
        }),
        builder.addCase(addCart.pending, (state) => {
            state.loading = "pending"
        }),
        builder.addCase(getCart.fulfilled, (state,action) => {
            state.loading = "succeeded"
            if(action.payload.data.items.length > 0 ) {
                state.cartsId = action.payload.data._id
                const existingProduct = state.products.find(product => product._id === action.payload.data._id);
                localStorage.setItem("totalCart", state.total)
                // If the product doesn't exist, add it to the state
                if (!existingProduct) {
                    state.products= action.payload.data.items;

                }
                const prices = state.products.map(item => Number(item.quantity) * Number(item.product.price))
                state.totalOfProducts = prices.length >0 && prices.reduce((a,b) => a + b, 0)
                state.totalPrice = Number(state.totalOfProducts) + SHIPPING_COST
            }else{
                state.total = "";
            }
        }),
        builder.addCase(getCart.pending, (state) => {
            state.loading = "pending"
        }),
        builder.addCase(getCart.rejected, (state) => {
            state.loading = "failed";
        });
        builder.addCase(deleteFromCart.fulfilled, (state, action) => {
            state.loading = "succeeded"
            state.products = action.payload.data.items
            state.total = action.payload.data.items.length
            localStorage.setItem('totalCart', state.total)
        }),
        builder.addCase(sendCart.fulfilled, () => {
            localStorage.setItem('totalCart',0)
        }),
        builder.addCase(deleteFromCart.pending, (state) => {
            state.loading = "pending"
        }),
        builder.addCase(getOrders.fulfilled, (state) => {
            state.totalOfProducts = 0
        });
    }
})


export const addCart = createAsyncThunk("cart/addToCart", async ({product, size, color} ,{rejectWithValue } ) => {

    const reqData = {
        product,
        quantity: 1,
        size,
        color
    }


     const res = await fetch(`https://buymore-lzh0.onrender.com/cart`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
    })
    const data  = await res.json()

    if (res.ok) {
        return data; // Successfully added the review
    } else {
        return rejectWithValue(data); // Forward the error message
    }
})

export const deleteFromCart = createAsyncThunk("cart/deleteFromCart", async (product ) => {
    const reqData = {
        product,
        quantity: 0
    }
    const res = await fetch(`https://buymore-lzh0.onrender.com/cart`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqData)
    })
    const data  = await res.json()

    return data
})


export const getCart = createAsyncThunk("cart/getCart", async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`https://buymore-lzh0.onrender.com/cart`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': 'application/json',
            },
        })
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    }
})


export const sendCart = createAsyncThunk("cart/sendCart", async(id, {getState}) => {
    const {totalPrice} = getState().cart

    
     const res = await fetch(`https://buymore-lzh0.onrender.com/order/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({total: totalPrice})
    })
    const data = await res.json()
    if (data && data.session) {
        const sessionId = data.session;
        localStorage.setItem('totalCart',0)

        // Redirect to Stripe Checkout
        // Assume you have Stripe.js loaded and stripe variable is Stripe instance
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({
            sessionId: sessionId,
        });
    } else {
        // Handle case where we don't get a session ID
        console.error('Session ID not received from the server.');
    } 
})

export const {addToCart, increaseQuantity, decreaseQuantity} = shoppingCartSlice.actions
export default shoppingCartSlice.reducer

