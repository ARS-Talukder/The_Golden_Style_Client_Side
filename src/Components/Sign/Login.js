import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading';
import './Login.css';

const Login = () => {
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [showpassword, setShowpassword] = useState(false);
    const [token] = useToken(user || gUser);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [token, from, navigate])

    if (loading || gLoading) {
        return <Loading></Loading>
    }


    let signInError;

    if (error || gError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }

    const handleShowPassword = () => {
        setShowpassword(value => !value);
    }

    const handleSignIn = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(email, password);


    }
    return (
        <div className='flex justify-center items-center signing-container py-8 px-4'>
            <div className="w-full lg:w-2/6 md:w-1/2 signing-transparent">
                <h2 className="text-center">Welcome!</h2>
                <p className='text-center text-white font-light'>Today will be great.</p>
                <div className='flex justify-center'>
                    <form onSubmit={handleSignIn} className='w-4/5 mt-6' action="">
                        {/* ------------Email Field------------- */}
                        <input type="email" name="email" placeholder="Enter Your Email" className="w-full max-w-xs signing-input" required />

                        {/* ------------Password Field------------- */}
                        <input type={showpassword ? "text" : "password"} name="password" placeholder="Enter Your Password" className="w-full max-w-xs mt-8 mb-2 signing-input" required />

                        {signInError}

                        <div className='flex items-center'>
                            <input type="checkbox" className='w-4 h-4 mx-2' onClick={handleShowPassword} />
                            <label className='text-gray-200'>Show Password</label>
                        </div>

                        {/* ------------Submit Button------------- */}
                        <input className='btn w-full max-w-xs mt-4 submit-button' type="submit" value="Login" />

                    </form>
                </div>

                <div className='w-4/5 mx-auto'>
                    <p className='font-bold text-orange-500 mt-4'>NEW TO THE GOLDEN STYLE??</p>
                    <Link className="font-bold" to="/signup">CLICK TO CREATE NEW ACCOUNT</Link>
                </div>

                <div className='w-4/5 mx-auto'>
                    <Link className='text-xl font-bold text-red-700 mt-4' to="/resetpassword">Reset Password</Link>
                </div>

                {/* -------------OR Divider--------------- */}
                <div className='flex justify-center items-center my-2'>
                    <div className="divider bg-orange-400 w-2/6 h-0.5 rounded-lg"></div>
                    <h5 className='mx-2'>OR</h5>
                    <div className="divider bg-orange-400 w-2/6 h-0.5 rounded-lg"></div>

                </div>

                <div className='flex justify-center items-center'>
                    <button onClick={() => signInWithGoogle()} className="flex justify-center items-center w-full max-w-xs mt-2 py-2 rounded submit-button">
                        <img className='w-6 h-6 mr-2' src="https://i.ibb.co/vcHZKPm/google-logo.png" alt="google_logo" />
                        <p className='m-0'>CONTINUE WITH GOOGLE</p>
                    </button>
                </div>
                





            </div>

        </div>
    );
};

export default Login;