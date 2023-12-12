import PropTypes from 'prop-types';

function ColorBox({color, selectedColor, setSelectedColor}) {
    return (
        <div className={` flex gap-2 `} onClick={() => setSelectedColor(color)}>
            <div className={` p-1 border-2 ${selectedColor === color && "border-2 border-blue-700 text-blue-600 font-semibold"}`} >
                <div className='p-3 border-2 border-gray-700' style={{backgroundColor : color}}></div>
            </div>
            <p> {color} </p>
        </div>
    )
}

ColorBox.propTypes = {
    color: PropTypes.string,
    selectedColor: PropTypes.string,
    setSelectedColor: PropTypes.func,
}

export default ColorBox
