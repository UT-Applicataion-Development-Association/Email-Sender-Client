import React from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import Views from "./views";
import { steps as stepList } from "./config";

@inject("rootStore")
@observer
export default class Controller extends React.Component {
    static propTypes = {
        rootStore: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
        };
        this.toPrevStep = this.toPrevStep.bind(this);
        this.toNextStep = this.toNextStep.bind(this);
        this.submitCallback = this.submitCallback.bind(this);
    }

    toPrevStep() {
        const { step } = this.state;
        if (step > 0) {
            this.setState({ step: step - 1 });
        }
    }

    toNextStep() {
        const { step } = this.state;
        if (step < stepList.length) {
            this.setState({ step: step + 1 });
        }
    }

    submitCallback() {
        return;
    }

    render() {
        const { step } = this.state;
        return (
            <Views
                result={null}
                step={step}
                onClickPrev={this.toPrevStep}
                onClickNext={this.toNextStep}
                onClickSubmit={this.submitCallback}
            />
        );
    }
}
