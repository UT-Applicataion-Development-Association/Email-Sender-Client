import { observable, configure, makeObservable, action } from "mobx";

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
        this.to = [];
        this.cc = [];
        this.bcc = [];
        this.templateId = null;
        this.attachments = [];
        this.body = null;
    }
}
