import PropTypes from 'prop-types';
import ProfileFormInput from './ProfileFormInput';


function ProfileForm({header , data, handleSubmit}) {


    return (
        <div className='mb-10'>
            <h2 className='text-xl font-bold mb-3'> {header} </h2>
            <form className="grid gap-4 w-1/2 ms-10" onSubmit={handleSubmit} >
                {
                    data.map(el => <ProfileFormInput key={el.name} value={el.value} onChangeHandler={el.onChangeHandler} label={el.label} />)
                }
                <button className='border-2 border-blue-600'>Update</button>
            </form>
        </div>
    )
}

ProfileForm.propTypes= {
    header: PropTypes.string,
    data: PropTypes.array,
    handleSubmit: PropTypes.func
}

export default ProfileForm
