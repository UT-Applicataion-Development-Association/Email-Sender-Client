import React from "react";
import { Layout } from "antd";
import Header from "./Header";
import Navbar from "./Navbar";
import Content from "./Content";
import { withAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";

class Main extends React.Component {
    render() {
        // eslint-disable-next-line react/prop-types
        const { isLoading, isAuthenticated } = this.props.auth0;
        if (isLoading) {
            return <Loading />;
        }
        return (
            isAuthenticated && (
                <Layout className="main-container">
                    <Header />
                    <Layout>
                        <Navbar />
                        <Layout className="main-content-container">
                            <Content />
                        </Layout>
                    </Layout>
                </Layout>
            )
        );
    }
}

export default withAuth0(Main);
