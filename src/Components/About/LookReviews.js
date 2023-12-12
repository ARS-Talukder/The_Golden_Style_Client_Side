import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import LookReview from './LookReview';

const LookReviews = () => {
    const location = useLocation();
    const barber_name = location.state.barber_name;
    const { data: reviews, isLoading: reviewsLoading } = useQuery('reviews', () => fetch(`http://localhost:5000/reviewsByBarber?name=${barber_name}`).then(res => res.json()));

    if (reviewsLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='p-8'>
            <div className='grid grid-cols-2 gap-10'>
                {
                    reviews.map(review => <LookReview key={review._id} review={review}></LookReview>)
                }
            </div>

        </div>
    );
};

export default LookReviews;