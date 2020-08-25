import React from "react"
import "../App.css"
import {useAuth} from "../context/auth"

const WelcomeCaption = (props) => {
  const {setLogin} = useAuth()
  return(
    <div className="sidenav">
      <div className="login-main-text">
        <h2>Welcome,<br/>{props.user.name.toUpperCase()}</h2>
        <p onClick={e =>setLogin('')}>Logout</p>
      </div>
    </div>
  );
}

export default WelcomeCaption