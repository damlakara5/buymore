import { useDispatch, useSelector } from "react-redux"
import CartTotal from "../ui/CartTotal"
import { useEffect } from "react"
import { getCart } from "../store/shoppingCartSlice"
import ShoppingCartWrapper from "../ui/ShoppingCart"
import { NavLink } from "react-router-dom"
import { BsCart2 } from "react-icons/bs";
import Loader from "../ui/Loader"

function ShoppingCart() {

    const products = useSelector(state => state.cart.products)
    const loading = useSelector(state => state.cart.loading)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getCart())
    } , [dispatch])

    useEffect(() => {
        console.log(products)
    } , [products])

    if(loading === "pending") return <Loader />

    
    return (
        <div className="sm:grid grid-cols-4 gap-4 ">
           <div className="col-span-3">
            {
                products && products.length > 0 && products.map(item => <ShoppingCartWrapper color={item.color} size={item.size} item={item} key={item._id} /> )
            }
                    
            </div>
            {products.length > 0 && <CartTotal />}
            {
                products.length === 0 && 
                <div className="sm:flex items-center justify-between border p-5 col-span-4"> 
                    <p className="flex items-center gap-2 font-semibold sm:text-xl"> <div className="text-2xl bg-blue-100 rounded-full p-5 font-bold text-blue-600"><BsCart2 /> </div>There are no products in your cart.</p> 
                    <NavLink to="/products" className="bg-blue-500 rounded-md  p-2 mt-10 sm:p-5 text-white" >Start Shopping</NavLink>
                </div>
            } 
        </div>
    )
}

export default ShoppingCart
