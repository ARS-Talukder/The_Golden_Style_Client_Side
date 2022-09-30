import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const MyHistory = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate()
    const { data: myAppointments, isLoading: appointmentLoading } = useQuery('myAppointments', () => fetch(`http://localhost:5000/myAppointments?email=${user.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
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

    if (loading || appointmentLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className="overflow-x-auto px-2 my-4">
                <table className="table w-full">

                    <thead>
                        <tr className='bg-gray-500  border-red-500 border-2 rounded'>
                            <th className='text-black border-2'></th>
                            <th className='text-black border-2 text-center'>Service</th>
                            <th className='text-black border-2 text-center'>Date</th>
                            <th className='text-black border-2 text-center'>Barber</th>
                            <th className='text-black border-2 text-center'>Time Slot</th>
                            <th className='text-black border-2 text-center'>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myAppointments.map((myAppointment, index) =>
                                <tr key={index} className='bg-gray-300 hover border-red-500 border-2 rounded'>
                                    <td className='py-3 border-2 border-red-500 text-center'>{index + 1}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{myAppointment.appointment_service}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{myAppointment.appointment_date}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{myAppointment.appointment_barber}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{myAppointment.appointment_slot}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>
                                        {
                                            myAppointment.payment === "due" ?
                                                <button className='btn btn-sm btn-success px-3'>pay</button>
                                                : <p className='text-red-500 font-bold'>Paid</p>
                                        }

                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyHistory;