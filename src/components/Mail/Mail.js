import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import History from "./History";
import Template from "./Template";
import New from "./New";

export default class Mail extends React.Component {
    static propTypes = {
        match: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.route = this.props.match.path;
    }

    render() {
        return (
            <Switch>
                <Route exact path={`${this.route}/new`} component={New} />
                <Route exact path={`${this.route}/history`} component={History} />
                <Route exact path={`${this.route}/template`} component={Template} />
                <Route path={`${this.route}`} component={New} />
            </Switch>
        );
    }
}
