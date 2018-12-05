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
    this.setState({ errors: errors || {} });
    if (errors) return;

    //Call to the server
    console.log("submited");
  };

  validateProperty = input => {
    if (input.name === "username") {
      if (input.value.trim() === "") return "Username is required.";
      // ..Other rules
    }
    if (input.name === "password") {
      if (input.value.trim() === "") return "Password is required.";
      // ..Otherrules
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <div className="card container w-25 mt-5 p-5">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="username"
              type="text"
              label="Username"
              value={account.username}
              error={errors.username}
              onChange={this.handleChange}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              value={account.password}
              error={errors.password}
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
