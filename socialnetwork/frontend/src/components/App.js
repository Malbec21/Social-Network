import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from "./posts/Dashboard";

import AlertTemplate from "react-alert-template-basic";
import {Provider} from "react-redux";
import {Provider as AlertProvider} from 'react-alert';
import store from "../store";
import Alerts from "./layout/Alerts";
import Header from "./layout/Header";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/PrivateRoute";
import {loadUser} from "../actions/auth";
import Footer from "./layout/Footer";
import Feed from "./posts/Feed";
import WelcomePage from "./layout/WelcomePage";

// Alert Options
const alertOptions = {
    timeout: 3000,
    position: "top center"
}

class App extends Component {
    componentDidMount() {
        store.dispatch(loadUser);
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header/>
                            <Alerts/>
                            <div className="container">
                                <Switch>
                                    <Route exact path="/" component={WelcomePage}/>
                                    <PrivateRoute exact path="/my-posts" component={Dashboard}/>
                                    <PrivateRoute exact path="/feed" component={Feed}/>
                                    <Route exact path="/register" component={Register}/>
                                    <Route exact path="/login" component={Login}/>
                                </Switch>
                            </div>
                            <Footer/>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById("app"))