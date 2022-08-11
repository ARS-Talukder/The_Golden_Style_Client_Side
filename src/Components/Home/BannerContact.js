import React from 'react';
import Slide from 'react-reveal/Slide';
import { AiFillHome } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";

const BannerContact = () => {
    return (
        <div className='w-4/5 mb-4'>
            <Slide left>
                <div className='w-full flex justify-between px-12 py-3 rounded-lg' style={{ "backgroundColor": "#0000007a" }}>
                    <div className='flex items-center'>
                        <span className='text-blue-400 text-5xl mr-6'><AiFillHome></AiFillHome></span>
                        <div>
                            <h6 className='my-0 fw-bold text-left'>OUR LOCATION</h6>
                            <p className='my-0 text-left'>MCC Tower, Holding-76, Road-127 </p>
                            <p className='my-0 text-left'>Gulshan Avenue, Dhaka</p>
                        </div>

                    </div>
                    <div className='flex items-center'>
                        <span className='text-blue-400 text-5xl mr-6'><BsTelephoneFill></BsTelephoneFill></span>
                        <div>
                            <h6 className='my-0 fw-bold text-left'>PHONE</h6>
                            <p className='my-0 text-left'>+880 1629-396785</p>
                            <p className='my-0 text-left'>+880 1521-517664</p>
                        </div>

                    </div>
                </div>
            </Slide>
        </div>
    );
};

export default BannerContact;