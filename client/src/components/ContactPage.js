import React from "react"

import ContactsPane from "./ContactsPane"
import ViewArea from "./ViewArea"

import importedContacts from "./../contacts"

class ContactPage extends React.Component{

    constructor() {
        super()
        this.state = {
            contacts: importedContacts,
            selectedContactID: 0
        }
        this.updateSelectedContact = this.updateSelectedContact.bind(this)
    }

    
    updateSelectedContact(id) {
        // console.log("update selected contact to id", id)
        this.setState(() => {
            return {
                selectedContactID: id
            }
        })
    }


    render(){
        return (
              <div className="app">
                <ContactsPane
                    contacts={this.state.contacts}
                    selectedContactID={this.state.selectedContactID}
                    updateSelectedContact={this.updateSelectedContact}
                />
                <ViewArea selectedContact={
                    this.state.contacts[this.state.selectedContactID]} />
            </div>
        )
    }
}

export default ContactPage