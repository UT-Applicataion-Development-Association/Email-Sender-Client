import { observable, configure, makeObservable, action, computed, toJS } from "mobx";
import { isValidEmail } from "Utils/validator";
import { ValidationError, DuplicationError, InvalidArgumentError } from "Configs/error";
import { typeSchema, receiverSchema } from "Configs/mail";

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

    getReceivers(type, detail = false) {
        if (!this.receiverTypes.includes(type)) {
            throw new InvalidArgumentError("Invalid argument: type");
        }

        if (!detail) {
            return [...this[type].keys()];
        }

        const iter = this[type].values();
        const result = [];
        let curr = iter.next();
        while (!curr.done) {
            result.push(toJS(curr.value));
            curr = iter.next();
        }
        return result;
    }

    @action setType(type) {
        if (!this.contentTypes.includes(type.toLowerCase())) {
            throw new InvalidArgumentError("Invalid argument: type");
        }

        this.type = type;
    }

    @action setBody(val) {
        this.body = val;
    }

    @computed get hasValidReceivers() {
        const isNotEmpty = !(!this.to.size && !this.cc.size && !this.bcc.size);
        for (const type of this.receiverTypes) {
            const addrList = this.getReceivers(type);
            const hasWrongFormat = addrList.filter((addr) => !isValidEmail(addr)).length > 0;
            if (hasWrongFormat) {
                return false;
            }
        }
        return isNotEmpty;
    }

    exportJson() {
        // Todo - Add support for attachment

        const result = {};
        result.type = this.type;
        result.to = toJS(this.getReceivers("to", true));
        result.cc = toJS(this.getReceivers("cc", true));
        result.bcc = toJS(this.getReceivers("bcc", true));
        switch (this.type) {
            case "template":
                result.templateId = this.templateId;
                break;
            case "plaintext":
            default:
                result.body = this.body;
                break;
        }

        return result;
    }
}
