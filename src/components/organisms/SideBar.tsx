import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  useUserDispatch,
  useUserSelector,
} from "../../redux/redux-hooks/hooks";
import { updateUserState } from "../../redux/slices/users/user-slice";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, colors, makeStyles, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from '@mui/icons-material/Menu';
import profileimg from '../../assets/jpgs/man-using-laptop-.jpg'
import { blue, grey } from "@mui/material/colors";
import Item from "../atoms/items/Items";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { TitleContext } from "../../context/title/titleContext";
import Header from "../molecules/headers/DashBoardHeader";
import TitleState, { useTitleState } from "../../context/title/TitleState";


interface SideBarProps {
  role: string;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ role, isOpen, toggleSidebar }) => {
  const user = useUserSelector((state) => state);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  


  return (
    <div className="flex h-full">
      <Sidebar collapsed={isCollapsed}>
        <Menu >
            <div onClick={()=> setIsCollapsed(!isCollapsed)}
            className=" bg-purple-900 mb-9 p-2.5 "
            >
              {isCollapsed? <MenuIcon sx={{ color: "white"}}/> : undefined}
                { !isCollapsed && (
                <div className=" flex justify-between items-center">
                    <div className=" text-xl ml-5 text-gray-200" >
                        {selected}
                    </div>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                        <MenuIcon sx={{ color: "white"}}/>
                    </IconButton>
                    
                </div>)}

            </div>


          {!isCollapsed && (
            <Box mb="25px" >
              <Box display="flex"  alignItems=" left" ml="25px">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={profileimg}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="left" ml="30px">
                <Typography
                  variant="h5"
                  color={colors.purple[900]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.username}
                </Typography>
                <Typography variant="h6" color={colors.grey[500]}>
                  {user.role}
                </Typography>
              </Box>
            </Box>
          )}

<Box paddingLeft={isCollapsed ? undefined : "0%"}>
            <Item
              title1="Dashboard"
              to="/dashboard"
              icon={<HomeIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title1="Manage Team"
              to="/dashboard/unregistered"
              icon={<PersonAddAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title1="Contacts Information"
              to="contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title1="Sign out"
              to="/"
              icon={<LogoutIcon/>}
              selected={selected}
              setSelected={setSelected}
            />

          </Box>

           

        </Menu>
      </Sidebar>

      
      </div>
    
  );
};

export default SideBar;
