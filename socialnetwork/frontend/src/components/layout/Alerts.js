import React, {Component, Fragment} from 'react';
import {withAlert} from "react-alert";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const {error, alert, message} = this.props;

        if (error !== prevProps.error) {
            if (error.message.name) {
                alert.error(`Name: ${error.message.name.join()}`)
            }
            if (error.message.email) {
                alert.error(`Email: ${error.message.email.join()}`)
            }
            if (error.message.image) {
                alert.error(`Image: ${error.message.image.join()}`)
            }
            if (error.message.content) {
                alert.error(`Content: ${error.message.content.join()}`)
            }
            if (error.message.non_field_errors) {
                alert.error(error.message.non_field_errors.join())
            }
            if (error.message.username) {
                alert.error(error.message.username.join())
            }
        }

        if (message !== prevProps.message) {
            if (message.deletePost) {
                alert.success(message.deletePost)
            }
            if (message.addPost) {
                alert.success(message.addPost)
            }
            if (message.likePost) {
                alert.success(message.likePost)
            }
            if (message.dislikePost) {
                alert.success(message.dislikePost)
            }
            if (message.passwordNotMatch) {
                alert.error(message.passwordNotMatch)
            }
        }
    }

    render() {
        return <Fragment/>
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts));