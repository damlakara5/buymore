import { useState } from "react"
import { updateUserInfo } from "../store/authSlice"
import { useDispatch, useSelector } from "react-redux"

export const useUserInfo = () => {
    const user = useSelector(state => state.auth.user)
    const userData = JSON.parse(user)
    const dispatch = useDispatch()
    const [name, setName] = useState(userData.name)
    const [email, setEmail] = useState(userData.email)
    const [phone, setPhone] = useState(userData.phone)
    const [city, setCity] = useState(userData.address.city)
    const [country, setCountry] = useState(userData.address.country)
    const [addressTitle, setAddressTitle] = useState(userData.address.adressTitle)

    const userInfo = [
        {
            label: "Name",
            value: name,
            onChangeHandler: setName
        },
        {
            label: "Email",
            value: email,
            onChangeHandler: setEmail
        },
        {
            label: "Phone",
            value: phone,
            onChangeHandler: setPhone
        },
    ]


    const addressInfo = [
        {
            label: "City",
            value: city,
            onChangeHandler: setCity
        },
        {
            label: "Country",
            value: country,
            onChangeHandler: setCountry
        },
        {
            label: "Address Label",
            value: addressTitle,
            onChangeHandler: setAddressTitle
        },
    ]

    const handleUserInfo = (e) => {
        e.preventDefault()
        if(name || email || phone) {
            dispatch(updateUserInfo({
                name,
                email,
                phone
            }))
        }
       
    }

    return {handleUserInfo, userInfo, addressInfo}
}