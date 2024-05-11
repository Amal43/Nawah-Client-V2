import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { store } from './Redux/Store';
import { Provider } from "react-redux";
import { Route,
        Routes, 
        BrowserRouter,
      } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AboutUs from './Pages/AboutUs';
import WelcomePage from './Pages/Welcome';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Products from './Pages/Products';
import Cart from './Pages/Cart';
import UserProfile from './Pages/UserProfile';
import FarmerProfile from './Pages/FarmerProfile';
import EngineerProfile from './Pages/EngineerProfile';



function App() {
  return (
    <Provider store={store}>
        <ToastContainer/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage/>}/>
            <Route path='login' element ={<Login/>}/>
            <Route path='signup' element ={<SignUp/>}/>
            <Route path='aboutus' element ={< AboutUs/>}/>
            <Route path='home' element ={<Home/>}/>
            <Route path='contact' element ={<Contact/>}/>
            <Route path='product' element ={<Products/>}/>
            <Route path='cart' element ={<Cart/>}/>
            <Route path='userProfile' element ={<UserProfile/>}/>
            <Route path='farmerProfile' element ={<FarmerProfile/>}/>
            <Route path='engineerProfile' element ={<EngineerProfile/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
