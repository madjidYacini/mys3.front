import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CssBaseline,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";

class Home extends Component {
  redirect = () => {
    this.props.history.push("/signIn");
  };
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            °Hello in MYS3.
            <br />
            °Please click button below to connect
          </Typography>
          <form className={classes.form}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.redirect}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  link: {
    color: "#3273dc",
    cursor: "pointer",
    textDecoration: "none",
    marginTop: 20
  }
});

export default withStyles(styles)(Home);
