import React from 'react';
import BackgroundWithTopic from '../Shared/BackgroundWithTopic';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Service from './Service';
import ContactSection from '../Shared/ContactSection';
import Footer from '../Shared/Footer';

const Services = () => {
    const { data: services, isLoading:serviceLoading } = useQuery('allServices', () => fetch('https://the-golden-style-server.onrender.com/services').then(res => res.json()));

    if (serviceLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            {/* ----------------1st Section------------ */}
            <BackgroundWithTopic>
                <h1 className='font-light text-white my-0'>Services</h1>
                <p className='font-bold text-center text-orange-500'>What We Serve</p>
            </BackgroundWithTopic>

            {/* ------------2nd Section--------------- */}
            <section>
                <div className='bg-gray-100'>
                    {
                        services.map(service => <Service key={service._id} service={service}></Service>)
                    }
                </div>
            </section>

            {/* -------------------------Contact Section---------------------- */}
            <ContactSection></ContactSection>

            {/* -----------------------Footer Section------------------------- */}
            <Footer></Footer>

        </div>
    );
};

export default Services;