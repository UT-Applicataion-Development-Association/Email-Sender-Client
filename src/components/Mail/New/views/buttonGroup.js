import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { steps as stepList } from "../config";
import { StepContext } from "../controller";

export default class ButtonGroup extends React.Component {
    static propTypes = {
        onClickSubmit: PropTypes.func,
    };

    _nextBtnNode(step, onClickNext) {
        const { onClickSubmit } = this.props;
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
        return (
            <StepContext.Consumer>
                {({ step, onClickPrev, onClickNext }) => (
                    <div className="button-group">
                        <Button disabled={step <= 0} onClick={onClickPrev}>
                            上一步
                        </Button>
                        {this._nextBtnNode(step, onClickNext)}
                    </div>
                )}
            </StepContext.Consumer>
        );
    }
}
