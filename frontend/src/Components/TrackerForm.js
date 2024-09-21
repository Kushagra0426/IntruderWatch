import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

class TrackerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { trackerId: "" };
  }

  handleChange = (event) => {
    // console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    if (this.state.trackerId.length > 0) {
      this.props.navigate("/tracker/" + this.state.trackerId);
    }

    event.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="my-2">
        <Form.Group className="mb-3" controlId="trackerName">
          <h5>View Your Tracker</h5>
          <Form.Label>Your Secret Tracker Id*</Form.Label>
          <Form.Control
            type="text"
            onChange={this.handleChange}
            name="trackerId"
            placeholder="Example: 6t1NQk2Ox3"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          View Tracker
        </Button>
      </Form>
    );
  }
}

export default withNavigation(TrackerForm);
