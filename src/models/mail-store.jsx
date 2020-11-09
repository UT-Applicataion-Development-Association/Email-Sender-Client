import React from "react";
import { observable, configure, makeObservable, action } from "mobx";
import { FileTextOutlined, AlignLeftOutlined } from "@ant-design/icons";
import { isValidEmail } from "Utils/validator";
import { ValidationError, DuplicationError, InvalidArgumentError } from "Configs/error";

configure({ enforceActions: "observed" });

export default class MailStore {
    @observable type;

    @observable to;

    @observable cc;

    @observable bcc;

    @observable templateId;

    @observable attachments;

    @observable body;

    constructor() {
        makeObservable(this);

        this.contentTypes = typeSchema.map((el) => el.name.toLowerCase());
        this.receiverTypes = receiverSchema.map((el) => el.name.toLowerCase());
        this.reset();
    }

    @action reset() {
        this.type = "plaintext";
        this.to = new Map();
        this.cc = new Map();
        this.bcc = new Map();
        this.templateId = null;
        this.attachments = [];
        this.body = null;
    }

    @action addReceiver(email, type) {
        if (!this.receiverTypes.includes(type)) {
            throw new InvalidArgumentError("Invalid argument: type");
        }

        if (this[type].has(email)) {
            throw new DuplicationError("Registered email");
        }

        if (!isValidEmail(email)) {
            throw new ValidationError("Invalid email address");
        }

        this[type].set(email, { email, parameters: {} });
    }

    @action deleteReceiver(email, type) {
        if (!this.receiverTypes.includes(type)) {
            throw new InvalidArgumentError("Invalid argument: type");
        }

        if (!this[type].has(email)) {
            return;
        }

        this[type].delete(email);
    }

    getReceivers(type) {
        if (!this.receiverTypes.includes(type)) {
            throw new InvalidArgumentError("Invalid argument: type");
        }

        return [...this[type].keys()];
    }

    @action setType(type) {
        if (!this.contentTypes.includes(type.toLowerCase())) {
            throw new InvalidArgumentError("Invalid argument: type");
        }

        this.type = type;
    }
}

export const typeSchema = [
    { name: "plaintext", nameZh: "纯文本", description: "仅包含文字的邮件正文", icon: <AlignLeftOutlined /> },
    {
        name: "template",
        nameZh: "模版",
        description: "利用模版和自定义变量加载的邮件正文",
        icon: <FileTextOutlined />,
    },
];

export const receiverSchema = [
    { name: "to", nameZh: "收件人" },
    { name: "cc", nameZh: "抄送" },
    { name: "bcc", nameZh: "密送" },
];
