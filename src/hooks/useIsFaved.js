import { useSelector } from 'react-redux';

// Custom hook to check if the product is in the favorites
const useIsFaved = (productId,isFavedList) => {
    const faved = useSelector(state => state.products.favs);


    // This function will check if the product is in the favorites
    const isFaved = () => {  
        return faved.some(fav => fav._id === productId);
    };

    return isFavedList || isFaved();
};

export default useIsFaved;
