import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  IconButton,
  Button,
} from "@mui/material";
import { Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./sidebar/sidebar"; // Adjust the path based on your project structure
import Cookies from "js-cookie";
import { getTodoListByUserId, addTodo } from "../../api";
import axios from "axios";
import todoBackgroundImage from "../../assets/images/todo_background_image.jpg";

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [listData, setListData] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  const tokenData = Cookies.get("tokenData");
  const tokenDataObject = JSON.parse(tokenData);
  const userId = tokenDataObject?.id;

  const getData = async () => {
    try {
      const response = await axios.get(`${getTodoListByUserId}/${userId}`);
      if (response?.data?.success) {
        setListData(response?.data?.data?.todo || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [userId]);

  const addTodoHandler = async () => {
    try {
      if (newTodo.title.trim() === "") {
        return;
      }

      const response = await axios.post(addTodo, {
        userId: userId,
        todo: [newTodo],
      });

      if (response?.data?.success) {
        setNewTodo({ title: "", description: "" });
        getData();
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Card
          style={{
            maxWidth: 500,
            margin: "auto",
            backgroundImage: `url(${todoBackgroundImage})`, // Replace with your image path
            backgroundSize: "cover",
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Welcome to Todo
            </Typography>

            <List>
              {listData !== undefined && listData !== null
                ? listData?.map((item) => (
                    <ListItem key={item._id}>
                      <div style={{ flex: 1, marginRight: "auto" }}>
                        <Typography variant="h6">{item?.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {item?.description}
                        </Typography>
                      </div>
                      <div>
                        <IconButton onClick={() => handleEditClick(item?._id)}>
                          <EditIcon style={{ color: "navy" }} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(item?._id)}
                        >
                          <DeleteIcon style={{ color: "maroon" }} />
                        </IconButton>
                      </div>
                    </ListItem>
                  ))
                : "No Todo Item in List"}
            </List>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} xl={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: 10 }}
                  value={newTodo.title}
                  onChange={(e) =>
                    setNewTodo((prevTodo) => ({
                      ...prevTodo,
                      title: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} xl={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  style={{ marginBottom: 10 }}
                  value={newTodo.description}
                  onChange={(e) =>
                    setNewTodo((prevTodo) => ({
                      ...prevTodo,
                      description: e.target.value,
                    }))
                  }
                />
              </Grid>
            </Grid>
            <Button variant="contained" onClick={addTodoHandler}>
              Add
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
