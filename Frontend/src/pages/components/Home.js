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
import UpdateIcon from "@mui/icons-material/Update"; // Import the UpdateIcon
import Cookies from "js-cookie";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  getTodoListByUserId,
  addTodo,
  updateTodo,
  deleteTodo,
  statusUpdateItem,
} from "../../api"; // Import the updateTodo API function
import axios from "axios";
import todoBackgroundImage from "../../assets/images/todo_background_image.jpg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [listData, setListData] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editItemId, setEditItemId] = useState(null);

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

  const handleEditClick = (itemId) => {
    setEditItemId(itemId);
  };

  const handleUpdateClick = async (itemId) => {
    try {
      const updatedItem = listData.find((item) => item._id === itemId);

      let postData = {
        todo: [updatedItem],
      };

      // Make a PUT request to update the todo item
      const response = await axios.put(`${updateTodo}/${itemId}`, postData);

      if (response?.data?.success) {
        setEditItemId(null);
        getData();
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteClick = async (itemId) => {
    try {
      // Show SweetAlert for confirmation
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this todo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        // User confirmed, proceed with the deletion
        const response = await axios.delete(`${deleteTodo}/${itemId}`);

        if (response?.data?.success) {
          // Todo item deleted successfully
          getData();
          MySwal.fire("Deleted!", "Your todo has been deleted.", "success");
        } else {
          // Todo item deletion failed
          MySwal.fire("Error", "Failed to delete todo item.", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      MySwal.fire("Error", "Failed to delete todo item.", "error");
    }
  };
  const handleStatusUpdateClick = async (itemId) => {
    try {
      const updatedItem = listData?.find((item) => item._id === itemId);
      updatedItem.completed = !updatedItem.completed;
      let postData = {
        todo: [updatedItem],
      };

      const response = await axios.put(
        `${statusUpdateItem}/${itemId}`,
        postData
      );

      if (response?.data?.success) {
        getData();
      }
    } catch (error) {
      console.error("Error updating todo status:", error);
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
            backgroundImage: `url(${todoBackgroundImage})`,
            backgroundSize: "cover",
          }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Today's My Todo
            </Typography>

            <List>
              {listData !== undefined && listData !== null
                ? listData?.map((item) => (
                    <ListItem
                      key={item._id}
                      className={`${item?.completed ? "completed-item" : ""}`}
                    >
                      <div style={{ flex: 1, marginRight: "auto" }}>
                        <Typography variant="h6">
                          {editItemId === item._id ? (
                            <TextField
                              fullWidth
                              value={item?.title}
                              onChange={(e) =>
                                setListData((prevList) =>
                                  prevList.map((prevItem) =>
                                    prevItem._id === item._id
                                      ? { ...prevItem, title: e.target.value }
                                      : prevItem
                                  )
                                )
                              }
                            />
                          ) : (
                            item?.title
                          )}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {editItemId === item._id ? (
                            <TextField
                              fullWidth
                              multiline
                              rows={3}
                              value={item?.description}
                              onChange={(e) =>
                                setListData((prevList) =>
                                  prevList.map((prevItem) =>
                                    prevItem._id === item._id
                                      ? {
                                          ...prevItem,
                                          description: e.target.value,
                                        }
                                      : prevItem
                                  )
                                )
                              }
                            />
                          ) : (
                            item?.description
                          )}
                        </Typography>
                      </div>
                      <div>
                        {editItemId === item._id ? (
                          <IconButton
                            onClick={() => handleUpdateClick(item._id)}
                          >
                            <UpdateIcon style={{ color: "green" }} />
                          </IconButton>
                        ) : (
                          <>
                            <IconButton
                              onClick={() => handleEditClick(item._id)}
                            >
                              <EditIcon style={{ color: "navy" }} />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteClick(item._id)}
                            >
                              <DeleteIcon style={{ color: "maroon" }} />
                            </IconButton>
                            <IconButton
                              onClick={() => handleStatusUpdateClick(item._id)}
                            >
                              <CheckCircleIcon
                                style={{
                                  color: item?.completed ? "green" : "gray",
                                }}
                              />
                            </IconButton>
                          </>
                        )}
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
                  value={newTodo?.title}
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
                  value={newTodo?.description}
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
