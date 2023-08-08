//import React, { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom';
import { useUserSelector } from '../redux/redux-hooks/hooks';
import SideBar from '../components/organisms/SideBar';
import NotificationPanel from '../components/organisms/NotificationPanel';
import { useState } from 'react';
import ListIcon from '@mui/icons-material/List';




function DashBoard() {


  const notifications = ["Notification 1", "Notification 2", "Notification 3"];
  const userr=useUserSelector((state)=>(state.user))
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  


  return (

    <div className="flex bg-indigo-100">
      {!sidebarOpen &&<button onClick={toggleSidebar} className="p-4 bg-red-700 text-white text-xl font-bold">
        <ListIcon/>
      </button>}

      {sidebarOpen && <SideBar toggleSidebar={toggleSidebar} isOpen={sidebarOpen} role={userr.role} />}
      <div className="flex flex-col flex-1">
        <NotificationPanel
                userLogoUrl="https://via.placeholder.com/100"
                userName={userr.username}
                notifications={notifications}
              />
      <Outlet/>
      </div>
    </div> 
   
  )
}

export default DashBoard