
import PropTypes from 'prop-types';
import SizeBox from './SizeBox';

function SizeBoxWrapper({sizeOptions,sizes, setSelectedSize, selectedSize}) {
  
  

if (sizeOptions && sizeOptions.length > 0) {
      return (
        <div className='flex gap-4'>
          {
            sizeOptions.map((option) =><SizeBox selectedSize={selectedSize} setSelectedSize={setSelectedSize} key={option} isHave={sizes.includes(option)} label={option} />  )
          }
        </div>
      );
    } 
}

SizeBoxWrapper.propTypes ={
    sizes : PropTypes.array,
    sizeOptions: PropTypes.object,
    setSelectedSize: PropTypes.func,
    selectedSize: PropTypes.string
}

export default SizeBoxWrapper
