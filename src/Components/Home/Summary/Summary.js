import React from 'react';
import Pulse from 'react-reveal/Pulse';
import './Summary.css';

const Summary = () => {
    const summaries = [{ _id: 1, amount: 1230, name: "HAIRCUT" }, { _id: 2, amount: 980, name: "SHAVE CUT" }, { _id: 3, amount: 1067, name: "BEARDS TRIMS" }, { _id: 4, amount: 300, name: "SATISFIED CLIENTS" },]
    return (
        <div className='hidden lg:block'>
            {/* --------------Top Section-------------- */}
            <section className='mt-4'>
                <h4 className='text-center'>Summary</h4>
                <div className="divider bg-red-400 w-16 h-1 mx-auto mt-0 rounded-lg"></div>
            </section>

            {/* -------------------Main Section------------ */}
            <section className='summary-main-section'>
                {
                    summaries.map(s =>
                        <Pulse key={s._id}>
                            <div className='summary-counter-div'>
                                {s._id !== 4 ?
                                    <h1 className='text-white text-7xl text-center'>{s.amount}</h1> : <h1 className='text-white text-7xl text-center'>{s.amount}+</h1>}
                                <p className='text-orange-600 text-2xl text-center'>{s.name}</p>
                            </div>
                        </Pulse>)
                }        
            </section>

        </div>
    );
};

export default Summary;