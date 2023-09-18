import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserUpdateAction } from '../../../services/redux/action/userUpdate';
import "./adminHome.css";

function AdminHome() {

    const APIURL = useSelector((state) => state.APIURL.url);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const deleteUser = async (userId) => {
        try {
            if (window.confirm("Are you sure you want to delete this user?")) {

                const userData = await axios.delete(`${APIURL}/admin/deleteUser/${userId}`, userId);
                if (userData.data.email) {
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== userId))
                } else {
                    alert(userData.data.message)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addUser = () => {
        navigate('/admin-addUser')
    }


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${APIURL}/admin/loadDashboard`);
                setUsers(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();

    }, [APIURL]);

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const logout = () => {
        localStorage.clear()
        navigate('/admin')
    }

    return (
        <div className="overflow-x-auto">
            {/* Navbar */}
            <div className="bg-gray-200 p-4">
                <div className="flex justify-between">
                    <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Logout
                    </button>
                    <button  onClick={addUser} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add User
                    </button>
                    <div className="flex">
                      
                        <input type="search"
                            placeholder='Search Users'
                            className="border rounded-l py-2 px-4"
                            name=""
                            id=""
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                            Search
                        </button> */}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                <div className="w-full lg:w-5/6">
                    <div className="bg-white shadow-md rounded my-6">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-center">Mobile</th>
                                    <th className="py-3 px-6 text-center">Joining</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                            {filteredUsers.map((users)=>(
                                <tr  key={users._id} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                               
                                            </div>
                                            <span className="font-medium">{users.username}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        <div className="flex items-center">
                                            <div className="mr-2">
                                            </div>
                                            <span>{users.email}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex items-center justify-center">
                                        <span className="font-medium">{users.mobile}</span>
                                            </div>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{users.date}</span>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center">
                                        <td>
                                            <i style={{cursor:'pointer'}} onClick={()=>{
                                                dispatch(UserUpdateAction(users._id))
                                                navigate(`/admin-update?id=${users._id}`)
                                            }} className="edit material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>

                                            <i style={{cursor:'pointer', color:"red"}} onClick={()=>deleteUser(users._id)} 
                                             className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                                    </td>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
