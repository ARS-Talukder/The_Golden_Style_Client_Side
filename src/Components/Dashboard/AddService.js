import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashboardButton from './DashboardButton';

const AddService = () => {
    const navigate = useNavigate();
    const handleAddService = event => {
        event.preventDefault();
        const service_name = event.target.name.value;
        const service_amount = event.target.amount.value;
        const service_img = event.target.img.value;
        const service = { service_name, service_img, service_amount };
        fetch('https://the-golden-style-server.onrender.com/services', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(service)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(`${service_name} added successfully`);
                navigate('/services')


            })
    }
    return (
        <div>
            {/* ---------------Dashboard Button------------- */}
            <DashboardButton></DashboardButton>

            <div className='flex justify-center px-4'>
                <div className='w-full lg:w-1/2 md:w-1/2 py-8 bg-gray-700 rounded-3xl'>
                    <h3 className='text-center text-success underline font-bold'>Add New Employee In Your Company</h3>
                    <form name='review-form' onSubmit={handleAddService} action="" className='grid grid-cols-1 gap-4 justify-items-center my-8 px-5'>

                        <input type="text" name='name' placeholder='Service Name' className="input input-bordered input-success w-full " required />

                        <input type="number" name='amount' placeholder='Service Amount' className="input input-bordered input-success w-full" required />

                        <input type="text" name='img' placeholder='Service Img link' className="input input-bordered input-success w-full my-0" required />

                        <input type="submit" value="CONFIRM" className='btn btn-success w-full bg-red-300 text-xl' />


                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddService;