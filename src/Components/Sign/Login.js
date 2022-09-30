import React from 'react';
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

    const handleSignIn = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(email, password);


    }
    return (
        <div className='flex justify-center items-center signing-container py-8'>
            <div className="lg:w-2/6 sm:w-full signing-transparent">
                <h2 className="text-center">Welcome!</h2>
                <p className='text-center text-white font-light'>Today will be great.</p>
                <div className='flex justify-center'>
                    <form onSubmit={handleSignIn} className='w-4/5 mt-6' action="">
                        {/* ------------Email Field------------- */}
                        <div>
                            <input type="email" name="email" placeholder="Enter Your Email" className="w-full max-w-xs signing-input" required />
                        </div>
                        {/* ------------Password Field------------- */}
                        <div>
                            <input type="password" name="password" placeholder="Enter Your Password" className="w-full max-w-xs my-8 signing-input" required />
                        </div>

                        {signInError}

                        {/* ------------Submit Button------------- */}
                        <div>
                            <input className='btn w-full max-w-xs mt-2 submit-button' type="submit" value="Login" />
                        </div>

                    </form>
                </div>

                <div className='w-4/5 mx-auto'>
                    <p className='font-bold text-orange-500 mt-4'>NEW TO THE GOLDEN STYLE??</p>
                    <Link className="font-bold" to="/signup">CLICK TO CREATE NEW ACCOUNT</Link>
                </div>

                {/* -------------OR Divider--------------- */}
                <div className='flex justify-center items-center my-2'>
                    <div className="divider bg-orange-400 w-2/6 h-0.5 rounded-lg"></div>
                    <h5 className='mx-2'>OR</h5>
                    <div className="divider bg-orange-400 w-2/6 h-0.5 rounded-lg"></div>

                </div>

                <div className='flex justify-center'>
                    <button onClick={() => signInWithGoogle()} className="btn w-full max-w-xs mt-2 submit-button text-center">CONTINUE WITH GOOGLE</button>
                </div>





            </div>

        </div>
    );
};

export default Login;