import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Navbar from "./Navbar";
import SecondaryRoutes from "Routes/secondary";

export default class Main extends React.Component {
    render() {
        const { Content } = Layout;

        return (
            <Layout style={{ height: "100%" }}>
                <Header />
                <Layout>
                    <Navbar />
                    <Layout style={{ padding: "24px" }}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: "white",
                            }}
                        >
                            <SecondaryRoutes />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}
