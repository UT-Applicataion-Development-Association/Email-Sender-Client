import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Row, Col, Typography, Upload, Button, Divider, Input, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { isValidEmail } from "Utils/validator";
import ExcelService from "Services/ExcelService";

@observer
export default class Receiver extends React.Component {
    static propTypes = {
        store: PropTypes.any,
    };

    constructor(props) {
        super(props);

        this.inputList = [
            { title: "收件人", type: "to" },
            { title: "抄送", type: "cc" },
            { title: "密送", type: "bcc" },
        ];
        this.addEmailCallback = this.addEmailCallback.bind(this);
        this.deleteEmailCallback = this.deleteEmailCallback.bind(this);
    }

    addEmailCallback(email, type) {
        const { store } = this.props;

        try {
            store.addReceiver(email, type);
        } catch (e) {
            // Handle the error
            return false;
        }
        return true;
    }

    deleteEmailCallback(email, type) {
        const { store } = this.props;
        store.deleteReceiver(email, type);
    }

    render() {
        const { store } = this.props;
        return (
            <div className="receiver" style={{ padding: "32px" }}>
                <FileUpload addEmailCallback={this.addEmailCallback} />
                <Divider />
                {this.inputList.map((item) => (
                    <EmailInput
                        key={item.type}
                        title={item.title}
                        type={item.type}
                        store={store}
                        addEmailCallback={this.addEmailCallback}
                        deleteEmailCallback={this.deleteEmailCallback}
                    />
                ))}
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
        addEmailCallback: PropTypes.func,
        deleteEmailCallback: PropTypes.func,
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

    onValueChange(e) {
        const { value } = e.target;
        this.setState({ isValid: isValidEmail(value), value });
    }

    onValueSave() {
        const { isValid, value } = this.state;
        const { type, addEmailCallback } = this.props;
        if (!isValid) {
            return;
        }
        if (addEmailCallback(value, type)) {
            this.setState({ value: "", isValid: false });
        }
    }

    _emailTagNode(email) {
        const { deleteEmailCallback, type } = this.props;
        return (
            <Tag closable key={email} onClose={() => deleteEmailCallback(email, type)} style={{ marginBottom: "8px" }}>
                {email}
            </Tag>
        );
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
                        {store.getReceivers(type).map((item) => this._emailTagNode(item))}
                    </div>
                </Col>
            </Row>
        );
    }
}

class FileUpload extends React.Component {
    static propTypes = {
        addEmailCallback: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.fileParser = this.fileParser.bind(this);
        this.templateDownloader = this.templateDownloader.bind(this);
    }

    async fileParser(options) {
        const { addEmailCallback } = this.props;
        const { file } = options;
        try {
            const xlsx = new ExcelService();
            await xlsx.loadFromBlob(file);
            const arr = xlsx.convertSheetToArray();
            if (arr.length === 0) {
                /** error */
            }

            const header = arr[0];
            for (let j = 0; j < header.length; j++) {
                if (!["to", "cc", "bcc"].includes(header[j])) {
                    continue;
                }
                for (let i = 1; i < arr.length; i++) {
                    addEmailCallback(arr[i][j], header[j]);
                }
            }
        } catch (e) {
            /** handle error */
        }
    }

    templateDownloader() {
        const xlsx = new ExcelService();
        xlsx.createWorkbook();
        xlsx.addSheetFromArray([["to", "cc", "bcc"]], "upload");
        xlsx.downloadWorkbook("template.xlsx");
    }

    render() {
        const { Text, Link } = Typography;
        const props = {
            customRequest: this.fileParser,
            showUploadList: false,
        };
        return (
            <Row>
                <Col span={3}>
                    <Text strong>文件导入</Text>
                </Col>
                <Col span={21}>
                    <Text style={{ display: "block", marginBottom: "12px" }}>
                        上传包含指定收件人、抄送和密送邮箱地址的表单文件（仅支持.xlsx格式）
                    </Text>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>上传文件</Button>
                    </Upload>
                    <Link style={{ marginLeft: "24px" }} onClick={this.templateDownloader}>
                        下载模版
                    </Link>
                </Col>
            </Row>
        );
    }
}
