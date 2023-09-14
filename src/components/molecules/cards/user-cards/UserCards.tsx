import { Button } from "@mui/material";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUserSelector } from "../../../../redux/redux-hooks/hooks";
import RegModal from "../../modals/regModal";
import { ORG_API_PATHS } from "../../../atoms/paths/ApiPaths";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  registered: Dispatch<SetStateAction<boolean>>;
  reloading: Dispatch<SetStateAction<boolean>>;
}

function UserCards(props: CardProps) {
  const userr = useUserSelector((state) => state);
  const register = {
    isRegistered: true,
  };

  const [confirmation, setConfirmation] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [organisation, setOrganisation]=useState("");

  const getOrganisation= async ()=>{
    try {
      const response=await axios.get(`${process.env.REACT_APP_URL}${ORG_API_PATHS.GET_ONE}${props.description}`)
      setOrganisation(response.data.name);
      
    } catch (error) {
      console.log(error)
    }
  }


  const registerUser = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_URL}/users/patch/${props.title}/${userr.username}`,
        register,
        {
          headers: {
            Authorization: `Bearer ${userr.token}`,
          },
        }
      );
    
      props.registered(true);
      props.reloading(true);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (confirmation) {
      registerUser();
    }
    getOrganisation();
  }, [confirmation]);

  const onClickHandler = () => {
    handleOpen();
  };

  return (
    <>
      <div className=" w-72 rounded overflow-hidden shadow-xl bg-white">
        <img
          className="w-full h-48 object-cover"
          src={props.imageUrl}
          alt={props.title}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-left">{props.title}</div>
          <div className="flex justify-between">
            <p className="text-gray-700 text-base font-bold">
              {organisation}
            </p>
            <Button variant="outlined" size="small" onClick={onClickHandler}>
              Register
            </Button>
          </div>
        </div>
      </div>

      <RegModal
        handleClose={handleClose}
        open={open}
        confirm={setConfirmation}
      />
    </>
  );
}

export default UserCards;
