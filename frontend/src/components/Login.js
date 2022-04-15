import React from "react";
// We would like to use a modal (small window) to show details of a task.
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import axios from "axios"

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  edit(u, p, b) {
    let fun = () => this.props.onChange(u, p, b)
    fun()
    this.setState({username: "", password: ""})
  }

  handleChange = (event) => {
    let {name, value} = event.target
    this.setState({
        [name]: value
    });
  }

  render() {
    if(this.props.username == "") {
      return(
        <div>
            <Form>
              <FormGroup>
                <Label for="username">Username </Label>
                <Input
                  type="text"
                  name="username"
                  value={this.state.username}
                  // "this" refers to the current event. If there is a change,
                  // it will be passed to the handleChange function above.
                  onChange={this.handleChange}
                  placeholder="Username"
                />
                <br></br>
                <Label for="password"> Password </Label>
                <Input
                  type="text"
                  name="password"
                  value={this.state.password}
                  // "this" refers to the current event. If there is a change,
                  // it will be passed to the handleChange function above.
                  onChange={this.handleChange}
                  placeholder="Password"
                />
              </FormGroup>
            </Form>
            <Button onClick={() => this.edit(this.state.username, this.state.password, false)} style={{marginRight: "0.5vw"}}>
              Login
            </Button>
            <Button onClick={() => this.edit(this.state.username, this.state.password, true)}>
              Sign Up
            </Button>
            <div style={{color: "red"}} key={this.props.supText}>{this.props.supText} </div>
        </div>
      )
    }
    else {
      return (
        <div>
          Welcome, {this.props.username}
          <Button onClick={() => this.edit("", "", false)} style={{marginLeft: "0.5vw"}}>
              Logout
          </Button>
        </div>
      )
    }
    }
}