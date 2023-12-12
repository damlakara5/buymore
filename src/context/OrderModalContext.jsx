// OpenContext.js
import  { useState, createContext } from 'react';
import PropTypes from 'prop-types';

// Create Context
export const OpenContext = createContext({
  open: false,
  setOpen: () => {},
  setReviewProduct: () => {},
  reviewProduct: null
});

// Create Provider Component
export const OpenProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [reviewProduct, setReviewProduct] = useState()

    return (
        <OpenContext.Provider value={{ open, setOpen , reviewProduct, setReviewProduct}}>
            {children}
        </OpenContext.Provider>
    );
};


OpenProvider.propTypes = {
    children: PropTypes.node
}