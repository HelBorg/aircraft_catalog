import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';

class ManufacturerEdit extends Component {

    emptyManufacturer = {
        name: '',
        country: ' '
    };

    constructor(props) {
        super(props);
        this.state = {
            manufacturer: this.emptyManufacturer
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {

        if (this.props.match.params.id !== 'new') {
            const manufacturer = await (await fetch(`/api/manufacturer/${this.props.match.params.id}`)).json();
            this.setState({manufacturer: manufacturer});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let manufacturer = {...this.state.manufacturer};
        manufacturer[name] = value;
        this.setState({manufacturer});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {manufacturer} = this.state;

        await fetch('/api/manufacturer/edit/new', {
            method: (manufacturer.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(manufacturer),
            credentials: 'include'
        });
        this.props.history.push('/manufacturer');
    }

    render() {
        const {manufacturer} = this.state;
        const title = <h2>{manufacturer.id ? 'Edit Manufacturer' : 'AddManufacturer'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={manufacturer.name || ''}
                               onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="country">Country</Label>
                        <Input type="text" name="country" id="country" value={manufacturer.country || ''}
                               onChange={this.handleChange} autoComplete="country"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="secondary" tag={Link} to="/manufacturer">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(ManufacturerEdit);