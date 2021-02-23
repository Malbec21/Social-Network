import React, {Component, Fragment} from "react"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getUserPosts, deletePost} from '../../actions/posts'
import LikeButton from "./LikeButton";

class Posts extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired,
        getUserPosts: PropTypes.func.isRequired,
        deletePost: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getUserPosts();
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <h2>My posts:</h2>
                    {this.props.posts.map(post => (
                            <div className="row" key={post.id}>
                                <div className="col-lg-8">
                                    <h1 className="mt-4">{post.title}</h1>
                                    <hr/>
                                    <p>
                                        <span>Created at {post.created_at.slice(0, 10)} {post.created_at.slice(11, 19)}</span>
                                        <button onClick={this.props.deletePost.bind(this, post.id)}
                                                className="ml-2 btn btn-danger btn-sm"
                                        >Delete
                                        </button>
                                    </p>
                                    <hr/>
                                    <img className="img-fluid rounded" src={post.image} alt="post-image"/>
                                    <hr/>
                                    <p className="content">{post.content}</p>
                                    <hr/>
                                    <LikeButton likeCount={post.like_count} isLiked={post.is_liked} postId={post.id}/>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

export default connect(
    mapStateToProps,
    {getUserPosts, deletePost}
)(Posts);
