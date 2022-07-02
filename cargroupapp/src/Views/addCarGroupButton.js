import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

export default function AddCarGroupButton() {
    return (
      <div>
        <Fab color="primary" aria-label="add" sx={fabStyle} >
          <AddIcon />
        </Fab>
      </div>
    );
}