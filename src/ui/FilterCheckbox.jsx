import PropTypes from 'prop-types';
import { useHandleFilter } from '../hooks/useHandleFilter';

function FilterCheckbox({label, filterType}) {
  
    const {handleFilter} = useHandleFilter(filterType)


    return (
        <label className="gap-3 flex filter-label">
                <input type="checkbox" onChange={(e) => handleFilter(e, label)} />
                {label}
        </label>
    )
}

FilterCheckbox.propTypes = {
    label: PropTypes.string,
    setFilters: PropTypes.func,
    filterType: PropTypes.string
}

export default FilterCheckbox
