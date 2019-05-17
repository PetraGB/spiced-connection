import React from "react";

export default class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log(this.props);
        return (
            <div className="connection">
                <div className={this.props.kind + " origin"} />
                <div className={this.props.kind + " destination"} />
                <div className={this.props.kind + " connectPath"} />
                {this.props.kind == 1 && <p>Reason</p>}
                {this.props.kind == 2 && <p>Effect</p>}
                {this.props.kind == 3 && <p>Broad</p>}
                {this.props.kind == 4 && <p>Detail</p>}
                {this.props.kind == 5 && <p>Similar</p>}
                {this.props.kind == 6 && <p>Opposite</p>}
            </div>
        );
    }
}
