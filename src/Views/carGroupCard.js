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

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function CarGroupCard() {
  const [people, setPeople] = React.useState([]);
  const [peopleInputFields, setPeopleInputFields] = React.useState([
    { name: "" },
  ]);



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
  };

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
            <IconButton aria-label="save car group"
                size="small"
                position="end"
                >
            <SaveIcon fontSize="inherit" />
          </IconButton  >
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
          >
            <TextField
              id="outlined-basic"
              label="Car Group # 车组号码"
              variant="outlined"
              size="small"
            />
            <br />
            <TextField
              id="standard-basic"
              label="Territory Number 地区号"
              variant="standard"
              size="small"
            />
            <br />
            <TextField
              id="standard-basic"
              label="预计传道时数 Hours Out"
              variant="standard"
              size="small"
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
                    id="person"
                    label="Name 姓名"
                    variant="standard"
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
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
