import React from "react";
import PropTypes from "prop-types";
import { Divider } from "antd";
import Attachment from "./attachment";
import Failure from "./failure";
import Progress from "./progress";
import Receiver from "./Receiver";
import Review from "./review";
import Success from "./success";
import ButtonGroup from "./buttonGroup";
import TextEditor from "./textEditor";
import BodyType from "./bodyType";

export default class Views extends React.Component {
    static propTypes = {
        step: PropTypes.number,
        onClickPrev: PropTypes.func,
        onClickNext: PropTypes.func,
        onClickSubmit: PropTypes.func,
        result: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    _moduleNode() {
        const { step, onClickNext, onClickPrev, onClickSubmit } = this.props;
        let mainModule = <></>;
        switch (step) {
            case 0:
                mainModule = <Receiver />;
                break;
            case 1:
                mainModule = <BodyType />;
                break;
            case 2:
                mainModule = <TextEditor />;
                break;
            case 3:
                mainModule = <Attachment />;
                break;
            case 4:
                mainModule = <Review />;
                break;
            default:
                mainModule = <></>;
        }
        return (
            <>
                <Progress step={step} />
                <Divider />
                {mainModule}
                <Divider />
                <ButtonGroup
                    step={step}
                    onClickNext={onClickNext}
                    onClickPrev={onClickPrev}
                    onClickSubmit={onClickSubmit}
                />
            </>
        );
    }

    _resultNode() {
        const { result } = this.props;
        return <div className="result">{result.isSuccess ? <Success info={result} /> : <Failure info={result} />}</div>;
    }

    render() {
        const { result } = this.props;
        return <div className="mail-new">{result ? this._resultNode() : this._moduleNode()}</div>;
    }
}
