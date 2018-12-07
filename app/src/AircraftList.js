import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table, Jumbotron, Pagination, PaginationItem, PaginationLink,
 Row, Col, Label, Input, FormGroup, Form, InputGroupAddon, InputGroup} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';
import Fields from './Fields';


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
        this.handleChangeSearch = this.handleChangeSearch.bind(this);
        this.sort = this.sort.bind(this);
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

    async sort() {
        // await fetch(`/api/aircraft?sort=` + "number", {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // });
    }

    async handleChangeSearch(event) {
        const value = event.target.value;
        await fetch(`/api/aircraft?info=` + value + '&sort=0')
            .then( () =>  {
                const airInfo = this.state.aircrafts.find(aircraft => aircraft.number === event.target.value);
                this.setState({aircraftInfo: airInfo});
            });
    }

    render() {
        const {aircrafts, isLoading, currentPage, aircraftsPerPage, aircraftInfo} = this.state;

        //is loading
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

        //Aircraft List
        const indexOfLastAircraft = currentPage * aircraftsPerPage;
        const indexOfFirstAircraft = indexOfLastAircraft - aircraftsPerPage;
        const currentAircrafts = aircrafts.slice(indexOfFirstAircraft, indexOfLastAircraft);

        const moreInfo = currentAircrafts.map(aircraft => {
            if (aircraft.id === aircraftInfo) {
                return (
                    <Table className="mt-4" borderless={true}>
                        <tbody>
                        <tr key={1}>
                            <td style={{whiteSpace: 'nowrap'}}>{aircraft.number}</td>
                            <td>
                                <ButtonGroup>
                                    <Button className="btn_name" size="sm" color="primary" tag={Link}
                                            to={"/aircraft/edit/" + aircraft.id}>Edit</Button>
                                    <Button className="btn_name" size="sm"
                                            onClick={() => this.remove(aircraft.id)}>Delete</Button>
                                    <Button className="btn_name" size="sm" color="primary"
                                            onClick={() => this.handleInfo(0)}>Hide</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                        <tr key={2}>
                            <td>Model:</td>
                            <td>{aircraft.model}</td>
                        </tr>
                        <tr key={3}>
                            <td>Year:</td>
                            <td>{aircraft.year}</td>
                        </tr>
                        <tr key={4}>
                            <td>Capacity:</td>
                            <td>{aircraft.capacity}</td>
                        </tr>
                        <tr key={5}>
                            <td>Manufacturer:</td>
                            <td>{aircraft.manufacturer.name}</td>
                        </tr>
                        <tr key={6}>
                            <td>from</td>
                            <td>{aircraft.manufacturer.country}</td>
                        </tr>
                        </tbody>
                    </Table>
                );
            }
        });

        const aircraftList = currentAircrafts.map(aircraft => {
            return <tr key={aircraft.id}>
                <td style={{whiteSpace: 'nowrap'}}>{aircraft.number}</td>
                <td style={{whiteSpace: 'nowrap'}}>{aircraft.year}</td>
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
        });

        //Pagination
        const pageNumbers = [];
        pageNumbers.push(1);
        const first = (currentPage - 3 < 2) ? 2 : currentPage - 3;
        const last = (currentPage + 4 > Math.ceil(aircrafts.length / aircraftsPerPage)) ?
            Math.ceil(aircrafts.length / aircraftsPerPage) - 1 : currentPage + 3;
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


        //AircraftsPerPage
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
                    {moreInfo}
                    <Form>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="info">Search</Label>
                                    <Input type="text" name="info" id="info"
                                           onChange={this.handleChangeSearch}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="aircraftSort">Sort by</Label>
                                    <Input type="select" name="sort" id="sort"
                                           onChange={this.sort(false)}>
                                        <Fields/>
                                    </Input>
                                    <Button className="btn_name" size="sm"
                                            onClick={() => this.sort(true)}>Sort</Button>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
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
                        </tbody>
                    </Table>
                    Page:
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink previous
                                            key={currentPage - 1}
                                            id={currentPage - 1}
                                            onClick={this.handleChangePerPage}/>
                        </PaginationItem>
                        {renderPageNumbers}
                        <PaginationItem>
                            <PaginationLink next
                                            key={currentPage + 1}
                                            id={currentPage + 1}
                                            onClick={this.handleChangePerPage}/>
                        </PaginationItem>
                    </Pagination>
                    Aircrafts per page:
                    <Pagination>
                        {renderPerPageNumbers}
                    </Pagination>
                </Container>
            </div>
        );
    }
}

export default AircraftList;