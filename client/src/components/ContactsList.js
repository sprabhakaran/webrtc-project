import React from "react"

import Contact from "./Contact"

class ContactsList extends React.Component{

    constructor(){
        super()
        this.state = {
            contacts: [
                {
                    id: 1,
                    name: "Ann",
                    info: "online",
                    isSelected: false
                },
                {
                    id: 2,
                    name: "Bob",
                    info: "seen 30m ago",
                    isSelected: false
                },
                {
                    id: 3,
                    name: "Cathy",
                    info: "seen 2h ago",
                    isSelected: true
                },
                {
                    id: 4,
                    name: "Derick",
                    info: "offline",
                    isSelected: false
                }
            ]
        }
    }

    render(){
        let contacts = this.state.contacts.map((c) => <Contact id={c.id} contact={c} />)
        return (
            <div>
               {contacts}
            </div>
            
        )
    }
}

export default ContactsList