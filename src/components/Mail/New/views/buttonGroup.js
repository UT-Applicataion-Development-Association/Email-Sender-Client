import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { steps as stepList } from "../config";

export default class ButtonGroup extends React.Component {
    static propTypes = {
        step: PropTypes.number,
        onClickPrev: PropTypes.func,
        onClickNext: PropTypes.func,
        onClickSubmit: PropTypes.func,
    };

    _nextBtnNode() {
        const { step, onClickNext, onClickSubmit } = this.props;
        return step === stepList.length - 1 ? (
            <Button type="primary" className="is-primary" onClick={onClickSubmit}>
                发送
            </Button>
        ) : (
            <Button type="primary" className="is-primary" onClick={onClickNext}>
                下一步
            </Button>
        );
    }

    render() {
        const { step, onClickPrev } = this.props;
        return (
            <div className="button-group">
                <Button disabled={step <= 0} onClick={onClickPrev}>
                    上一步
                </Button>
                {this._nextBtnNode()}
            </div>
        );
    }
}
