import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import SearchBar from "./reusable/SearchBar";
import VideoList from "./videos/VideoList";
import VideoDetail from "./videos/VideoDetail";
import Comment from "../components/comment/Comment";
import youtube from "../apis/youtube";
import CommentAdd from "../components/comment/CommentAdd";
import comment from "../apis/comment";
import { BASE_URL, COMMENT_TOKEN_BOT, COMMENT_CHANNEL } from "../config/config";

class App extends Component {
  state = {
    response: false,
    endpoint: "http://127.0.0.1:4001",
    videos: [],
    selectedVideo: null,
    comment: []
  };

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    //get realtime comment from slack
    socket.on("Comments", data => this.setState({ comment: data }));

    //get initial data from youtube
    this.onTermSubmit(
      "Building a microservice with Node and React: Dynamic Routing pt.1"
    );
  }

  onTermSubmit = async term => {
    const response = await youtube.get("/search", {
      params: {
        q: term
      }
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  onAddComment = async comments => {
    comment
      .post(
        `${BASE_URL}/chat.postMessage?token=${COMMENT_TOKEN_BOT}&channel=${COMMENT_CHANNEL}&text=${comments}`,
        {}
      )
      .then(res => {
        // socket.emit("Comments", res.data.messages);
      })
      .catch(error => {
        // console.error(`Error: ${error.code}`);
      });
  };

  onVideoSelect = video => {
    this.setState({
      selectedVideo: video
    });
  };

  render() {
    const { comment, selectedVideo } = this.state;

    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={selectedVideo} />
              <Comment comment={comment} />
              <CommentAdd onAddComment={this.onAddComment} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
