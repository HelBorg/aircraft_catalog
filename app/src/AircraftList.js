import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Jumbotron} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';


class AircraftList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            aircrafts: [],
            isLoading: true,
            currentPage: 1,
            aircraftsPerPage: 3
        };
        this.remove = this.remove.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangePerPage = this.handleChangePerPage.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/aircraft')
            .then(response => response.json())
            .then(data => this.setState({
                aircrafts: data,
                isLoading: false
            }));
    }

    async remove(id) {
        await fetch(`/api/aircraft/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedAircraft = [...this.state.aircrafts].filter(i => i.id !== id);
            this.setState({aircrafts: updatedAircraft});
        });
    }

    handleChangePage(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleChangePerPage(event) {
        this.setState({
            aircraftsPerPage: Number(event.target.id),
            currentPage: 1
        })
    }

    render() {
        const {aircrafts, isLoading, currentPage, aircraftsPerPage} = this.state;

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

        const indexOfLastAircraft = currentPage * aircraftsPerPage;
        const indexOfFirstAircraft = indexOfLastAircraft - aircraftsPerPage;
        const currentAircrafts = aircrafts.slice(indexOfFirstAircraft, indexOfLastAircraft);

        const aircraftList = currentAircrafts.map(aircraft => {
            return <tr key={aircraft.id}>
                <td style={{whiteSpace: 'nowrap'}}>{aircraft.number}</td>
                <td style={{whiteSpace: 'nowrap'}}>{aircraft.model}</td>
                <td style={{whiteSpace: 'nowrap'}}>{aircraft.manufacturer.name}</td>
                <td>
                    <ButtonGroup>
                        <Button className="btn_name" size="sm" color="primary" tag={Link} to={"/aircraft/edit/" + aircraft.id}>Edit</Button>
                        <Button className="btn_name" size="sm" onClick={() => this.remove(aircraft.id)}>Delete</Button>
                        <Button className="btn_name" size="sm" color="primary" tag={Link} to={"/aircraft/" + aircraft.id}>More</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(aircrafts.length / aircraftsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <Button
                    key={number}
                    id={number}
                    onClick={this.handleChangePage}
                >
                    {number}
                </Button>
            );
        });

        const perPageNumbers = [];
        perPageNumbers.push(1);
        perPageNumbers.push(3);
        for(let i = 5; i < Math.ceil(aircrafts.length); i = i*2) {
            perPageNumbers.push(i);
        }
        perPageNumbers.push(aircrafts.length);

        const renderPerPageNumbers = perPageNumbers.map( number => {
            if (aircrafts.length !== number) {
                return (
                    <Button
                        key={number}
                        id={number}
                        onClick={this.handleChangePerPage}
                    >
                        {number}
                    </Button>
                );
            } else {
                return (
                    <Button
                        key={number}
                        id={number}
                        onClick={this.handleChangePerPage}
                    >
                        {"Все"}
                    </Button>
                );
            }
        });


        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button className="btn_name" color="success" tag={Link} to="/aircraft/edit/new">Add Aircraft</Button>
                        <Button className="btn_name" color="success" tag={Link} to="/manufacturer/edit/new">Add Manufacturer</Button>
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
                        Page:
                        <ul id="page-numbers">
                            {renderPageNumbers}
                        </ul>
                        Aircrafts per page:
                        <ul id="page-numbers">
                            {renderPerPageNumbers}
                        </ul>
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AircraftList;