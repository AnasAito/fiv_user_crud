import React from "react";

import { get } from "lodash";
import { useQuery } from "@apollo/client";
import Queries from "../api/queries/index";

export default function Index() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email_, setEmail_] = React.useState("no email");
  const [password_, setPassword_] = React.useState("no password");
  const [message, setMessage] = React.useState("");
  const handleClick = () => {
    setEmail_(email);
    setPassword_(password);
  };

  const onChangeEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const { loading: loading, data: user_cred } = useQuery(
    Queries["user.login"],
    {
      variables: { email: email_ },
      skip: email_ == "",
    }
  );
  const user_cred_password = get(user_cred, "user.0.userPassword", "no pass");
  const user_cred_email = get(user_cred, "user.0.email", "no email");

  React.useEffect(() => {
    // init message
    console.log(user_cred_email, user_cred_password);
    if (user_cred_password == password_ && user_cred_email == email_) {
      setMessage("Login Successful");
    } else {
      if (email_ == "no email") {
        setMessage("");
      } else {
        setMessage("Login Failed");
      }
    }
  }, [user_cred_email, user_cred_password, password_, email_]);
  return (
    <div className="bg-green-50  p-5 ">
      <h1>User Auth (login by email and password)</h1>
      <div class="flex flex-row justify-between">
        <input
          type="text"
          name="email"
          placeholder="tap email"
          onChange={onChangeEmailHandler}
          value={email}
        />
        <input
          type="text"
          name="password"
          placeholder="tap password"
          onChange={onChangePasswordHandler}
          value={password}
        />
        <button
          class="bg-green-100 rounded-md px-4 py-2 text-green-700"
          onClick={() => {
            handleClick();
          }}
        >
          search
        </button>
      </div>
      <div>{message}</div>
    </div>
  );
}
