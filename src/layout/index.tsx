import React, { useEffect, useState } from 'react'
import { useUserSelector } from '../redux/redux-hooks/hooks'
import LoggedLayout from './logged/LoggedLayout';
import GuestLayout from './guest/GuestLayout';
import DashBoard from '../pages/DashBoard';
import Login from '../pages/Login';
import 'react-toastify/dist/ReactToastify.css';

const  Layout=()=> {

    const userr=useUserSelector((state)=>(state.user))
    

    useEffect(() => {

      console.log("LAyout useeffect called")
      }, [userr.token]);

    

    return(
        <div>
          {userr.isLoggedIn ? <LoggedLayout><DashBoard/></LoggedLayout> : <GuestLayout><Login/></GuestLayout>}
        </div>
        
    );
    

  
}

export default Layout