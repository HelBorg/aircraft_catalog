import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Jumbotron, Pagination, PaginationLink, PaginationItem} from 'reactstrap';
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
                    <td></td>
                    <td>
                        <ButtonGroup>
                            <Button className="btn_name" size="sm" color="primary" tag={Link} to={"/manufacturer/edit/" + manufacturer.id}>Edit</Button>
                            {/*<Button className="btn_name" size="sm" onClick={() => this.remove(manufacturer.id)}>Delete</Button>*/}
                        </ButtonGroup>
                    </td>
                </tr>
            }
        });


        //Pagination
        const pageNumbers = [];
        pageNumbers.push(1);
        const first = (currentPage - 3 < 2) ? 2 : currentPage - 3;
        const last = (currentPage + 4 > Math.ceil(manufacturers.length / manufacturersPerPage)) ?
            Math.ceil(manufacturers.length / manufacturersPerPage) - 1 : currentPage + 3;
        for (let i = first; i <= last; i++) {
            pageNumbers.push(i);
        }
        if (Math.ceil(manufacturers.length / manufacturersPerPage) !== 1) {
            pageNumbers.push(Math.ceil(manufacturers.length / manufacturersPerPage));
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


        //Manufacturers per page
        const perPageNumbers = [];
        perPageNumbers.push(2);
        for(let i = 5; i < manufacturers.length; i = i * 2) {
            perPageNumbers.push(i);
        }
        perPageNumbers.push(manufacturers.length);

        const renderPerPageNumbers = perPageNumbers.map( number => {
            let active = false;
            if (number === manufacturersPerPage) {
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
                        <Button className="btn_name" color="success" tag={Link} to="/aircraft/edit/new">Add Aircraft</Button>
                        <Button className="btn_name" color="success" tag={Link} to="/manufacturer/edit/new">Add Manufacturer</Button>
                    </div>
                    <h3>Manufacturer List</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="20%">Country</th>
                            <th width="30%"></th>
                            <th width="30%">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {manufacturerList}
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
                        Manufacturers per page:
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

export default ManufacturerList;