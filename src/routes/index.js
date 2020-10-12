import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrimaryRoutes from "./primary";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                {PrimaryRoutes.map((route, key) => (
                    <Route key={key} {...route} />
                ))}
            </Switch>
        </BrowserRouter>
    );
}
