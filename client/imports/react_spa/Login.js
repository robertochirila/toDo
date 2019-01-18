import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
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
    this.setState({
      error: ""
    });

    Meteor.loginWithPassword({ email }, password, err => {
      console.log("Login attempt!");
      if (err) {
        console.log("error on login");
        this.setState({ error: "Login Error" });
      } else {
        this.setState({ error: "" });
        this.props.history.push("/home");
        console.log("Logged in");
      }
    });
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
              login
            </button>
            <Link to="/signup" className="button__base link">
              sign up
            </Link>
            {this.state.error ? <p>{this.state.error}</p> : <span />}
          </form>
        </div>
      </div>
    );
  }
}
