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
    const [passwordError, setPasswordError] = useState('');
    const [showpassword, setShowpassword] = useState(false);
    const [token] = useToken(user || gUser);

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

    const handlePasswordFocus = () => {
        setPasswordError('')
    }

    const handleShowPassword = () => {
        setShowpassword(value => !value);
    }

    const handleSignUp = async event => {
        event.preventDefault();

        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirm.value;
        const passwordExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,20}$/;

        if (!passwordExpression.test(password)) {
            setPasswordError('Password at least 7 characters, one upper and lower case letter and one digit')
        }

        else if (password !== confirmPassword) {
            setPasswordError('Sorry!! Password and Confirm Password did not match')

        }
        else {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
            // navigate('/')
        }

    }
    return (
        <div className='flex justify-center items-center signing-container py-8 px-4'>
            <div className="w-full lg:w-2/6 md:w-1/2 signing-transparent">
                <h2 className="text-center">Sign Up</h2>
                <p className='text-center text-white font-light'>Welcome to THE GOLDEN STYLE</p>
                <div className='flex justify-center'>
                    <form onSubmit={handleSignUp} className='w-4/5 mt-3' action="">
                        {/* ------------Name Field------------- */}
                        <input type="text" name="name" placeholder="Your Name" className="w-full max-w-xs my-3 signing-input" required />

                        {/* ------------Email Field------------- */}
                        <input type="email" name="email" placeholder="Enter Your Email" className="w-full max-w-xs my-3 signing-input" required />

                        {/* ------------Password Field------------- */}
                        <input onFocus={handlePasswordFocus} type={showpassword ? "text" : "password"} name="password" placeholder="Enter Your Password" className="w-full max-w-xs my-3 signing-input" required />

                        {/* ------------Confirm Password Field------------- */}
                        <input onFocus={handlePasswordFocus} type={showpassword ? "text" : "password"} name="confirm" placeholder="Enter Your Confirm Password" className="w-full max-w-xs mt-2 signing-input" required />

                        <p className='text-red-500 font-bold'><small>{passwordError}</small></p>
                        {signInError}

                        <div className='flex items-center'>
                            <input type="checkbox" className='w-4 h-4 mx-2' onClick={handleShowPassword} />
                            <label className='text-gray-200'>Show Password</label>
                        </div>


                        {/* ------------Submit Button------------- */}
                        <input className='btn w-full max-w-xs mt-4 submit-button' type="submit" value="Sign up" />


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
                    <button onClick={() => signInWithGoogle()} className="flex justify-center items-center w-full max-w-xs mt-2 py-2 rounded submit-button">
                        <img className='w-6 h-6 mr-2' src="https://i.ibb.co/vcHZKPm/google-logo.png" alt="google_logo" />
                        <p className='m-0'>CONTINUE WITH GOOGLE</p>
                    </button>
                </div>





            </div>
        </div>
    );
};

export default SignUp;