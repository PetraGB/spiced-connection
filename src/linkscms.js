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
        axios
            .post("/api/link/add", this.state.currentLink)
            .then(({ data }) => {})
            .catch();
    }
    render() {
        return (
            <div className="linkscms">
                <form>
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
                        id="reason"
                        onChange={this.inputting}
                    />
                    <label htmlFor="reason">Effect</label>
                    <input
                        type="radio"
                        name="kind"
                        value="3"
                        id="reason"
                        onChange={this.inputting}
                    />
                    <label htmlFor="reason">Broad</label>
                    <input
                        type="radio"
                        name="kind"
                        value="4"
                        id="reason"
                        onChange={this.inputting}
                    />
                    <label htmlFor="reason">Detail</label>
                    <input
                        type="radio"
                        name="kind"
                        value="5"
                        id="reason"
                        onChange={this.inputting}
                    />
                    <label htmlFor="reason">Perspective</label>
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
