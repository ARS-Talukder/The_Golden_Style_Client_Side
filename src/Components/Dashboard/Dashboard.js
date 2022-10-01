import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './Dashboard.css';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';
import { Link, Outlet } from 'react-router-dom';
import useManager from '../../hooks/useManager';
import useChairman from '../../hooks/useChairman';
import useBarber from '../../hooks/useBarber';

const Dashboard = () => {
    const [user, uloading, error] = useAuthState(auth);
    const [manager, managerLoading] = useManager(user);
    const [chairman, chairmanLoading] = useChairman(user);
    const [barber, barberLoading] = useBarber(user);
    if (uloading || managerLoading || chairmanLoading || barberLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='bg-black'>
            {/* ----------------1st Section------------ */}


            {/* ----------------2nd Section------------ */}
            <div className="drawer drawer-mobile">
                <input id="dashboard-side-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <!-------------- Page content here -----------> */}
                    <div className='w-full h-full dashboard-default-content'>
                        {/* Outlet is the Part of Nested Routes */}
                        <Outlet></Outlet>

                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-side-drawer" className="drawer-overlay"></label>
                    <ul className="menu py-4 px-2 overflow-y-auto w-1/2 lg:w-full md:w-1/3 h-full bg-stone-800">
                        {/* <!--------- Sidebar content here -----------> */}
                        <li><Link to='/dashboard' className='btn btn-success mb-3'>My Profile</Link></li>
                        <li><Link to='/dashboard/myhistory' className='btn btn-success mb-3'>My History</Link></li>
                        {
                            !chairman && !manager && !barber && <li><Link to='/dashboard/giveyourreview' className='btn btn-success mb-3'>Give Your Review</Link></li>
                        }
                        {
                            barber && <li><Link to='/dashboard/mycustomersbookings' className='btn btn-success mb-3'>My Customers Booking</Link></li>
                        }
                        {
                            barber && <li><Link to='/dashboard/mycustomersreviews' className='btn btn-success mb-3'>My Customers Review</Link></li>
                        }
                        {
                            manager && <li><Link to='/dashboard/allreviews' className='btn btn-success mb-3'>All Reviews</Link></li>
                        }
                        {
                            manager && <li><Link to='/dashboard/allappointments' className='btn btn-success mb-3 py-1'>All Appointments</Link></li>
                        }
                        {
                            manager && <li><Link to='/dashboard/allusers' className='btn btn-success mb-3'>All Users</Link></li>
                        }
                        {
                            manager && <li><Link to='/dashboard/addservice' className='btn btn-success mb-3'>Add Service</Link></li>
                        }
                        {
                            manager && <li><Link to='/dashboard/addnewbarber' className='btn btn-success mb-3'>Add New Barber</Link></li>
                        }
                        {
                            manager && <li><Link to='/dashboard/barberaccess' className='btn btn-success mb-3'>Barber Access</Link></li>
                        }
                        {
                            chairman && <li><Link to='/dashboard/addnewmanager' className='btn btn-success mb-3'>Add New Manager</Link></li>
                        }
                        {
                            chairman && <li><Link to='/dashboard/manageraccess' className='btn btn-success mb-3'>Manager Access</Link></li>
                        }


                    </ul>

                </div>
            </div>


            {/* -----------------------Footer Section------------------------- */}
            <Footer></Footer>

        </div>
    );
};

export default Dashboard;