import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from "@mui/icons-material/Delete";


const actions = [
  { icon: <AddIcon />, name: 'New Car Group' },
  { icon: <DeleteIcon />, name: 'Delete' },
];

const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
};

export default function AddCarGroupButton() {
    return (
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab sx={fabStyle} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
    );
}