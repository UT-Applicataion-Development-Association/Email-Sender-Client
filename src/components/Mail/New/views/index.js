import React from "react";
import PropTypes from "prop-types";
import { Divider } from "antd";
import Attachment from "./attachment";
import Failure from "./failure";
import Progress from "./progress";
import Recipient from "./recipient";
import Review from "./review";
import Success from "./success";
import ButtonGroup from "./buttonGroup";
import Content from "./content";
import { StepContext } from "../controller";

export default class Views extends React.Component {
    static propTypes = {
        store: PropTypes.any,
        callbacks: PropTypes.object,
        result: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    _moduleNode(step) {
        const { callbacks, store } = this.props;
        const { onClickSubmit } = callbacks;
        let mainModule = <></>;
        switch (step) {
            case 0:
                mainModule = <Recipient store={store} />;
                break;
            case 1:
                mainModule = <Content store={store} />;
                break;
            case 2:
                mainModule = <Attachment />;
                break;
            case 3:
                mainModule = <Review />;
                break;
            default:
                mainModule = <></>;
        }
        return (
            <>
                <Progress />
                <Divider />
                {mainModule}
                <Divider />
                <ButtonGroup onClickSubmit={onClickSubmit} />
            </>
        );
    }

    _resultNode() {
        const { result } = this.props;
        return <div className="result">{result.isSuccess ? <Success info={result} /> : <Failure info={result} />}</div>;
    }

    render() {
        const { result } = this.props;

        return (
            <StepContext.Consumer>
                {({ step }) => {
                    return <div className="mail-new">{result ? this._resultNode() : this._moduleNode(step)}</div>;
                }}
            </StepContext.Consumer>
        );
    }
}
