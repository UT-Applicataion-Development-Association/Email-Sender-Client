import { observable, configure, makeObservable, action } from "mobx";
import { isValidEmail } from "Utils/validator";
import { ValidationError, DuplicationError } from "Configs/error";

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
        if (!["to", "cc", "bcc"].includes(type)) {
            return;
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
        if (!["to", "cc", "bcc"].includes(type)) {
            return;
        }

        if (!this[type].has(email)) {
            return;
        }

        this[type].delete(email);
    }

    getReceivers(type) {
        if (!["to", "cc", "bcc"].includes(type)) {
            return;
        }

        return [...this[type].keys()];
    }
}

export const typeSchema = [
    { name: "plaintext", description: "纯文本" },
    { name: "template", description: "模版" },
];

export const receiverSchema = [
    { name: "to", description: "收件人" },
    { name: "cc", description: "抄送" },
    { name: "bcc", description: "密送" },
];
