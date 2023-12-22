const Todo = require("../models/todo");
const { ObjectId } = require("mongodb");
const User = require("../models/users");
const { handleResponse, handleError } = require("../utils/requestHandler");
exports.AddItem = async (req, res) => {
  try {
    const body = req.body;
    const checkData = await Todo.findOne({ userId: body.userId });
    if (checkData) {
      const todoItems = body.todo || [];
      const updateData = await Todo.findOneAndUpdate(
        { userId: body.userId },
        {
          $push: {
            todo: todoItems?.map((item) => ({
              title: item.title,
              description: item.description,
              completed: item.completed,
              createdAt: item.createdAt || Date.now(),
              updatedAt: Date.now(),
              isActive: item.isActive || true,
              isDeleted: item.isDeleted || false,
            })),
          },
        },
        { new: true, upsert: true }
      );
      return handleResponse({
        res,
        data: updateData,
        message: "Item Added to List",
      });
    }
    const data = await Todo.create(body);
    return handleResponse({
      res,
      data: data,
      message: "Item Added to List",
    });
  } catch (error) {
    return handleError({ res, error });
  }
};

// get All todo list by userId
exports.getTodoListByUserId = async (req, res) => {
  try {
    const data = await Todo.findOne({ userId: req.params.id });

    if (!data) {
      return handleResponse({
        res,
        data: data,
        message: "No Todo List found for this Id",
      });
    }

    return handleResponse({
      res,
      data: data,
      message: "Todo list",
    });
  } catch (error) {
    return handleError({ res, error });
  }
};

// get todo list item by itemId
exports.getTodoListItemByItemId = async (req, res) => {
  try {
    const data = await Todo.findOne(
      { "todo._id": req.params.id },
      { "todo.$": 1 } // Use $elemMatch projection to retrieve only the matched todo item
    );

    if (!data) {
      return handleResponse({
        res,
        data: data,
        message: "No Todo List Item found with this ID",
      });
    }

    return handleResponse({
      res,
      data: data,
      message: "Todo list Item Data",
    });
  } catch (error) {
    return handleError({ res, error });
  }
};

// update todo list item by itemId
exports.updateTodoListItemByItemId = async (req, res) => {
  try {
    const body = req.body;
    const todoItemId = req.params.id;

    const todoItems = body.todo || [];
    const updatedTodoItem = todoItems.map((item) => ({
      title: item.title,
      description: item.description,
      completed: item.completed,
      createdAt: item.createdAt || Date.now(),
      updatedAt: Date.now(),
      isActive: item.isActive || true,
      isDeleted: item.isDeleted || false,
    }))[0]; // Assuming you want to update only the first item

    const updateData = await Todo.findOneAndUpdate(
      { "todo._id": todoItemId },
      {
        $set: {
          "todo.$.title": updatedTodoItem.title,
          "todo.$.description": updatedTodoItem.description,
          "todo.$.completed": updatedTodoItem.completed,
          "todo.$.createdAt": updatedTodoItem.createdAt,
          "todo.$.updatedAt": updatedTodoItem.updatedAt,
          "todo.$.isActive": updatedTodoItem.isActive,
          "todo.$.isDeleted": updatedTodoItem.isDeleted,
        },
      },
      { new: true }
    );

    if (!updateData) {
      return handleResponse({
        res,
        data: null,
        message: "No Todo List Item found with this ID",
      });
    }

    return handleResponse({
      res,
      data: updateData,
      message: "Todo list Item Data Updated",
    });
  } catch (error) {
    console.log("error", error);
    return handleError({ res, error });
  }
};

// delete Item from list by itemId
exports.deleteTodoListItemByItemId = async (req, res) => {
  try {
    const todoItemId = req.params.id;

    const result = await Todo.updateOne(
      { "todo._id": todoItemId },
      { $pull: { todo: { _id: todoItemId } } }
    );
    if (!result) {
      return handleResponse({
        res,
        data: null,
        message: "No Item found with this ID",
      });
    }

    return handleResponse({
      res,
      data: result,
      message: "Item from Todo List Removed",
    });
  } catch (error) {
    console.log("error", error);
    return handleError({ res, error });
  }
};
