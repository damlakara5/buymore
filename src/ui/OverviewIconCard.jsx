import PropTypes from 'prop-types';


function OverviewIconCard({text, icon, header}) {
    return (
        <div className="flex flex-col items-center mt-10 gap-4 w-3/4 mx-auto ">
            <p className=" text-start font-bold sm:text-xl"> {header} </p>
            <img className="sm:w-28 sm:h-32 w-14 h-14"  src={icon} />
            <p className='sm:text-base text-xs sm:ps-4' > {text} </p>
        </div>
    )
}

OverviewIconCard.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    header: PropTypes.string,
}

export default OverviewIconCard
