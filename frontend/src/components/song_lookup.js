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
import './s_lookup.css';
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
      let newRat = this.findUserRatingOfSong(this.state.currentUser, id).rating
      this.setState({currentSong: id, active: 1, editSupText: "", currentRating: newRat})
      this.setState({formText: {song: this.state.songList[id].song, artist: this.state.songList[id].artist, rating: newRat}})
    }
    else {
      this.setState({active: 0})
    }
  }

  async addOrUpdate(dest, newData) {
    await axios
      .get(dest)
      .then((res) => {
        axios
          .patch(dest + '/', newData)
          .then((res) => {
            this.refreshList()
            this.setState({active: 0})
          })
      })
  }

  editSongRating = () => {
    let dest = "http://localhost:8000/api/artists/"
    dest = dest.concat(this.state.currentSong)
    this.addOrUpdate(dest, {song: this.state.formText.song, artist: this.state.formText.artist })
    dest = "http://localhost:8000/api/ratings/"
    dest = dest.concat(this.findUserRatingOfSong(this.state.currentUser, this.state.currentSong).id)
    this.addOrUpdate(dest, {rating: this.state.formText.rating})
  }

  changeCurrentUser(username, password, signup) {
    this.setState({active: 0})
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
          this.setState({currentUser: "", loginSupText: (signup ? "Username already taken!" : "Invalid credentials")})
        }
      })
      .catch((res) => {
        if(signup) {
          axios
            .post("http://localhost:8000/api/users/", {username: username, password: password})
            .then((res) => {
              this.changeCurrentUser(username, password, false)
            })
        }
        else {
          this.setState({currentUser: "", loginSupText: "Invalid credentials"})
        }
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
        returnRat = rating
      }
    })
    return returnRat
  }

  handleChange = (event) => {
    let {name, value} = event.target
    let newForm = this.state.formText
    newForm[name] = value
    this.setState({
        formText: newForm
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
    if (count == 0) {
      return [0,0]
    }
    return [Number.parseFloat(average/count).toFixed(2), count]
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
        <div className="editBar">
          <b>Edit Song/Rating </b>
        <Form>
            <FormGroup>
              <Label for="song">Title </Label>
              <Input
                type="text"
                name="song"
                value={this.state.formText.song}
                onChange={this.handleChange}
                placeholder="Change Song Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="artist">Artist </Label>
              <Input
                type="text"
                name="artist"
                value={this.state.formText.artist}
                onChange={this.handleChange}
                placeholder="Change Artist"
              />
            </FormGroup>
            <FormGroup>
              <Label for="rating">Rating </Label>
                <Input
                  type="number"
                  name="rating"
                  value={this.state.formText.rating}
                  onChange={this.handleChange}
                  placeholder="Change Rating"
                />
            </FormGroup>
          </Form>
          <Button onClick={this.editSongRating}>
              Submit
          </Button>
          </div>
      );
    }
    return editHtml
  }

  render() {
    return(
    <div>
      <div style={{textAlign: "right", position: "fixed", right: 0, top: 0}}>
        {this.loginBar()}
      </div>
      <div style={{marginTop: 50}}>
        Songs
        <div className="flex-container">
          <div>
            <ul style={{listStyle: "none"}}>
              {this.renderSongs()}
            </ul>
          </div>
          <div>
            {this.editBar()}
            <div style={{color: "red"}}>{this.state.editSupText}</div>
          </div>
        </div>
      </div>
    </div>
    );}
}