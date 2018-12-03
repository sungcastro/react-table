import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    errors: {}
  };

  validate = () => {
    const errors = {};

    const { username, password } = this.state.account;

    if (username.trim() === "") errors.username = "Username is required";

    if (password.trim() === "") errors.password = "Password is required";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors });
    if (errors) return;

    //Call to the server
    console.log("submited");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { username, password } = this.state.account;

    return (
      <div>
        <div className="card container w-25 mt-5 p-5">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="username"
              type="email"
              label="Username"
              value={username}
              onChange={this.handleChange}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              value={password}
              onChange={this.handleChange}
            />
            <button className="btn btn-outline-primary btn-block mt-4">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
