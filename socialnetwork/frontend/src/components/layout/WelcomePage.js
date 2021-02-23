import React, {Component} from 'react';
import {Link} from "react-router-dom";

class WelcomePage extends Component {
    render() {
        return (
            <div style={{textAlign: "center", height: 400, marginTop:200}}>
                <h1>Welcome to the app! ;)</h1>
                <p>This application was build with Django, Django-REST Framework, JWT-token, React and Redux.</p>
                <Link to="/register"><button className="btn btn-success btn">Get Started</button></Link>
            </div>
        );
    }
}

export default WelcomePage;