import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Connection from "./connection";

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
                <h2>Related articles</h2>
                {this.state.links && !this.props.user && (
                    <React.Fragment>
                        {this.state.links.map(link => {
                            return (
                                <div className="link unit" key={link.id}>
                                    <Link
                                        to={"/article/" + link.destination}
                                        className="horContainer"
                                    >
                                        {link.kind && (
                                            <Connection kind={link.kind} />
                                        )}
                                        <div>
                                            <h2>{link.title}</h2>
                                            <p>{link.explanation}</p>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </React.Fragment>
                )}
                {this.state.links && this.props.user && (
                    <React.Fragment>
                        {this.props.user.read &&
                            this.state.links
                                .filter(link => {
                                    if (
                                        !this.props.user.read.includes(
                                            link.destination
                                        )
                                    ) {
                                        return true;
                                    }
                                })
                                .map(link => {
                                    return (
                                        <div
                                            className="link unit unread"
                                            key={link.id}
                                        >
                                            <Link
                                                to={
                                                    "/article/" +
                                                    link.destination
                                                }
                                                className="horContainer"
                                            >
                                                {link.kind && (
                                                    <Connection
                                                        kind={link.kind}
                                                    />
                                                )}
                                                <div>
                                                    <h2>{link.title}</h2>
                                                    <p>{link.explanation}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                        {this.props.user.read &&
                            this.state.links
                                .filter(link => {
                                    if (
                                        this.props.user.read.includes(
                                            link.destination
                                        )
                                    ) {
                                        return true;
                                    }
                                })
                                .map(link => {
                                    return (
                                        <div
                                            className="link unit read"
                                            key={link.id}
                                        >
                                            <Link
                                                to={
                                                    "/article/" +
                                                    link.destination
                                                }
                                                className="horContainer"
                                            >
                                                {link.kind && (
                                                    <Connection
                                                        kind={link.kind}
                                                    />
                                                )}
                                                <div>
                                                    <h2>{link.title}</h2>
                                                    <p>{link.explanation}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                        {!this.props.user.read &&
                            this.state.links.map(link => {
                                return (
                                    <div
                                        className="link unit read"
                                        key={link.id}
                                    >
                                        <Link
                                            to={"/article/" + link.destination}
                                            className="horContainer"
                                        >
                                            {link.kind && (
                                                <Connection kind={link.kind} />
                                            )}
                                            <div>
                                                <h2>{link.title}</h2>
                                                <p>{link.explanation}</p>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Linkies);
