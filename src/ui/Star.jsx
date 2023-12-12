import {BsStarFill, BsStar} from "react-icons/bs"
import PropTypes from 'prop-types';

const Star = ({ filled, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <span
    className={`star ${filled ? 'filled' : 'unfilled'}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {filled ? <BsStarFill className="reviews__star reviews__star--active" /> :  <BsStar className="reviews__star" /> }
  </span>
  )
}


Star.propTypes = {
  filled: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func
}
export default Star