import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavItem, NavLink} from 'reactstrap';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar dark expand="md" color="dark" >
            <Nav>
                <NavItem>
                    <NavLink eventKey='1' href="/">AircraftManager</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink eventKey='2' href="/aircraft">Manage Aircrafts</NavLink>
                </NavItem>

                <NavItem>
                    <NavLink eventKey='3' href="/manufacturer">Manage Manufacturers</NavLink>
                </NavItem>
            </Nav>

            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink
                            href="https://twitter.com/">@helenBorg</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="https://github.com/HelBorg?tab=repositories">GitHub</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}