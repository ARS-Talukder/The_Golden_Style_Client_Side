import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Banner.css';

const Banner = () => {
    const headerCaption = <div className='flex justify-center items-center' style={{ "width": "100%", "height": "100vh" }}>
        <div>
            <h1 className='text-7xl'>WELCOME TO</h1>
            <h2 className='text-4xl'>MENS'S GROOMING <span className='text-5xl fw-bold'>"THE GOLDEN STYLE"</span></h2>
        </div>

    </div>;
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item className='carrousel-background'>
                <img
                    className="d-block w-100"
                    src="https://i.ibb.co/CbrTwZ5/banner-1.jpg"
                    alt="First slide"
                />
                <Carousel.Caption className='flex justify-center items-center'>
                    {headerCaption}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i.ibb.co/vQXNFTd/banner-2.jpg"
                    alt="Second slide"
                />

                <Carousel.Caption>
                    {headerCaption}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://i.ibb.co/tQs810b/banner-3.jpg"
                    alt="Third slide"
                />

                <Carousel.Caption>
                    {headerCaption}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;