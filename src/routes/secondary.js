import React from "react";
import { Route, Switch } from "react-router-dom";
import Mail from "Components/Mail";
import Home from "Components/Home";

export default function routes() {
    return (
        <Switch>
            <Route path="/mail" component={Mail} />
            <Route path="/" component={Home} />
        </Switch>
    );
}
