import React, {Component} from "react";
import {connect} from 'react-redux'
import PropTypes from "prop-types";
import {addPost} from "../../actions/posts";

class Form extends Component {
    state = {
        title: "",
        image: "",
        content: ""
    }

    static propTypes = {
        addPost: PropTypes.func.isRequired
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});
    onImageChange = e => this.setState({[e.target.name]: e.target.files[0]})
    onSubmit = e => {
        e.preventDefault();
        const {title, image, content} = this.state;
        const post = {title, image, content};
        this.props.addPost(post);
        this.setState({
            title: "",
            image: undefined,
            content: ""
        });
    };


    render() {
        const {title, image ,content} = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h2>Add Post</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            onChange={this.onChange}
                            value={title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            className="form-control"
                            name="content"
                            onChange={this.onChange}
                            value={content}
                            style={{resize: "none", height: 200}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input
                            className="form-control-file"
                            type="file"
                            name="image"
                            onChange={this.onImageChange}
                            defaultValue={image}
                        />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, {addPost})(Form);
