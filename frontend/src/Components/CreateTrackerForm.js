import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { createTracker } from "../services";
import { useNavigate } from "react-router-dom";

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

class CreateTrackerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", trackerName: "" };
  }

  handleChange = (event) => {
    // console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    console.log(this.state);
    if (
      this.state.email.length > 1 &&
      this.state.email.length < 50 &&
      this.state.trackerName.length > 1 &&
      this.state.trackerName.length < 50
    ) {
      try {
        const tracker = await createTracker({
          email: this.state.email,
          name: this.state.trackerName,
        });
        console.log(tracker);
        const dest = "/tracker/" + tracker.private_key;
        this.props.navigate(dest);
        this.setState({});
      } catch (error) {
        console.error("Unable to Create Token : ", error);
      }
    }
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="my-2">
        <h5>Create a new Tracker</h5>
        <Form.Group className="mb-3" controlId="trackerEmail">
          <Form.Label>Your Email* </Form.Label>
          <Form.Control
            value={this.state.value}
            name="email"
            type="email"
            onChange={this.handleChange}
            placeholder="Enter your email"
          />
          <Form.Text className="text-muted text-very-small">
            This will be used to send you alerts.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="trackerName">
          <Form.Label>Tracker Name*</Form.Label>
          <Form.Control
            type="text"
            onChange={this.handleChange}
            name="trackerName"
            placeholder="Example: My Documents Tracker"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Tracker
        </Button>
      </Form>
    );
  }
}

export default withNavigation(CreateTrackerForm);
