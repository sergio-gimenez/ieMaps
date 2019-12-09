import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import InitalForm from "./InitialForm";
import Search from "./AjaxPost";
import history from './history';

class Routes extends React.Component {
    render() {
        return (
            <Router history={history} >
                <Switch>
                    <Route path="/" exact component={InitalForm} />
                    <Route path="/search" render={(props)=> <Search {...props} url="startAddress=Edificio+B3+-+Campus+Nord+UPC+1-3,+Carrer+de+Jordi+Girona,+08034+Barcelona&endAddress=Plaça+Catalunya,+Barcelona&dayOfSearch=2019-12-10+23:00:00&dis=True&taxi=False&ev=True"/>} />
                </Switch>
            </Router>
        )
    }
}

export default Routes;
