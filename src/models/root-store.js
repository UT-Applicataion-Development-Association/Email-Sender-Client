import { observable, configure, makeObservable } from "mobx";
import MailStore from "./mail-store";

configure({ enforceActions: "observed" });

export default class RootStore {
    @observable mailStore;

    constructor() {
        makeObservable(this);

        this.mailStore = new MailStore();
    }
}
