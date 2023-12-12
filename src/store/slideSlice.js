import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentSlideIndex: 0
  };


const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
      nextSlide(state,action) {
        state.currentSlideIndex = (state.currentSlideIndex + 1) % action.payload.length;
    },
      previousSlide(state,action) {
        state.currentSlideIndex = (state.currentSlideIndex - 1 + action.payload.length) % action.payload.length;
    }
    }
  });


export const { nextSlide, previousSlide } = sliderSlice.actions;
export default sliderSlice.reducer;