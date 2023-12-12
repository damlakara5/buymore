import PropTypes from 'prop-types';
import { BsHeart , BsHeartFill} from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { addFav } from '../store/productsSlice';
import { addCart } from '../store/shoppingCartSlice';
import { NavLink } from 'react-router-dom';
import useIsFaved from '../hooks/useIsFaved';
import { HiArrowTrendingDown } from "react-icons/hi2";


function ProductCart({product, isFavedList}) {
    const dispatch = useDispatch()
   
    const isProductFaved = useIsFaved(product._id, isFavedList)
    let newPrice;
    if(product.discount){
        newPrice = Number(product.price) * (1- product.discount / 100)
    }

    const hasHoverImage = product.images.length > 1;

    return (
      <div className='pb-5 flex flex-col items-center justify-between border rounded-xl relative  text-black sm:mt-0 mt-5'>
          <button  className='absolute top-2 right-1 z-30 bg-white p-2 shadow-md shadow-slate-600 rounded-full' onClick={() => dispatch(addFav(product._id)) } > 
                {isProductFaved ? <BsHeartFill className='text-blue-600' /> : <BsHeart />}               
         </button> 
        <NavLink to={`/products/${product._id}`} className="text-black w-full" >
           <div className='w-full h-40 sm:h-80 relative  rounded-xl z-10 image-container'> 
                <img
                    className={`w-full h-full object-contain sm:object-cover rounded-t-xl transition-opacity duration-300 ease-in-out ${hasHoverImage ? 'hover:opacity-0' : ''}`}
                    src={product?.images[0]}
                    alt="Default"
                />
                {/* Image shown on hover */}
                {hasHoverImage && (
                    <img
                    src={product?.images[1]}
                    alt="On Hover"
                    className="w-full h-full object-cover  rounded-t-xl  absolute top-0 left-0 transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100"
                    />
                )}
              { product.discount && product.discount !== 0 && <div className='absolute bottom-2 left-1/3   z-30 bg-red-600 text-white rounded-sm px-2  flex items-center gap-2' ><HiArrowTrendingDown className='bg-white text-red-600 rounded-full font-extrabold' /> {product?.discount}% </div>}
            </div>
            
           <div>
            <p className='text-start ps-4 mt-5'> <span className='font-bold me-3'>  {product.brand}</span> <span className='sm:text-base text-xs sm:font-normal'>{product.name}</span> </p>
           </div>
            <p className={`font-bold   ${!newPrice && "my-4 text-lg "}  ${newPrice && "line-through"} `}> { product.price}$ </p>
           { newPrice &&  <p className='text-red-600 font-extrabold text-lg flex items-center justify-center'> <HiArrowTrendingDown /> {newPrice?.toFixed(2)} </p>}
        </NavLink>
            <button className='border border-blue-500 rounded-xl text-blue-900 p-1 sm:text-base text-sm sm:px-3  ' onClick={() => dispatch(addCart({product,size: product.sizes[0]} ))} >Add to Cart</button>
        </div>
    )
}



ProductCart.propTypes = {
    product: PropTypes.object,
    isFavedList: PropTypes.bool
}

export default ProductCart
