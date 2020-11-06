import React from "react";
import { Row, Col, Typography, Upload, Button, Divider, Input, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default class Receiver extends React.Component {
    emailTagNode(email) {
        return (
            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                {email}
            </Tag>
        );
    }

    render() {
        const { Text } = Typography;
        const { Search } = Input;
        const props = {};
        return (
            <div className="receiver" style={{ padding: "32px" }}>
                <Row>
                    <Col span={3}>
                        <Text strong>列表上传</Text>
                    </Col>
                    <Col span={21}>
                        <Text style={{ display: "block", marginBottom: "12px" }}>
                            上传包含指定收件人、抄送和密送邮箱地址的表单文件（仅支持.xlsx文件）
                        </Text>
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={3}>
                        <Text strong>收件人</Text>
                    </Col>
                    <Col span={21}>
                        <Search
                            allowClear
                            onSearch={null}
                            onPressEnter={null}
                            onChange={null}
                            style={{ width: 200 }}
                            enterButton={<Button>+</Button>}
                        />
                        <div style={{ marginTop: "12px" }}>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                                Tag 2
                            </Tag>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: "48px" }}>
                    <Col span={3}>
                        <Text strong>抄送</Text>
                    </Col>
                    <Col span={21}>
                        <Search allowClear onSearch={null} style={{ width: 200 }} enterButton={<Button>+</Button>} />
                        <div style={{ marginTop: "12px" }}>
                            <Tag closable onClose={null}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null}>
                                test@gmail.com
                            </Tag>
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: "48px" }}>
                    <Col span={3}>
                        <Text strong>密送</Text>
                    </Col>
                    <Col span={21}>
                        <Search allowClear onSearch={null} style={{ width: 200 }} enterButton={<Button>+</Button>} />
                        <div style={{ marginTop: "12px" }}>
                            <Tag closable onClose={null}>
                                Tag 2
                            </Tag>
                            <Tag closable onClose={null}>
                                test@gmail.com
                            </Tag>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
