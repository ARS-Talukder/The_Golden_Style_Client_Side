import React from 'react';
import './WhyUs.css';
import Loading from '../../Shared/Loading';
import Feature from '../Feature/Feature';
import { useGetFeaturesQuery } from '../../../features/home/homeApi';

const WhyUs = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetFeaturesQuery();
    const features = data;
    let content;
    if (isLoading) {
        return <Loading></Loading>
    }
    if (isError) {
        return <p className='text-red-500 font-bold text-center'>{error.status}</p>
    }
    if (isSuccess) {
        content = features.map(feature => <Feature key={feature._id} feature={feature}></Feature>)
    }
    return (
        <div className='why-main-div text-center'>

            {/* ------------------------Top Section------------------------------ */}
            <section className='pt-4'>
                <h4 className='fw-bold text-gray-300'>Why Choose Us</h4>
                <div className="divider bg-red-400 w-16 h-1 mx-auto mt-0 rounded-lg"></div>
            </section>

            {/* -------------------------Main Section---------------------------- */}
            <section className='lg:px-10 px-4 py-20 grid lg:grid-cols-2 gap-20'>
                {
                    content
                }

            </section>
        </div>
    );
};

export default WhyUs;