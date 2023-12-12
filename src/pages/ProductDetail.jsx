import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFav, fetchProduct, fetchProducts } from "../store/productsSlice"
import { useParams } from "react-router-dom"
import SizeBoxWrapper from "../ui/SizeBoxWrapper"
import { addCart } from "../store/shoppingCartSlice"
import { BsHeart , BsHeartFill} from "react-icons/bs";
import { getSizeOptions } from "../utils/sizeConfig"
import Reviews from "../ui/Reviews"
import ColorBoxWrapper from "../ui/ColorBoxWrapper"
import Slider from "../ui/Slider"
import useIsFaved from "../hooks/useIsFaved"
import { toast } from "react-toastify"
import Loader from "../ui/Loader"
import ProductInfo from "../ui/ProductInfo"
import  { setFilter } from "../store/filtersSlice"

function ProductDetail() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const product = useSelector(state => state.products.product)
    const products = useSelector(state => state.products.products)
    const loading = useSelector(state => state.products.loadingProductDetail)
    const loadingCart = useSelector(state => state.cart.loading)
    const [displayedImg, setDisplayedImg] = useState()
    const [selectedSize , setSelectedSize ]= useState()
    const [selectedColor , setSelectedColor ]= useState()
    const isProductFaved = useIsFaved(id)
    const [buttonText, setButtonText] = useState('Add to Cart');

    useEffect(() => {
        dispatch(fetchProduct(id))
       
    } , [dispatch,id])

    useEffect(() => {
        if(loadingCart === "failed") {
            toast.error("You have to login")
        }else if (loadingCart === 'succeeded') {
            setButtonText('Added');
            const timer = setTimeout(() => {
                setButtonText('Add to Cart');
            }, 1000);
            return () => clearTimeout(timer);
        } else if (loadingCart === 'pending') {
            setButtonText('Adding...');
        }
    } , [loadingCart])

    useEffect(() => {
        if (product && product.category) {
            // Set the category filter based on the fetched product's category
            // Make sure this action does not trigger a refetch of the single product
            dispatch(setFilter({filterType: "category", value: product.category[0] }));
            
            dispatch(fetchProducts())
            
        }
    }, [dispatch, product]); // Dependencies: dispatch and product


    if(loading === "pending" || product.length === 0) return <Loader />


    
    const sizeOptions = getSizeOptions(product?.category);


    return (
       <>
         <div className="sm:grid grid-cols-2 sm:mx-0 mx-10">
            <div className="col-span-1 flex gap-3 sm:ms-0 ms-10">
            <div className="flex flex-col">
                    {
                        product?.images?.map(image => <img className="sm:w-24 w-20 h-24 sm:h-32 border cursor-pointer mt-4" onClick={() => setDisplayedImg(image)}  src={image} key={image} />)
                    }
                </div>
                <div className="sm:max-w-[400px] sm:w-1/2  relative">
                    <img className="w-full sm:h-auto h-80" src={product.images && displayedImg || product?.images[0]} />

                    <button  className='absolute top-2 right-2 z-30 bg-white p-2 border-2 border-gray-600 rounded-full' onClick={() => dispatch(addFav(product._id)) } > 
                            {isProductFaved ? <BsHeartFill className='text-blue-600' /> : <BsHeart />}               
                    </button> 
                </div>
                    
            </div>
            <div className="mt-10">
                <div className="flex gap-3 text-xl">
                    <p className="font-bold"> {product.brand} </p>
                    <p > {product.name} </p>
                </div>
                <p className="text-start mt-5 text-gray-600"> {product.description} </p>
                <p className="text-start text-4xl my-5 font-semibold"> {product.price}$ </p>

                <SizeBoxWrapper selectedSize={selectedSize} setSelectedSize={setSelectedSize} sizeOptions={sizeOptions} sizes={product.sizes} />
                <ColorBoxWrapper selectedColor={selectedColor} setSelectedColor={setSelectedColor} product={product} />
                <div className="flex items-center mt-10 gap-5">
                    <button onClick={() => dispatch(addCart({product, size: selectedSize || product.sizes[0], color: selectedColor || product.sizes[0]}))} className="bg-blue-600 text-white w-full "> {buttonText} </button>
                    <button  className='text-3xl p-0 hover:border-0' onClick={() => dispatch(addFav(product._id)) } >        
                            {isProductFaved  ? <BsHeartFill /> : <BsHeart className="text-blue-600" />}   
                    </button> 
                </div>
                <div className="bg-gray-200 w-full rounded-md mt-8 py-1">
                Estimated Shipping: in 4 days
                </div>
            </div>
            <ProductInfo />
            <h1 className=" text-start mt-20 text-2xl font-bold">Check Other Products</h1>
            <Reviews />
        </div>
        <div>
            <Slider slides={products} />
        </div>
       </>
    )
}

export default ProductDetail
