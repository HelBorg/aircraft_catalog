import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import AircraftEdit from './AircraftEdit';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AircraftList from './AircraftList';

class App extends Component {
    render() {
        return (
            <div className="pad_menu">
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/aircrafts' exact={true} component={AircraftList}/>
                    <Route path='/aircraft/:id' component={AircraftEdit}/>
                </Switch>
            </Router>
            </div>
        )
    }
}

export default App;