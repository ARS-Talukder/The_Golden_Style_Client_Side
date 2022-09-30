import React from 'react';
import BackgroundWithTopic from '../Shared/BackgroundWithTopic';
import Slide from 'react-reveal/Slide';
import Jello from 'react-reveal/Jello';
import ContactSection from '../Shared/ContactSection';
import Footer from '../Shared/Footer';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Barber from './Barber';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Manager from './Manager';

const About = () => {
    const navigate = useNavigate();
    const { data: barbers, isLoading: barberLoading } = useQuery('allBarbers', () => fetch('http://localhost:5000/barbers').then(res => res.json()));

    const { data: managers, isLoading: managersLoading } = useQuery('allManagers', () => fetch('http://localhost:5000/managers', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            navigate('/');
            toast.error("UnAuthorized Access. Please Login again");
        }
        return res.json()
    }));

    if (barberLoading || managersLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            {/* ----------------Top Section---------------------- */}
            <BackgroundWithTopic>
                <h1 className='font-light text-white my-0'>About Us</h1>
                <p className='font-bold text-center text-orange-500'>Who are we?</p>
            </BackgroundWithTopic>

            {/* -----------------Who We Are---------------------- */}
            <section className='flex bg-gray-100'>
                <Slide left>
                    <div className='w-1/2'>
                        <img src="https://i.ibb.co/nwbpndP/Barber-1.jpg" alt="Barber" />
                    </div>
                </Slide>
                <div className='w-1/2 flex justify-center items-center p-4'>
                    <Jello>
                        <div className='w-3/4'>
                            <h3>Who We Are</h3>
                            <div className="divider bg-red-400 w-16 h-1 mt-0 rounded-lg"></div>
                            <p className='text-slate-600'>The Best Hair Salon in Gulshan. Not only Gulshan We expect all over Bangladesh. One of the most Trustworthy and leading hair care center. We are inspired by the rhythmical beauty of hair and the dynamic fashion industry that surrounds us. Our Service is a form of appearance and style, and like a piece of art, our work is a work of art. We are devoted to creating the perfect style for each and every one of our clients.</p>
                        </div>
                    </Jello>

                </div>

            </section>

            {/* -----------------What We Do---------------------- */}
            <section className='flex bg-gray-100'>
                <div className='w-1/2 flex justify-center items-center p-4'>
                    <Jello>
                        <div className='w-3/4'>
                            <h3>What We Do</h3>
                            <div className="divider bg-red-400 w-16 h-1 mt-0 rounded-lg"></div>
                            <p className='text-slate-600'>We ensure the best quality and services to our clients being stylish and Smart. With years of experiences and continuing education, our dedicated team is always ready to serve your beauty needs.</p>
                        </div>
                    </Jello>

                </div>
                <Slide right>
                    <div className='w-1/2'>
                        <img src="https://i.ibb.co/7KsnjMP/Barber-2.jpg" alt="Barber" />
                    </div>
                </Slide>

            </section>

            {/* ------------------Barber Section---------------------- */}
            <section className='my-10 py-4'>
                <h3 className='text-center'>Meet Our Team</h3>
                <div className="divider bg-red-400 w-24 h-0.5 mt-0 mx-auto rounded-lg mb-16"></div>

                <div className='grid lg:grid-cols-2 gap-10 px-12'>

                    {
                        barbers.map(barber => <Barber key={barber._id} barber={barber}></Barber>)
                    }

                </div>

            </section>

            {/* ------------------Manager Section--------------------- */}
            <section className='my-16'>
                <h3 className='text-center'>Our Board Of Directors And Their Messages</h3>
                <div className="divider bg-red-400 w-1/5 h-0.5 mt-0 mx-auto rounded-lg"></div>

                {
                    managers.map(manager => <Manager key={manager._id} manager={manager}></Manager>)
                }

            </section>

            {/* -------------------------Contact Section---------------------- */}
            <ContactSection></ContactSection>

            {/* -----------------------Footer Section------------------------- */}
            <Footer></Footer>
        </div>
    );
};

export default About;