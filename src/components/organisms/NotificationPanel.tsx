// NotificationPanel.tsx

import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { websocketContext } from "../../context/socket/WebSocketContext";
import { NotificationType } from "../atoms/types/notifications/notificationstypes";
import { getRequest, putRequest } from "../atoms/api/Apis";
import { useUserSelector } from "../../redux/redux-hooks/hooks";

interface NotificationPanelProps {
  userLogoUrl: string;
  userName: string;
}

const initialNotification: NotificationType = {
  id: "",
  message: "",
  createdAt: new Date(),
  users: [],
  viewedBy: [],
};

const newNot = {
  message: "",
  flag: false,
};

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  userLogoUrl,
  userName,
}) => {
  const user = useUserSelector((state) => state);
  const socket = useContext(websocketContext);
  const [dropDown, setdropDown] = useState(false);
  const [newNotification, setNewNotification] = useState(newNot);
  const [notifications, setNotifications] = useState<NotificationType[]>([
    initialNotification,
  ]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const getNotifications = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    let tempNots: NotificationType[] = [];
    try {
      const response = await getRequest(
        `/notifications/user/${user._id}?page=${page}`
      );
      tempNots = response?.data.map((notification) => ({
        id: notification._id,
        message: notification.message,
        createdAt: notification.createdAt
          ? new Date(notification.createdAt)
          : null,
        users: notification.users,
        viewedBy: notification.viewedBy,
      }));
      const sortedAsc = tempNots.sort(
        (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt),
      );
      setNotifications((prev) => [...prev, ...sortedAsc]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
      if (tempNots.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const viewNotification = async (id: string) => {
    console.log(id);
    try {
      const response= await putRequest(`/notifications/read/${id}`, user._id)
      
    } catch (error) {
      console.log(error);
    }
  };


  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      getNotifications();
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("onMessage", (data: any) => {
      if (data) {
        if (data.content.users.includes(user._id)) {
          setNewNotification({ message: data.content.message, flag: true });
          setTimeout(
            function () {
              setNewNotification({ message: "", flag: false });
            }.bind(this),
            5000
          );
        }
      }
    });

    return () => {
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleClick = () => {
    setdropDown(!dropDown);
    getNotifications();
  };

 
  return (
    <div className=" flex bg-white justify-between p-2 ">
      <div className="flex border-gray-300 border-2 border-spacing-3">
        <InputBase className=" ml-2 flex-1" placeholder="Search" />
        <IconButton type="button" className=" p-1">
          <SearchIcon />
        </IconButton>
      </div>

      <div className="w-1/4 text-right">
        <div className=" ">
          <IconButton type="button" onClick={handleClick}>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton type="button">
            <SettingsOutlinedIcon />
          </IconButton>
          <IconButton type="button">
            <PersonOutlinedIcon />
          </IconButton>
        </div>

        {newNotification.flag && (
          <div
            className="absolute mt-4 flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Info alert!</span>{" "}
              {newNotification.message}
            </div>
          </div>
        )}

        {dropDown && (
          <div
            className=" row-end-1 absolute mt-4 bg-white rounded-md shadow-lg overflow-y-scroll overflow-x-hidden max-h-64 "
            ref={containerRef}
          >
            {notifications?.map(
              (notification) =>
                notification && (
                  <div className="py-2" key={notification.id} >
                    <a className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2" >
                      <p className="text-gray-600 text-sm mx-2" >
                        <span className="font-bold">
                          {notification.message}
                        </span>{" "}
                        {notification.createdAt.toDateString()}
                      </p>
                    </a>
                  </div>
                )
            )}
            {loading && (
              <div className="flex justify-center items-center p-4">
                Loading...
              </div>
            )}
            {!loading && !hasMore && (
              <div className="flex justify-center items-center p-4">
                No more notifications
              </div>
            )}
            <a className="block bg-gray-800 text-white text-center font-bold py-2">
              Notifications
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
