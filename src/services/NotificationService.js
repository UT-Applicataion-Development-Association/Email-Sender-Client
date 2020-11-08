import { message, notification } from "antd";
import { InvalidArgumentError } from "Configs/error";

const NOTIFICATION_TYPES = ["success", "warning", "info", "error"];

let instance = null;

class NotificationService {
    constructor() {
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    post(type, title, description) {
        if (!NOTIFICATION_TYPES.includes(type)) {
            throw new InvalidArgumentError("Invalid argument: type");
        }

        if (description !== undefined) {
            this.postNotification(type, title, description);
        } else {
            this.postMessage(type, title);
        }
    }

    postMessage(type, title) {
        message[type](title);
    }

    postNotification(type, title, description) {
        notification[type]({
            message: title,
            description: description,
        });
    }
}

export default NotificationService;
