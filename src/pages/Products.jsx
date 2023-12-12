import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFavs, fetchProducts } from "../store/productsSlice"
import ProductCart from "../ui/ProductCart"
import {  useSearchParams } from "react-router-dom"
import Loader from "../ui/Loader"

function Products() {
   const dispatch = useDispatch()
   const products = useSelector(state => state.products.products)
   const categoryFilter = useSelector((state) => state.filters.category);
   const brandFilter = useSelector((state) => state.filters.brand);
   const priceFilter = useSelector((state) => state.filters.price);
   const sizeFilter = useSelector((state) => state.filters.size);
   const discountFilter = useSelector((state) => state.filters.discount);
   const [searchParams] = useSearchParams();
   const loading = useSelector(state => state.products.loading)

   useEffect(() => {
        dispatch(fetchProducts([...searchParams][0]))
        dispatch(fetchFavs())
   } , [dispatch,categoryFilter,priceFilter,searchParams, brandFilter, discountFilter, sizeFilter])


    useEffect(() => {
    } , [products])

   
    if(loading === "pending" ) return <Loader />
    if(loading !== "pending" && products.length === 0 ) return <p>There are no products</p>


    return (
        <>
            {
                products && products.map((product, index) => <ProductCart product={product} key={index} />)
            }
        </>
    )
}

export default Products
