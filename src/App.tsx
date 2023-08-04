import React from 'react';
import './App.css';
import Login from './components/pages/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './components/pages/SignUp';
import DashBoard from './components/pages/DashBoard';
// test

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
