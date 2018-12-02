import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("submited");
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account.username = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    const { username } = this.state.account;

    return (
      <div>
        <div className="card container w-25 mt-5 p-5">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                autoFocus
                id="username"
                type="email"
                className="form-control"
                value={username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" className="form-control" />
            </div>
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
