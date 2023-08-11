// NotificationPanel.tsx

import React from "react";
import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

interface NotificationPanelProps {
  userLogoUrl: string;
  userName: string;
  notifications: string[];
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  userLogoUrl,
  userName,
  notifications,
}) => {
  return (
    <div className=" flex bg-white justify-between p-2 ">
      <div className="flex border-gray-300 border-2 border-spacing-3">
        <InputBase className=" ml-2 flex-1" placeholder="Search" />
        <IconButton type="button" className=" p-1">
          <SearchIcon />
        </IconButton>
      </div>

      {/* Icons */}
      <div>
        <IconButton type="button">
          <NotificationsOutlinedIcon  />
        </IconButton>
        <IconButton type="button">
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton type="button">
          <PersonOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default NotificationPanel;
