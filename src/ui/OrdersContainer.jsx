import PropTypes from 'prop-types';
import OrderProduct from './OrderProduct';
import { formatDate } from '../utils/formatDate';
import OrdersItem from './OrdersItem';

function OrdersContainer({item, totalAmount}) {

    
    return (
        <div className="border w-full rounded-md mb-5">
            <div className='flex justify-between bg-slate-50 p-5'>
               
                <OrdersItem label="Order Date" item={formatDate(item.createdAt)} />
                <OrdersItem label="Order Summary" item={`${totalAmount} product `} />
                <OrdersItem label="Amount" item={`${item.totalAmount}$`} />
            </div>
            <div>
                    {
                        item.products.map(product => <OrderProduct product={product} key={product._id}  />)
                    }
            </div>
            
        </div>
    )
}

OrdersContainer.propTypes= {
    item: PropTypes.object,
    totalAmount: PropTypes.number,
    totalPrice: PropTypes.string
}

export default OrdersContainer
