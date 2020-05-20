import React from "react"
import {Router, Route} from "react-router"


import ContactsPane from "./ContactsPane"
import ViewArea from "./ViewArea"

import LoginPage from "./LoginPage"

import importedContacts from "./../contacts"
import SingupPage from "./SignupPage"

import ForgotPassword from "./ForgotPassword"

class App extends React.Component {

    constructor() {
        super()


        this.state = {
            contacts: importedContacts,
            selectedContactID: 0
        }

        this.updateSelectedContact = this.updateSelectedContact.bind(this)
    }

    

    componentDidMount() {
        // import user's contacts
        // fetch("/contacts")
        //     .then((data)=>{
        //         this.setState((oldState) => {
        //             return {
        //                 contacts: oldState.contacts,
        //                 selectedContactID: id
        //             }
        //         })
        //     })
        //     .catch((e) => { console.log("error GET /contacts", e) })
    }

    updateSelectedContact(id) {
        // console.log("update selected contact to id", id)
        this.setState(() => {
            return {
                selectedContactID: id
            }
        })
    }


    render() {
        return (
            // <div className="app">
            //     <ContactsPane
            //         contacts={this.state.contacts}
            //         selectedContactID={this.state.selectedContactID}
            //         updateSelectedContact={this.updateSelectedContact}
            //     />
            //     <ViewArea selectedContact={
            //         this.state.contacts[this.state.selectedContactID]} />
            // </div>
            <LoginPage />
            // <SingupPage />
            // <ForgotPassword />

            // <Router>
            //     <Route path="/signup" component={SingupPage} />
            // </Router>
        )
    }
}

export default App

