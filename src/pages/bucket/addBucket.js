import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Button,
  CssBaseline,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Typography,
  withStyles
} from "@material-ui/core";
const APP_NAME = "myS3.app";

class Bucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      uuid: this.props.uuid
    };
  }
  showAddBucket = false;

  addBucket = async () => {
    let url = `http://localhost:5000/api/users/${this.props.user.uuid}/buckets`;
    let tokenToExtract = localStorage.getItem(APP_NAME);
    let token = tokenToExtract.substring(0, tokenToExtract.lastIndexOf('"'));
    let bearer = "Bearer " + token.substring(token.lastIndexOf('"') + 1);

    const response = await fetch(url, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      },
      method: "POST",
      body: JSON.stringify(this.state)
    });
    const json = await response.json();

    if (json.err) {
      alert("bucket already exists choose another name");
      this.props.history.push("/bucket");
    } else {
      alert("bucket added");
      this.props.history.push("/listBucket");
    }
  };

  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };
  showBucket = async () => {
    let url = `http://localhost:5000/api/users/${this.props.user.uuid}/buckets`;
    let tokenToExtract = localStorage.getItem(APP_NAME);
    let token = tokenToExtract.substring(0, tokenToExtract.lastIndexOf('"'));
    let bearer = "Bearer " + token.substring(token.lastIndexOf('"') + 1);
    const response = await fetch(url, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      }
    });
  };

  isDisabled = () => {
    const { name } = this.state;

    return !name;
  };

  render() {
    const { classes } = this.props;
    const { name } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            add bucket
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">name of bucket</InputLabel>

              <Input
                id="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={this.handleChange}
                autoFocus
              />
            </FormControl>

            <Button
              disabled={this.isDisabled()}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.addBucket}
            >
              add a bucket
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}
Bucket.propTypes = {
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

export default withStyles(styles)(Bucket);
