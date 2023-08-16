import { Button } from "@mui/material";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUserSelector } from "../../../../redux/redux-hooks/hooks";
import RegModal from "../../modals/regModal";

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

  const registerUser = async () => {

    try {
      const response = await axios.patch(
        `http://localhost:5000/users/patch/${props.title}/${userr.username}`,
        register,
        {
          headers: {
            Authorization: `Bearer ${userr.token}`,
          },
        }
      ); // Replace with your API endpoint URL
      //   setData(response.data)
      console.log("response.data", response?.data);
      props.registered(true);
      props.reloading(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if(confirmation)
    {
      registerUser();
    }
  
  
}, [confirmation])

  const onClickHandler= ()=>{
    handleOpen();

  }

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
              {props.description}
            </p>
            <Button variant="outlined" size="small" onClick={onClickHandler}>
              Register
            </Button>
          </div>
        </div>
      </div>

      <RegModal handleClose={handleClose} open={open} confirm={setConfirmation}/>
    </>
  );
}

export default UserCards;
