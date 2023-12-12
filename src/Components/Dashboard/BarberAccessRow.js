import { signOut } from 'firebase/auth';
import React from 'react';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const BarberAccessRow = ({ user, index, refetch }) => {
    const { email, role, position } = user;
    const handleMakeBarber = () => {
        let proceed = window.prompt("If you want want to give him barber access, Please write 'barber'");
        if (proceed === null || proceed === "") {
            return
        }
        else if (proceed === 'barber') {
            fetch(`http://localhost:5000/users/manager/${email}`, {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 403 || res.status === 401) {
                        signOut(auth);
                        toast.error("Failed. UnAuthorized Access. Please Login again");
                    }
                    return res.json()
                })
                .then(data => {
                    if (data.modifiedCount > 0) {
                        refetch();
                        toast.success(`${email} is a new Barber of our Company`);
                    }

                })
        }
        else {
            return
        }
    }
    const handleRemoveBarber = () => {
        let proceed = window.prompt("If you want want to remove him for barber, Please write 'remove'");
        if (proceed === null || proceed === "") {
            return
        }
        else if (proceed === 'remove') {
            fetch(`http://localhost:5000/users/remove/${email}`, {
                method: 'PUT',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 403 || res.status === 401) {
                        signOut(auth);
                        toast.error("Failed. UnAuthorized Access. Please Login again");
                    }
                    return res.json()
                })
                .then(data => {
                    if (data.modifiedCount > 0) {
                        refetch();
                        toast.success(`${email} is not barber now`);
                    }

                })
        }
        else {
            return
        }
    }
    return (
        <tr key={index} className='bg-gray-300 hover border-red-500 border-2 rounded'>
            <td className='py-3 border-2 border-red-500 text-center'>{index + 1}</td>
            <td className='py-3 border-2 border-red-500 text-center'>{user.email}</td>
            <td className='py-3 border-2 border-red-500 text-center'>
                {
                    position === 'chairman' ? <p className='font-bold text-danger'>Chairman</p>
                        : (role === 'manager' ? <p className='font-bold text-primary'>Manager</p>
                            : (role !== 'barber' ? <button onClick={handleMakeBarber} className='btn btn-sm btn-success'>Make Barber</button>
                                : <p className='font-bold text-success'>Already Barber</p>))
                }
            </td>
            <td className='py-3 border-2 border-red-500 text-center'>
                {
                    role === 'barber' ? <button onClick={handleRemoveBarber} className='btn btn-sm btn-danger'>Remove Barber</button>
                        : <p className='font-bold'>not available</p>


                }
            </td>

        </tr>
    );
};

export default BarberAccessRow;