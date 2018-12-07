import React, {Component} from 'react';
import Jumbotron from "reactstrap/src/Jumbotron";
import Container from "reactstrap/src/Container";

export default class isLoading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">Please wait</h1>
                        <p className="lead">Loading...</p>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}