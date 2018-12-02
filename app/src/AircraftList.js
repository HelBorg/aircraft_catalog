import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Jumbotron } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';


class AircraftList extends Component {

    constructor(props) {
        super(props);
        this.state = {aircrafts: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/aircraft')
            .then(response => response.json())
            .then(data => this.setState({aircrafts: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/aircraft/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedAircrafts = [...this.state.aircrafts].filter(i => i.id !== id);
            this.setState({aircrafts: updatedAircrafts});
        });
    }

    render() {
        const {aircrafts, isLoading} = this.state;

        if (isLoading) {
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

        const aircraftList = aircrafts.map(aircraft => {
            return <tr key={aircraft.id}>
                <td style={{whiteSpace: 'nowrap'}}>{aircraft.number}</td>
                <td style={{whiteSpace: 'nowrap'}}>{aircraft.model}</td>
                <td style={{whiteSpace: 'nowrap'}}>{aircraft.manufacturer.name}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/aircraft/edit/" + aircraft.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(aircraft.id)}>Delete</Button>
                        {/*<Button size="sm" color="danger" tag={Link} to={"/aircraft/" + aircraft.id}>More</Button>*/}
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/aircraft/edit/new">Add Aircraft</Button>
                    </div>
                    <h3>Aircraft List</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Number</th>
                            <th width="20%">Model</th>
                            <th width="30%">Manufacturer</th>
                            <th width="20%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {aircraftList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AircraftList;