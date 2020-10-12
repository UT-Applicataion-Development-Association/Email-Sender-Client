/* eslint-disable react/display-name */
import React from "react";
import Loadable from "react-loadable";
import Loading from "Pages/Loading";

const getComponentRoutes = (path) => {
    const routes = [
        {
            name: "new",
            path: `${path}/new`,
            title: "新建邮件",
            isExact: true,
            component: Loadable({
                loader: () => import("Components/Mail/New"),
                loading: () => <Loading />,
            }),
        },
        {
            name: "history",
            path: `${path}/history`,
            title: "历史记录",
            isExact: true,
            component: Loadable({
                loader: () => import("Components/Mail/History"),
                loading: () => <Loading />,
            }),
        },
        {
            name: "template",
            path: `${path}/template`,
            title: "模版管理",
            isExact: true,
            component: Loadable({
                loader: () => import("Components/Mail/Template"),
                loading: () => <Loading />,
            }),
        },
    ];

    return routes;
};

export default getComponentRoutes;
