import React from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";
import SecondaryRoutes from "Routes/secondary";

export default class Content extends React.Component {
    render() {
        const { Content } = Layout;
        return (
            <Content className="main-content">
                <Switch>
                    {SecondaryRoutes.map((route, key) => (
                        <Route key={key} {...route} />
                    ))}
                </Switch>
            </Content>
        );
    }
}
