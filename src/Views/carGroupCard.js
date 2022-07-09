import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";

const defaultCarGroupInfo = {
  CarGroupNumber: "1",
  TerritoryNumber: "",
  HoursOut: "0",
  People: [{ name: "小冰" }],
};

export default function CarGroupCard({
  setRefresh,
  resetCarGroupCard,
  selectedCarGroupCard,
}) {
  const [carGroupInfo, setCarGroupInfo] = React.useState(defaultCarGroupInfo);

  const [open, setOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(null);

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setCarGroupInfo({...defaultCarGroupInfo, People: [{name: ""}]});
  }, [resetCarGroupCard]);

  React.useEffect(() => {
    if (selectedCarGroupCard != null) {
      setCarGroupInfo(selectedCarGroupCard);
    }
  }, [selectedCarGroupCard]);

  const handleAddPeopleInputField = () => {
    let newPerson = { name: "" };
    // setPeopleInputFields([...peopleInputFields, newPerson]);
    let data = [...carGroupInfo.People];
    data.push(newPerson);
    setCarGroupInfo({
      ...carGroupInfo,
      People: data,
    });
  };

  const handleRemovePeopleInputField = (index) => {
    // let data = [...peopleInputFields];
    let data = [...carGroupInfo.People];
    data.splice(index, 1);
    // setPeopleInputFields(data);
    setCarGroupInfo({
      ...carGroupInfo,
      People: data,
    });
  };

  const handleFormChange = (index, event) => {
    let data = [...carGroupInfo.People];
    data[index][event.target.name] = event.target.value;
    // setPeopleInputFields(data);
    setCarGroupInfo({
      ...carGroupInfo,
      People: data,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCarGroupInfo({
      ...carGroupInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(carGroupInfo);
    sendToDatabase(carGroupInfo);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    console.log("Car group to delete: ");
    console.log(carGroupInfo);
    deleteFromDatabase(carGroupInfo);
  };

  const sendToDatabase = (obj) => {
    axios.post("/api/newcargroup", obj).then((response) => {
      console.log(response.data);
      openSnackbar("Saved! 保存成功");
      setRefresh(+new Date());
      // console.log("Sent to database!")
      // console.log("Resetting Refresh state variable...")
    });
  };

  const deleteFromDatabase = (obj) => {
    axios.post("/api/deletecargroup", obj).then((response) => {
      console.log("Deleted successfully.");
      console.log(response.data);
      setCarGroupInfo(defaultCarGroupInfo);
      openSnackbar("Deleted! 删除了");
      setRefresh(+new Date());
    });
  };

  const action = (
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

  return (
    <Grid
      container
      spacing={0}
      xs={true}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "80vh" }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Car Group 车组
              
              {/**
             * <IconButton aria-label="delete car group" size="small" onClick={handleDelete}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
             * 
             * 
             * 
             */}
            </Typography>
            <Button
                variant="outlined"
                aria-label="delete car group"
                endIcon={<DeleteIcon />}
                color="error"
                fontSize="8"
                onClick={handleDelete}
                size="small"
                sx={{marginLeft: "5px", marginBottom: "5px"}}
              >
                Delete 删掉
              </Button>
          </div>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-number"
              label="Car Group # 车组号码"
              variant="outlined"
              size="small"
              type="number"
              name="CarGroupNumber"
              value={carGroupInfo.CarGroupNumber}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Territory Number 地区号"
              variant="standard"
              size="small"
              name="TerritoryNumber"
              value={carGroupInfo.TerritoryNumber}
              onChange={handleInputChange}
            />
            <br />
            <TextField
              id="standard-basic"
              label="预计传道时数 Hours Out"
              variant="standard"
              size="small"
              name="HoursOut"
              value={carGroupInfo.HoursOut}
              onChange={handleInputChange}
            />
            <Typography variant="h7" component="div">
              People 人员
              <IconButton
                aria-label="add people"
                size="small"
                onClick={handleAddPeopleInputField}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Typography>
            <Divider />
            {carGroupInfo.People.map((input, index) => {
              return (
                <Box key={index}>
                  <TextField
                    id="name-input"
                    label="Name 姓名"
                    variant="standard"
                    name="name"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            color="primary"
                            onClick={() => handleRemovePeopleInputField(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={input.name}
                    onChange={(event) => handleFormChange(index, event)}
                  />
                </Box>
              );
            })}
            <Button variant="contained" type="submit">
              Save 保存
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        name="saveSnackbar"
        open={open}
        color="success"
        autoHideDuration={1500}
        onClose={closeSnackbar}
        message={snackbarMessage ? snackbarMessage : undefined}
        action={action}
      />
    </Grid>
  );
}
