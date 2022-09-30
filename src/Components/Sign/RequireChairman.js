import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useChairman from '../../hooks/useChairman';
import Loading from '../Shared/Loading';

const RequireChairman = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [chairman, chairmanLoading] = useChairman(user);
    const location = useLocation();

    if (loading || chairmanLoading) {
        return <Loading></Loading>
    }

    if (!user || !chairman) {
        signOut(auth);
        toast.error("UnAuthorized Access")
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }

    return children;
};

export default RequireChairman;