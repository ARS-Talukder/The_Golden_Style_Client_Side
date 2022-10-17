import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DashboardButton from './DashboardButton';

const MyCustomersReview = () => {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const { data: reviews, isLoading: reviewsLoading } = useQuery('reviews', () => fetch(`https://the-golden-style-server.onrender.com/myCustomerReviews?email=${user.email}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            navigate('/');
            toast.error("UnAuthorized Access. Please Login again");
        }
        return res.json()
    }));
    if (loading || reviewsLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            {/* ---------------Dashboard Button------------- */}
            <DashboardButton></DashboardButton>

            <div className="overflow-x-auto px-2 my-4">
                <table className="table w-full">

                    <thead>
                        <tr className='bg-gray-500  border-red-500 border-2 rounded'>
                            <th className='text-black border-2'></th>
                            <th className='text-black border-2 text-center'>Client</th>
                            <th className='text-black border-2 text-center'>Our Environment</th>

                            <th className='text-black border-2 text-center'>My Behavior</th>
                            <th className='text-black border-2 text-center'>My Service</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews?.map((review, index) =>
                                <tr key={index} className='bg-gray-300 hover border-red-500 border-2 rounded'>
                                    <td className='py-3 border-2 border-red-500 text-center'>{index + 1}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{review.clientName}</td>
                                    <td className='py-3 border-2 border-red-500'>
                                        <div
                                            className={review.our_environment === 'Bad' ? 'w-full h-6 bg-red-600' : (review.our_environment === 'Good' ? 'w-full h-6 bg-green-600' : 'w-full h-6 bg-yellow-600')}
                                        ></div>
                                    </td>

                                    <td className='py-3 border-2 border-red-500'>
                                        <div
                                            className={review.barber_behavior === 'Bad' ? 'w-full h-6 bg-red-600' : (review.barber_behavior === 'Good' ? 'w-full h-6 bg-green-600' : 'w-full h-6 bg-yellow-600')}
                                        ></div>
                                    </td>

                                    <td className='py-3 border-2 border-red-500'>
                                        <div
                                            className={review.barber_service === 'Bad' ? 'w-full h-6 bg-red-600' : (review.barber_service === 'Good' ? 'w-full h-6 bg-green-600' : 'w-full h-6 bg-yellow-600')}
                                        ></div>
                                    </td>

                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyCustomersReview;