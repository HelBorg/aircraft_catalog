import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table, Jumbotron, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';


class AircraftList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            aircrafts: [],
            isLoading: true,
            currentPage: 1,
            aircraftsPerPage: 2,
            aircraftInfo: 0
        };
        this.remove = this.remove.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangePerPage = this.handleChangePerPage.bind(this);
        this.handleInfo = this.handleInfo.bind(this);
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

    async handleInfo(id) {
        this.setState({aircraftInfo: id});
    }

    handleChangePage(event) {
        const value = (event.target.id <= this.state.aircrafts.length) ? event.target.id : this.state.aircrafts.length;
        this.setState({
            currentPage: Number(value)
        });
    }

    handleChangePerPage(event) {
        this.setState({
            aircraftsPerPage: Number(event.target.id),
            currentPage: 1
        })
    }

    render() {
        const {aircrafts, isLoading, currentPage, aircraftsPerPage, aircraftInfo} = this.state;

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

        let counter = 0;
        const aircraftList = currentAircrafts.map(aircraft => {
            if (aircraft.id !== aircraftInfo) {
                counter = counter + 1;
                return <tr key={counter}>
                    <td style={{whiteSpace: 'nowrap'}}>{aircraft.number}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{aircraft.model}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{aircraft.manufacturer.name}</td>
                    <td style={{whiteSpase: 'nowrap'}}>{aircraft.airline}</td>
                    <td>
                        <ButtonGroup>
                            <Button className="btn_name" size="sm" color="primary" tag={Link}
                                    to={"/aircraft/edit/" + aircraft.id}>Edit</Button>
                            <Button className="btn_name" size="sm"
                                    onClick={() => this.remove(aircraft.id)}>Delete</Button>
                            <Button className="btn_name" size="sm" color="primary"
                                    onClick={() => this.handleInfo(aircraft.id)}>More</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            } else {
                counter = counter + 6;
                return (
                    <Table bordered>
                        <tbody>
                        <tr key={counter - 5}>
                            <td width="30%" style={{whiteSpace: 'nowrap'}}>{aircraft.number}</td>
                            <td width="30%">
                                <ButtonGroup>
                                    <Button className="btn_name" size="sm" color="primary" tag={Link}
                                            to={"/aircraft/edit/" + aircraft.id}>Edit</Button>
                                    <Button className="btn_name" size="sm"
                                            onClick={() => this.remove(aircraft.id)}>Delete</Button>
                                    <Button className="btn_name" size="sm" color="primary"
                                            onClick={() => this.handleInfo(0)}>Less</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                        <tr key={counter - 4}>
                            <td>Model:</td> <td>{aircraft.model}</td>
                        </tr>
                        <tr key={counter - 3}>
                            <td>Year:</td> <td>{aircraft.year}</td>
                        </tr>
                        <tr key={counter - 2}>
                            <td>Capacity:</td> <td>{aircraft.capacity}</td>
                        </tr>
                        <tr key={counter - 1}>
                            <td>Manufacturer:</td> <td>{aircraft.manufacturer.name}</td>
                        </tr>
                        <tr key={counter}>
                            <td>from</td> <td>{aircraft.manufacturer.country}</td>
                        </tr>
                        </tbody>
                    </Table>
                )
            }
        });


        const pageNumbers = [];
        pageNumbers.push(1);
        const first = (currentPage - 3 < 2) ? 2 : currentPage - 3;
        const last = (currentPage + 4 > Math.ceil(aircrafts.length / aircraftsPerPage)) ? Math.ceil(aircrafts.length / aircraftsPerPage) - 1 : currentPage + 3;
        for (let i = first; i <= last; i++) {
            pageNumbers.push(i);
        }
        if (Math.ceil(aircrafts.length / aircraftsPerPage) !== 1) {
            pageNumbers.push(Math.ceil(aircrafts.length / aircraftsPerPage));
        }

        let prevNum = 0;
        const renderPageNumbers = pageNumbers.map(number => {
            let active = false;
            if (number === currentPage) {
                active = true;
            }
            const pageItem = [];
            if (number - prevNum > 1) {
                pageItem.push(
                    <PaginationItem disabled={true}>
                        <PaginationLink>
                            ...
                        </PaginationLink>
                    </PaginationItem>
                );
            }
            pageItem.push(
                <PaginationItem active={active}>
                    <PaginationLink
                        key={number}
                        id={number}
                        onClick={this.handleChangePage}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            );
            prevNum = number;
            return pageItem;
        });


        const perPageNumbers = [];
        perPageNumbers.push(2);
        for (let i = 5; i < aircrafts.length; i = i * 2) {
            perPageNumbers.push(i);
        }
        perPageNumbers.push(aircrafts.length);

        const renderPerPageNumbers = perPageNumbers.map(number => {
            let active = false;
            if (number === aircraftsPerPage) {
                active = true;
            }
            return (
                <PaginationItem active={active}>
                    <PaginationLink
                        key={number}
                        id={number}
                        onClick={this.handleChangePerPage}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            );
        });


        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button className="btn_name" color="success" tag={Link} to="/aircraft/edit/new">Add
                            Aircraft</Button>
                        <Button className="btn_name" color="success" tag={Link} to="/manufacturer/edit/new">Add
                            Manufacturer</Button>
                    </div>
                    <h3>Aircraft List</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="10%">Number</th>
                            <th width="20%">Model</th>
                            <th width="30%">Manufacturer</th>
                            <th width="20%">Airline</th>
                            <th width="20%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {aircraftList}
                        Page:
                        <Pagination>
                            <PaginationItem>
                                <PaginationLink previous href="#"/>
                            </PaginationItem>
                            {renderPageNumbers}
                            <PaginationItem>
                                <PaginationLink next href="#"/>
                            </PaginationItem>
                        </Pagination>
                        Aircrafts per page:
                        <Pagination>
                            {renderPerPageNumbers}
                        </Pagination>
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default AircraftList;