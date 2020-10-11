import React from "react";
import { BrowserRouter } from "react-router-dom";
import PrimaryRoutes from "./primary";

export default function Router() {
    return (
        <BrowserRouter>
            <PrimaryRoutes />
        </BrowserRouter>
    );
}
