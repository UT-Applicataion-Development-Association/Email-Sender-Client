import React from "react";
import { Button } from "antd";
import { steps as stepList } from "../config";
import { StepContext } from "../controller";

export default class ButtonGroup extends React.Component {
    _nextBtnNode(step, onClickNext, onClickSubmit) {
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
                {({ step, onClickPrev, onClickNext, onClickSubmit }) => (
                    <div className="button-group">
                        <Button disabled={step <= 0} onClick={onClickPrev}>
                            上一步
                        </Button>
                        {this._nextBtnNode(step, onClickNext, onClickSubmit)}
                    </div>
                )}
            </StepContext.Consumer>
        );
    }
}
