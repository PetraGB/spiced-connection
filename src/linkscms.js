import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class Linkscms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputting = this.inputting.bind(this);
        this.uploadLinks = this.uploadLinks.bind(this);
    }
    componentDidMount() {}

    inputting(e) {
        this.setState({
            currentLink: {
                ...this.state.currentLink,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state);
    }
    uploadLinks(e) {
        e.preventDefault();
        if (
            !this.state.currentLink.origin ||
            !this.state.currentLink.destination ||
            !this.state.currentLink.explanation ||
            !this.state.currentLink.reverseExplanation ||
            !this.state.currentLink.kind
        ) {
            this.setState({
                error: true
            });
        } else {
            axios
                .post("/api/link/add", this.state.currentLink)
                .then(({ data }) => {
                    console.log("data from ajax link", data);
                    this.setState(data);
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ error: true });
                });
        }
    }
    render() {
        return (
            <div className="linkscms verContainer">
                {this.state.error && <p>{"Something went wrong"}</p>}
                <form className="verContainer">
                    <label htmlFor="origin" className="inputTag">
                        Origin
                    </label>
                    <input
                        type="number"
                        name="origin"
                        id="origin"
                        onChange={this.inputting}
                    />
                    <label htmlFor="destination" className="inputTag">
                        Destination
                    </label>
                    <input
                        type="number"
                        name="destination"
                        id="destination"
                        onChange={this.inputting}
                    />
                    <label htmlFor="explanation" className="inputTag">
                        Explanation
                    </label>
                    <textarea
                        type="text"
                        name="explanation"
                        id="explanation"
                        onChange={this.inputting}
                    />
                    <label htmlFor="reverseExplanation" className="inputTag">
                        Reverse Explanation
                    </label>
                    <textarea
                        type="text"
                        name="reverseExplanation"
                        id="reverseExplanation"
                        onChange={this.inputting}
                    />
                    <div className="optionsLinks horContainer">
                        <input
                            type="radio"
                            name="kind"
                            value="1"
                            id="reason"
                            onChange={this.inputting}
                        />
                        <label htmlFor="reason">Reason</label>
                        <input
                            type="radio"
                            name="kind"
                            value="2"
                            id="effect"
                            onChange={this.inputting}
                        />
                        <label htmlFor="effect">Effect</label>
                        <input
                            type="radio"
                            name="kind"
                            value="3"
                            id="broad"
                            onChange={this.inputting}
                        />
                        <label htmlFor="broad">Broad</label>
                        <input
                            type="radio"
                            name="kind"
                            value="4"
                            id="detail"
                            onChange={this.inputting}
                        />
                        <label htmlFor="detail">Detail</label>
                        <input
                            type="radio"
                            name="kind"
                            value="5"
                            id="similar"
                            onChange={this.inputting}
                        />
                        <label htmlFor="similar">Similar</label>
                        <input
                            type="radio"
                            name="kind"
                            value="6"
                            id="opposite"
                            onChange={this.inputting}
                        />
                        <label htmlFor="opposite">Opposite</label>
                    </div>
                    <button onClick={this.uploadLinks}>Save</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Linkscms);
