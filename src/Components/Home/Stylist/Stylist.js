import React from 'react';
import Bounce from 'react-reveal/Bounce';
import Slide from 'react-reveal/Slide';

const Stylist = () => {
    return (
        <div className='bg-black'>
            <section className='pt-4'>
                <h4 className='fw-bold text-center text-gray-300'>Top Notch Stylist</h4>
                <div className="divider bg-red-400 w-16 h-1 mx-auto mt-0 rounded-lg"></div>
            </section>

            <section className='flex'>
                <Slide left>
                    <div className='w-1/2 hidden lg:flex md:flex'>
                        <img src="https://i.ibb.co/w7jVfYj/model-1.jpg" alt="Stylist" />

                    </div>
                </Slide>
                <div className='lg:w-1/2 md:w-1/2 my-10 flex justify-center items-center px-20'>
                    <Bounce right>
                        <div>
                            <div>
                                <h3 className='text-white'>Our Commitment</h3>
                                <div className="divider bg-red-400 w-16 h-1 mt-0 rounded-lg"></div>

                                <p style={{ "color": "#d5d9d9" }}>Our commitment is to ensure the best quality and services to our clients. We never consider in our service. We're always here to listen you and also to advice you. We're actually waiting to serve you.</p>
                            </div>

                            <div>
                                <h3 className='text-white'>Quality</h3>
                                <div className="divider bg-red-400 w-16 h-1 mt-0 rounded-lg"></div>
                                <p style={{ "color": "#d5d9d9" }}>We always care about the quality service rather than quantity.</p>
                            </div>

                            <div>
                                <h3 className='text-white'>Experience</h3>
                                <div className="divider bg-red-400 w-16 h-1 mt-0 rounded-lg"></div>
                                <p style={{ "color": "#d5d9d9" }}>With years of experiences and continuing education, Our dedicated team is ready to serve your beauty needs.</p>
                            </div>

                            <div>
                                <h3 className='text-white'>Solution By You</h3>
                                <div className="divider bg-red-400 w-16 h-1 mt-0 rounded-lg"></div>
                                <p style={{ "color": "#d5d9d9" }}>Nothing is perfect in the world. So, we're not out of this. We wait all the time to get advice from you to be more perfect ourselves. Please help us by giving feedback about our services.</p>
                            </div>

                        </div>
                    </Bounce>
                </div>
            </section>
        </div>
    );
};

export default Stylist