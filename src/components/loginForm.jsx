import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();

  componentDidMount() {
    this.username.current.focus();
  }

  handleSubmit = e => {
    e.preventDefault();
    const username = this.username.current.value;
    console.log("submited");
  };
  render() {
    return (
      <div>
        <div className="card container w-25 mt-5 p-5">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                ref={this.username}
                id="username"
                type="email"
                className="form-control"
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
