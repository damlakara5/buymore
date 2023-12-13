import login from "../assets/img/login.jpg"
import { FcGoogle } from "react-icons/fc";
import "./Login.css"
import { useDispatch, useSelector } from "react-redux";
import { authLogin, googleLogin } from "../store/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("janet.weaver@reqres.in")
    const [error, setError] = useState()
    const [password, setPassword] = useState("test1234")
    const loading = useSelector(state => state.auth.loading)

    const handleLogin = (e) => {
        e.preventDefault()


        if(!email || !password ){
            setError("Please provide all the n")
        }

        dispatch(authLogin({email, password}))
            .unwrap()
            .then(() => navigate('/'))
            .catch((error) => {
                // handle error
                setError(error)
            })

    }
    return (
        <div  className="w-screen h-screen grid grid-cols-5">
            <img className="object-cover col-span-2 w-full h-full" src={login} />
            <div className="col-span-3 bg-slate-100 ps-5 sm:px-36 flex flex-col items-center justify-center">
                <h1 className="font-semibold text-base sm:text-base me-auto text-gray-600">Login to BuyMore</h1>

                <button onClick={() => googleLogin()} className="my-5 sm:text-base text-sm me-auto sm:px-5 sm:py-4 px-2 py-1 border-2 border-gray-200 flex items-center">Log in With Google <FcGoogle className="w-7 h-7 ms-3" /> </button>
                <div className="mb-5 me-auto flex items-center">
                    <div className="sm:w-14 w-10 me-3 h-1 border-t-2 border-gray-400 "></div>
                    <p className="email-text sm:text-base text-xs  ">Or log in with email</p>
                    <div className="sm:w-14 w-10 ms-3 h-1 border-t-2 border-gray-400 "></div>

                </div>
                <form className=" flex flex-col gap-5 w-3/4 lg:w-1/2 me-auto" onSubmit={handleLogin}>
                    <label className="flex flex-col text-start ">
                        Email
                        <input  required className="border outline-none rounded-2xl px-4 py-1" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    </label>
                    <label className="flex flex-col text-start">
                        Password
                        <input minLength={8} required className="border outline-none rounded-2xl px-4 py-1" type="password" value={password} onChange={e => setPassword(e.target.value)}  placeholder="Password" />
                    </label>
                    <button type="submit" className="bg-blue-500 outline-0 text-white" > {loading === "pending" ? "Logging in" : "Log In"} </button>
                {error && <p className="bg-red-200 text-red-600 px-3 py-1 rounded-md mt-8"> {error} </p>}
                </form>
            </div>
            
        </div>
    )
}

export default Login
