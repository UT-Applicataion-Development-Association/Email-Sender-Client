import Main from "./Main";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export default withAuthenticationRequired(Main);
