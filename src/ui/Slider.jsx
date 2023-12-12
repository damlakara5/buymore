
import ProductCart from "./ProductCart"
import { BsArrowRightCircleFill,BsArrowLeftCircleFill  } from "react-icons/bs";
import PropTypes from 'prop-types';
import { useSlider } from '../hooks/useSlider';

function Slider({slides}) {
    const {isFirstSlide, isLastSlide, goToNextSlides,goToPreviousSlides, slidesToDisplay} = useSlider(slides)

    return (
        <div className="slider flex items-center  col-span-2 ms-8 ">
            <button   className={` px-0 sm:px-2 max-h-11 flex items-center ${isFirstSlide && "hidden"} `} onClick={goToPreviousSlides}><BsArrowLeftCircleFill className='sm:w-8 h-8 ' /></button>
            <div className="slide flex gap-3" >
                {slidesToDisplay.map(slide => (
                    <ProductCart product={slide} key={slide.id} />
                ))}
             </div>
            <button className={` px-0 sm:px-2 max-h-11 flex items-center ${isLastSlide && "hidden"} `} disabled={isLastSlide} onClick={goToNextSlides}><BsArrowRightCircleFill className='sm:w-8 h-8 '/></button>
      </div>
    )
}

Slider.propTypes = {
    slides: PropTypes.array
}

export default Slider
