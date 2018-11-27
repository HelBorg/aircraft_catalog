import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavbar';

class AircraftEdit extends Component {

    emptyItem = {
        number: '',
        model: '',
        year: '',
        capacity: '',
        // manufacturer: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const aircraft = await (await fetch(`/api/aircraft/${this.props.match.params.id}`)).json();
            this.setState({item: aircraft});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/aircraft', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/aircrafts');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Aircraft' : 'Add Aircraft'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="number">Number</Label>
                        <Input type="text" name="number" id="number" value={item.number || ''}
                               onChange={this.handleChange} autoComplete="number"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="model">Model</Label>
                        <Input type="text" name="model" id="model" value={item.model || ''}
                               onChange={this.handleChange} autoComplete="model"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="year">Year</Label>
                        <Input type="text" name="year" id="year" value={item.year || ''}
                               onChange={this.handleChange} autoComplete="year"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="capacity">Capacity</Label>
                        <Input type="text" name="capacity" id="capacity" value={item.capacity || ''}
                               onChange={this.handleChange} autoComplete="capacity"/>
                    </FormGroup>
                    {/*<FormGroup>*/}
                        {/*<Label for="manufacturer">Manufacturer</Label>*/}
                        {/*<Input type="text" name="manufacturer" id="manufacturer" value={item.manufacturer || ''}*/}
                               {/*onChange={this.handleChange} autoComplete="manufacturer"/>*/}
                    {/*</FormGroup>*/}
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/aircrafts">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(AircraftEdit);