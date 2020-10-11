import React from "react";
import { Route, Switch } from "react-router-dom";
import { Login, Main } from "Pages";

export default function routes() {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/" component={Main} />
        </Switch>
    );
}
