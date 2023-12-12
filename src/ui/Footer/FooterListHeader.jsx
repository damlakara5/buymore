import PropTypes from 'prop-types';

function FooterListHeader({text}) {
    return (
        <p className="sm:text-lg text-xs font-bold max-w-max"> {text} </p>

    )
}

FooterListHeader.propTypes = {
    text: PropTypes.string
}

export default FooterListHeader
