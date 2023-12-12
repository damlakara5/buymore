import login from "../assets/img/login.jpg"
import { FcGoogle } from "react-icons/fc";
import "./Login.css"
import { useDispatch } from "react-redux";
import { authLogin } from "../store/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()

    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(authLogin({email, password, passwordConfirm}))
            .unwrap()
            .then(() => navigate('/'))
            .catch((error) => {
            // handle error
            console.log(error)
            })

    }
    return (
        <div  className="w-screen h-screen grid grid-cols-5">
            <img className="object-cover col-span-2 w-full h-full" src={login} />
            <div className="col-span-3 bg-slate-100 px-36 flex flex-col items-center justify-center">
                <h1 className="font-semibold me-auto text-gray-600">Login to BuyMore</h1>

                <button className="my-5 me-auto border-2 border-gray-200 flex items-center">Log in With Google <FcGoogle className="w-7 h-7 ms-3" /> </button>
                <div className="mb-5 me-auto flex items-center">
                    <div className="w-14 me-3 h-1 border-t-2 border-gray-400 "></div>
                    <p className="email-text  ">Or log in with email</p>
                    <div className="w-14 ms-3 h-1 border-t-2 border-gray-400 "></div>

                </div>
                <form className=" flex flex-col gap-5 w-1/2 me-auto" onSubmit={handleLogin}>
                    <label className="flex flex-col text-start ">
                        Email
                        <input className="border outline-none rounded-2xl px-4 py-1" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    </label>
                    <label className="flex flex-col text-start">
                        Password
                        <input className="border outline-none rounded-2xl px-4 py-1" type="password" value={password} onChange={e => setPassword(e.target.value)}  placeholder="Password" />
                    </label>
                    <label className="flex flex-col text-start">
                        Password Confirm
                        <input className="border outline-none rounded-2xl px-4 py-1" type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="Password Confirm" />
                    </label>
                    <button type="submit" className="bg-blue-500 outline-0 text-white" >Log In</button>
                </form>
            </div>
            
        </div>
    )
}

export default Login
