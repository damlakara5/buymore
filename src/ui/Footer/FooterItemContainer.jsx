import FooterListHeader from "./FooterListHeader"
import PropTypes from 'prop-types';

function FooterItemContainer({header, items}) {
    return (
        <div className="max-w-max mb-5">
            <FooterListHeader text={header} />
            <ul className="max-w-max">
                {
                    items.map(el => <li className="sm:text-base text-xs max-w-max" key={el} > {el} </li>)
                }
            </ul>
        </div>
    )
}

FooterItemContainer.propTypes = {
    header: PropTypes.string,
    items: PropTypes.array,
}

export default FooterItemContainer
