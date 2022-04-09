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
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";

export default class Song_lookup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songList : [],
      ratingList: [],
      currentSong: 0,
      currentUser: null,
      active: false
    };
    this.changeEditMode = this.changeEditMode.bind(this)
  }

  componentDidMount() {
    this.refreshList();
  }

  changeEditMode(id, on) {
    if(on) {
      this.setState({currentSong: id, active: true})
    }
    else {
      this.setState({active: false})
    }
  }

  renderSongs() {
    return Object.entries(this.state.songList).map(([key, value]) =>
      <Song id={key} song={value.song} artist={value.artist} average={value.av} count={value.count} onChange={this.changeEditMode}/>
    )
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

  render() {
    return(
    <div>
      Songs
      <ul>
        {this.renderSongs()}
      </ul>
        {this.state.active ? <b>Edit </b> : ""}
        {this.state.active ? this.state.songList[this.state.currentSong].song + " by " + this.state.songList[this.state.currentSong].artist : ""}
    </div>)
  }
}