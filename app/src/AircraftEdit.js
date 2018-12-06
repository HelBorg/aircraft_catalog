import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';

class AircraftEdit extends Component {

    emptyAircraft = {
        number: '',
        model: ' ',
        year: ' ',
        capacity: ' ',
        manufacturer: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            aircraft: this.emptyAircraft,
            manufacturers: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const responseManufacturer = await fetch('/api/manufacturer');
        const bodyManufacturer = await responseManufacturer.json();
        this.emptyAircraft.manufacturer = bodyManufacturer[0];
        this.setState({manufacturers: bodyManufacturer});

        if (this.props.match.params.id !== 'new') {
            const aircraft = await (await fetch(`/api/aircraft/${this.props.match.params.id}`)).json();
            this.setState({aircraft: aircraft});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let aircraft = {...this.state.aircraft};
        if (name === "manufacturer") {
            aircraft[name] = this.state.manufacturers.find(manufacturer => manufacturer.id.toLocaleString() === value.toString());
        } else {
            aircraft[name] = value;
        }
        this.setState({aircraft});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {aircraft} = this.state;

        await fetch('/api/aircraft/edit/new', {
            method: (aircraft.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aircraft),
            credentials: 'include'
        });
        this.props.history.push('/aircraft');
    }

    render() {
        const {aircraft, manufacturers} = this.state;
        const title = <h2>{aircraft.id ? 'Edit Aircraft' : 'Add Aircraft'}</h2>;

        let selectedNotPres = 1;
        const manufacturerList = manufacturers.map( manufacturer => {
            if (manufacturer.id !== 1) {
                if ((aircraft.manufacturer)&&(selectedNotPres === 1)) {
                    if (aircraft.manufacturer.id === manufacturer.id) {
                        selectedNotPres = 0;
                        return (
                            <option selected>
                                {manufacturer.name}
                            </option>
                        );
                    }
                }
                return (
                    <option value={manufacturer.id}>
                        {manufacturer.name}
                    </option>
                );
            }
        });

        const manufListFinal = [];
        if (selectedNotPres) {
            manufListFinal.push(<option selected>Choose...</option>);
        }
        manufListFinal.push(manufacturerList);

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="number">Number</Label>
                        <Input type="text" name="number" id="number" value={aircraft.number || ''}
                               onChange={this.handleChange} autoComplete="number"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="model">Model</Label>
                        <Input type="text" name="model" id="model" value={aircraft.model || ''}
                               onChange={this.handleChange} autoComplete="model"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="year">Year</Label>
                        <Input type="text" name="year" id="year" value={aircraft.year || ''}
                               onChange={this.handleChange} autoComplete="year"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="capacity">Capacity</Label>
                        <Input type="text" name="capacity" id="capacity" value={aircraft.capacity || ''}
                               onChange={this.handleChange} autoComplete="capacity"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="manufacturer">Manufacturer</Label>
                        <Input type="select"  name="manufacturer"
                               id="manufacturer"
                               onChange={this.handleChange}>
                            {manufListFinal}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="secondary" tag={Link} to="/aircraft">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(AircraftEdit);