import React from 'react';
import BackgroundWithTopic from '../Shared/BackgroundWithTopic';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { format } from 'date-fns';
import Loading from '../Shared/Loading';
import Slide from 'react-reveal/Slide';
import AppointmentToBarber from './AppointmentToBarber';
import Footer from '../Shared/Footer';
import '../Dashboard/Dashboard.css';

const Appointment = () => {
    const { data: barbers, isLoading: barberLoading } = useQuery('allBarbers', () => fetch('http://localhost:5000/barbers').then(res => res.json()));

    const [date, setDate] = useState(new Date());


    if (barberLoading) {
        return <Loading></Loading>
    }




    let footer = <p className='text-blue-800 text-center fw-bold'>Please pick a day.</p>;
    if (date) {
        footer = <p className='my-2 text-center'>You picked <span className='text-xl text-blue-800 fw-bold ml-2'>{format(date, 'PP')}</span></p>;
    }


    return (
        <div>
            {/* ----------------1st Section------------ */}
            <BackgroundWithTopic>
                <h1 className='font-light text-white my-0'>Take Appointment</h1>
                <p className='font-bold text-center text-orange-500'>Please Select Your Favorite Barber First</p>
            </BackgroundWithTopic>

            {/* ----------------Day Picker Section------------ */}
            <section className='my-4'>
                <div className='flex justify-center'>
                    <DayPicker
                        className='dashboard-date-div'

                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        footer={footer}
                    />
                </div>

            </section>

            {/* ----------------3rd Section------------ */}
            <section className='my-10 p-4'>
                <h3 className='text-center'>Select Your Favorite Barber</h3>
                <div className="divider bg-red-400 w-24 h-0.5 mt-0 mx-auto rounded-lg mb-16"></div>

                <Slide left>
                    <div className='grid lg:grid-cols-2 gap-16 px-4'>

                        {
                            barbers.map(barber => <AppointmentToBarber key={barber._id} date={date} barber={barber}></AppointmentToBarber>)
                        }

                    </div>
                </Slide>

            </section>

            {/* ------------Footer Section-------------- */}
            <Footer></Footer>


        </div>
    );
};

export default Appointment;