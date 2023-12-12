import PropTypes from 'prop-types';

function OrdersItem({item, label}) {
    return (
        <div className='flex flex-col items-start justify-center'>
            <p className='font-semibold'> {label} </p>
            <p> {item} </p>
        </div>
    )
}

OrdersItem.propTypes = {
    item: PropTypes.node,
    label: PropTypes.string
}

export default OrdersItem
