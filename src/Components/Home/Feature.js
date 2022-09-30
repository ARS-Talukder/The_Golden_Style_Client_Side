import React from 'react';
import './WhyUs.css';
import Pulse from 'react-reveal/Pulse';

const Feature = ({ feature }) => {
    const { title, description } = feature;
    return (
        <div>
            <Pulse>
                <div className='why-transparent-div'>
                    <h2 className='why-transparent-div-header'>{title}</h2>
                    <h5 className='why-transparent-div-body'>{description}</h5>
                </div>
            </Pulse>
        </div>
    );
};

export default Feature;