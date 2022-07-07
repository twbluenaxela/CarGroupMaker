import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";

const actions = [
  { icon: <AddIcon />, name: "New Car Group" },
  { icon: <DeleteIcon />, name: "Delete" },
];

const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 16,
};

export default function AddCarGroupButton({ setResetCarGroupCard }) {

  const [open, setOpen] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState(null)

  const openSnackbar = (message) => {
    setSnackbarMessage(message)
    setOpen(true);
  }

  const closeSnackbar = () => {
    setOpen(false)
  }

  const snackbarAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const makeBlankCarGroupCard = () => {
    console.log("Sending request to make a new blank card...");
    setResetCarGroupCard((prevVal) => prevVal + 1);
    openSnackbar("Created new car group! 创建车组成功")
    //haha it is but an illusion! all I'm doing is resetting the info on the car group card!
  };



  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab
        sx={fabStyle}
        color="primary"
        aria-label="add"
        onClick={makeBlankCarGroupCard}
      >
        <AddIcon />
      </Fab>
      <Snackbar
        name="saveSnackbar"
        open={open}
        autoHideDuration={1500}
        onClose={closeSnackbar}
        message={snackbarMessage ? snackbarMessage : undefined}
        action={snackbarAction}
      />
    </Box>
    
  );
}
