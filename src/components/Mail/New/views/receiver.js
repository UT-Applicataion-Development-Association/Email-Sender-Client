import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Row, Col, Typography, Upload, Button, Divider, Input, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { isValidEmail } from "Utils/validator";
import ExcelService from "Services/ExcelService";
import NotificationService from "Services/NotificationService";
import { receiverSchema as inputList } from "Configs/mail";
import { DuplicationError, ValidationError } from "Configs/error";

@observer
export default class Receiver extends React.Component {
    static propTypes = {
        store: PropTypes.any,
    };

    constructor(props) {
        super(props);

        this.notificationService = new NotificationService();
        this.addEmailCallback = this.addEmailCallback.bind(this);
        this.deleteEmailCallback = this.deleteEmailCallback.bind(this);
    }

    addEmailCallback(email, type) {
        const { store } = this.props;

        try {
            store.addReceiver(email, type);
        } catch (e) {
            if (e instanceof DuplicationError) {
                this.notificationService.post("error", `列表中已包含邮箱地址 ${email}`);
            } else if (e instanceof ValidationError) {
                this.notificationService.post("error", `无效的邮箱地址 ${email}`);
            }
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
            <div className="step-receiver">
                <FileUpload addEmailCallback={this.addEmailCallback} />
                <Divider />
                {inputList.map((item) => (
                    <EmailInput
                        key={item.name}
                        title={item.nameZh}
                        type={item.name}
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
        type: PropTypes.oneOf(inputList.map((el) => el.name.toLowerCase())),
        store: PropTypes.any,
        addEmailCallback: PropTypes.func,
        deleteEmailCallback: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.notificationService = new NotificationService();
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
            this.notificationService.post("error", `无效的邮箱地址 ${value}`);
            return;
        }
        if (addEmailCallback(value, type)) {
            this.setState({ value: "", isValid: false });
        }
    }

    _emailTagNode(email) {
        const { deleteEmailCallback, type } = this.props;
        return (
            <Tag closable key={email} onClose={deleteEmailCallback.bind(this, email, type)} className="input-tag">
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
            <Row className="row-text-input">
                <Col span={3}>
                    <Text strong>{title}</Text>
                </Col>
                <Col span={21}>
                    <Search
                        className="input-bar"
                        allowClear
                        value={value}
                        enterButton={<Button disabled={!isValid}>+</Button>}
                        onChange={this.onValueChange}
                        onPressEnter={this.onValueSave}
                        onSearch={this.onValueSave}
                    />
                    <div className="input-tags">{store.getReceivers(type).map((item) => this._emailTagNode(item))}</div>
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

        const receiverTypes = inputList.map((el) => el.name.toLowerCase());
        try {
            const xlsx = new ExcelService();
            await xlsx.loadFromBlob(file);
            const arr = xlsx.convertSheetToArray();
            if (arr.length === 0) {
                throw new ValidationError("Invalid format");
            }

            const header = arr[0];
            for (let j = 0; j < header.length; j++) {
                if (!receiverTypes.includes(header[j])) {
                    continue;
                }
                for (let i = 1; i < arr.length; i++) {
                    addEmailCallback(arr[i][j], header[j]);
                }
            }
        } catch (e) {
            this.notificationService.post("error", "文件错误，请确认格式遵循范例模版");
        }
    }

    templateDownloader() {
        const receiverTypes = inputList.map((el) => el.name.toLowerCase());

        const xlsx = new ExcelService();
        xlsx.createWorkbook();
        xlsx.addSheetFromArray([receiverTypes], "upload");
        xlsx.downloadWorkbook("template.xlsx");
    }

    render() {
        const { Text, Link } = Typography;
        const props = {
            customRequest: this.fileParser,
            showUploadList: false,
            accept: ".xlsx",
        };
        return (
            <Row className="row-file-input">
                <Col span={3}>
                    <Text strong>文件导入</Text>
                </Col>
                <Col span={21}>
                    <Text className="input-description">
                        上传包含指定收件人、抄送和密送邮箱地址的表单文件（
                        <Link onClick={this.templateDownloader}>下载模版</Link>）
                    </Text>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>上传文件</Button>
                    </Upload>
                </Col>
            </Row>
        );
    }
}
