import React from "react"

import SearchBar from "./SearchBar"
import ContactsList from "./ContactsList"
import ContactsPaneFooter from "./ContactsPaneFooter"

class ContactsPane extends React.Component{
    render(){
        return (
            <div className="contacts-pane">
                <SearchBar />
                <ContactsList />
                <ContactsPaneFooter />
            </div>
        )
    }
}

export default ContactsPane