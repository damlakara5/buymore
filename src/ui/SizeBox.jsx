import PropTypes from 'prop-types';
import "./SizeBox.css"

function SizeBox({label, isHave, setSelectedSize, selectedSize,className}) {

    return (
        <button
            disabled= {!isHave}
            onClick={() => setSelectedSize(label)} title='Click to choose size' 
            className={`md:p-4 ${className} cursor-pointer  border-2 border-slate-200 max-w-max rounded-md ${isHave ? "": "diagonal-border-box"} ${selectedSize === label && "border-2 border-blue-700 text-blue-600 font-semibold"} ` }>
            <p>{label}</p>
        </button>
    )
}

SizeBox.propTypes = {
    label: PropTypes.string,
    isHave : PropTypes.bool,
    setSelectedSize: PropTypes.func,
    selectedSize: PropTypes.string,
    className: PropTypes.string,

}

export default SizeBox
