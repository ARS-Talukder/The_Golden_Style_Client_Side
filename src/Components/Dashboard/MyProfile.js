import React from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { TiEdit } from "react-icons/ti";
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import useManager from '../../hooks/useManager';
import useBarber from '../../hooks/useBarber';
import useChairman from '../../hooks/useChairman';
import DashboardButton from './DashboardButton';


const MyProfile = () => {
    const [user, loading, error] = useAuthState(auth);
    const [updateProfile, updating, uError] = useUpdateProfile(auth);
    const [manager, managerLoading] = useManager(user);
    const [chairman, chairmanLoading] = useChairman(user);
    const [barber, barberLoading] = useBarber(user);
    const email = user.email;
    const { data: userByEmail, isLoading: userByEmailLoading, refetch } = useQuery('userByEmail', () => fetch(`https://the-golden-style-server.onrender.com/user?email=${email}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/');
            toast("UnAuthorized Access. Please Login again");
        }
        return res.json()
    }));

    const navigate = useNavigate();

    if (loading || userByEmailLoading || updating || managerLoading || chairmanLoading || barberLoading) {
        return <Loading></Loading>
    }
    const imageStoragrKey = '1146aec9c4d6c94677d0b6576da83d17';

    const handleUploadImage = event => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStoragrKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const updatedUser = { img };


                    // Sending img to the server
                    fetch(`https://the-golden-style-server.onrender.com/user/${email}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`

                        },
                        body: JSON.stringify(updatedUser)
                    })
                        .then(res => {
                            if (res.status === 401 || res.status === 403) {
                                signOut(auth);
                                navigate('/');
                                toast.error("UnAuthorized Access. Please Login again");
                            }
                            return res.json()
                        })
                        .then(data => {
                            refetch();
                            toast.success('Your Profile Picture is uploaded Successfully')

                        })

                }

            })
    }
    const handleNameChange = () => {
        let proceed = window.prompt("Enter Your New Name");
        if (proceed === null || proceed === "") {
            return
        }
        else {
            updateProfile({ displayName: proceed });
        }
    }
    return (
        <div>
            {/* ---------------Dashboard Button------------- */}
            <DashboardButton></DashboardButton>

            {/* --------------Picture Section---------------- */}
            <div className='flex justify-center'>
                <div className="border-2 rounded border-gray-500 p-1 relative">
                    <div className="w-52 h-48 rounded-full">
                        <img className='h-full' src={userByEmail.img ? userByEmail.img : "https://i.ibb.co/jhNMsHZ/profile-avatar.png"} alt='Profile_Picture' />
                    </div>

                    <div className='text-white text-4xl absolute top-0 right-0'>
                        <label htmlFor="file-input" className='hover:cursor-pointer'>
                            <TiEdit></TiEdit>
                        </label>
                        <input type="file" id='file-input' className='w-0 h-0 hidden' onChange={handleUploadImage} />

                    </div>
                </div>
            </div>

            {/* ---------------Table Section---------------- */}
            <div className="overflow-x-auto px-2">
                <table className="table w-full">

                    <thead>
                        <tr className='bg-gray-500  border-red-500 border-2 rounded'>
                            <th className='text-xl text-black px-4'>Your Name</th>
                            <th className='text-xl text-black px-4'>Email</th>
                            <th className='text-xl text-black px-4'>Your Designation</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-gray-300 hover border-red-500 border-2 rounded'>
                            <td className='px-4 py-2 flex items-center'>
                                <span>{user?.displayName}</span>
                                <button className='ml-2' onClick={handleNameChange}><span className='text-3xl text-blue-800'><TiEdit></TiEdit></span></button>
                            </td>
                            <td className='px-4'>{user?.email} </td>
                            <td className='px-4 font-bold text-success'>
                                {
                                    chairman ? <p>Chairman</p>
                                        :
                                        (manager ? <p>Manager</p>
                                            : (barber ? <p>Barber</p>
                                                : <p>Customer</p>))

                                }
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProfile; <h2>My Profile</h2>