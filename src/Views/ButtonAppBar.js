import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';


export default function ButtonAppBar({carGroups, setSelectedCarGroupCard}) {
  const [drawerState, setDrawerState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  

  console.log("Cargroups is in the buttonappbar: ")
  console.log(carGroups.CarGroups)

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const handleCarGroupItemClick = (event) => {
    event.preventDefault()
    const indexOfCarGroupListItem = event.currentTarget.value
    setSelectedCarGroupCard(carGroups.CarGroups[indexOfCarGroupListItem])
  }


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      {carGroups.CarGroups.map((item, index) => (
          <ListItem key={item.CarGroupNumber} disablePadding onClick={handleCarGroupItemClick} value={index} >
            <ListItemButton>
              <ListItemIcon>
                <DirectionsCarFilledIcon />
              </ListItemIcon>
              <ListItemText primary={"Car Group 车组 " + item.CarGroupNumber} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Car Group App 车组管理小助手
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor={"left"}
          open={drawerState["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </Box>
  );
}
