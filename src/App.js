import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import ButtonAppBar from './Views/ButtonAppBar'
import AddCarGroupButton from './Views/addCarGroupButton'
import CarGroupCard from './Views/carGroupCard'
import axios from 'axios';


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
  const [carGroups, setCarGroups] = React.useState(null)
  const [refresh, setRefresh] = React.useState(0)
  const [resetCarGroupCard, setResetCarGroupCard] = React.useState(null)
  const [selectedCarGroupCard, setSelectedCarGroupCard] = React.useState(null)

  // const forceUpdate = () => {
  //   setRefresh(val => val + 1)
  // }

  const getDatabaseInfo = async () => {
    axios
    .get("/api/cargroupsdb")
    .then(resp => {
      console.log("Received info from database: ")
      console.log(resp.data)
      setCarGroups(resp.data)
    })
  }

  const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1
  return randomNumber
}

  React.useEffect(() => {
    getDatabaseInfo();
  },[])

  React.useEffect(() => {
    getDatabaseInfo();
  },[refresh])

  const defaultCarGroup = {CarGroups: [{ 
    CarGroupNumber: "1",
    TerritoryNumber: "",
    HoursOut: "0",
    People: []
}]}

  let loadedCarGroups = false;

  // React.useEffect(() => {
  //   let newCarGroupData = getDatabaseInfo()
  //   console.log("New car group data: ")
  //   console.log(newCarGroupData)
  //   setCarGroups(newCarGroupData)
  //   console.log("Refreshing with new data...")
  //   console.log(carGroups)
  // },[refresh])

  return (
    <div>
      <ButtonAppBar carGroups={carGroups ? carGroups : defaultCarGroup} setSelectedCarGroupCard={setSelectedCarGroupCard} />
      <AddCarGroupButton setResetCarGroupCard={setResetCarGroupCard} />
      <CarGroupCard setRefresh={setRefresh} resetCarGroupCard={resetCarGroupCard} selectedCarGroupCard={selectedCarGroupCard}/>
    </div>
  );
}


export default App;
