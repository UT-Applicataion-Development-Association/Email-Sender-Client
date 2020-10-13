import React from "react";
import { Layout } from "antd";
import LogoutButton from "../../components/Home/LogoutButton";

export default class Header extends React.Component {
    render() {
        const { Header } = Layout;
        return (
            <Header className="header main-header">
                <div className="logo">
                    <LogoutButton />
                </div>
            </Header>
        );
    }
}
