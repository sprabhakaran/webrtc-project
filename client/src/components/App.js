import React from "react"

import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";


import LoginPage from "./LoginPage"


import SingupPage from "./SignupPage"
import ForgotPassword from "./ForgotPassword"
import ContactPage from "./ContactPage"

class App extends React.Component {




    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/contacts"> <ContactPage /></Route>
                    <Route path="/sign-up"> <SingupPage /></Route>
                    <Route path="/forgot-password"> <ForgotPassword /></Route>
                    <Route path="/"> <LoginPage /></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App

