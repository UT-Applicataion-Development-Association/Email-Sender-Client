import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Row, Col, Typography, Upload, Button, Divider, Input, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { isValidEmail } from "Utils/validator";

export default class Receiver extends React.Component {
    static propTypes = {
        store: PropTypes.any,
    };

    render() {
        const { store } = this.props;
        return (
            <div className="receiver" style={{ padding: "32px" }}>
                <FileUpload />
                <Divider />
                <EmailInput title="收件人" type="to" store={store} />
                <EmailInput title="抄送" type="cc" store={store} />
                <EmailInput title="密送" type="bcc" store={store} />
            </div>
        );
    }
}

@observer
class EmailInput extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        type: PropTypes.oneOf(["to", "cc", "bcc"]),
        store: PropTypes.any,
    };

    constructor(props) {
        super(props);

        this.onValueChange = this.onValueChange.bind(this);
        this.onValueSave = this.onValueSave.bind(this);
        this.state = {
            isValid: false,
            value: "",
        };
    }

    _emailTagNode(email) {
        return (
            <Tag closable onClose={null} style={{ marginBottom: "8px" }}>
                {email}
            </Tag>
        );
    }

    onValueChange(e) {
        const { value } = e.target;
        this.setState({ isValid: isValidEmail(value), value });
    }

    onValueSave() {
        const { isValid, value } = this.state;
        const { type, store } = this.props;
        if (!isValid) {
            return;
        }

        try {
            store.addReceiver(value, type);
            this.setState({ isValid: false, value: "" });
        } catch (e) {
            // Handle the error
        }
    }

    render() {
        const { title, store, type } = this.props;
        const { isValid, value } = this.state;
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
                        value={value}
                        style={{ width: "40%", maxWidth: "600px", minWidth: "250px" }}
                        enterButton={<Button disabled={!isValid}>+</Button>}
                        onChange={this.onValueChange}
                        onPressEnter={this.onValueSave}
                        onSearch={this.onValueSave}
                    />
                    <div style={{ marginTop: "12px" }}>
                        {store.getReceivers(type).map((item) => (
                            <Tag closable key={item} onClose={null}>
                                {item}
                            </Tag>
                        ))}
                    </div>
                </Col>
            </Row>
        );
    }
}

class FileUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { Text } = Typography;
        const props = {};
        return (
            <Row>
                <Col span={3}>
                    <Text strong>列表上传</Text>
                </Col>
                <Col span={21}>
                    <Text style={{ display: "block", marginBottom: "12px" }}>
                        上传包含指定收件人、抄送和密送邮箱地址的表单文件（仅支持.xlsx格式）
                    </Text>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Col>
            </Row>
        );
    }
}
