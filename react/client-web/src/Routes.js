import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import InitalForm from "./InitialForm";
import Search from "./AjaxPost";
import View from "./View";
import history from './history';

class Routes extends React.Component {
    render() {
        return (
            <Router history={history} >
                <Switch>
                    <Route path="/" exact component={InitalForm} />
                    <Route path="/search" render={(props)=> <Search {...props} url={history.location.pathname}/>} />
                    <Route path="/view" component={View}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes;
