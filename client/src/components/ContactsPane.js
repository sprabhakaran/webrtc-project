import React from "react"

import SearchBar from "./SearchBar"
import Contact from "./Contact"
import ContactsPaneFooter from "./ContactsPaneFooter"

class ContactsPane extends React.Component {
    render() {

        let contacts = this.props.contacts.map((c) => {
            return <Contact
            key = { c.id }
            contact = { c }
            selectedContactID = { this.props.selectedContactID }
            updateSelectedContact = { this.props.updateSelectedContact }
            />
        })

        return ( <
            div className = "contacts-pane" >
            <
            SearchBar / >
            <
            div className = "contacts-list" > { contacts } <
            /div> <
            ContactsPaneFooter count = { this.props.contacts.length }
            /> <
            /div>
        )
    }
}

export default ContactsPane