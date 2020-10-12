import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import getComponentRoutes from "./Routes";

export default class Mail extends React.Component {
    static propTypes = {
        match: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.rootRoute = this.props.match.path;
    }

    render() {
        return (
            <Switch>
                {getComponentRoutes(this.rootRoute).map((route, key) => (
                    <Route key={key} {...route} />
                ))}
            </Switch>
        );
    }
}
