import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Row, Col, Typography, Card } from "antd";
import NotificationService from "Services/NotificationService";
import { typeSchema as typeList } from "Configs/mail";
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

    _editorNode() {
        const { store } = this.props;
        switch (store.type) {
            case "template":
                return <TemplateEditor />;
            case "plaintext":
            default:
                return <TextEditor store={store} />;
        }
    }

    render() {
        const { store } = this.props;
        return (
            <div className="step-content">
                <TypeSelector store={store} notificationService={this.notificationService} />
                {this._editorNode(store)}
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

    updateType(value) {
        const { store, notificationService } = this.props;
        try {
            store.setType(value);
        } catch (e) {
            notificationService.post("error", "无效的邮件内容类型");
        }
    }

    render() {
        const { store } = this.props;
        const { Text } = Typography;
        return (
            <Row className="row-type-selector">
                <Col span={3}>
                    <Text strong>内容类型</Text>
                </Col>
                <Col span={21} className="selector-group">
                    {typeList.map((type) => (
                        <TypeCard
                            selected={store.type === type.name}
                            key={type.name}
                            title={type.nameZh}
                            value={type.name}
                            description={type.description}
                            icon={type.icon}
                            onClick={this.updateType}
                        />
                    ))}
                </Col>
            </Row>
        );
    }
}

class TypeCard extends React.Component {
    static propTypes = {
        selected: PropTypes.bool,
        title: PropTypes.string,
        description: PropTypes.string,
        icon: PropTypes.node,
        onClick: PropTypes.func,
        value: PropTypes.string,
    };

    _iconNode() {
        const { icon } = this.props;
        return React.cloneElement(icon, {
            className: "type-icon",
        });
    }
    render() {
        const { Meta } = Card;
        const { title, description, onClick, value, selected } = this.props;
        return (
            <Card
                size="small"
                onClick={onClick.bind(this, value)}
                className={`selector ${selected ? "is-selected" : ""}`}
            >
                <Meta avatar={this._iconNode()} title={title} description={description} />
            </Card>
        );
    }
}
