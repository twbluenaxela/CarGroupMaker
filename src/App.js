import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import ButtonAppBar from './Views/ButtonAppBar'
import AddCarGroupButton from './Views/addCarGroupButton'
import CarGroupCard from './Views/carGroupCard'
import axios from 'axios';


const getDatabaseInfo = () => {
  axios
  .get("/api/cargroupsdb")
  .then(resp => {
    console.log("Received stuff: ")
    console.log(resp.data)
    return(resp.data)
  })
}

function App() {

  /*
  TODO: make it so that it calls a function that updates the cargroups
  based on the info in the database. 
  so make a get call using axios, which takes the current car groups
  stored there. if there aren't any car groups currently made yet,
  then make one by default thats just empty.
  this car groups state controls the info that will
  in turn show how many car groups will show up in the
  side menu bar. you dont need to add an id, just have
  an array of car groups and go by index. although an
  id might be helpful too. 
  */
  const [carGroups, setCarGroups] = React.useState(() => getDatabaseInfo())

  return (
    <div>
      <ButtonAppBar carGroups={carGroups} />
      <AddCarGroupButton />
      <CarGroupCard />
    </div>
  );
}


export default App;
