import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { useState } from 'react';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, uError] = useUpdateProfile(auth);
    const [passwordMatched, setPasswordMatched] = useState('');
    const [token]  = useToken(user || gUser);

    const navigate = useNavigate();
    

    if (loading || gLoading || updating) {
        <Loading></Loading>
    }

    let signInError;
    if (error || gError || uError) {
        signInError = <p className='text-red-500 font-bold'><small>{error?.message || gError?.message}</small></p>
    }

    if (token) {
        navigate('/');
    }

    const handleSignUp = async event => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirm.value;

        if (password === confirmPassword) {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
            // navigate('/')

        }
        else {
            setPasswordMatched('Sorry!! Password did not match')
        }

    }
    return (
        <div className='flex justify-center items-center signing-container py-8'>
            <div className="lg:w-2/6 sm:w-full signing-transparent">
                <h2 className="text-center">Sign Up</h2>
                <p className='text-center text-white font-light'>Welcome to THE GOLDEN STYLE</p>
                <div className='flex justify-center'>
                    <form onSubmit={handleSignUp} className='w-4/5 mt-3' action="">
                        {/* ------------Name Field------------- */}
                        <div>
                            <input type="text" name="name" placeholder="Your Name" className="w-full max-w-xs my-3 signing-input" required />
                        </div>
                        {/* ------------Email Field------------- */}
                        <div>
                            <input type="email" name="email" placeholder="Enter Your Email" className="w-full max-w-xs my-3 signing-input" required />
                        </div>
                        {/* ------------Password Field------------- */}
                        <div>
                            <input type="password" name="password" placeholder="Enter Your Password" className="w-full max-w-xs my-3 signing-input" required />
                        </div>
                        {/* ------------Confirm Password Field------------- */}
                        <div>
                            <input type="password" name="confirm" placeholder="Enter Your Confirm Password" className="w-full max-w-xs my-2 signing-input" required />
                        </div>
                        <p className='text-red-500 font-bold'><small>{passwordMatched}</small></p>
                        {signInError}

                        {/* ------------Submit Button------------- */}
                        <div>
                            <input className='btn w-full max-w-xs mt-4 submit-button' type="submit" value="Sign up" />
                        </div>

                    </form>
                </div>

                <div className='w-4/5 mx-auto'>
                    <p className='font-bold text-orange-500 mt-4'>Already Have An Account??</p>
                    <Link className="font-bold signing-link" to="/login">CLICK HERE TO LOGIN</Link>
                </div>

                {/* -------------OR Divider--------------- */}
                <div className='flex justify-center items-center my-2'>
                    <div className="divider bg-orange-400 w-2/6 h-0.5 rounded-lg"></div>
                    <h5 className='mx-2'>OR</h5>
                    <div className="divider bg-orange-400 w-2/6 h-0.5 rounded-lg"></div>

                </div>

                <div className='flex justify-center'>
                    <button onClick={() => signInWithGoogle()} className="btn w-full max-w-xs mt-2 submit-button text-center">SIGN UP WITH GOOGLE</button>
                </div>





            </div>
        </div>
    );
};

export default SignUp;