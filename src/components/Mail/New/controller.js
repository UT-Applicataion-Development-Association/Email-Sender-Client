import React from "react";
import Views from "./views";

export default class Controller extends React.Component {
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
        if (step < 4) {
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
                result={{ isSuccess: false }}
                step={step}
                onClickPrev={this.toPrevStep}
                onClickNext={this.toNextStep}
                onClickSubmit={this.submitCallback}
            />
        );
    }
}
