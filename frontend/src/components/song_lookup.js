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
import Song from "./Song"
import Login from "./Login"
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";

export default class Song_lookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList : [],
      ratingList: [],
      userList: [],
      currentSong: 0,
      currentUser: "",
      currentRating: 0,
      loginSupText: "",
      editSupText: "",
      active: 0,
      formText: {
        song: "",
        artist: "",
        rating: ""
      }
    };
    this.changeEditMode = this.changeEditMode.bind(this)
    this.changeCurrentUser = this.changeCurrentUser.bind(this)
  }

  componentDidMount() {
    this.refreshList();
  }

  loginBar() {
    return <Login username={this.state.currentUser} onChange={this.changeCurrentUser} supText={this.state.loginSupText}/>
  }
  changeEditMode(id, on) {
    if(this.state.currentUser === "") {
      this.setState({active: 0, editSupText: "Must be logged in!"})
      return
    }
    if(on) {
      let newRat = this.findUserRatingOfSong(this.state.currentUser, id)
      this.setState({currentSong: id, active: 1, editSupText: "", currentRating: newRat})
      this.setState({formText: {song: this.state.songList[id].song, artist: this.state.songList[id].artist, rating: newRat}})
    }
    else {
      this.setState({active: 0})
    }
  }

  changeCurrentUser(username, password) {
    let dest = "http://localhost:8000/api/users/"
    if (username === "") {
      this.setState({currentUser: "", loginSupText: ""})
      return
    }
    axios
      .get(dest.concat(username))
      .then((res) => {
        if(res.data.password === password) {
          this.setState({currentUser: username, loginSupText: ""})
        }
        else {
          this.setState({currentUser: "", loginSupText: "Invalid credentials"})
        }
      })
      .catch((res) => {
        this.setState({currentUser: "", loginSupText: "Invalid credentials"})
      })
  }

  renderSongs() {
    return Object.entries(this.state.songList).map(([key, value]) =>
      <Song id={key} song={value.song} artist={value.artist} average={value.av} count={value.count} onChange={this.changeEditMode}/>
    )
  }

  findUserRatingOfSong(user, songid) {
    let returnRat = 0
    this.state.ratingList.map((rating) => {
      if (user == rating.username && songid == rating.song) {
        returnRat = rating.rating
      }
    })
    return returnRat
  }

  handleChange = (event) => {
    let {name, value} = event.target
    this.setState({
        formText: {[name]: value}
    });
  }

  calculateAverageRating = (u) => {
    let average = 0
    let count = 0
    this.state.ratingList.map((rating) =>{
      if (u == rating.song) {
        count++
        average += rating.rating
      }
    })
    return [average/count, count]
  }

  populateSongs = (artists) => {
      axios
      .get("http://localhost:8000/api/ratings/")
      .then((res) => {
        this.setState({ ratingList: res.data})
        let newlist = []
        for (const[key, value] of Object.entries(artists)) {
            let figures = this.calculateAverageRating(key)
            newlist[key] = {song: value.song, artist: value.artist, av: figures[0], count: figures[1]}
        }

        this.setState({ songList: newlist })
      })
      .catch((err) => console.log(err));
  }

  refreshList = () => {
    // We are using the axios library for making HTTP requests.
    // Here is a GET request to our api/todos path.
    // If it succeeds, we set the todoList to the resolved data.
    // Otherwise, we catch the error and print it to the console (rejected data).
    // We are using async calls here. Please refer to the JavaScript
    // tutorial for how they work.
    axios
      .get("http://localhost:8000/api/artists/")
      .then((res) => {
        let artistList = []
        res.data.map((songItem) => artistList[songItem.id] = {song: songItem.song, artist: songItem.artist})
        this.populateSongs(artistList)
      })
  };

  editBar() {
    let editHtml = ""
    if (this.state.active == 1){
      editHtml = (
        <div>
          <b>Edit Song/Rating </b>
        <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.formText.song}
                // "this" refers to the current event. If there is a change,
                // it will be passed to the handleChange function above.
                onChange={this.handleChange}
                placeholder="Change Song Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="artist">Artist</Label>
              <Input
                type="text"
                name="artist"
                value={this.state.formText.artist}
                onChange={this.handleChange}
                placeholder="Change Artist"
              />
            </FormGroup>
            <FormGroup rating>
              <Label for="rating">
                <Input
                  type="number"
                  name="rating"
                  value={this.state.formText.rating}
                  onChange={this.handleChange}
                  placeholder="Change Rating"
                />
              </Label>
            </FormGroup>
          </Form>
          <Button onClick={() => {}}>
              Submit (non-functional ATM)
          </Button>
          </div>
      );
    }
    return editHtml
  }

  render() {
    return(
    <div>
      <div style={{textAlign: "right"}}>
        {this.loginBar()}
      </div>
      <div>
        Songs
        <ul>
          {this.renderSongs()}
        </ul>
        {this.editBar()}
        <div style={{color: "red"}}>{this.state.editSupText}</div>
      </div>
    </div>
    );}
}