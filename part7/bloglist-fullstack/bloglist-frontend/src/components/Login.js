import { useState } from "react";
import { login } from "../reducers/loginReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const Login = () => {
  const username = useField("text");
  const password = useField("password");

  const dispatch = useDispatch();

  const saveUser = (event) => {
    event.preventDefault();
    try {
      dispatch(login(username.value, password.value));
    } catch (error) {
      console.log("error", error.response);
      if (error.response.status === 401) {
        const notif = {
          message: "Wrong username or password",
          error: true,
        };
        dispatch(setNotification(notif));
      } else {
        const notif = {
          message: error.message,
          error: true,
        };
        dispatch(setNotification(notif));
      }
    }
  };

  return (
    <form id="login-form" onSubmit={saveUser}>
      <div>
        username: <input id="username" {...username} />
      </div>
      <div>
        password: <input id="password" {...password} />
      </div>
      <div>
        <button id="login-button" type="submit">
          login
        </button>
      </div>
    </form>
  );
};

export default Login;
