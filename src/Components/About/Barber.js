import React from 'react';
import Slide from 'react-reveal/Slide';
import { Link, useNavigate } from 'react-router-dom';

const Barber = ({ barber }) => {
    const { _id, barber_name, barber_img, barber_email, barber_WhatsApp, barber_description } = barber;
    const navigate = useNavigate();
    const navigateToLookReviews = id => {
        navigate(`/lookreviews/${id}`, { state: { barber_name } });
    }
    return (
        <div className='bg-gray-100 rounded-xl py-2 relative'>

            <div className="avatar flex justify-center items-center my-2">
                <div className="w-40 rounded-full">
                    <img src={barber_img} alt="Barber_img" />
                </div>
            </div>


            <div>
                <Slide left>
                    <h5 className='text-center font-bold'>{barber_name}</h5>
                    <p className='text-center mb-0'><span className='font-bold'>WhatsApp:</span> {barber_WhatsApp}</p>
                    <p className='text-center'><span className='font-bold'>Email:</span> {barber_email}</p>
                    <p className='text-justify px-8'><span className='font-bold'>Message:</span> {barber_description}</p>

                </Slide>
                <div className='absolute right-1 bottom-1'>
                    <button onClick={() => navigateToLookReviews(_id)} className='btn btn-sm btn-success'>Look Review</button>
                </div>

            </div>


        </div>
    );
};

export default Barber;