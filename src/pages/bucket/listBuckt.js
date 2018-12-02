import React, { Component } from "react";
import OneBucket from "./oneBucket";
import PropTypes from "prop-types";

import { withStyles, Button } from "@material-ui/core";
const APP_NAME = "myS3.app";

// const Dashboard = ({ nickname }) => <section>Hello {nickname}</section>;

class ListBucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buckets: [],
      showField: true,
      name: "",
      uuid: this.props.user.uuid
    };
  }

  async componentDidMount() {
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
    const json = await response.json();
    this.setState({
      buckets: json.data.buckets
    });
  }

  handleRemove = async (i, id) => {
    let url = `http://localhost:5000/api/users/${
      this.props.user.uuid
    }/buckets/${id}`;
    let tokenToExtract = localStorage.getItem(APP_NAME);
    let token = tokenToExtract.substring(0, tokenToExtract.lastIndexOf('"'));
    let bearer = "Bearer " + token.substring(token.lastIndexOf('"') + 1);
    let newBucketList = this.state.buckets;
    let test = newBucketList.splice(i, 1);
    const response = await fetch(url, {
      method: "DELETE",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      }
    });
    this.setState({ buckets: newBucketList });

    alert(`bucket ${id} was deleted`);
  };
  redirect = () => {
    this.props.history.push("/bucket");
  };
  handleEdit = async (props, name, i) => {
    let obj = {
      name: name
    };
    let url = `http://localhost:5000/api/users/${
      this.props.user.uuid
    }/buckets/${props.id}`;
    let tokenToExtract = localStorage.getItem(APP_NAME);
    let token = tokenToExtract.substring(0, tokenToExtract.lastIndexOf('"'));
    let bearer = "Bearer " + token.substring(token.lastIndexOf('"') + 1);
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(obj),
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer
      }
    });

    let tmpBucket = this.state.buckets;
    let index = this.state.buckets.findIndex(x => x.id === props.id);
    tmpBucket[index].name = name;
    this.setState({
      buckets: tmpBucket
    });

    alert("bucket edited successfully");
    this.props.history.push("/listBucket");
    this.setState({
      name: ""
    });
  };
  handleChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { buckets } = this.state;
    if (buckets.length === 0) {
      return (
        <>
          <br />

          <h1 style={{ textAlign: "center" }}> You have No Bucket</h1>
          <br />
          <Button
            size="small"
            onClick={this.redirect}
            style={{
              width: "-webkit-fill-available",
              backgroundColor: "green",
              marginTop: 40
            }}
          >
            Return to add bucket
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            size="small"
            onClick={this.redirect}
            style={{
              width: "-webkit-fill-available",
              backgroundColor: "green",
              marginTop: 40
            }}
          >
            Return to add bucket
          </Button>
          <br />

          <h1 style={{ textAlign: "center" }}> LIST OF BUCKETS</h1>
          <br />
          {buckets.map((item, i) => (
            <OneBucket
              {...item}
              action={() => this.handleRemove(i, item.id)}
              edit={this.handleEdit}
            />
          ))}
        </>
      );
    }
  }
}

ListBucket.propTypes = {
  classes: PropTypes.object.isRequired
};
const styles = {
  card: {
    marginTop: 20,
    minWidth: 275,
    marginLeft: "50%",
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

export default withStyles(styles)(ListBucket);
