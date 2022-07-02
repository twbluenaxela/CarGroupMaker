import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import ButtonAppBar from './Views/ButtonAppBar'
import AddCarGroupButton from './Views/addCarGroupButton'
import CarGroupCard from './Views/carGroupCard'


function App() {
  return (
    <div>
      <ButtonAppBar />
      <AddCarGroupButton />
      <CarGroupCard />
      
    </div>
  );
}


export default App;
