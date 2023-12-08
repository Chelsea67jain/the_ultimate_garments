
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

import Dashboard from "./Components/Administrator/Dashboard";
import AdminLogin from "./Components/Administrator/AdminLogin";
import Home from './Components/UserInterface/Home';
import BannerImages from './Components/Administrator/BannerImages';
import ProductList from './Components/UserInterface/ProductList';
import ProductDetails from './Components/UserInterface/ProductDetails';
import LoginSignUpComponent from './Components/UserInterface/UserComponents/LoginSignUpComponent';
import MyCart from './Components/UserInterface/MyCart';
import Address from './Components/UserInterface/Address';
import AddAddress from './Components/UserInterface/UserComponents/AddAddress';
import PaymentGateway from './Components/UserInterface/PaymentGateway';


function App(props) {
  return (
    <div >
    <Router>
      <Routes>
       
        <Route element={<Dashboard/>} path='/dashboard/*'></Route> 
        <Route element={<AdminLogin/>} path='/adminlogin'></Route> 
        <Route element={<BannerImages/>} path='/bannerimages'></Route> 
        <Route element={<Home/>} path='/home'></Route> 
        <Route element={<ProductList />} path='/productlist/:id/:icon'></Route>
        <Route element={<ProductDetails />} path='/productdetails'></Route>
        <Route element={<LoginSignUpComponent />} path='/login'></Route>
        <Route element={<MyCart/>} path='/cart'></Route>
      
        <Route element={<Address/>} path='/address'></Route>
        
        <Route element={<PaymentGateway/>} path='/paymentgateway'></Route>
      </Routes> 
    </Router>

    </div>
  );
}

export default App;
