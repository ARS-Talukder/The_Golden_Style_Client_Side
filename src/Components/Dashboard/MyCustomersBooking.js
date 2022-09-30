import { format } from 'date-fns';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import './Dashboard.css';

const MyCustomersBooking = () => {
    const [user, loading, error] = useAuthState(auth);
    const [date, setDate] = useState(new Date());
    const formatDate = format(date, 'PP');
    const navigate = useNavigate();
    const { data: appointments, isLoading: appointmentsLoading } = useQuery(['appointments', formatDate], () => fetch(`http://localhost:5000/myCustomerAppointments?date=${formatDate}&email=${user.email}`, {
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

    if (loading || appointmentsLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <section>
                <div className='flex justify-center'>
                    <DayPicker
                        className='dashboard-date-div'
                        required
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                    />
                </div>

            </section>
            <section className="overflow-x-auto px-2 my-4">
                <table className="table w-full">

                    <thead>
                        <tr className='bg-gray-500  border-red-500 border-2 rounded'>
                            <th className='text-black border-2'></th>
                            <th className='text-black border-2 text-center'>Client</th>
                            <th className='text-black border-2 text-center'>Client Email</th>
                            <th className='text-black border-2 text-center'>Service</th>
                            <th className='text-black border-2 text-center'>Date</th>
                            <th className='text-black border-2 text-center'>Time Slot</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments?.map((a, index) =>
                                <tr key={index} className='bg-gray-300 hover border-red-500 border-2 rounded'>
                                    <td className='py-3 border-2 border-red-500 text-center'>{index + 1}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{a.clientName}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{a.email}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{a.appointment_service}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{a.appointment_date}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{a.appointment_slot}</td>


                                </tr>)
                        }

                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default MyCustomersBooking;