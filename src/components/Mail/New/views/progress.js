import React from "react";
import PropTypes from "prop-types";
import { Steps } from "antd";
import { steps as stepList } from "../config";

export default class Progress extends React.Component {
    static propTypes = {
        step: PropTypes.number,
    };

    render() {
        const { Step } = Steps;
        const stepIndex = this.props.step;
        return (
            <Steps current={stepIndex} className="progress" size="small">
                {stepList.map((item) => (
                    <Step key={item.name} title={item.name} description={item.description} />
                ))}
            </Steps>
        );
    }
}
