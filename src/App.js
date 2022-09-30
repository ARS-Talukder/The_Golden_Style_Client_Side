import './App.css';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import Appointment from './Components/Appointment/Appointment';
import About from './Components/About/About';
import Login from './Components/Sign/Login';
import Header from './Components/Shared/Header';
import Dashboard from './Components/Dashboard/Dashboard';
import SignUp from './Components/Sign/SignUp';
import Services from './Components/Services/Services';
import RequireAuth from './Components/Sign/RequireAuth';
import AppointmentForm from './Components/Appointment/AppointmentForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProfile from './Components/Dashboard/MyProfile';
import MyHistory from './Components/Dashboard/MyHistory';
import GiveYourReview from './Components/Dashboard/GiveYourReview';
import MyCustomersBooking from './Components/Dashboard/MyCustomersBooking';
import MyCustomersReview from './Components/Dashboard/MyCustomersReview';
import AllReviews from './Components/Dashboard/AllReviews';
import AllAppointments from './Components/Dashboard/AllAppointments';
import BarberAccess from './Components/Dashboard/BarberAccess';
import RequireManager from './Components/Sign/RequireManager';
import ManagerAccess from './Components/Dashboard/ManagerAccess.js';
import AddNewManager from './Components/Dashboard/AddNewManager';
import RequireChairman from './Components/Sign/RequireChairman';
import AllUsers from './Components/Dashboard/AllUsers';
import AddNewBarber from './Components/Dashboard/AddNewBarber';
import LookReviews from './Components/About/LookReviews';
import RequireBarber from './Components/Sign/RequireBarber';
import AddService from './Components/Dashboard/AddService';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/services' element={<Services></Services>}></Route>

        <Route path='/appointment' element={
          <RequireAuth>
            <Appointment></Appointment>
          </RequireAuth>
        }></Route>

        <Route path='/appointmentform/:id' element={
          <RequireAuth>
            <AppointmentForm></AppointmentForm>
          </RequireAuth>
        }></Route>

        <Route path='/dashboard' element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='/dashboard/myhistory' element={<MyHistory></MyHistory>}></Route>
          <Route path='/dashboard/giveyourreview' element={<GiveYourReview></GiveYourReview>}></Route>
          <Route path='/dashboard/mycustomersbookings' element={<RequireBarber><MyCustomersBooking></MyCustomersBooking></RequireBarber>}></Route>
          <Route path='/dashboard/mycustomersreviews' element={<RequireBarber><MyCustomersReview></MyCustomersReview></RequireBarber>}></Route>
          <Route path='/dashboard/allreviews' element={<RequireManager><AllReviews></AllReviews></RequireManager>}></Route>
          <Route path='/dashboard/allappointments' element={<RequireManager><AllAppointments></AllAppointments></RequireManager>}></Route>
          <Route path='/dashboard/allusers' element={<RequireManager><AllUsers></AllUsers></RequireManager>}></Route>
          <Route path='/dashboard/addservice' element={<RequireManager><AddService></AddService></RequireManager>}></Route>
          <Route path='/dashboard/addnewbarber' element={<RequireManager><AddNewBarber></AddNewBarber></RequireManager>}></Route>
          <Route path='/dashboard/barberaccess' element={<RequireManager><BarberAccess></BarberAccess></RequireManager>}></Route>
          <Route path='/dashboard/addnewmanager' element={<RequireChairman><AddNewManager></AddNewManager></RequireChairman>}></Route>
          <Route path='/dashboard/manageraccess' element={<RequireChairman><ManagerAccess></ManagerAccess></RequireChairman>}></Route>

        </Route>

        <Route path='/about' element={<About></About>}></Route>
        <Route path='/lookreviews/:id' element={<LookReviews></LookReviews>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
