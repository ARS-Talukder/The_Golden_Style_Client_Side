import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Sign/Login.css'

const AppointmentToBarber = ({ barber, date }) => {
    const { _id, barber_name, barber_img, barber_email, barber_WhatsApp, barber_description } = barber;
    const navigate = useNavigate();
    const navigateToAppointment = id => {
        navigate(`/appointmentform/${id}`, {state: {date}});
    }
    return (
        <div className='bg-gray-100 p-8'>
            <div className="avatar flex justify-center items-center my-2">
                <div className="w-40 rounded-full">
                    <img src={barber_img} alt="Barber_img" />
                </div>
            </div>

            <div>
                <h5 className='text-center font-bold'>{barber_name}</h5>
                <p className='text-center mb-0'><span className='font-bold'>WhatsApp:</span> {barber_WhatsApp}</p>
                <p className='text-center'><span className='font-bold'>Email:</span> {barber_email}</p>
                <p className='text-justify'><span className='font-bold'>Qualification:</span> {barber_description}</p>
                <button disabled={date===undefined} onClick={() => navigateToAppointment(_id)} className={date===undefined ? 'w-full h-12 rounded-xl bg-gray-400 border-0 text-white':'w-full h-12 rounded-xl bg-red-400 border-0 text-black submit-button'}>{date===undefined? 'You Must Pick a Date':`Take Appointment to ${barber_name}`}</button>

            </div>
        </div>
    );
};

export default AppointmentToBarber;