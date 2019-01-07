import React from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    //Call to the server
    console.log("submited");
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div>
        <div className="card container w-25 mt-5 p-5">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="username"
              type="text"
              label="Username"
              value={data.username}
              error={errors.username}
              onChange={this.handleChange}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              value={data.password}
              error={errors.password}
              onChange={this.handleChange}
            />
            <button
              disabled={this.validate()}
              className="btn btn-primary btn-block mt-4"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
