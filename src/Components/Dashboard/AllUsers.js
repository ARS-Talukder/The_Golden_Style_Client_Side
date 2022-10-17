import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import AllUsersRow from './AllUsersRow';
import DashboardButton from './DashboardButton';

const AllUsers = () => {
    const navigate = useNavigate();
    const { data: users, isLoading: usersLoading } = useQuery('users', () => fetch('https://the-golden-style-server.onrender.com/users', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            navigate('/');
            toast.error("UnAuthorized Access. Please Login again");
        }
        return res.json()
    }));

    if (usersLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            {/* ---------------Dashboard Button------------- */}
            <DashboardButton></DashboardButton>

            <div className="overflow-x-auto px-2 my-4">
                <table className="table w-full">

                    <thead>
                        <tr className='bg-gray-500  border-red-500 border-2 rounded'>
                            <th></th>
                            <th className='text-black border-2 text-center'>User Email</th>
                            <th className='text-black border-2 text-center'>Designation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user,index) => <AllUsersRow key={index} index={index} user={user}></AllUsersRow>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;