import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUserSelector } from "../../redux/redux-hooks/hooks";
import { Sidebar, Menu } from "react-pro-sidebar";
import { Box, IconButton, Typography, colors } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import profileimg from "../../assets/jpgs/man-using-laptop-.jpg";
import Item from "../atoms/items/Items";
import { CalendarMonthOutlined } from "@mui/icons-material";
import axios from "axios";
import { getRequest } from "../atoms/api/Apis";
import { ORG_API_PATHS } from "../atoms/paths/ApiPaths";

interface SideBarProps {
  role: string;
  isOpen: boolean;
  toggleSidebar: () => void;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const SideBar: React.FC<SideBarProps> = ({ role, isOpen, toggleSidebar, selected, setSelected }) => {
  const user = useUserSelector((state) => state);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [organisation, setOrganisation] = useState("");

  const getOrganisation = async () => {
    try {
      const response = await getRequest(
        `${ORG_API_PATHS.GET_ONE}${user.orgId}`
      );

      setOrganisation(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganisation();
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar collapsed={isCollapsed}>
        <Menu>
          <div
            onClick={() => setIsCollapsed(!isCollapsed)}
            className=" bg-purple-900 mb-9 p-2.5 "
          >
            {isCollapsed ? <MenuIcon sx={{ color: "white" }} /> : undefined}
            {!isCollapsed && (
              <div className=" flex justify-between items-center">
                <div className=" text-xl ml-5 text-gray-200">
                  {organisation}
                </div>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuIcon sx={{ color: "white" }} />
                </IconButton>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" alignItems=" left" ml="25px">
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
              to="/dashboard/defaultdashboard"
              icon={<HomeIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {user.role === "SuperUser" && (
              <Item
                title1="Manage Team"
                to="/dashboard/unregistered"
                icon={<PersonAddAltIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            <Item
              title1="Calendar"
              to="/dashboard/calender"
              icon={<CalendarMonthOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title1="Sign out"
              to="/"
              icon={<LogoutIcon />}
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
