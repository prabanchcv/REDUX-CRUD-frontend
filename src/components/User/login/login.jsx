import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'
import { UserLoginAction } from '../../../services/redux/action/userLogin'
import axios from '../../../services/axios/axios'


function Login() {

    const login = useSelector((state) => state.UserLogin)
    const APIURL = useSelector((state) => state.APIURL.url);

    const queryParams = {
        email: login.email,
        password: login.password,
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home')
        } else {
            console.log("nothing");
        }
    });


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        dispatch(UserLoginAction(e.target.name, e.target.value))
    }



    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.get(`${APIURL}/login`, { params: queryParams })
            if (response.data.userData && response.data.userData.email) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userEmail', response.data.userData.email);
                navigate('/home')
            } else {
                console.log(48,response)
                alert(response.data);
            }
        } catch (error) {
            console.log("error",error);
            alert(error.message);
        }
    }



    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            {/* login container */}
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                {/* form */}
                <div className="md:w-1/2 px-8 md:px-16">
                    <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
                    <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <input
                            type="text"
                            className="p-2 mt-8 rounded-xl border login"
                            name='email'
                            placeholder='Enter your email'
                            required
                            value={login.email}
                            onChange={onChange}
                        />
                        <div className="relative">
                            <input type="password"
                                className="p-2 rounded-xl border w-full login"
                                name='password'
                                placeholder='Enter your password'
                                required
                                value={login.password}
                                onChange={onChange}
                            />
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </div>
                        <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
                    </form>

                  

                  

                    <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                    <p>Don't have an account?</p>
                    </div>

                    
                    <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                        
                    <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"  onClick={() => {
                                    navigate('/signup')
                                }}>Register</button>
                    </div>
                </div>

                {/* image */}
                <div className="md:block hidden w-1/2">
                    <img className="rounded-2xl" src="https://wallpaperaccess.com/full/2443362.jpg" alt="Login Image" />
                </div>
            </div>
        </section>
    )
}

export default Login