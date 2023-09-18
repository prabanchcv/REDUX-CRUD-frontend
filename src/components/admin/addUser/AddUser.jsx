import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { UserSignupAction } from '../../../services/redux/action/userSignup';
import './AddUser.css'


function AddUser() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setSelectedImage(image);
        setPreviewImage(URL.createObjectURL(image));
      };

    const signup = useSelector((state) => state.UserSignup);
    const APIURL = useSelector((state) => state.APIURL.url);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (e) => {
        dispatch(UserSignupAction(e.target.name, e.target.value));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append('username', signup.username);
          formData.append('email', signup.email);
          formData.append('mobile', signup.mobile);
          formData.append('password', signup.password);
          formData.append('image', selectedImage);
          const response = await axios.post(`${APIURL}/register`, formData);
          if (response.status === 201) {
            navigate('/dashboard');
          } else {
            alert(response.data.message,"responsee");
          }
        } catch (error) {
          console.log(error);
          alert(error.message+"trycatchh");
        }
      };

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
                        <p className="mb-0 mr-4 text-lg"><strong>ADD NEW USER</strong></p>


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
                            value={signup.username}
                            onChange={onChange}
                        />
                        <label
                            htmlFor="exampleFormControlInput2"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                             { !signup.username && <>User Name</>}
                        </label>
                    </div>
                    <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                            type="email"
                             className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                           
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={signup.email}
                            onChange={onChange}
                        />
                        <label
                            htmlFor="exampleFormControlInput2"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                            { !signup.email && <>Email address</>}
                        </label>
                    </div>

                    <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                            type="text"
                             className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                           
                            name="mobile"
                            placeholder="Enter your number"
                            required
                            value={signup.mobile}
                            onChange={onChange}
                        />
                        <label
                            htmlFor="exampleFormControlInput22"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                             { !signup.mobile && <>Phone Number</>}
                        </label>
                    </div>
                    <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                            type="password"
                             className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                           
                            name="password"
                            placeholder="Create a password"
                            required
                            value={signup.password}
                            onChange={onChange}
                        />
                        <label
                            htmlFor="exampleFormControlInput22"
                            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >
                             { !signup.password && <>password</>}
                        </label>
                    </div>
                    <div className="relative mb-6" data-te-input-wrapper-init>
                    <label htmlFor="fileInput" className="custom-file-upload">
                            {selectedImage?"Choose another photo":"\u00a0  Select a profile Photo"}
                        </label>
                        <input
                             className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                           
                            type="file"
                            name="image"
                            id="fileInput"
                            required
                            onChange={handleImageChange}
                            style={{display: "none"}}
                        />
                       
                    </div>
                    <div>
                    {selectedImage && (
                                    <img
                                        style={{ width: "auto", height: "100px", margin: "5px 0 15px 0" }}
                                        src={previewImage}
                                        alt="profile-image"
                                        className="profile-image"
                                    />
                                )}
                    </div>

                    <div className="mb-6 flex items-center justify-between">
                      


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

export default AddUser