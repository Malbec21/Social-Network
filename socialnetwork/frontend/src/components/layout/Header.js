import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from "../../actions/auth";

class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <span className="nav-link mr-3">
                        <strong>{user ? `Welcome, ${user.username}` : ''}!</strong>
                    </span>
                </li>
                <li className="nav-item">
                    <button onClick={this.props.logout} className="btn btn-primary btn-sm nav-link text-white">Logout
                    </button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <img src="https://кровлякиров.рф/wp-content/themes/KM/img/suc.png" alt="Icon Image"
                             style={{
                                 width: 50,
                                 height: 50,
                                 borderRadius: 50,
                                 marginRight: 10
                             }}>
                        </img>
                        <Link to="/feed"><span className="navbar-brand">Social Network</span></Link>
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/feed"><span
                                    className="btn btn-primary btn-sm nav-link text-white">Feed</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/my-posts"><span
                                    className="btn btn-primary btn-sm nav-link text-white">My posts</span></Link>
                            </li>
                        </ul>
                    </div>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, {logout})(Header);