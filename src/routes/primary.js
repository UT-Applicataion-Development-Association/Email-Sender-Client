import Login from "Pages/Login";
import Main from "Pages/Main";

const routes = [
    {
        name: "login",
        path: "/login",
        title: "登录",
        isExact: true,
        component: Login,
    },
    {
        name: "main",
        path: "/",
        title: "主页",
        isExact: true,
        component: Main,
    },
];

export default routes;
