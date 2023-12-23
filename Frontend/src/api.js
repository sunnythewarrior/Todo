const base_url = "http://localhost:8080/api/";

export const signin = base_url + "users/signin";

export const signup = base_url + "users/signup";

export const forgotPassword = base_url + "users/forgotpassword";

export const verifyUser = base_url + "users/verifyToken";

export const getTodoListByUserId = base_url + "todo/getTodoListByUserId";

export const addTodo = base_url + "todo/addItem";

export const updateTodo = base_url + "todo/updateTodoListItemByItemId";

export const deleteTodo = base_url + "todo/deleteItem";

export const statusUpdateItem = base_url + "todo/statusUpdateItem";
