import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrders } from "../store/ordersSlice"
import OrdersContainer from "../ui/OrdersContainer"
import Modal from "../ui/Modal"
import { OpenContext } from "../context/OrderModalContext"
import { toast } from "react-toastify"
import { changeStatus } from "../store/reviewSlice"
import Loader from "../ui/Loader"

function Orders() {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders.orders)
    const loading = useSelector(state => state.orders.loading)
    const totalAmount = orders.length >0 && orders[0].products.reduce((a,b) => a + Number(b.quantity), 0)
    const status = useSelector(state => state.review.status)
    const message = useSelector(state => state.review.message)
    const ErrorMessage = useSelector(state => state.orders.message)
    const {setOpen} = useContext(OpenContext)

    useEffect(() => {
        dispatch(getOrders())
      
    }, [dispatch])

  useEffect(() => {
    if(status === "success"){
        setOpen(false)
        toast.success("Your review added successfully!")

        setTimeout(() => {
            dispatch(changeStatus("failed")) 
        }, 1000);
    }else if(status === "rejected"){
        setOpen(false)
        toast.error(`${message}`)
    }
  }, [dispatch, setOpen,status, message])

    if(loading === "pending") return <Loader />
    if(loading === "failed") return <p className="col-span-3"> {ErrorMessage} </p>

    return (
        <div className="w-full col-span-3 ">
            <Modal />
           {
               orders.length > 0 && orders.map((order)=> 
                    <OrdersContainer 
                        item={order}    
                        totalAmount = {totalAmount} 
                        key={order._id} 
                    /> )
           }
        </div>
    )
}

export default Orders
