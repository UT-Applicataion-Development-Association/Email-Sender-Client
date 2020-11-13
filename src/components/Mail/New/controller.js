import React from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import NotificationService from "Services/NotificationService";
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

        this.NotificationService = new NotificationService();

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

        if (!this.isCompletedStep(step)) {
            this.NotificationService.post("error", "请确认已提供当前步骤所需的全部信息");
            return;
        }

        if (step > 0) {
            this.setState({ step: step - 1 });
        }
    }

    toNextStep() {
        const { step } = this.state;

        if (!this.isCompletedStep(step)) {
            this.NotificationService.post("error", "请确认已提供当前步骤所需的全部信息");
            return;
        }

        if (step < stepList.length) {
            this.setState({ step: step + 1 });
        }
    }

    isCompletedStep(step) {
        const { rootStore } = this.props;
        const mailStore = rootStore.mailStore;
        switch (step) {
            case 0:
                return mailStore.hasValidReceivers;
            default:
                return true;
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
