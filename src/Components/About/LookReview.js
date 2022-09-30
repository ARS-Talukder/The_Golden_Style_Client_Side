import React from 'react';

const LookReview = ({ review }) => {
    const { clientName, email, barber_behavior, barber_service, client_review, our_environment } = review;
    return (
        <div className='border rounded-xl bg-gray-200 p-4'>
            <p className='text-center font-bold text-primary underline mb-0'>{clientName}</p>
            <p className='text-center font-bold text-primary'>{email} </p>
            <p className='text-center mb-0'><span className=' font-bold underline'>Behavior</span>: {barber_behavior} </p>
            <p className='text-center mb-0'><span className=' font-bold underline'>Service</span>: {barber_service} </p>
            <p className='text-center'><span className=' font-bold underline'>Parlour Environment</span>: {our_environment} </p>
            <p className='text-center'><span className=' font-bold underline'>Client Message</span>: {client_review} </p>

        </div>
    );
};

export default LookReview;