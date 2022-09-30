import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddNewBarber = () => {
    const navigate = useNavigate();
    const handleMakeBarber = event => {
        event.preventDefault();
        const barber_name = event.target.name.value;
        const barber_email = event.target.email.value;
        const barber_whatsApp = event.target.whatsApp.value;
        const barber_img = event.target.img.value;
        const barber_description = event.target.description.value;
        const slots = [
            "11.00 AM - 1.00 PM",
            "1.00 PM - 3.00 PM",
            "3.00 PM - 5.00 PM",
            "5.00 PM - 7.00 PM",
            "7.00 PM - 9.00 PM",
            "9.00 PM - 11.00 PM"
        ]
        const barber = { barber_name, barber_email, barber_whatsApp, barber_img, barber_description, slots };

        let proceed = window.prompt("If you want want to make him manager, Please write 'barber'");
        if (proceed === null || proceed === "") {
            return
        }
        else if (proceed === 'barber') {
            fetch('http://localhost:5000/barbers', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(barber)
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        navigate('/');
                        toast.error("UnAuthorized Access. Please Login again");
                    }
                    return res.json()
                })
                .then(data => {
                    toast.success("New Barber Added Successfully");
                    navigate('/about')


                })
        }
        else {
            return
        }

    }
    return (
        <div className='why-main-div flex justify-center py-4'>
            <div className='w-1/2 py-8 bg-gray-700 rounded-3xl'>
                <h3 className='text-center text-success underline font-bold'>Add New Employee In Your Company</h3>
                <form name='review-form' onSubmit={handleMakeBarber} action="" className='grid grid-cols-1 gap-4 justify-items-center my-8 px-5'>

                    <input type="text" name='name' placeholder='Name' className="input input-bordered input-success w-full " required />

                    <input type="email" name='email' placeholder='Email' className="input input-bordered input-success w-full" required />

                    <input type="number" name='whatsApp' placeholder='whatsApp Number' className="input input-bordered input-success w-full" required />

                    <input type="text" name='img' placeholder='Image Link' className="input input-bordered input-success w-full my-0" required />

                    <textarea name='description' className="textarea textarea-success w-full" placeholder="Barber Description" required></textarea>

                    <input type="submit" value="CONFIRM" className='btn btn-success w-full bg-red-300 text-xl' />


                </form>
            </div>
        </div>
    );
};

export default AddNewBarber;