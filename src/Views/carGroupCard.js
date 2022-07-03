import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';


export default function CarGroupCard() {
  const [peopleInputFields, setPeopleInputFields] = React.useState([
    { name: "" },
  ]);
  const [carGroupInfo, setCarGroupInfo] = React.useState(
    {CarGroupNumber: 0,
    TerritoryNumber: "",
    HoursOut: 0,
    People: [...peopleInputFields]
  }
    )


  const handleAddPeopleInputField = () => {
    let newPerson = { name: "" };
    setPeopleInputFields([...peopleInputFields, newPerson]);
  };

  const handleRemovePeopleInputField = (index) => {
    let data = [...peopleInputFields];
    data.splice(index, 1);
    setPeopleInputFields(data);
  };

  const handleFormChange = (index, event) => {
    let data = [...peopleInputFields];
    data[index][event.target.name] = event.target.value;
    setPeopleInputFields(data);
    setCarGroupInfo({
      ...carGroupInfo,
      People: data,
    })
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setCarGroupInfo({
      ...carGroupInfo,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(carGroupInfo)
    sendToDatabase(carGroupInfo)
  }

  const sendToDatabase = (obj) => {
    axios
    .post("/api/newcargroup", obj)
    .then((response) => {
      console.log(response.data)
      // setCategories(response.data)
    })
  }

  return (
    <Grid container
    spacing={0}
    xs={12}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh', paddingTop: "20px" }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Car Group 车组
          <IconButton aria-label="delete car group"
                size="small">
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          </Typography>
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
              id="outlined-basic"
              label="Car Group # 车组号码"
              variant="outlined"
              size="small"
              name="CarGroupNumber"
              value={carGroupInfo.CarGroupNumber}
              onChange={handleInputChange}
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
              人员 People
              <IconButton
                aria-label="add people"
                size="small"
                onClick={handleAddPeopleInputField}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Typography>
            {peopleInputFields.map((input, index) => {
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
          <Button variant="contained" type="submit" >Submit</Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}