import React from 'react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
    return (
        <div className='lg:flex justify-between py-8 px-10 lg:px-40' style={{ "backgroundColor": "#4b4b4b" }}>
            {/* -----------------Section Left-------------------- */}
            <section className='lg:w-1/2'>
                <h5 className='text-white mb-4'>Contact Us</h5>
                <p className='text-gray-300 mb-1'><span className='fw-bold'>Address:</span> MCC Tower, Holding-76, Road-127, Gulshan Avenue, Dhaka</p>
                <div className="divider bg-red-400 w-full h-0.5 mx-auto my-0 rounded-lg"></div>
                <p className='text-gray-300 mb-1'><span className='fw-bold'>Phone:</span> +880 1629-396785 : +880 1521-517664</p>
                <div className="divider bg-red-400 w-full h-0.5 mx-auto my-0 rounded-lg"></div>
                <p className='text-gray-300 mb-1'><span className='fw-bold'>Email:</span> thegoldenstyle76@gmail.com</p>
                <div className="divider bg-red-400 w-full h-0.5 mx-auto my-0 rounded-lg"></div>
                <p className='text-gray-300 mb-1'><span className='fw-bold'>Website:</span> http://thegoldenstyle.com</p>

            </section>

            {/* -----------------Section Right-------------------- */}
            <section className='lg:w-1/2'>
                <h5 className='text-white mt-8 lg:mt-0 lg:text-center'>Appointment</h5>
                <div className='lg:flex justify-center lg:mt-12'>
                    <Link to='/appointment' className='btn glass text-white'>MAKE APPOINTMENT NOW</Link>
                </div>


            </section>
        </div>
    );
};

export default ContactSection;