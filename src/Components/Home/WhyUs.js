import React from 'react';
import './WhyUs.css';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import Feature from './Feature';

const WhyUs = () => {
    const { data: features, isLoading: featureLoading } = useQuery('allFeatures', () => fetch('http://localhost:5000/features').then(res => res.json()))
    if (featureLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='text-center'>

            {/* ------------------------Top Section------------------------------ */}
            <section className='mt-4'>
                <h4 className='fw-bold'>Why Choose Us</h4>
                <div className="divider bg-red-400 w-16 h-1 mx-auto mt-0 rounded-lg"></div>
            </section>

            {/* -------------------------Main Section---------------------------- */}
            <section className='lg:px-10 px-4 py-20 why-main-div grid lg:grid-cols-2 gap-20'>
                {
                    features.map(feature => <Feature key={feature._id} feature={feature}></Feature>)
                }

            </section>
        </div>
    );
};

export default WhyUs;