import { BsCheckLg } from "react-icons/bs";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { OpenContext } from "../context/OrderModalContext";
import { Link } from "react-router-dom";

function OrderProduct({product}) {

    const { setOpen , setReviewProduct} = useContext(OpenContext);

    const handleReviewModal = () => {
        setOpen(true)
        setReviewProduct(product)
    }
    
    return (
        <>
        <div className="flex items-center justify-between px-5 py-2">
            <div className="text-green-600 flex items-center gap-2"> <BsCheckLg /> Delivered</div>
            <div className="flex items-center gap-3 text-slate-500">
                <div className="text-start">
                    <p> Size: {product.size} </p>
                    <p> Color: {product.color} </p>
                </div>
                <Link to={`/products/${product.product._id}`}><img className="w-10" src={product.product.images[0]} /></Link>
            </div>
            
        </div>
        <button className="flex ms-auto" onClick={handleReviewModal} >Review</button>
        </>
    )
}

OrderProduct.propTypes = {
    product: PropTypes.object
}
export default OrderProduct
