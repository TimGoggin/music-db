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

export default class Song extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
    <li style={{justifyContent: "flex-start"}}>
      <span>{this.props.song} by {this.props.artist} is rated {this.props.average} ({this.props.count}) </span>
      <button style={{justifyContent: "flex-end"}} onClick={() => this.props.onChange(this.props.id)}>
                  Edit
      </button>
    </li>)
  }
}