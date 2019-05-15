import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Linkies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const articleid = this.props.articleid;

        axios
            .get("/api/links/" + articleid)
            .then(({ data }) => {
                this.setState({ links: data.links });
                console.log(this.state);
            })
            .catch();
    }
    render() {
        return (
            <div className="links">
                {this.state.links &&
                    this.state.links.map(link => {
                        return (
                            <div className="links unite" key={link.id}>
                                <Link to={"/article/" + link.destination}>
                                    {link.explanation}
                                </Link>
                            </div>
                        );
                    })}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Linkies);
