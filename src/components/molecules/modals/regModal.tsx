import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  confirm: Dispatch<SetStateAction<boolean>>;
}



function RegModal(props: ModalProps) {

    const handleClick= ()=> { 
        props.confirm(true);
        props.handleClose();

    }
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to register?
          </Typography>
          <div>
            <button className="bg-green-500 hover:bg-green-700 text-white mr-2 font-bold py-2 px-4 rounded-full" onClick={handleClick}>
              Yes
            </button>

            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={props.handleClose}>
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default RegModal;
