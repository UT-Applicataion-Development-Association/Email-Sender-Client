import React from "react";
import { Row, Col, Typography, Upload, Button, Divider, Input, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default class Receiver extends React.Component {
    getFileUploadNode() {
        const props = {};
        const { Text } = Typography;
        return (
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
        );
    }

    getEmailInputNode(title) {
        const { Text } = Typography;
        const { Search } = Input;
        return (
            <Row style={{ marginTop: "48px" }}>
                <Col span={3}>
                    <Text strong>{title}</Text>
                </Col>
                <Col span={21}>
                    <Search
                        allowClear
                        onSearch={null}
                        style={{ width: "40%", maxWidth: "600px", minWidth: "250px" }}
                        enterButton={<Button>+</Button>}
                    />
                    <div style={{ marginTop: "12px" }}>
                        <Tag closable onClose={null}>
                            test@gmail.com
                        </Tag>
                    </div>
                </Col>
            </Row>
        );
    }

    getEemailTagNode(email) {
        return (
            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                {email}
            </Tag>
        );
    }

    render() {
        return (
            <div className="receiver" style={{ padding: "32px" }}>
                {this.getFileUploadNode()}
                <Divider />
                {this.getEmailInputNode("收件人")}
                {this.getEmailInputNode("抄送")}
                {this.getEmailInputNode("密送")}
            </div>
        );
    }
}
