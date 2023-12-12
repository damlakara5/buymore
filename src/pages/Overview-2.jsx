import iphone from "../assets/img/iphone.jpg"
import pc from "../assets/img/pc.webp"
import Slider from "../ui/Slider"
import OverviewInfo from "../ui/OverviewInfo"
import jewelery from "../assets/img/jewelery-home.jpg"
import womenCollection from "../assets/img/women-collection.jpg"
import menCollection from "../assets/img/men-collection.jpg"
import shoe from "../assets/img/shoe-1.jpg"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchAppleProducts } from "../store/productsSlice"

const Overview2 = () => {
    const appleProducts = useSelector(state => state.products.appleProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAppleProducts())
     }, [dispatch])

  return (
    <>
        <div className="relative">
            <img  src={iphone} alt="Iphone 12 pro max" className="w-full h-[600px] object-cover" />
            <div className="absolute ms-3 sm:ms-20 top-0 left-0 right-0 bottom-0 flex flex-col items-start  justify-center">
                <h1 className="text-white mb-3 sm:text-center text-start"> IPHONE 12 PRO MAX </h1>
                <p className="text-white sm:text-xl w-1/2 mb-4 text-start">The pro camera system takes low-light photography to the next level - with an even bigger  jump on iPhone 12 Pro Max.</p>
                <button>View More</button>
            </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 my-10 gap-8 md:mx-0 mx-5">
            <div className="relative">
                <h2 className="text-xl font-bold absolute left-5 text-black top-10 "> 
                    <Link to={`/products?category=electronics`} className="animated-hover text-slate-800 animated-hover_black hover:text-black">Electronics</Link>
                    <p className="text-sm">Mac, watches, Aplle TV and more</p>
                </h2>
                <img className="h-full md:w-auto " src={pc} />
            </div>
            <div className="relative rounded-3xl  ">
                <h2 className="text-xl font-bold absolute left-5 text-black top-10 "> 
                    <Link to={`/products?category=women`} className="animated-hover text-slate-800 animated-hover_black hover:text-black">Women Collection  </Link>
                </h2>
                <img className="rounded-3xl object-cover h-full" src={womenCollection} />
            </div>
            <div className="relative rounded-3xl   ">
                <h2 className="text-xl font-bold absolute left-20 text-black top-10 "> 
                    <Link to={`/products?category=shoes`} className="animated-hover text-slate-800 animated-hover_black hover:text-black">Shoes  </Link>
                    <p className="text-sm">Starting from 10$</p>

                </h2>
                <img className="rounded-3xl md:w-auto w-full object-cover h-full" src={shoe} />
            </div>
            <div className="relative rounded-3xl   ">
                <h2 className="text-xl font-bold absolute left-10 text-black top-10 "> 
                    <Link to={`/products?category=men`} className="animated-hover text-slate-800 animated-hover_black hover:text-black">Men Collection</Link>
                </h2>
                <img className="h-full md:w-auto w-full rounded-3xl object-cover" src={menCollection} />
            </div>
        </div>
        
        <h3 className="text-start custom-font mb-10   text-xl sm:text-3xl ms-5">Popular</h3>
        <Slider slides={appleProducts} />
        
        <div className="gap-3 mt-10   ">
            <div className="relative ">
                <img src={jewelery} className="w-full h-[500px] object-cover opacity-80 " />
                <div className="absolute top-10 left-3  text-white custom-font text-start">
                    <h2 className="mb-8 text-4xl">Here is our Jewelery Collection!</h2>
                    <p>Make Your Loved One Happy!</p>
                    <Link to="/products?category=jewelery" className="absolute left-5 mt-10">
                        <button className="px-4 py-2 bg-black text-white custom-font">Shop Now</button>
                    </Link>
                </div>
            </div>
            </div>

   
       <OverviewInfo />
    </>
  )
}

export default Overview2