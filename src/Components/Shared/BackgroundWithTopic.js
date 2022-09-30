import React from 'react';
import './BackgroundWithTopic.css';

const BackgroundWithTopic = ({children}) => {
    return (
        <div className='w-full h-80 flex justify-center items-center background-with-topic-container'>
            <div>
                {children}
            </div>
        </div>
    );
};

export default BackgroundWithTopic;