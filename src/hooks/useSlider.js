import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import { nextSlide, previousSlide } from "../store/slideSlice";

export const useSlider = (slides) => {
    const currentSlideIndex = useSelector((state) => state.slider.currentSlideIndex);
    const dispatch = useDispatch();
    
       // Initialize state with a default value
       const [slidesToShow, setSlidesToShow] = useState(5);

       // Handler to update state based on window width
       const updateSlidesToShow = () => {
           if (window.innerWidth > 800) { // Large screens
               setSlidesToShow(5);
           } else if (window.innerWidth > 640) { // Medium screens
               setSlidesToShow(4);
           } else { // Small screens
               setSlidesToShow(3);
           }
       };
   
       useEffect(() => {
           // Update slidesToShow on initial render
           updateSlidesToShow();
   
           // Add event listener for window resize
           window.addEventListener('resize', updateSlidesToShow);
   
           // Cleanup event listener
           return () => window.removeEventListener('resize', updateSlidesToShow);
       }, []);

    useEffect(() => {
        dispatch(fetchProducts())
    } , [dispatch])

    // Calculate the end index for the slides to show
    const endIndex = Math.min(currentSlideIndex + slidesToShow, slides.length);
  

    // Extract the slides to display
    const slidesToDisplay = slides.slice(currentSlideIndex, endIndex);
    const isLastSlide = currentSlideIndex + slidesToShow >= slides.length;
    const isFirstSlide = currentSlideIndex === 0;


    // Dispatch actions with the number of slides to move
    const goToNextSlides = () => {
        dispatch(nextSlide({ length: slides.length, step: slidesToShow }));
    };

    const goToPreviousSlides = () => {
        dispatch(previousSlide({ length: slides.length, step: slidesToShow }));
    };

    return {isFirstSlide, isLastSlide, goToNextSlides, goToPreviousSlides, slidesToDisplay}
    
}