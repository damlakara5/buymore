import ColorBox from "./ColorBox"
import PropTypes from 'prop-types';

function ColorBoxWrapper({product, selectedColor, setSelectedColor}) {
    return (
        <div className="flex gap-2 mt-10">
            {
                product.colors.map(color => <ColorBox selectedColor={selectedColor} setSelectedColor={setSelectedColor} key={color} color={color}  />)
            }
        </div>
    )
}

ColorBoxWrapper.propTypes = {
    product: PropTypes.object,
    selectedColor: PropTypes.string,
    setSelectedColor: PropTypes.func,
}

export default ColorBoxWrapper
