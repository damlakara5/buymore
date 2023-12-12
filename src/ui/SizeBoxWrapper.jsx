
import PropTypes from 'prop-types';
import SizeBox from './SizeBox';

function SizeBoxWrapper({sizeOptions,sizes, setSelectedSize, selectedSize, className}) {
  
  

if (sizeOptions && sizeOptions.length > 0) {
      return (
        <div className='gap-3 flex'>
          {
            sizeOptions.map((option) =><SizeBox className={className} selectedSize={selectedSize} setSelectedSize={setSelectedSize} key={option} isHave={sizes.includes(option)} label={option} />  )
          }
        </div>
      );
    } 
}

SizeBoxWrapper.propTypes ={
    sizes : PropTypes.array,
    sizeOptions: PropTypes.object,
    setSelectedSize: PropTypes.func,
    selectedSize: PropTypes.string,
    className: PropTypes.string
}

export default SizeBoxWrapper
