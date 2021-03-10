import React from 'react'

import "./Login.css"
import LoginFormContainer from "../../Shared/Controls/Containers/LoginFormContainer"

function Login() {
  return (
    <div className=" col-md-4 login-form">
      <h3>Please Login </h3>
      <hr />
      <LoginFormContainer></LoginFormContainer>
      <hr />
    </div>
  )
}

export default Login;