import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import {Link} from "react-router-dom";
import Button from "reactstrap/src/Button";

class Home extends Component {
    render() {

        return (
            <div>
                <AppNavbar/>
            </div>
        );
    }
}

export default Home;