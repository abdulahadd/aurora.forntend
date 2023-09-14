import { Outlet } from "react-router-dom";
import { useUserSelector } from "../../redux/redux-hooks/hooks";
import SideBar from "../../components/organisms/SideBar";
import NotificationPanel from "../../components/organisms/NotificationPanel";
import { useEffect, useState } from "react";
import ListIcon from "@mui/icons-material/List";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/molecules/headers/DashBoardHeader";
import { useTitleState } from "../../context/title/TitleState";

function DashBoard() {
  const notifications = ["Notification 1", "Notification 2", "Notification 3"];
  const userr = useUserSelector((state) => state);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { title } = useTitleState();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (userr.token) {
      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);

  return (
    <div className="flex bg-indigo-100">
      {!sidebarOpen && (
        <button onClick={toggleSidebar}>
          <ListIcon />
        </button>
      )}

      {sidebarOpen && (
        <div className="h-screen bg-grey">
          <SideBar
            toggleSidebar={toggleSidebar}
            isOpen={sidebarOpen}
            role={userr.role}
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <NotificationPanel
          userLogoUrl="https://via.placeholder.com/100"
          userName={userr.username}
          notifications={notifications}
        />

        

        <Outlet />
      </div>

      <ToastContainer />
    </div>
  );
}

export default DashBoard;
