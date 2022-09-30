import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AllReviews = () => {
    const { data: reviews, isLoading: reviewsLoading } = useQuery('reviews', () => fetch('http://localhost:5000/reviews').then(res => res.json()));

    if (reviewsLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="overflow-x-auto px-2 my-4">
                <table className="table w-full">

                    <thead>
                        <tr className='bg-gray-500  border-red-500 border-2 rounded'>
                            <th className='text-black border-2'></th>
                            <th className='text-black border-2 text-center'>Client</th>
                            <th className='text-black border-2 text-center'>Barber</th>
                            <th className='text-black border-2 text-center'>Our Environment</th>

                            <th className='text-black border-2 text-center'>Barber Behavior</th>
                            <th className='text-black border-2 text-center'>Barber Service</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews?.map((review, index) =>
                                <tr key={index} className='bg-gray-300 hover border-red-500 border-2 rounded'>
                                    <td className='py-3 border-2 border-red-500 text-center'>{index + 1}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{review.clientName}</td>
                                    <td className='py-3 border-2 border-red-500 text-center'>{review.barber_name}</td>
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

export default AllReviews;