import { signOut } from 'firebase/auth';
import React from 'react';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const ManagerAccessRow = ({ user, index, refetch }) => {
    const { email, role, position } = user;
    const handleMakeManager = () => {
        let proceed = window.prompt("If you want want to give him Manager access, Please write 'manager'");
        if (proceed === null || proceed === "") {
            return
        }
        else if (proceed === 'manager') {
            fetch(`http://localhost:5000/users/chairman/${email}`, {
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
                        toast.success(`${email} is a new Manager of our Company`);
                    }

                })
        }
        else {
            return
        }

    }

    const handleRemoveManager = () => {
        let proceed = window.prompt("If you want want remove him from Manager, Please write 'remove'");
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
                        toast.success(`${email} is not manager now`);
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
                            : (role === 'barber' ? <p className='font-bold text-success'>Barber</p>
                                : <button onClick={handleMakeManager} className='btn btn-sm btn-success'>Give Manager Access</button>))
                }
            </td>
            <td className='py-3 border-2 border-red-500 text-center'>
                {
                    position === 'chairman' ? <p className='font-bold text-danger'>Chairman</p>
                        : (role === 'manager' ? <button onClick={handleRemoveManager} className='btn btn-sm btn-danger'>Remove Manager Access</button>
                            : <p className='font-bold'>not available</p>)


                }
            </td>

        </tr>
    );
};


export default ManagerAccessRow;