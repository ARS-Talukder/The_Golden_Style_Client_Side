import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import './Header.css';
import Loading from './Loading';

const Header = () => {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    if (loading) {
        <Loading></Loading>
    };

    const handleSignOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    };
    const signOutConfirmation = () => {
        const proceed = window.confirm("Signing Out");
        if (proceed) {
            handleSignOut();
            navigate('/');
        }
        else {
            return;
        }

    }
    const menuItems1 = <>
        <li className='lg:mx-6 text-white'><Link className='header-link' to='/'>HOME</Link></li>
        <li className='lg:mx-6  text-white'><Link className='header-link' to='/services'>SERVICES</Link></li>
        <li className='lg:mx-6 text-white'><Link className='header-link' to='/appointment'>APPOINTMENT</Link></li>
    </>;

    const menuItems2 = <>
        <li className='lg:mx-6 text-white'><Link className='header-link' to='/dashboard'>DASHBOARD</Link></li>
        <li className='lg:mx-6 text-white'><Link className='header-link' to='/about'>ABOUT</Link></li>
        {
            user ?
                <li className='lg:mx-6 text-white mx-0'>
                    <button className='w-20' onClick={signOutConfirmation}>
                        <div className="avatar">
                            <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL !== null ? user.photoURL : "https://i.ibb.co/ctFS6Qt/login-Avatar.png"} alt="login avatar" />
                            </div>
                        </div>

                    </button>
                </li>

                : <li className='lg:mx-6 text-white'><Link className='header-link' to='/login'>LOGIN</Link></li>
        }

    </>;





    return (
        <div className="navbar py-0 navbar-main-div">
            {/* -------------------This is for Small Screen-------------------- */}
            <div className="navbar-start lg:hidden md:hidden">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>

                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52">
                        {menuItems1}
                        {menuItems2}

                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl text-white w-full ml-12" to='/'>
                    The Golden Style
                </Link>
            </div>

            {/* ----------------------This is for Large Screen---------------------- */}
            <div className="navbar-center hidden lg:flex md:flex w-full">
                <div className='mx-auto'>
                    <ul className="menu menu-horizontal p-0 my-0">
                        {menuItems1}
                        <Link className="normal-case" to='/'>
                            <img className='w-16 h-20' src="https://i.ibb.co/W6bjxSD/White-logo-no-background.png" alt="logo" />
                        </Link>
                        {menuItems2}

                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Header;