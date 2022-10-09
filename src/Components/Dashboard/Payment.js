import { loadStripe } from '@stripe/stripe-js';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const stripePromise = loadStripe('pk_test_51L60shGAQ9TdksKxnx4viZcUdkkXV0qO4FPfPwss0QSfl4KV7dBGruGIkSyfgIiUa6pDtX2ao4eW7N5cWq4V93B700cmACJTVt');

const Payment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: appointment, isLoading: appointmentLoading } = useQuery(['appointment', id], () => fetch(`http://localhost:5000/appointment/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/');
            toast.error("UnAuthorized Access. Please Login again");
        }
        return res.json()
    }));

    const serviceName = appointment?.appointment_service;
    const { data: service, isLoading: serviceLoading } = useQuery('service', () => fetch(`http://localhost:5000/service?name=${serviceName}`).then(res => res.json()));

    console.log(service)

    if (appointmentLoading || serviceLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='p-2'>
            <section className='flex justify-center'>
                <div className='lg:w-1/3 bg-gray-300 p-2 rounded-xl'>
                    <h5 className='text-center text-orange-600 font-bold underline'>Your Appointment Details</h5>
                    <p className='text-center mb-1'><span className='text-red-600 font-bold underline'>Service:</span> <span className='font-bold'>{appointment.appointment_service}</span></p>
                    <p className='text-center mb-1'><span className='text-red-600 font-bold underline'>Barber:</span> <span className='font-bold'>{appointment.appointment_barber}</span></p>
                    <p className='text-center mb-1'><span className='text-red-600 font-bold underline'>Date:</span> <span className='font-bold'>{appointment.appointment_date}</span></p>
                    <p className='text-center mb-1'><span className='text-red-600 font-bold underline'>Slot:</span>  <span className='font-bold'>{appointment.appointment_slot}</span></p>
                    <p className='text-center mb-1'><span className='text-red-600 font-bold underline'>Cost:</span>  <span className='font-bold'>{service.service_amount}$</span></p>
                </div>

            </section>

        </div>
    );
};

export default Payment;