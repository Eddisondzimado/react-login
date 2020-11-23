import React, { useContext, useState } from "react";
import { MyContext } from "../contexts/MyContext";
import "./login.css";

function Login() {
  const { toggleNav, loginUser, isLoggedIn } = useContext(MyContext);

  const initialState = {
    userInfo: {
      email: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };

  const [state, setState] = useState(initialState);

  // On change input value (email & password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  // On Submit Login From
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await loginUser(state.userInfo);
    if (data.success && data.token) {
      setState({
        ...initialState,
      });
      localStorage.setItem("loginToken", data.token);
      await isLoggedIn();
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  // Show Message on Error or Success
  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  return (
    <div
      className="_loginRegister"
      style={{
        textAlign: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <h1>Login</h1>
      <form onSubmit={submitForm} noValidate>
        <div className="form-control">
          <label>Email: </label>
          <input
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            value={state.userInfo.email}
            onChange={onChangeValue}
          />
        </div>
        <br />
        <div className="form-control">
          <label>Password: </label>
          <input
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            value={state.userInfo.password}
            onChange={onChangeValue}
          />
        </div>
        {errorMsg}
        {successMsg}
        <div className="form-control">
          <button type="submit">Login</button>
        </div>
      </form>
      <br />
      <br />
      <div className="navBtn">
        <p>
          Click to &nbsp;
          <a href="#" onClick={toggleNav}>
            Register
          </a>
          &nbsp; if NOT registered.
        </p>
      </div>
    </div>
  );
}

export default Login;
