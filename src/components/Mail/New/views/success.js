import React from "react";
import PropTypes from "prop-types";
import { Result, Button } from "antd";

export default class Success extends React.Component {
    static propTypes = {
        info: PropTypes.object,
    };

    render() {
        return (
            <Result
                status="success"
                title="新邮件请求已发送至服务器"
                subTitle="邮件发出速度受请求量影响，可能会有一定延迟。"
                extra={[
                    <Button type="primary" key="history">
                        查看邮件记录
                    </Button>,
                    <Button key="new">发送新邮件</Button>,
                ]}
            />
        );
    }
}
