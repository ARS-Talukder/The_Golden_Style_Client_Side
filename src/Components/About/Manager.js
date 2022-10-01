import React from 'react';
import Zoom from 'react-reveal/Zoom';

const Manager = ({ manager }) => {
    const { name, email, position, img, mobile, message } = manager;
    return (
        <div>
            <div className='lg:flex lg:flex-row-reverse items-center w-4/5 mx-auto mt-20'>
                <Zoom left>
                    <div className='lg:w-1/4 flex justify-center items-center'>
                        <div className="w-4/5 avatar">
                            <div className="w-full rounded-full">
                                <img src={img} alt='Chairman' />
                            </div>
                        </div>
                    </div>
                </Zoom>

                <div className='px-2 lg:w-4/5 lg:px-16'>
                    <h5 className='font-bold'>Message From {position}</h5>
                    <p className='text-slate-600'>{message}</p>
                    <p className='text-slate-700 font-bold italic mb-0'>- {name}</p>
                    <p className='text-slate-700 font-bold my-0'>- {email}</p>
                    <p className='text-slate-700 font-bold mt-0'>- {mobile}</p>
                </div>
            </div>

            {/* ------------------Divider------------------------ */}
            <div className="divider bg-black w-1/2 h-0.5 my-16 mx-auto rounded-lg"></div>
        </div>
    );
};

export default Manager;