import React from "react"
import { Redirect, Route } from "react-router-dom"
import { useAuth } from "./context/auth"

const AuthenticatedRouter = ({ component: Component, path }) => {
  const { userLoggedIn } = useAuth()
  return (
    <Route
      path={path}
      render={props => userLoggedIn ? (<Component {...props} />) : (<Redirect from={path} to="/login"/>)
      }
    />
  )
}

export default AuthenticatedRouter
