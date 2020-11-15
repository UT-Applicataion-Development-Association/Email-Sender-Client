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
    };

    constructor(props) {
        super(props);
    }

    _moduleNode(step) {
        const { store } = this.props;
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
                <ButtonGroup />
            </>
        );
    }

    _resultNode(result) {
        return <div className="result">{result.isSuccess ? <Success info={result} /> : <Failure info={result} />}</div>;
    }

    render() {
        return (
            <StepContext.Consumer>
                {({ step, result }) => {
                    return <div className="mail-new">{result ? this._resultNode(result) : this._moduleNode(step)}</div>;
                }}
            </StepContext.Consumer>
        );
    }
}
