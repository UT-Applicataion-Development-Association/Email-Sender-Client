import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Typography, Input } from "antd";
import { observer } from "mobx-react";

@observer
export default class TextEditor extends React.Component {
    static propTypes = {
        store: PropTypes.any,
    };

    constructor(props) {
        super(props);

        this.onInputCallback = this.onInputCallback.bind(this);
    }

    onInputCallback(e) {
        const { value } = e.target;
        const { store } = this.props;
        store.setBody(value);
    }

    render() {
        const { store } = this.props;
        const { Text } = Typography;
        const { TextArea } = Input;
        return (
            <Row className="row-text-editor">
                <Col span={3}>
                    <Text strong>正文</Text>
                </Col>
                <Col span={21}>
                    <TextArea showCount value={store.body} rows={20} onInput={this.onInputCallback} />
                </Col>
            </Row>
        );
    }
}
