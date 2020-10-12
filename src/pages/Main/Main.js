import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Navbar from "./Navbar";
import Content from "./Content";

export default class Main extends React.Component {
    render() {
        return (
            <Layout style={{ height: "100%" }}>
                <Header />
                <Layout>
                    <Navbar />
                    <Layout style={{ padding: "24px" }}>
                        <Content />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
