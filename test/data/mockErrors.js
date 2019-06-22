const badGatewayError = {
  err: {
    type: "BadGatewayError",
    message: "502 Bad Gateway"
  }
}

const internalServerError = {
  err: {
    type: "InternalServerError",
    message: "something bad happened on the server"
  }
}

const notAuthorizedError = {
  err: {
    type: "NotAuthorizedError",
    message: "you are not authorized to read"
  }
}

const alreadyExistsError = {
  err: {
    type: "ValidationError",
    message: "user already exists"
  }
}

const notFoundError = {
  err: {
    type: "NotFound",
    message: "user not found"
  }
}

export {
  badGatewayError,
  internalServerError,
  notAuthorizedError,
  alreadyExistsError,
  notFoundError
}
