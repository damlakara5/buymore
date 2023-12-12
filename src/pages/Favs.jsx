import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFavs } from "../store/productsSlice"
import ProductCart from "../ui/ProductCart"
import { Link } from "react-router-dom"

function Favs() {
    const favs = useSelector(state => state.products.favs)
    const status = useSelector(state => state.products.status)
    const message = useSelector(state => state.products.message)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFavs())
    }, [dispatch ])



    useEffect(() => {        
        
    }, [favs])

    if(status === "failed") return <p className="col-span-3"> {message} </p>
    if(favs.length === 0) return (
        <div className="col-span-3 text-start">
            <p className=" mt-10 text-slate-700 font-semibold block">You haven`t added any products to your wishlist yet.Discpver our products. </p>
            <Link className="animated-hover text-lg font-semibold cursor-pointer" to="/products" >Discover</Link> 
        </div>
    )

    return (
        <>
            {
                favs && favs.length > 0 && favs.map(product => <ProductCart isFavedList={true} product={product} key={product._id} /> )
            }
        </>
    )
}

export default Favs
