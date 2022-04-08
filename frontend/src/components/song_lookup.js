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


export default class song_lookup extends React.Component {
  // The constructor function will be called when the component gets initialized.
  // It is also the place where you initialize the component's properties,
  // aka props (that is, function arguments in React-speak).
  constructor(props) {
    // `super()` allows us to inherit from the parent component's constructor.
    // That will allow our component to access all built-in React functions, etc.
    super(props);
    // React components have a built-in `state` object. The `state` object is where
    // you store property values that belong to the component. When the state object
    // changes, the component re-renders.
    // The state object is initialized in the constructor.
    // It can contain as many properties as you like.
    // Here we define one property called activeItem.
    // 'this' refers to the currently instantiated CustomModal.
    this.state = {
      songList : [],
    };
  }

  // Whenver we enter changes into our form, e.g., for the title of our task,
  // we want the change to be immedi/ately detected. This is what happens when
  // the handleChange function is called below with onChange={this.handleChange}.
  // handleChange takes an event argument, i.e., a change in title, descripton,
  // or checkbox.
  handleChange = (event) => {
    // An event has a target, and event.target gives us the event's DOM element, e.g., see further below
    // <input name="description" placeholder="Enter Todo description" type="text" class="form-control" value="My Task">.
    // To refer to the description we assign the variable name = "description" and value = "My Task".
    let {name} = event.target;
    if (event.target.type === "text") {
      name = event.target;
    }
  
//define res   

// use axios to retrieve songs
axios
    .get("http://localhost:8000/api/ratings")
    .then((res) => this.setState({ songList: res.data }))
    .catch((err) => console.log(err));

  };
  // The `render()` method is the only required method in a class component.
  // When called, it will render the page. You do not have to specifically
  // call render() in your component. Rather, the stub code with the
  // ReactDOM.render(...) in your index.js will do that for you.
  // The following will render the modal for adding or editing a task.
  render() {                                                                //first, use formgroup to handle change, second output values from state (this.state.songlist)
    // The modal has three properties: toggle, onSave, and activeItem.
    // We have already defined activeItem above.
    // See App.js on how toggle, onSave, and activeItem are being used.
    const { toggle, onSave } = this.props;
    return (
      // isOpen={true} is a Boolean describing if the modal should be shown or not,
      // i.e., in our case, what should happen if the modal is open.
      // Open the modal on toggling/clicking. See the toggle function in App.js
      // below.
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                // "this" refers to the current event. If there is a change,
                // it will be passed to the handleChange function above.
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>
           
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}