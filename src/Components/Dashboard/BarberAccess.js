import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import BarberAccessRow from './BarberAccessRow';

const BarberAccess = () => {
    const navigate = useNavigate();
    const { data: users, isLoading: usersLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/users', {
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
            <div className="overflow-x-auto px-2 my-4">
                <table className="table w-full">

                    <thead>
                        <tr className='bg-gray-500  border-red-500 border-2 rounded'>
                            <th></th>
                            <th className='text-black border-2 text-center'>User Email</th>
                            <th className='text-black border-2 text-center'></th>
                            <th className='text-black border-2 text-center'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user,index) => <BarberAccessRow key={index} index={index} user={user} refetch={refetch}></BarberAccessRow>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BarberAccess; <h2>All Users</h2>