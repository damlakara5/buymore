import { useDispatch, useSelector } from "react-redux"
import { SHIPPING_COST, sendCart } from "../store/shoppingCartSlice"

function CartTotal() {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.cart.loading)
    const totalPrice = useSelector(state => state.cart.totalPrice)
    const cartsId = useSelector(state => state.cart.cartsId)
    const totalOfProducts = useSelector(state => state.cart.totalOfProducts)
    const totalOfProductsNum = Number(totalOfProducts).toFixed(2)
    const totalPriceNum = Number(totalPrice).toFixed(2)
    const shippingCost = SHIPPING_COST

    if(loading === "pending") return <p>Loading</p>

    

    return (
        <div className="border rounded-md px-4 py-4 max-h-96">

            <p className="font-bold text-xl text-start">Order Summary</p>
            <div className="flex justify-between mt-5"> <p>Total of Products </p><p className="font-bold ms-auto text-xl">{totalOfProductsNum}$ </p> </div> 
            <div className="flex justify-between mt-5"> <p>Shipping cost</p><p className="font-bold ms-auto text-xl">{shippingCost}$ </p> </div> 
            <div className="w-full border-b-2 mt-3"></div>
            <div className="flex justify-between mt-5 font-semibold"> <p>Total Price</p><p className="font-bold ms-auto text-xl">{totalPriceNum}$ </p> </div> 
            <button onClick={() => dispatch(sendCart(cartsId))} className="bg-sky-600 text-white mt-10">Complete Shopping</button>
        </div>
    )
}

export default CartTotal
