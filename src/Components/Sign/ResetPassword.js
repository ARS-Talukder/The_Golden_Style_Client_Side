import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const ResetPassword = () => {
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
    if (sending) {
        return <Loading></Loading>
    }

    const handleResetPassword = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        sendPasswordResetEmail(email);
        toast.success('We have send a email to you');
    }

    return (
        <div className='flex justify-center py-8'>
            <div>
                <h3 className='text-red-800 font-bold'>Reset Your Password</h3>
                <form onSubmit={handleResetPassword} action="">
                    <input type="email" name='email' placeholder="Enter Your Email" className="input input-bordered input-primary w-full" />
                    <input type="submit" className='btn btn-primary w-full mt-2' value="Confirm" />
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;