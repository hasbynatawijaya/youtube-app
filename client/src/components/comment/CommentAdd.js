import React, { Component } from "react";

class CommentAdd extends Component {
  state = { comment: "" };

  handleComment = e => {
    this.setState({
      comment: e.target.value
    });
  };

  onAddComment = e => {
    e.preventDefault();
    this.props.onAddComment(this.state.comment);

    this.setState({
      comment: ""
    });
  };

  render() {
    const { comment } = this.state;

    return (
      <form onSubmit={this.onAddComment} class="ui reply form">
        <div class="field">
          <textarea value={comment} onChange={this.handleComment} rows="2" />
        </div>
        <button
          type="submit"
          disabled={comment === "" && true}
          class="ui icon primary left labeled button"
        >
          <i aria-hidden="true" class="edit icon"></i>
          Add Reply
        </button>
      </form>
    );
  }
}

export default CommentAdd;
