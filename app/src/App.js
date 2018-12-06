import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import AircraftEdit from './AircraftEdit';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AircraftList from './AircraftList';
import ManufacturerList from './ManufacturerList'
import ManufacturerEdit from "./ManufacturerEdit";

class App extends Component {

    render() {
        return (
            <div className="pad_menu">
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Home}/>
                        {/*<Route path='/aircraft/:id' component={Aircraft}>*/}
                        <Route path='/aircraft' exact={true} component={AircraftList}/>
                        <Route path='/aircraft/edit/:id' component={AircraftEdit}/>
                        <Route path='/manufacturer' exact={true} component={ManufacturerList}/>
                        <Route path='/manufacturer/edit/:id' component={ManufacturerEdit}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;