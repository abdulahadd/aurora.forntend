import React from 'react';
import './App.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import UnregisteredUsers from './components/organisms/UnregisteredUsers';
import Layout from './layout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import DashBoard from './pages/DashBoard';
// test

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='/' element={<Layout/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='dashboard' element={<DashBoard/>}>
          <Route path='unregistered' element={<UnregisteredUsers />} />
        </Route>
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
