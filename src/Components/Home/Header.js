import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    const menuItems1 = <>
        <li className='lg:mx-6 text-white'><Link to='/'>HOME</Link></li>
        <li className='lg:mx-6  text-white'><Link to='/service'>SERVICES</Link></li>
        <li className='lg:mx-6 text-white'><Link to='/appointment'>APPOINTMENT</Link></li>
    </>;

    const menuItems2 = <>
        <li className='lg:mx-6 text-white'><Link to='/contact'>CONTACT</Link></li>
        <li className='lg:mx-6 text-white'><Link to='/about'>ABOUT</Link></li>
        <li className='lg:mx-6 text-white'><Link to='/login'>LOGIN</Link></li>
    </>;



    return (
        <div className="navbar py-0" style={{ 'backgroundColor': '#010e14' }}>
            <div className="navbar-start w-full lg:hidden md:hidden">

                {/* -------------------This is for Small Screen-------------------- */}
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>

                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52">
                        {menuItems1}
                        {menuItems2}

                    </ul>

                </div>
                <a className="btn btn-ghost normal-case text-xl text-white w-3/4">
                    The Golden Style
                </a>

            </div>

            {/* ----------------------This is for Large Screen---------------------- */}
            <div className="navbar-start hidden lg:flex md:flex w-3/4 mx-auto">
                <ul className="menu menu-horizontal p-0 my-0">
                    {menuItems1}
                    <a className="normal-case">
                        <img className='w-16 h-20' src="https://i.ibb.co/W6bjxSD/White-logo-no-background.png" alt="logo" />
                    </a>
                    {menuItems2}

                </ul>
            </div>
        </div>
    );
};

export default Header; <h2>This is Header</h2>