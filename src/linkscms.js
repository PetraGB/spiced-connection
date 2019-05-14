import React from "react";
// import axios from "./axios";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class Linkscms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div className="linkscms">links cms part</div>;
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Linkscms);
