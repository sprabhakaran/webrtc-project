import React from "react"

function ContactsPaneFooter(props) {
    return (
        <div className="contacts-footer">
            {props.count} Available Contacts 
        </div>
    )
}

export default ContactsPaneFooter