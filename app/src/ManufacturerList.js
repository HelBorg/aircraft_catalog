import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Jumbotron} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';


class ManufacturerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            manufacturers: [],
            isLoading: true,
            currentPage: 1,
            manufacturersPerPage: 4
        };
        this.remove = this.remove.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangePerPage = this.handleChangePerPage.bind(this);
    }


    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/manufacturer')
            .then(response => response.json())
            .then(data => this.setState({
                manufacturers: data,
                isLoading: false
            }));
    }

    async remove(id) {
        await fetch(`/api/manufacturer/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedManufacturer = [...this.state.manufacturers].filter(i => i.id !== id);
            this.setState({manufacturers: updatedManufacturer});
        });
    }

    handleChangePage(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleChangePerPage(event) {
        this.setState({
            manufacturersPerPage: Number(event.target.id),
            currentPage: 1
        })
    }

    render() {
        const {manufacturers, isLoading, currentPage, manufacturersPerPage} = this.state;

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

        const indexOfLastManufacturer = currentPage * manufacturersPerPage + 1;
        const indexOfFirstManufacturer = indexOfLastManufacturer - manufacturersPerPage;
        const currentManufacturers = manufacturers.slice(indexOfFirstManufacturer, indexOfLastManufacturer);

        const manufacturerList = currentManufacturers.map(manufacturer => {
            if (manufacturer.id !== 1) {
                return <tr key={manufacturer.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{manufacturer.name}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{manufacturer.country}</td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="primary" tag={Link}
                                    to={"/manufacturer/edit/" + manufacturer.id}>Edit</Button>
                            <Button size="sm" color="danger"
                                    onClick={() => this.remove(manufacturer.id)}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            }
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(manufacturers.length / manufacturersPerPage); i++) {
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
        for(let i = 5; i <= Math.ceil(manufacturers.length); i = i*2) {
            perPageNumbers.push(i);
        }
        perPageNumbers.push(manufacturers.length);

        const renderPerPageNumbers = perPageNumbers.map( number => {
            if (manufacturers.length !== number) {
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
                    <h3>Manufacturer List</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="30%">Country</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {manufacturerList}
                        Page:
                        <ul id="page-numbers">
                            {renderPageNumbers}
                        </ul>
                        Manufacturers per page:
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

export default ManufacturerList;