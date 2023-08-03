import React from 'react';
import './App.css';
import Login from './components/pages/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<SignUp/>}/>
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
