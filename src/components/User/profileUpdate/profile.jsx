import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserUpdateAction } from '../../../services/redux/action/userUpdate'
import './profile.css'
import React from 'react'

function Profile() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const user = useSelector((state) => state.UserUpdate)

    const APIURL = useSelector((state) => state.APIURL.url);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        axios.get(`${APIURL}/profile`, {
            params: { email: userEmail },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
            .then((response) => {
                dispatch(UserUpdateAction('username', response.data.username));
                dispatch(UserUpdateAction('email', response.data.email));
                dispatch(UserUpdateAction('mobile', response.data.mobile));
                dispatch(UserUpdateAction('image', response.data.image));
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data.message);
            });
    }, [APIURL, dispatch]);


    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setSelectedImage(image);
        setPreviewImage(URL.createObjectURL(image));
    };


    const onChange = (e) => {
        dispatch(UserUpdateAction(e.target.name, e.target.value));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (selectedImage) {
                formData.append('image', selectedImage);
            }
            formData.append('username', user.username);
            formData.append('email', user.email);
            formData.append('mobile', user.mobile);
            const oldEmail = localStorage.getItem('userEmail')
            const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
            const response = await axios.patch(`${APIURL}/profile-update`, formData, { headers, params: { userEmail: oldEmail } });
            if (response.data.email) {
                navigate('/home');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };

    const Logout = ()=>{
        localStorage.clear()
        navigate('/')
    }




    return (

         <section className="h-screen">

            <div className="h-full">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full"
                            alt="Sample image"
                        />
                    </div>
                    

                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                        
                    <form onSubmit={handleSubmit}>
                    <div className="flex flex-row items-center justify-center lg:justify-start">
                                <p className="mb-0 mr-4 text-lg"><strong>Update User Details</strong></p>


                            </div>

                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">

                                </p>
                            </div>
                   
                    <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                    type="text"
                                     className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                   
                                    name="username"
                                    placeholder="Enter your name"
                                    required
                                    value={user.username}
                                    onChange={onChange}
                                />
                                <label
                                    htmlFor="exampleFormControlInput2"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                >
                                     { !user.username && <>User Name</>}
                                </label>
                            </div>
                            <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                    type="email"
                                     className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                   
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    value={user.email}
                                    onChange={onChange}
                                />
                                <label
                                    htmlFor="exampleFormControlInput2"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                >
                                    { !user.email && <>Email address</>}
                                </label>
                            </div>
                            <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                    type="text"
                                     className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                   
                                    name="mobile"
                                    placeholder="Enter your number"
                                    required
                                    value={user.mobile}
                                    onChange={onChange}
                                />
                                <label
                                    htmlFor="exampleFormControlInput22"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                >
                                     { !user.mobile && <>Phone Number</>}
                                </label>
                            </div>
                            {/* <div>
                                <input
                                    type="password"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    name="password"
                                    placeholder="Create a password"
                                    value={signup.password}
                                    onChange={onChange}
                                />
                            </div> */}

                            <div className="image-selection">
                                <label htmlFor="fileInput" className="custom-file-upload">
                                    {user.image || previewImage ? "\u00a0  \u00a0  Choose another photo" : "Select a profile Photo"}
                                </label>
                                <input
                                    className="file-input"
                                    type="file"
                                    name="image"
                                    id="fileInput"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div>
                                {previewImage ? (
                                    <img
                                        style={{ width: "auto", height: "100px", margin: "5px 0 15px 0" }}
                                        src={previewImage}
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                ) : user && user.image ? (
                                    <img
                                        style={{ width: "auto", height: "100px", margin: "5px 0 15px 0" }}
                                        src={`${APIURL}/public/images/${user.image}`}
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                ) : (
                                    <img
                                        style={{ width: "auto", height: "100px", margin: "5px 0 15px 0" }}
                                        src=""
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                )

                                }
                            </div>
                           <div className="text-center lg:text-left">
                                <button
                                   
                                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#3b71ca] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:bg-primary-700 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                >
                                    submit
                                </button>
                                </div>
                        </form>
                      
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile

