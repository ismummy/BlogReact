import React from "react"
import { Redirect } from "react-router-dom";
import "../App.css"
import { useAuth } from "../context/auth"
import Services from "../network/Services"

const LoginForm = () => {
  const { setLogin, userLoggedIn } = useAuth()
  const [isLoggedIn, setLoggedIn] = React.useState(!!userLoggedIn)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const emailHandler = e => setEmail(e.target.value)
  const passwordHandler = e => setPassword(e.target.value)

  const login = e => {
    e.preventDefault()

    Services.post("/user/login", { email, password })
      .then(res => {
        if (res.data.error === false) {
          console.log(res.data)
          setLoggedIn(true)
          setLogin(res.data.data)
          window.location.href = "/post"
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const register = e => {
    e.preventDefault()

    Services.post("/user/register", { email, password })
      .then(res => {
        if (res.data.error === false) {
          console.log(res.data)
          setLoggedIn(true)
          setLogin(res.data.data)
          window.location.href = "/post"
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  if (isLoggedIn) {
    return <Redirect to="/post" />;
  }
  return (
    <div className="main">
      <div className="col-md-6 col-sm-12">
        <div className="login-form">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>User Name</label>
              <input type="email" className="form-control" placeholder="Email Address" required value={email}
                     onChange={emailHandler}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Password" required value={password}
                     onChange={passwordHandler}/>
            </div>
            <button type="submit" className="btn btn-black" onClick={login}>Login</button>
            <button type="submit" className="btn btn-secondary" onClick={register}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm