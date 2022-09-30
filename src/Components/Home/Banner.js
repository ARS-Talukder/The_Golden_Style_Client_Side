import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Slide from 'react-reveal/Slide';
import './Banner.css';
import BannerContact from './BannerContact';

const Banner = () => {
    const headerCaption = <div className='header-caption'>
        <Slide bottom>
            <div>
                <h1 className='lg:text-6xl'>WELCOME TO</h1>
                <h2 className='lg:text-3xl'>MENS'S GROOMING <span className='lg:text-4xl fw-bold'>"THE GOLDEN STYLE"</span></h2>
            </div>
        </Slide>

    </div>;
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item className='carrousel-background'>
                <img
                    className="d-block w-100 banner-img"
                    src="https://i.ibb.co/CbrTwZ5/banner-1.jpg"
                    alt="First slide"
                    
                />
                <Carousel.Caption className='flex justify-center items-center'>
                    {headerCaption}
                </Carousel.Caption>
                <Carousel.Caption className='hidden lg:flex md:flex justify-center items-bottom'>
                    <BannerContact></BannerContact>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 banner-img"
                    src="https://i.ibb.co/vQXNFTd/banner-2.jpg"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    {headerCaption}
                </Carousel.Caption>
                <Carousel.Caption className='hidden lg:flex md:flex justify-center items-bottom'>
                    <BannerContact></BannerContact>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 banner-img"
                    src="https://i.ibb.co/tQs810b/banner-3.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    {headerCaption}
                </Carousel.Caption>
                <Carousel.Caption className='hidden lg:flex md:flex justify-center items-bottom'>
                    <BannerContact></BannerContact>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;