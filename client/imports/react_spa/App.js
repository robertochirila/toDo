import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  onLogout() {
    Accounts.logout();
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <p>Home Component</p>
        <button onClick={this.onLogout} className="button__base logout">
          logout
        </button>
      </div>
    );
  }
}
