// const logger = require('./logger');

module.exports = {
  handleResponse: ({
    res,
    statusCode = 200,
    success = true,
    message = "Success",
    data = {},
    result = 1,
  }) => {
    res.status(statusCode).send({ success, message, data, result });
  },

  handleFileUploadResponse: ({
    res,
    statusCode = 200,
    success = true,
    message = "Success",
    data = {},
    responseData = {},
    result = 1,
  }) => {
    res
      .status(statusCode)
      .send({ success, message, data, responseData, result });
  },

  handleError: ({
    res,
    statusCode = 400,
    success = false,
    error = "error",
    data = {},
    result = 0,
  }) => {
    res.status(statusCode).send({
      success,
      message: error instanceof Error ? error.message : error.msg || error,
      data,
      result,
    });
  },

  handleHeaderResponse: ({
    res,
    headerName,
    headerData,
    statusCode = 200,
    data = {},
  }) => {
    res.setHeader("Access-Control-Expose-Headers", headerName);
    res.header(headerName, headerData).status(statusCode).send(data);
  },

  unAuthorized: (res) => {
    res.status(401).send({
      message: "Unauthorized! Login first to access this route!",
    });
  },
  notAllowed: (res) => {
    res.status(403).send({
      message: "You are not allowed for this resouce",
    });
  },
};
