import { useNavigate } from 'react-router-dom';

const useUpdateUrlWithFilter = () => {
    const navigate = useNavigate();

    const updateUrl = (filterType, label, shouldAdd) => {
        const currentLocation = window.location;
        const currentSearchParams = new URLSearchParams(currentLocation.search);

        if (shouldAdd) {
            // Add or update the new query parameter
            currentSearchParams.set(filterType, label.toLowerCase());
        } else {
            // Check if the parameter exists and matches the specified value, then delete it
            if (currentSearchParams.get(filterType) === label.toLowerCase()) {
                currentSearchParams.delete(filterType);
            }
        }

        // Construct the new URL with the original pathname and updated search params
        const newUrl = `${currentLocation.pathname}?${currentSearchParams.toString()}`;

        // Use navigate to redirect
        navigate(newUrl);
    };

    return updateUrl;
};

export default useUpdateUrlWithFilter;
