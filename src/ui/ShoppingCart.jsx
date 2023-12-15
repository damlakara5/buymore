import PropTypes from 'prop-types';
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDispatch, useSelector} from 'react-redux';
import { decreaseQuantity, deleteFromCart, increaseQuantity } from '../store/shoppingCartSlice';
import Loader from "./Loader"

function ShoppingCartWrapper({item, size, color}) {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.cart.loading)

    if(loading === "pending") return <Loader />


    return (
        <div className='sm:flex  gap-5 items-center border px-10 mb-4 py-5 rounded-md'>
            <img className='w-32 h-32 mx-auto sm:mx-0' src={item.product?.images[0]} />
            <div className='text-start w-1/2 mx-auto sm:m-0 mt-5'>
                <p className='font-semibold mb-1 ms-auto'> {item.product.name} </p>
                <p className='me-auto text-sm text-slate-500'> {item.product.description} </p>
                <p className='text-sm text-slate-500 mt-3'>Size: {size} </p>
                <p className='text-sm text-slate-500 mt-3'>Color: {color} </p>
            </div>
            <div className='flex items-center gap-1 justify-center sm:m-0 myr-5'>
                <button className='border border-slate-300 py-0 px-2  outline-none ' disabled={item.quantity === 0} onClick={() => dispatch(decreaseQuantity({id:item.product._id, size}))} >-</button>
                <p> {item.quantity} </p>
                <button className='border border-slate-300 py-0 px-2 outline-none' onClick={() => dispatch(increaseQuantity({id:item.product._id, size}))} >+</button>
            </div>
            <p className='font-semibold text-lg'> {item.product.price}$ </p>
            <button className='ms-auto bg-transparent '  onClick={() => dispatch(deleteFromCart(item.product)) } ><BsFillTrash3Fill className='w-7 h-7  text-sky-600' /></button> 

        </div>
    )
}

ShoppingCartWrapper.propTypes = {
    item: PropTypes.object,
    size: PropTypes.string,
    color: PropTypes.string,
}

export default ShoppingCartWrapper
