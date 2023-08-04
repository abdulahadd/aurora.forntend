import React from 'react'
import auroraLogo from '../../assets/AuroraImg.jpeg'
import { Link } from 'react-router-dom'

function SideBar() {
  return (
    <div className="h-screen bg-gray-800 w-64 text-white flex flex-col">
        <div className="p-4 border-b h-40 border-gray-700 flex justify-center items-center">
            <img className=' w-24 h-24 ' src={auroraLogo} alt='/'/>
        </div>
            <nav className="flex-1">
                <ul className="p-4 space-y-4">
                    <li>
                        <Link to='/dashboard' className="hover:text-red-200 text-xl" >Home</Link>
                    </li>
                    <li>
                        <Link to='/signup' className="hover:text-red-200 text-xl" >Sign up</Link>
                    </li>
                    <li>
                        <Link to='/login' className="hover:text-red-200 text-xl" >Sign In</Link>                    
                    </li>
                    <li>
                        <Link to='/register' className="hover:text-red-200 text-xl" >Create Organisation</Link>
                    </li>
                    <li>
                        <Link to='/register' className="hover:text-red-200 text-xl" >Register Users</Link>
                    </li>
                    <li>
                        <Link to='/login' className="hover:text-red-200 text-xl" >Log out</Link>
                    </li>
                </ul>
            </nav>
        <div className="p-4 border-t border-gray-700">Your Footer</div>
    </div>
  )
}

export default SideBar