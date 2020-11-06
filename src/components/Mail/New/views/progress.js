import React from "react";
import { Steps } from "antd";
import { steps as stepList } from "../config";
import { StepContext } from "../controller";

export default class Progress extends React.Component {
    render() {
        const { Step } = Steps;
        return (
            <StepContext.Consumer>
                {({ step }) => (
                    <Steps current={step} className="progress" size="small">
                        {stepList.map((item) => (
                            <Step key={item.name} title={item.name} description={item.description} />
                        ))}
                    </Steps>
                )}
            </StepContext.Consumer>
        );
    }
}
