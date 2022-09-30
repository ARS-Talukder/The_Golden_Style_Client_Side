import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className='w-full h-screen bg-black flex justify-center items-center'>
            <Spinner animation="border" variant="warning" />
            
        </div>
    );
};

export default Loading;