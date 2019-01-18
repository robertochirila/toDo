import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";


export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;
    if (email !== "" && password !== "") {
      Accounts.createUser({ email, password }, err => {
        console.log("Create Account attempt!");
        console.log(err);
        if (err) {
          this.setState({
            error: "Error on creating account!"
          });
        } else {
          this.setState({
            error: "",
            email: "",
            password: ""
          });
          this.props.history.push("/home");
        }
      });
    } else {
      this.setState({
        error: "Password needs to have more than 5 characters."
      });
    }
  }

  handleChange(e) {
    if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    } else {
      this.setState({ password: e.target.value });
    }
  }
  render() {
    return (
      <div className="boxed-view">
          <div className="boxed-view__box">
            <form
              onSubmit={this.handleSubmit}
              className="boxed-view__form"
              noValidate
            >
              <input
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                name="email"
                className="boxed-view__input"
              />
              <input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                name="password"
                className="boxed-view__input"
              />
              <button type="submit" className="button__base login">
                sign up
              </button>
              {this.state.error ? <p>{this.state.error}</p> : <span />}
            </form>
          </div>
      </div>
    );
  }
}
