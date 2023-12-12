
import ProfileForm from "./ProfileForm"
import { useUserInfo } from "../hooks/useUserInfo"

function MyProfile() {
   const {addressInfo, userInfo, handleUserInfo} = useUserInfo()
    return (
        <div className="col-span-3 text-start sm:ms-0 ms-10 sm:mt-0 mt-10">
               <ProfileForm  header="User Information" data={userInfo} handleSubmit={handleUserInfo} />
               <ProfileForm  header="Address Information" data={addressInfo} />
        </div>
    )
}

export default MyProfile
