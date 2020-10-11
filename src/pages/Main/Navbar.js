import React from "react";
import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import { MailOutlined, HomeOutlined } from "@ant-design/icons";
import { NavLink, withRouter } from "react-router-dom";

class Navbar extends React.Component {
    static propTypes = {
        location: PropTypes.object,
    };

    render() {
        const { SubMenu } = Menu;
        const { Sider } = Layout;

        const currentRoute = this.props.location.pathname;
        const currentModule = `/${currentRoute.split("/")[1]}`;

        return (
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    selectedKeys={[currentRoute]}
                    defaultOpenKeys={[currentModule]}
                    style={{ height: "100%", borderRight: 0 }}
                >
                    <Menu.Item key="/" icon={<HomeOutlined />}>
                        <NavLink to="/">首页</NavLink>
                    </Menu.Item>
                    <SubMenu key="/mail" icon={<MailOutlined />} title="邮件服务">
                        <Menu.Item key="/mail/new">
                            <NavLink to="/mail/new">新建邮件</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/mail/history" disabled>
                            <NavLink to="/mail/history">历史记录</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/mail/template" disabled>
                            <NavLink to="/mail/template">模版管理</NavLink>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(Navbar);
