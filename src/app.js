import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";

import { connect } from "react-redux";
import { setUserData } from "./actions";

import Home from "./home";
import Header from "./header";
import Register from "./register";
import Self from "./self";
import Profile from "./profile";
import Articlecms from "./articlecms";
import Linkscms from "./linkscms";
import Userscms from "./userscms";

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
                    <Route exact path="/" component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/self" component={Self} />
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="/cms/article/:id" component={Articlecms} />
                    <Route path="/cms/links" component={Linkscms} />
                    <Route path="/cms/users" component={Userscms} />
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(App);
