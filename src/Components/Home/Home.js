import React from 'react';
import ContactSection from '../Shared/ContactSection';
import Footer from '../Shared/Footer';
import Banner from './Banner/Banner';
import WhyUs from './WhyUs/WhyUs';
import Stylist from './Stylist/Stylist';
import Testimonial from './Testimonial/Testimonial';
import Summary from './Summary/Summary';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <WhyUs></WhyUs>
            <Stylist></Stylist>
            <Testimonial></Testimonial>
            <Summary></Summary>
            
            <ContactSection></ContactSection>
            <Footer></Footer>


        </div >
    );
};

export default Home;