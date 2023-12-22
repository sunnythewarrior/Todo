// Sidebar.js
import React from "react";
import { Drawer, List, ListItem, ListItemText, Button } from "@mui/material";

const Sidebar = ({ isOpen, onClose, onEditClick, onViewProfileClick }) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <List>
        <ListItem button onClick={onEditClick}>
          <ListItemText primary="Edit" />
        </ListItem>
        <ListItem button onClick={onViewProfileClick}>
          <ListItemText primary="View User Profile" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
