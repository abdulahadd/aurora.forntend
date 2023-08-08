import React, { useEffect, useState } from 'react'
import { useUserSelector } from '../redux/redux-hooks/hooks'
import LoggedLayout from './logged/LoggedLayout';
import GuestLayout from './guest/GuestLayout';
import DashBoard from '../pages/DashBoard';
import Login from '../pages/Login';
import 'react-toastify/dist/ReactToastify.css';

const  Layout=()=> {

    const userr=useUserSelector((state)=>(state.user))
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

      console.log("LAyout useeffect called")
        if (userr.token !== "") {
          setIsLoggedIn(true);
          
        } else {
          setIsLoggedIn(false);
        }
      }, [userr.token]);

    

    return(
        <div>
          {isLoggedIn ? <LoggedLayout><DashBoard/></LoggedLayout> : <GuestLayout><Login/></GuestLayout>}
        </div>
        
    );
    

  
}

export default Layout