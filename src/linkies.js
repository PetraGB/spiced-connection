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
            <div className="links verContainer">
                {this.state.links &&
                    this.state.links.map(link => {
                        return (
                            <div className="links unit" key={link.id}>
                                <Link to={"/article/" + link.destination}>
                                    <div className="links imagediv">
                                        {link.kind == 1 && (
                                            <img src="reason.png" />
                                        )}
                                        {link.kind == 2 && (
                                            <img src="effect.png" />
                                        )}
                                        {link.kind == 3 && (
                                            <img src="broad.png" />
                                        )}
                                        {link.kind == 4 && (
                                            <img src="detail.png" />
                                        )}
                                        {link.kind == 5 && (
                                            <img src="perspective.png" />
                                        )}
                                        {link.kind == 6 && (
                                            <img src="perspective.png" />
                                        )}
                                    </div>
                                    <p>{link.explanation}</p>
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
