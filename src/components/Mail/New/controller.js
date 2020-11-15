import React from "react";
import { observer, inject } from "mobx-react";
import PropTypes from "prop-types";
import NotificationService from "Services/NotificationService";
import ApiService from "Services/ApiService";
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

        this.notificationService = new NotificationService();
        this.apiService = new ApiService();

        this.toPrevStep = this.toPrevStep.bind(this);
        this.toNextStep = this.toNextStep.bind(this);
        this.submitCallback = this.submitCallback.bind(this);

        this.state = {
            step: 0,
            result: null,
            onClickPrev: this.toPrevStep,
            onClickNext: this.toNextStep,
            onClickSubmit: this.submitCallback,
        };
    }

    toPrevStep() {
        const { step } = this.state;

        if (!this.isCompletedStep(step)) {
            this.notificationService.post("error", "请确认已提供当前步骤所需的全部信息");
            return;
        }

        if (step > 0) {
            this.setState({ step: step - 1 });
        }
    }

    toNextStep() {
        const { step } = this.state;

        if (!this.isCompletedStep(step)) {
            this.notificationService.post("error", "请确认已提供当前步骤所需的全部信息");
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

    async submitCallback() {
        const { rootStore } = this.props;
        const mailStore = rootStore.mailStore;
        const json = mailStore.exportJson();
        const result = await this.apiService.sendEmail(json);
        this.setState({ result });
    }

    render() {
        const { rootStore } = this.props;
        const mailStore = rootStore.mailStore;
        return (
            <StepContext.Provider value={this.state}>
                <Views store={mailStore} />
            </StepContext.Provider>
        );
    }
}
