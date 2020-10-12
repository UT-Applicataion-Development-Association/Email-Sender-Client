import React from "react";
import { Layout } from "antd";

export default class Header extends React.Component {
    render() {
        const { Header } = Layout;
        return (
            <Header className="header main-header">
                <div className="logo" />
            </Header>
        );
    }
}
