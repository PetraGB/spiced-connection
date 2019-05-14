import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

import { connect } from "react-redux";
import { setUserData } from "./actions";

import Cms from "./cms";
import Header from "./header";
import Register from "./register";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios.get("/api/checkuser").then(({ data }) => {
            console.log("data in app", data);
            this.props.dispatch(setUserData(data.user));
        });
    }
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Header />
                    <Route path="/register" component={Register} />
                    <Route path="/cms" component={Cms} />
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(App);
