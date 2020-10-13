import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrimaryRoutes from "./primary";
import { Auth0Provider } from "@auth0/auth0-react";

export default function Router() {
    return (
        <BrowserRouter>
            <Auth0Provider
                domain={"utada.us.auth0.com"}
                clientId={"Vk6a2Z851kEAKIdM25snNfXu2OO9rYAm"}
                redirectUri={window.location.origin} // eslint-disable-line
            >
                <Switch>
                    {PrimaryRoutes.map((route, key) => (
                        <Route key={key} {...route} />
                    ))}
                </Switch>
            </Auth0Provider>
        </BrowserRouter>
    );
}
