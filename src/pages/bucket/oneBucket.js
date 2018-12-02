import React, { Component } from "react";

import PropTypes from "prop-types";

import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Card,
  CardActions,
  CardContent,
  Typography,
  withStyles
} from "@material-ui/core";

class OneBucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableForm: false,
      name: ""
    };
  }
  handleRename = () => {
    this.setState({
      disableForm: !this.state.disableForm
    });
  };
  isDisabled = () => {
    const { name } = this.state;
    return !name;
  };
  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { classes } = this.props;
    const { disableForm, name } = this.state;
    return (
      <div style={classes.styles}>
        <br />

        <Card>
          <CardContent>
            <Typography variant="h5" component="h1" />
            ID: {this.props.id}
            <Typography component="h3">
              Name : {this.props.name}
              <br />
            </Typography>
            {disableForm && (
              <form>
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
                  fullWidth
                  variant="contained"
                  onClick={() =>
                    this.props.edit(this.props, this.state.name, this.props.i)
                  }
                  color="primary"
                >
                  edit
                </Button>
              </form>
            )}
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              size="small"
              onClick={() => this.props.action(this.props.id, this.props.i)}
              style={{
                width: "-webkit-fill-available",
                backgroundColor: "red"
              }}
            >
              DELETE
            </Button>
          </CardActions>
          <CardActions>
            {disableForm && (
              <Button
                size="small"
                onClick={this.handleRename}
                style={{
                  width: "-webkit-fill-available",
                  backgroundColor: "cyan"
                }}
              >
                Cancel Edit
              </Button>
            )}
            {!disableForm && (
              <Button
                size="small"
                onClick={this.handleRename}
                style={{
                  width: "-webkit-fill-available",
                  backgroundColor: "cyan"
                }}
              >
                Edit
              </Button>
            )}
          </CardActions>
        </Card>
      </div>
    );
  }
}
OneBucket.propTypes = {
  classes: PropTypes.object.isRequired
};
const styles = {
  card: {
    backgroundColor: "gray",
    marginTop: 20,
    minWidth: 275,
    marginLeft: 100,
    marginRight: 100,
    textAlign: "center"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};
export default withStyles(styles)(OneBucket);
