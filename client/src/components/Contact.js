import React from "react"

class Contact extends React.Component{
    render(){
        let contactClassName = this.props.contact.isSelected ? "contact-selected" : "contact"
        return (
            <div className={contactClassName}>
               <img src="https://via.placeholder.com/36"/>
               <span>{this.props.contact.name}</span>
               <span className="contact-info">{this.props.contact.info}</span>
            </div>
        )
    }
}

export default Contact