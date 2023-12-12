import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const useProductInfo = () => {
    // Retrieve products from the Redux store
    const products = useSelector(state => state.products.products);
    const resultLength = products && products.length;

    // Use the useLocation hook to get the current location
    const location = useLocation();

    // Function to get all query parameters
    const getAllQueryParams = () => {
        const queryParams = new URLSearchParams(location.search);
        const params = {};

        for (const [key, value] of queryParams.entries()) {
            params[key] = value;
        }

        return params;
    };

    // Get categories from query parameters
    const categories = getAllQueryParams();

    // Compute breadcrumb based on categories and brands
    const breadcrumb = useMemo(() => {
        const categoryPart = categories.category 
            ? ` > ${categories.category.charAt(0).toUpperCase() + categories.category.slice(1)}`
            : '';
        const brandPart = categories.brand 
            ? ` > ${categories.brand.charAt(0).toUpperCase() + categories.brand.slice(1)}`
            : '';

        return `${categoryPart} ${brandPart ? ` > ${brandPart}` : ''}`;
    }, [categories]);

    // Return the necessary data
    return { products, resultLength, breadcrumb };
};

export default useProductInfo;
