import React from "react";
// import axios from "./axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Articlelink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Link
                to={"/article/" + this.props.article.id}
                className="link horContainer"
            >
                <div className="imageDiv">
                    <img src={this.props.article.pictures[0]} />
                </div>
                <div>
                    <h2>{this.props.article.title}</h2>
                    <p className="date">{this.props.article.published}</p>
                    <p>{this.props.article.summary}</p>
                </div>
            </Link>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Articlelink);
