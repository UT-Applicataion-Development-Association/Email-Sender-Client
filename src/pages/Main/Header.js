import React from "react";
import { Layout } from "antd";

export default class Header extends React.Component {
    render() {
        const { Header } = Layout;
        return (
            <Header className="header">
                <div
                    className="logo"
                    style={{
                        width: "120px",
                        height: "31px",
                        background: "rgba(255, 255, 255, 0.2)",
                        margin: "16px 28px 16px 0",
                        float: "left",
                    }}
                />
            </Header>
        );
    }
}
