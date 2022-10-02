import React from 'react';

const NotFound = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div>
                <h1 className='text-red-600 text-center text-7xl font-bold mb-4'>404</h1>
                <h2 className='text-red-600 text-center text-4xl font-bold mb-4'>Sorry!!!</h2>
                <h3 className='text-red-600 text-center text-xl font-bold'>The page is not Found</h3>
            </div>

        </div>
    );
};

export default NotFound;