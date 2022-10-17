import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CheckoutForm = ({ appointment }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const price = appointment.service_price;
    const id = appointment._id;

    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        fetch('https://the-golden-style-server.onrender.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        setSuccess('');

        if (error) {
            setCardError(error.message);

        }
        else {
            setCardError('');
        }

        //Confirm Card Payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: appointment.clientName,
                        email: appointment.email,
                        phone: appointment.phone
                    },
                },
            },
        );
        if (intentError) {
            setCardError(intentError?.message);
        }
        else {
            setCardError('');
            setSuccess('Congrats! Your Payment is completed')
            setTransactionId(paymentIntent.id);
            // console.log(paymentIntent);

            //Store Payment in Database
            const payment = {
                appointment: id,
                clientName: appointment.clientName,
                clientEmail: appointment.email,
                service: appointment.appointment_service,
                date: appointment.appointment_date,
                slot: appointment.appointment_slot,
                transactionId: paymentIntent.id
            }
            fetch(`https://the-golden-style-server.onrender.com/appointment-update?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Please save your Transaction for future')
                })
        }

    }
    return (
        <div>
            <p className='text-center'>
                <small>
                    <span className='underline mx-2'> You have to pay</span>
                    <span className='text-red-500 font-bold underline'>{price}$</span>
                </small>
            </p>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#80a2c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm btn-success px-3 mt-2' type="submit" disabled={!stripe || !clientSecret}>
                    <small>Pay</small>
                </button>
            </form>

            {
                cardError && <p className='text-red-500 mt-1'><small>{cardError}</small></p>
            }

            {
                success && <div className='text-green-500 mt-1'>
                    <p>{success}</p>
                    <p>Your Transaction Id: <span className='text-orange-500 font-bold'>{transactionId}</span></p>
                </div>
            }
        </div>
    );
};

export default CheckoutForm;