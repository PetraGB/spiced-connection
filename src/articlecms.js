import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Articlecms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div className="articlecms">what the hellllll error codes</div>;
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Articlecms);
