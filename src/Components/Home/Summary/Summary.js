import React from 'react';
import CountUp from 'react-countup';
import './Summary.css';
import Slide from 'react-reveal/Slide';

const Summary = () => {
    return (
        <div className='hidden lg:block'>
            {/* --------------Top Section-------------- */}
            <section className='mt-4'>
                <h4 className='text-center'>Summary</h4>
                <div className="divider bg-red-400 w-16 h-1 mx-auto mt-0 rounded-lg"></div>
            </section>

            {/* -------------------Main Section------------ */}
            <section className='summary-main-section'>
                <Slide top>
                    <div className='summary-counter-div'>
                        <Slide right>
                            <h1 className='text-white text-7xl text-center'><CountUp end={9580} duration={2} enableScrollSpy={true}></CountUp></h1>
                            <p className='text-orange-600 text-3xl text-center'>HAIRCUT</p>
                        </Slide>

                    </div>
                </Slide>

                <Slide top>
                    <div className='summary-counter-div'>
                        <Slide right>
                            <h1 className='text-white text-7xl text-center'><CountUp end={5872} duration={3} enableScrollSpy={true}></CountUp></h1>
                            <p className='text-orange-600 text-3xl text-center'>SHAVE CUT</p>
                        </Slide>
                    </div>
                </Slide>

                <Slide top>
                    <div className='summary-counter-div'>
                        <Slide right>
                            <h1 className='text-white text-7xl text-center'><CountUp end={1290} duration={4} enableScrollSpy={true}></CountUp></h1>
                            <p className='text-orange-600 text-3xl text-center'>BEARDS TRIMS</p>
                        </Slide>
                    </div>
                </Slide>
                <Slide top>
                    <div className='summary-counter-div'>
                        <Slide right>
                            <h1 className='text-white text-7xl text-center'><CountUp end={1000} duration={5} enableScrollSpy={true}></CountUp><span>+</span></h1>
                            <p className='text-orange-600 text-3xl text-center'>SATISFIED CLIENTS</p>
                        </Slide>

                    </div>
                </Slide>



            </section>

        </div>
    );
};

export default Summary;