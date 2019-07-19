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

const notAuthorizedError = (documentName) => {
  return {
    err: {
      type: "NotAuthorizedError",
      message: `you are not authorized to read ${documentName}'s`
    }
  }
}

const alreadyExistsError = (documentName) => {
  return {
    err: {
      type: "ValidationError",
      message: `${documentName} already exists`
    }
  }
}

const notFoundError = (documentName) => {
  return {
    err: {
      type: "NotFound",
      message: `${documentName} not found`
    }
  }
}

export {
  badGatewayError,
  internalServerError,
  notAuthorizedError,
  alreadyExistsError,
  notFoundError
}
