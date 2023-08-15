import { useTheme } from "@emotion/react";
import { Typography, colors } from "@mui/material";
import exp from "constants";
import { MenuItem } from "react-pro-sidebar";
import { Link, redirect, useNavigate } from "react-router-dom";
import { updateUserState } from "../../../redux/slices/users/user-slice";
import {
  useUserDispatch,
  useUserSelector,
} from "../../../redux/redux-hooks/hooks";
import { useContext } from "react";
import { TitleContext } from "../../../context/title/titleContext";
import { useTitleState } from "../../../context/title/TitleState";
import PersistedState from "../types/redux/redux-types"

interface ItemProps {
  title1: string;
  to: string;
  icon: any;
  selected: string;
  setSelected: (value: string) => void;
}



const Item: React.FC<ItemProps> = ({
  title1,
  to,
  icon,
  selected,
  setSelected,
}) => {
  const { setTitle } = useTitleState();
  const user = useUserSelector((state: PersistedState) => state);
  const dispatch = useUserDispatch();
  const navigate=useNavigate();
  

  const handleClick = () => {
    console.log("click");
    const token = "";
    dispatch(updateUserState({ ...user, token: token, isLoggedIn: false }));
    setTitle("Dashboard");
    
  };
  return (
    <MenuItem
      component={<Link to={to} />}
      active={selected === title1}
      style={{
        color: colors.purple[900],
      }}
      onClick={() => {
        if (title1 !== "Sign out") {
          setSelected(title1);
          setTitle(title1);
          //navigate(to);
        } else {
          handleClick();
        }
      }}
      icon={icon}
      
    >
      <h5 className=" text-left">{title1}</h5>
    </MenuItem>
  );
};

export default Item;
