import './App.css';
import {Routes,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import Service from './Components/Service/Service';
import Appointment from './Components/Appointment/Appointment';
import Contact from './Components/Contact/Contact';
import About from './Components/About/About';
import Login from './Components/Sign/Login';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/home' element={<Home></Home>}></Route>
      <Route path='/service' element={<Service></Service>}></Route>
      <Route path='/appointment' element={<Appointment></Appointment>}></Route>
      <Route path='/contact' element={<Contact></Contact>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      
    </Routes>
  );
}

export default App;
