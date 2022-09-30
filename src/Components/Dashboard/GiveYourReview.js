import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import '../Home/WhyUs.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const GiveYourReview = () => {
    const [user, loading, error] = useAuthState(auth);
    const { data: barbers, isLoading: barberLoading } = useQuery('allBarbers', () => fetch('http://localhost:5000/barbers').then(res => res.json()));

    const navigate = useNavigate();

    if (loading || barberLoading) {
        return <Loading></Loading>
    }

    const handleReview = event => {
        event.preventDefault();
        const clientName = user.displayName;
        const email = user.email;
        const our_environment = event.target.our_environment.value;
        const barber_name = event.target.barber_name.value;
        const barber_behavior = event.target.barber_behavior.value;
        const barber_service = event.target.barber_service.value;
        const client_review = event.target.client_review.value;


        if (our_environment === 'Default' || barber_name === 'Default' || barber_behavior === 'Default' || barber_service === 'Default') {
            toast.error('Please Fill The Form Properly');
            return;
        }
        else {
            const review = {
                clientName,
                email,
                our_environment,
                barber_name,
                barber_behavior,
                barber_service,
                client_review
            };
            fetch('http://localhost:5000/reviews', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(review)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success("Thank You for your Review");
                    navigate('/dashboard')


                })
        }
    }
    return (
        <div className='why-main-div flex justify-center py-4'>
            <div className='w-1/2 py-8 bg-gray-700 rounded-3xl'>
                <h3 className='text-center text-success underline font-bold'>How Can We Improve Ourselves?</h3>
                <form name='review-form' onSubmit={handleReview} action="" className='grid grid-cols-1 gap-4 justify-items-center my-8 px-5'>

                    <input type="text" value={user.displayName} className="input input-bordered input-success w-full " disabled />

                    <input type="text" value={user.email} className="input input-bordered input-success w-full" disabled />

                    <select defaultValue={'Default'} name='our_environment' className="select select-success w-full">
                        <option value="Default" disabled>Our Environment</option>
                        <option value="Bad">Bad</option>
                        <option value="Average">Average</option>
                        <option value="Good">Good</option>


                    </select>

                    <select defaultValue={'Default'} name='barber_name' className="select select-success w-full">
                        <option value="Default" disabled>Barber Name</option>
                        {
                            barbers?.map(barber => <option key={barber._id} value={barber.barber_name}>{barber.barber_name}</option>)
                        }


                    </select>

                    <select defaultValue={'Default'} name='barber_behavior' className="select select-success w-full">
                        <option value="Default" disabled>Barber Behavior</option>
                        <option value="Bad">Bad</option>
                        <option value="Average">Average</option>
                        <option value="Good">Good</option>


                    </select>

                    <select defaultValue={'Default'} name='barber_service' className="select select-success w-full">
                        <option value="Default" disabled>Barber Service</option>
                        <option value="Bad">Bad</option>
                        <option value="Average">Average</option>
                        <option value="Good">Good</option>


                    </select>

                    <textarea name='client_review' className="textarea textarea-success w-full" placeholder="Please Share Your Experience" required></textarea>

                    <input type="submit" value="CONFIRM" className='btn btn-success w-full bg-red-300 text-xl' />


                </form>
            </div>
        </div>
    );
};

export default GiveYourReview;