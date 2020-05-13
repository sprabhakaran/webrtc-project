import React from "react"

class Contact extends React.Component{
    render(){
        let contactClassName = this.props.contact.id === this.props.selectedContactID ? "contact-selected" : "contact"
        return (
            <div className={contactClassName} onClick={()=>{this.props.updateSelectedContact(this.props.contact.id)}}>
               <img src="https://via.placeholder.com/36" alt={"thumbnail of " +this.props.contact.name } />
               <span>{this.props.contact.name} </span>
               <span className="contact-info">{this.props.contact.info}</span>
            </div>
        )
    }
}

export default Contact