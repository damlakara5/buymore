import iphone from "../assets/img/iphone.jpg"
import winter from "../assets/img/winter.png"
import girl from "../assets/img/girl.png"
import apple from "../assets/img/apple-products.png"
import cargo from "../assets/img/cargo.jpg"
import { BsArrowUpRightCircle } from "react-icons/bs";
import Slider from "../ui/Slider"
import OverviewInfo from "../ui/OverviewInfo"
import jewelery from "../assets/img/jewelery-home.jpg"
import sunglass from "../assets/img/sunglass.webp"
import accessory from "../assets/img/fancy-accessories.jpg"
import laptop from "../assets/img/laptop-apple.png"
import smartWatches from "../assets/img/smart-watches.png"
import smartPhones from "../assets/img/smart-phones.png"
import headphone from "../assets/img/headphone.png"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchAppleProducts } from "../store/productsSlice"

const Overview = () => {
    const appleProducts = useSelector(state => state.products.appleProducts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAppleProducts())
     }, [dispatch])

  return (
    <div>
        <div className="relative">
            <img  src={iphone} alt="Iphone 12 pro max" className="w-full h-[600px] object-cover" />
            <div className="absolute ms-20 top-0 left-0 right-0 bottom-0 flex flex-col items-start  justify-center">
                <h1 className="text-white mb-3"> IPHONE 12 PRO MAX </h1>
                <p className="text-white text-xl w-1/2 mb-4 text-start">The pro camera system takes low-light photography to the next level - with an even bigger  jump on iPhone 12 Pro Max.</p>
                <button>View More</button>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-3  mt-10 ">
          {/*   <div >
                <div className=" relative mb-4 rounded-3xl"  style={{backgroundColor: "#a6c1b4"}}>
                    <img className="  object-cover" src={girl} />
                    <p  className="absolute font-bold top-1/4 left-36 text-lg">Get Up To 50% Off</p>
                    <button className="absolute top-16 left-36 p-0 opacity-50 px-1">Get Discount</button>
                </div>
                <div className="flex rounded-3xl h-36" style={{backgroundColor: "#ffeb9d"}}>
                    <img className="  object-cover" src={winter} />
                    <div className="text-start my-auto">
                        <p className=" font-bold text-lg">Winter collection</p>

                        <p className="">Brand new products for winter</p>
                    </div>
                    <div className="absolute top-2 right-2 bg-white rounded-full " > <BsArrowUpRightCircle className="w-5 h-5" /> </div>
                </div>
            </div>
            <div className=" relative mb-4 h-72 rounded-3xl">
                <img className="h-full w-full rounded-3xl object-cover" src={cargo} />
                <p  className="absolute text-white font-bold top-1/4 left-36 text-lg">Premium Deals</p>
                <div className="absolute top-2 right-2 bg-white rounded-full" > <BsArrowUpRightCircle className="w-5 h-5"/> </div>

            </div> */}
           {/*   <div className="relative h-96">
                <img src={laptop} className="h-full"/>
            </div>
            <div className="relative h-72  rounded-xl border-2 lg:flex px-2 items-center">
                <img className=" object-cover" src={apple} />
                <div className="text-start">
                    <h2 className="text-xl font-bold">Apple Products</h2>
                    <p>Mac, watches, Aplle TV and more</p>
                    <Link className="animated-hover" to='/products?category=electronic'>Discover</Link>
                </div>
            </div> */}
           
        </div>
        <h3 className="text-start custom-font mb-10 text-3xl">Upgrade Your Digital World</h3>
        <div className="grid grid-cols-3 gap-4">
            <div className="relative">
                <img className=" object-contain  h-80 w-full" src={apple} />
                <h2 className="text-xl font-bold absolute text-black top-0 "> 
                    <Link to="products?category=electronics" className="animated-hover text-slate-800 animated-hover_black hover:text-black">Apple Products</Link>
                </h2>
                <p className="absolute top-10">Mac, watches, Aplle TV and more</p>
            </div>

            <div className="col-span-2">
                <div className="relative mb-2 rounded-lg overflow-hidden">
                    <img  src={smartWatches} />
                    <p className="text-white top-5 left-5 text-xl font-bold absolute ">
                        <Link className="animated-hover animated-hover_black text-black hover:text-black">Smart Watches</Link>
                    </p>
                </div>
                <div className="relative rounded-lg overflow-hidden">
                    <img  src={smartPhones} />
                    <p className="text-white top-5 left-5 text-xl font-bold absolute ">
                        <Link className="animated-hover animated-hover_black text-black hover:text-black">Smart Phones</Link>
                    </p>
                </div>
                <div className="relative mt-2 rounded-lg overflow-hidden">
                    <img  src={headphone} />
                    <p className="text-white top-5 left-5 text-xl font-bold absolute">
                        <Link className="animated-hover animated-hover_black text-black  hover:text-black">New generation Headphones</Link>
                    </p>
                </div>
                
            </div>
            
        </div>
        
        <h3 className="text-start custom-font mb-10 text-3xl">Popular</h3>
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
           {/*  <div className="grid grid-rows-2 gap-2 w-full">
                <div className=" w-full relative  ">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <img className="h-full w-full object-cover opacity-20" src={sunglass} />
                    <div className="custom-font text-white absolute top-8 left-10 text-start">
                        <p className="font-bold text-3xl">Sunglasses</p>
                        <p className="mt-4 font-bold">Starting from 10$</p>
                    </div>
                    <Link className="absolute animated-hover bottom-2 left-10 "><p className="animated-hover px-3 py-1 text-white custom-font">Discover</p></Link>
                </div>
                <div className="w-full relative">
                    <img className="h-full w-full object-cover" src={accessory} />
                    <div className="custom-font text-white absolute top-8 left-10 text-start">
                        <Link  className="mt-4 animated-hover text-white hover:text-white inline-block border-b-2 border-transparent hover:border-white">      
                            <p className=" font-bold">Fancy Accessories</p>
                        </Link>
                    </div>
                </div>
            </div> */}
            </div>

   
       <OverviewInfo />
    </div>
  )
}

export default Overview