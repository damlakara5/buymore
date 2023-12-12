import PropTypes from 'prop-types';

function ProfileFormInput({label,value, onChangeHandler }) {
    

    return (
        <label className="flex flex-col text-start ">
            {label}
            <input className="border outline-none rounded-2xl px-4 py-1"  placeholder="" value={value} onChange={(e) => onChangeHandler(e.target.value)} />
        </label>
    )
}

ProfileFormInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeHandler: PropTypes.func,
}

export default ProfileFormInput
