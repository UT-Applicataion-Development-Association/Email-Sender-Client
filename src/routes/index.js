import React from "react";
import { Provider } from "mobx-react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RootStore from "Models/root-store";
import PrimaryRoutes from "./primary";

export default class Router extends React.Component {
    constructor(props) {
        super(props);
        this.rootStore = new RootStore();
    }

    render() {
        return (
            <Provider rootStore={this.rootStore}>
                <BrowserRouter>
                    <Switch>
                        {PrimaryRoutes.map((route, key) => (
                            <Route key={key} {...route} />
                        ))}
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}
