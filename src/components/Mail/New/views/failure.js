import React from "react";
import PropTypes from "prop-types";
import { Result, Button, Typography } from "antd";

const { Paragraph, Text } = Typography;

export default class Failure extends React.Component {
    static propTypes = {
        info: PropTypes.object,
    };

    render() {
        return (
            <Result
                status="error"
                title="服务器无法受理该发件请求"
                subTitle="请根据返回的错误信息判断是否需要重试或联系开发组。"
                extra={[
                    <Button type="primary" key="history">
                        查看邮件记录
                    </Button>,
                    <Button key="retry">再试一次</Button>,
                ]}
            >
                <div className="desc">
                    <Paragraph>
                        <Text
                            strong
                            style={{
                                fontSize: 16,
                            }}
                        >
                            错误信息如下：
                        </Text>
                    </Paragraph>
                    <Paragraph>Error 500: Internal Server Error</Paragraph>
                </div>
            </Result>
        );
    }
}
