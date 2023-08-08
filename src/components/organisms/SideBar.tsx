import React from 'react'
import auroraLogo from '../../assets/jpegs/AuroraImg.jpeg'
import { Link } from 'react-router-dom'
import { useUserDispatch, useUserSelector } from '../../redux/redux-hooks/hooks'
import { updateUserState } from '../../redux/slices/users/user-slice'
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import ClearIcon from '@mui/icons-material/Clear';

interface SideBarProps {
    role:string,
    isOpen: boolean;
    toggleSidebar: () => void

  }
  

const SideBar: React.FC<SideBarProps> = ({role, isOpen, toggleSidebar}) => {

    const user=useUserSelector((state)=>(state.user))
    const dispatch= useUserDispatch();

    const handleClick=()=>{
        const token="";
        dispatch(updateUserState({...user, token:token}));

    }


  return (
        <div className={`h-screen bg-slate-600 w-64 text-white flex flex-col ${isOpen ? '' : 'hidden'}`}>
            <div className="p-4 border-b border-slate-800 h-40 flex justify-between items-center">
                <img className='w-24 h-24' src={auroraLogo} alt='/' />
                <ClearIcon onClick={toggleSidebar} className="cursor-pointer text-xl mb-20" />
            </div>
            <nav className={`h-screen bg-slate-600 w-64 text-white flex flex-col ${isOpen ? '' : 'hidden'}`}>
                <ul className="p-4 space-y-4">
                    <li className=' flex items-center space-x-2 '>
                        <HomeIcon/>
                        <Link to='/dashboard' className="hover:text-red-200 text-xl" >Home</Link>
                    </li>
                    
                    <li className=' flex items-center space-x-2 '>
                        <LoginIcon/>
                        <Link to='login' className="hover:text-red-200 text-xl" >Sign In</Link>                    
                    </li>
                    <li className=' flex items-center space-x-2 '>
                        <PersonAddAltIcon/>
                        <Link to=' unregistered' className="hover:text-red-200 text-xl" >Register Users</Link>
                    </li>
                    <li className=' flex items-center space-x-2 '>
                        <LogoutIcon/>
                        <Link to='/' className="hover:text-red-200 text-xl" onClick={handleClick}>Log out</Link>
                    </li>
                </ul>

            </nav>
            
            <div className="p-4 border-t border-gray-700">{role}</div>
    </div>
  )
}

export default SideBar;