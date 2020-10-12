/* eslint-disable react/display-name */
import React from "react";
import Loadable from "react-loadable";
import Loading from "Pages/Loading";

const routes = [
    {
        name: "mail",
        path: "/mail",
        title: "邮件服务",
        isExact: true,
        component: Loadable({
            loader: () => import("Components/Mail"),
            loading: () => <Loading />,
        }),
    },
    {
        name: "main",
        path: "/",
        title: "首页",
        isExact: true,
        component: Loadable({
            loader: () => import("Components/Home"),
            loading: () => <Loading />,
        }),
    },
];

export default routes;
