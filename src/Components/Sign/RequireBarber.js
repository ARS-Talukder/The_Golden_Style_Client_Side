import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useBarber from '../../hooks/useBarber';
import Loading from '../Shared/Loading';

const RequireBarber = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [barber, barberLoading] = useBarber(user);
    const location = useLocation();

    if (loading || barberLoading) {
        return <Loading></Loading>
    }

    if (!user || !barber) {
        signOut(auth);
        toast.error('UnAuthorized Access')
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }

    return children;
};

export default RequireBarber;