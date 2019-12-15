import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import './css/App.css';
import InitalForm from "./InitialForm";
import Search from "./AjaxPost";
import history from './history';

class Routes extends React.Component {
    render() {
        return (
            <Router history={history} >
                <Switch>
                    <Route path="/" exact component={InitalForm} />
                    <Route path="/search" render={(props) => <Search {...props} url={history.location.pathname.substring(8).replace(/ /g, "%20")}/> } 
                    />
                </Switch>
            </Router>
        )
    }
}

export default Routes;
