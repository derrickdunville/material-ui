import React from 'react'

// static router renames the context to staticContext
const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true
  return <h1>Ooop, 404!</h1>
}

export default {
  component: NotFoundPage
}
