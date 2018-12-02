import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import Home from "./pages/Home";
import SignUp from "./pages/auth/auth";
import SignIn from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import Bucket from "./pages/bucket/addBucket";
import ListBucket from "./pages/bucket/listBuckt";
import { Button, withStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import MenuIcon from "@material-ui/icons/Menu";

const APP_NAME = "myS3.app";

class AppRouter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      user: null
    };

    this.checkUser();
  }

  checkUser = () => {
    const meta = JSON.parse(localStorage.getItem(APP_NAME));
    if (meta) {
      const decoded = jwt.decode(meta.token);
      // JSON = CHECK WITH SERVER IF NO EXPIRATION
      // this.handleUser(json.data.user, json.data.meta);
    }
  };

  handleUser = (user, meta) => {
    localStorage.setItem(APP_NAME, JSON.stringify(meta));

    this.setState({
      isConnected: true,
      user
    });
  };

  logout = () => {
    localStorage.removeItem(APP_NAME);
    this.setState({
      isConnected: false,
      user: null
    });

    // REDIRECT
  };

  render() {
    const { user, isConnected } = this.state;
    const { classes } = this.props;

    return (
      <Router>
        <div className={classes.styles}>
          <AppBar position="static" className={classes.toolbar}>
            <Toolbar>
              <Button color="inherit">
                {" "}
                <Link to="/">Home</Link>
              </Button>{" "}
              {!isConnected && (
                <Button color="inherit">
                  <Link to="/signIn">SignIn</Link>
                </Button>
              )}
              {!isConnected && (
                <Button color="inherit">
                  {" "}
                  <Link to="/signUp">SignUp</Link>
                </Button>
              )}
              {isConnected && (
                <Button color="inherit">
                  {" "}
                  <Link to="/dashboard">dashboard</Link>
                </Button>
              )}
              {isConnected && (
                <Button color="inherit">
                  {" "}
                  <a href="/" onClick={this.logout}>
                    {" "}
                    Logout
                  </a>
                </Button>
              )}
            </Toolbar>
          </AppBar>
          <Route exact path="/" component={Home} />
          <Route
            path="/signIn"
            render={props => {
              return <SignIn {...props} handleUser={this.handleUser} />;
            }}
          />
          <Route
            path="/signUp"
            render={props => {
              return <SignUp {...props} handleUser={this.handleUser} />;
            }}
          />
          {isConnected && (
            <Route
              path="/dashboard"
              render={props => {
                return <Dashboard {...props} nickname={user.nickname} />;
              }}
            />
          )}
          {isConnected && (
            <Route
              path="/bucket"
              render={props => {
                return <Bucket {...props} user={user} />;
              }}
            />
          )}
          {isConnected && (
            <Route
              path="/listBucket"
              render={props => {
                return <ListBucket {...props} user={user} />;
              }}
            />
          )}
        </div>
      </Router>
    );
  }
}
const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbar: {
    backgroundColor: "cyan"
  }
};

export default withStyles(styles)(AppRouter);
