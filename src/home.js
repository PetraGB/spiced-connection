import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios
            .get("/api/latest")
            .then(({ data }) => {
                this.setState(data);
                console.log(this.state);
            })
            .catch();
    }
    render() {
        console.log(this.props);
        return (
            <div className="home verContainer">
                {this.state.latest && this.props.user && (
                    <div>
                        {this.props.user.read ? (
                            <div>
                                {this.state.latest.filter(article => {
                                    if (
                                        !this.props.user.read.includes(
                                            article.id
                                        )
                                    )
                                        return (
                                            <div
                                                className="link new horContainer"
                                                key={article.id}
                                            >
                                                <div>
                                                    <img
                                                        src={
                                                            article.pictures[0]
                                                        }
                                                    />
                                                </div>
                                                <h2>{article.title}</h2>
                                                <p>{article.summary}</p>
                                            </div>
                                        );
                                })}
                                {this.state.latest.filter(article => {
                                    if (
                                        this.props.user.read.includes(
                                            article.id
                                        )
                                    )
                                        return (
                                            <div
                                                className="link read horContainer"
                                                key={article.id}
                                            >
                                                <div>
                                                    <img
                                                        src={
                                                            article.pictures[0]
                                                        }
                                                    />
                                                </div>
                                                <h2>{article.title}</h2>
                                                <p>{article.summary}</p>
                                            </div>
                                        );
                                })}
                            </div>
                        ) : (
                            <div>
                                {this.state.latest.map(article => {
                                    return (
                                        <div
                                            className="link new horContainer"
                                            key={article.id}
                                        >
                                            <div>
                                                <img
                                                    src={article.pictures[0]}
                                                />
                                            </div>
                                            <h2>{article.title}</h2>
                                            <p>{article.summary}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
                {!this.props.user && this.state.latest && (
                    <div>
                        {this.state.latest.map(article => {
                            return (
                                <div
                                    className="link new horContainer"
                                    key={article.id}
                                >
                                    <div>
                                        <img src={article.pictures[0]} />
                                    </div>
                                    <h2>{article.title}</h2>
                                    <p>{article.summary}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Home);
