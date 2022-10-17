import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L60shGAQ9TdksKxnx4viZcUdkkXV0qO4FPfPwss0QSfl4KV7dBGruGIkSyfgIiUa6pDtX2ao4eW7N5cWq4V93B700cmACJTVt');

const Payment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: appointment, isLoading: appointmentLoading } = useQuery(['appointment', id], () => fetch(`https://the-golden-style-server.onrender.com/appointment/${id}`, {
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

    if (appointmentLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='p-2'>
            <section className='flex justify-center'>
                <div className='w-4/5 md:w-1/2 lg:w-1/3 bg-gray-300 p-2 rounded-xl'>
                    <h5 className='text-center text-orange-600 font-bold underline'>Your Appointment Details</h5>
                    <p className='text-center mb-1'><span className='text-red-600 font-bold underline'>Service:</span> <span className='font-bold'>{appointment.appointment_service}</span></p>
                    <p className='text-center mb-1'><span className='text-red-600 font-bold underline'>Barber:</span> <span className='font-bold'>{appointment.appointment_barber}</span></p>
                    <p className='text-center mb-1'><span className='text-red-600 font-bold underline'>Date:</span> <span className='font-bold'>{appointment.appointment_date}</span></p>
                    <p className='text-center mb-1'><span className='text-red-600 font-bold underline'>Slot:</span>  <span className='font-bold'>{appointment.appointment_slot}</span></p>
                </div>

            </section>

            <section className='flex justify-center my-4'>
                <div className='w-4/5 md:w-1/2 lg:w-1/3 bg-gray-300 p-2 rounded-xl'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment}/>
                    </Elements>
                </div>
            </section>

        </div>
    );
};

export default Payment;