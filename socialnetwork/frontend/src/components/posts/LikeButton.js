import React, {Component} from "react";
import {likePost, dislikePost} from "../../actions/posts";
import PropTypes from "prop-types";
import {connect} from "react-redux";


class LikeButton extends Component {
    static propTypes = {
        likePost: PropTypes.func.isRequired,
        dislikePost: PropTypes.func.isRequired
    }

    state = {
        postId: this.props.postId,
        likeCount: this.props.likeCount,
        isLiked: this.props.isLiked
    }

    setDislike() {
        this.props.dislikePost(this.props.postId)
        this.setState({
            isLiked: !this.state.isLiked,
            likeCount: this.state.likeCount - 1
        });
    }

    setLike() {
        this.props.likePost(this.props.postId)
        this.setState({
            isLiked: !this.state.isLiked,
            likeCount: this.state.likeCount + 1
        });
    }

    handleLike() {
        if (this.state.isLiked) {
            this.setDislike();
        } else {
            this.setLike();
        }
    }

    render() {
        return (
            <button
                onClick={() => this.handleLike()}
                className={`ml-2 btn btn-sm ${this.state.isLiked ? 'btn-success' : 'btn-outline-success'}`}
            >
                Like {this.state.likeCount}
            </button>
        );
    }
}

export default connect(
    null,
    {
        likePost, dislikePost
    }
)(LikeButton);