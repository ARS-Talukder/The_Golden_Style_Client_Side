import React from 'react';
import ContactSection from '../Shared/ContactSection';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import Stylist from './Stylist';
import Summary from './Summary';
import Testimonial from './Testimonial';
import WhyUs from './WhyUs';

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