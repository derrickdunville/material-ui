import React from 'react'

// static router renames the context to staticContext
const Forbidden = ({ staticContext = {} }) => {
  staticContext.notFound = true
  return <h1>Go back the way you came</h1>
}

export default Forbidden
