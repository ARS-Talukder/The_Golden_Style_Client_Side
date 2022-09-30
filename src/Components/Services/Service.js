import React from 'react';
import Slide from 'react-reveal/Slide';
import { Link } from 'react-router-dom';
import './../Sign/Login.css';

const Service = ({ service }) => {
    const { service_name, service_img, service_amount } = service;
    return (
        <div>
            <div className='lg:flex md:flex mb-2 px-2'>
                <Slide left>
                    <div className='lg:w-1/2 md:w-1/2'>
                        <img src={service_img} alt="Service" />
                    </div>
                </Slide>
                <div className='lg:w-1/2 md:w-1/2 flex justify-center items-center p-4'>
                    <Slide right>
                        <div className='w-3/4'>
                            <h4>{service_name}</h4>
                            <div className="divider bg-red-400 w-16 h-1 mt-0 rounded-lg"></div>
                            <h5 className='mb-4'><span className='font-bold underline'>Expenses:</span> {service_amount}$</h5>
                            <Link to='/appointment' className='btn btn-success px-4 py-2'>Book Now</Link>
                        </div>
                    </Slide>

                </div>
            </div>
            <div className="divider bg-red-500 w-4/5 h-0.5 my-8 mx-auto rounded-lg"></div>
        </div>
    );
};

export default Service;