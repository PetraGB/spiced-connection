import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import Uploaderart from "./uploaderart";

class Articlecms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentArticle: {
                id: 0,
                title: "",
                article: "",
                pictures: [],
                summary: "",
                uploaded: "",
                published: "",
                publish: false
            },
            uploaderVisible: false
        };
        this.inputting = this.inputting.bind(this);
        this.uploadArticle = this.uploadArticle.bind(this);
        this.updatePublish = this.updatePublish.bind(this);
        this.publish = this.publish.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateArticlePics = this.updateArticlePics.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        if (id > 0) {
            axios
                .get("/api/article/" + id)
                .then(({ data }) => {
                    const currentArticle = data.article;
                    this.setState({ currentArticle });
                })
                .catch(err => {
                    this.setState({ error: true });
                    console.log(err);
                });
        }
    }
    inputting(e) {
        this.setState({
            currentArticle: {
                ...this.state.currentArticle,
                [e.target.name]: e.target.value
            }
        });
    }
    uploadArticle(e) {
        e.preventDefault();
        const id = this.state.currentArticle.id;
        if (id == 0) {
            axios
                .post("/api/article/add", this.state.currentArticle)
                .then(({ data }) => {
                    location.replace("/cms/article/" + data.id);
                })
                .catch();
        } else {
            axios
                .post("/api/article/adjust", this.state.currentArticle)
                .then(({ data }) => {
                    location.replace("/cms/article/" + data.id);
                })
                .catch();
        }
    }
    updatePublish(e) {
        if (e.target.value == "publish") {
            this.setState({
                currentArticle: {
                    ...this.state.currentArticle,
                    publish: true
                }
            });
        } else if (e.target.value == "unpublish") {
            this.setState({
                currentArticle: {
                    ...this.state.currentArticle,
                    publish: false
                }
            });
        }
    }
    publish(e) {
        e.preventDefault();
        const request = {
            publish: this.state.currentArticle.publish,
            id: this.state.currentArticle.id
        };
        axios
            .post("/api/article/publish", request)
            .then(({ data }) => {
                location.replace("/article/" + data.id);
            })
            .catch();
    }
    toggleUploader() {
        if (this.state.uploaderVisible) {
            this.setState({ uploaderVisible: false });
        } else {
            this.setState({ uploaderVisible: true });
        }
    }
    updateArticlePics(pictures) {
        this.setState({
            currentArticle: { ...this.state.currentArticle, pictures }
        });
        console.log(this.state);
    }
    render() {
        return (
            <div className="articlecms verContainer">
                {this.props.user ? (
                    <div className="articleForm">
                        {this.props.user.status > 1 ? (
                            <div>
                                <form className="verContainer">
                                    <label htmlFor="title" className="inputTag">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Title"
                                        value={this.state.currentArticle.title}
                                        onChange={this.inputting}
                                    />
                                    <label htmlFor="text" className="inputTag">
                                        Text
                                    </label>
                                    <textarea
                                        name="article"
                                        type="text"
                                        id="text"
                                        value={
                                            this.state.currentArticle.article
                                        }
                                        onChange={this.inputting}
                                    />
                                    <label
                                        htmlFor="summary"
                                        className="inputTag"
                                    >
                                        Summary
                                    </label>
                                    <textarea
                                        name="summary"
                                        id="summary"
                                        type="text"
                                        value={
                                            this.state.currentArticle.summary
                                        }
                                        onChange={this.inputting}
                                    />
                                    <button onClick={this.uploadArticle}>
                                        Upload
                                    </button>
                                </form>

                                {!!this.state.currentArticle.id && (
                                    <div>
                                        <button onClick={this.toggleUploader}>
                                            Upload picture
                                        </button>
                                        {this.state.uploaderVisible && (
                                            <Uploaderart
                                                toggleUploader={
                                                    this.toggleUploader
                                                }
                                                updateArticlePics={
                                                    this.updateArticlePics
                                                }
                                                id={
                                                    this.state.currentArticle.id
                                                }
                                            />
                                        )}
                                    </div>
                                )}

                                {this.props.user.status > 2 && (
                                    <div className="editorSecArt verContainer">
                                        <form className="verContainer">
                                            <input
                                                type="radio"
                                                name="publish"
                                                value="publish"
                                                id="publish"
                                                onChange={this.updatePublish}
                                            />
                                            <label htmlFor="publish">
                                                Publish
                                            </label>
                                            <input
                                                type="radio"
                                                name="publish"
                                                value="unpublish"
                                                id="unpublish"
                                                onChange={this.updatePublish}
                                            />
                                            <label htmlFor="unpublish">
                                                Unpublish
                                            </label>
                                            <button onClick={this.publish}>
                                                Update
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>please log in as a journalist</div>
                        )}
                    </div>
                ) : (
                    <div>Nothing to see here</div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Articlecms);
