import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Row, Col, Typography, Radio } from "antd";
import NotificationService from "Services/NotificationService";
import TemplateEditor from "./templateEditor";
import TextEditor from "./textEditor";

@observer
export default class Content extends React.Component {
    static propTypes = {
        store: PropTypes.any,
    };

    constructor(props) {
        super(props);

        this.notificationService = new NotificationService();
    }

    _editorNode(type) {
        switch (type) {
            case "template":
                return <TemplateEditor />;
            case "plaintext":
            default:
                return <TextEditor />;
        }
    }

    render() {
        const { store } = this.props;
        return (
            <div className="step-content">
                <TypeSelector store={store} notificationService={this.notificationService} />
                {this._editorNode(store.type)}
            </div>
        );
    }
}

@observer
class TypeSelector extends React.Component {
    static propTypes = {
        store: PropTypes.any,
        notificationService: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.updateType = this.updateType.bind(this);
    }

    updateType(e) {
        const { store, notificationService } = this.props;
        const { value } = e.target;
        try {
            store.setType(value);
        } catch (e) {
            notificationService.post("error", `无效的邮件内容类型`);
        }
    }

    render() {
        const { store } = this.props;
        const { Text } = Typography;
        return (
            <Row className="row-text-input">
                <Col span={3}>
                    <Text strong>内容类型</Text>
                </Col>
                <Col span={21}>
                    <Radio.Group onChange={this.updateType} defaultValue={store.type}>
                        <Radio.Button value="plaintext">纯文本</Radio.Button>
                        <Radio.Button value="template">模版</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
        );
    }
}

// class TypeCard extends React.Component {}
