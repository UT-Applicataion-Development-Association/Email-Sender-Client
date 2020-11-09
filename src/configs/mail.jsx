import React from "react";
import { FileTextOutlined, AlignLeftOutlined } from "@ant-design/icons";

export const typeSchema = [
    {
        name: "plaintext",
        nameZh: "纯文本",
        description: "仅包含文字的邮件正文",
        icon: <AlignLeftOutlined />,
    },
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
