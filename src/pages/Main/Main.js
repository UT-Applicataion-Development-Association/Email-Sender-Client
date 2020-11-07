import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Navbar from "./Navbar";
import Content from "./Content";

export default class Main extends React.Component {
    render() {
        return (
            <Layout className="main-container">
                <Header />
                <Layout>
                    <Navbar />
                    <Layout className="main-content-container" id="main-content-container">
                        <Content />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
