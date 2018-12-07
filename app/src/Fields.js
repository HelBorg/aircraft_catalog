import React, {Component} from 'react';

export default class Fields extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
    }

    render() {
        const aircraftSort = [];
        aircraftSort.push(<option value={0}>Choose...</option>);
        aircraftSort.push(<option name="number">Number</option>);
        aircraftSort.push(<option name="model">Model</option>);
        aircraftSort.push(<option name="year">Year</option>);
        aircraftSort.push(<option name="capacity">Capacity</option>);
        return aircraftSort;
    }
}