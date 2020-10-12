import { MailOutlined, HomeOutlined } from "@ant-design/icons";
import Login from "Pages/Login";
import Main from "Pages/Main";
import Mail, {
    New as MailNewComponent,
    Template as MailTemplateComponent,
    History as MailHistoryComponent,
} from "Components/Mail";
import Home from "Components/Home";

const createRouteEntry = (path, name, component, isExact, subEntry, isNav) => {
    return { path, name, component, isExact, subEntry, isNav };
};

const createNavEntry = (icon, isLink = true, isDisabled = false) => {
    return { icon, isLink, isDisabled };
};

/** Tertiary Routing */
const mailNew = createRouteEntry(
    "/mail/new",
    "新建邮件",
    MailNewComponent,
    true,
    "tertiary",
    {},
    createNavEntry(undefined, true, false),
);

const mailHistory = createRouteEntry(
    "/mail/history",
    "历史记录",
    MailHistoryComponent,
    true,
    {},
    createNavEntry(undefined, true, false),
);

const mailTemplate = createRouteEntry(
    "/mail/template",
    "模版管理",
    MailTemplateComponent,
    true,
    {},
    createNavEntry(undefined, true, false),
);

/** Secondary Routing */
const home = createRouteEntry("/", "首页", Home, false, [], createNavEntry(HomeOutlined));
const mail = createRouteEntry(
    "/mail",
    "邮件服务",
    Mail,
    false,
    [mailNew, mailHistory, mailTemplate],
    createNavEntry(MailOutlined, false),
);

/** Primary Routing */
const root = createRouteEntry("/", "主框架", Main, false, {}, false);
const login = createRouteEntry("/login", "登入页", Login, true, {}, false);

/** Routing Table */
const primaryRouting = [root, login];
const secondaryRouting = [home, mail];

export { primaryRouting, secondaryRouting };
