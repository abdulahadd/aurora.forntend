import React, { useEffect, useState } from 'react'
import { useUserSelector } from '../redux/redux-hooks/hooks'
import LoggedLayout from './logged/LoggedLayout';
import GuestLayout from './guest/GuestLayout';
import DashBoard from '../pages/dashboard/DashBoard';
import Login from '../pages/login/Login';
import 'react-toastify/dist/ReactToastify.css';
import TitleState from '../context/title/TitleState';

const  Layout=()=> {

    const userr=useUserSelector((state)=>(state))
    


    useEffect(() => {

      console.log("Redux token : ", userr.token);

      console.log("LAyout useeffect called")
      }, [userr.token]);

    

    return(
        <div>
          {userr.isLoggedIn ? <LoggedLayout><DashBoard/></LoggedLayout> : <GuestLayout><Login/></GuestLayout>}
        </div>
        
    );
    

  
}

export default Layout