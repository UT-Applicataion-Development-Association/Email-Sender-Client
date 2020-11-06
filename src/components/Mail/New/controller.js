import React from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import Views from "./views";
import { steps as stepList } from "./config";

export const StepContext = React.createContext();

@inject("rootStore")
@observer
export default class Controller extends React.Component {
    static propTypes = {
        rootStore: PropTypes.any,
    };

    constructor(props) {
        super(props);

        this.toPrevStep = this.toPrevStep.bind(this);
        this.toNextStep = this.toNextStep.bind(this);
        this.submitCallback = this.submitCallback.bind(this);

        this.state = {
            step: 0,
            onClickPrev: this.toPrevStep,
            onClickNext: this.toNextStep,
        };
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
        const { rootStore } = this.props;
        const mailStore = rootStore.mailStore;
        const callbacks = { submitCallback: this.submitCallback };
        return (
            <StepContext.Provider value={this.state}>
                <Views store={mailStore} result={null} callbacks={callbacks} />
            </StepContext.Provider>
        );
    }
}
