import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Testimonial.css';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const Testimonial = () => {
    const { data: reviews, isLoading: reviewLoading } = useQuery('allReviews', () => fetch('http://localhost:5000/reviews').then(res => res.json()));

    const navigate = useNavigate();

    if (reviewLoading) {
        return <Loading></Loading>
    }

    const handleKnowTeam = () => {
        navigate('/about');
    }

    return (
        <div className='mb-16'>
            {/* ------------------------------Top Section-------------------------- */}
            <section className='my-12'>
                <h4 className='text-center'>Testimonial</h4>
                <div className="divider bg-red-400 w-16 h-1 mx-auto mt-0 rounded-lg"></div>
            </section>

            {/* -----------------------------Main Section-------------------------- */}
            <section className='lg:flex justify-between'>

                <div className='lg:w-2/5'>
                    <Zoom left>
                        <div>
                            <img src="https://i.ibb.co/y8JW9q8/comment.webp" alt="Comments" />
                        </div>
                    </Zoom>

                </div>

                <div className='lg:w-3/5 py-8 mt-12 lg:mt-0'>
                    <Slide right>
                        <div>
                            <Carousel variant="dark" indicators={false}>

                                {
                                    reviews.map(review =>
                                        <Carousel.Item key={review._id}>
                                            <div className='w-3/4 mx-auto'>
                                                <h4 className='customer-comment-header'>Customer Says</h4>
                                                <div className="divider bg-orange-400 w-32 h-1 mt-0 rounded-lg"></div>
                                                <h5 className='customer-comment'>{review.client_review}</h5>

                                                <div className='flex items-center'>
                                                    <p className='my-0 mr-4'>I have taken service from <span className='fw-bold'>{review.barber_name}</span></p>
                                                    <button className='btn btn-sm btn-success' onClick={handleKnowTeam}>Click to Know our team</button>
                                                </div>

                                                <p className='my-0'><small className='fw-bold'>{review.clientName}</small></p>
                                                <p className='my-0'><small className='fw-bold'>{review.email}</small></p>
                                            </div>

                                        </Carousel.Item>)
                                }

                            </Carousel>
                        </div>
                    </Slide>
                </div>


            </section>
        </div>
    );
};

export default Testimonial;