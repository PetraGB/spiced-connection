import React from "react";
// import axios from "./axios";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class Articlelink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="link horContainer">
                <h1>ARTICLELINK</h1>
                <div>
                    <img src={this.props.article.pictures[0]} />
                </div>
                <h2>{this.props.article.title}</h2>
                <p>{this.props.article.summary}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Articlelink);
