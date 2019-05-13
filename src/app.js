import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Cms from "./cms";
import Header from "./header";
import Register from "./register";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
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
