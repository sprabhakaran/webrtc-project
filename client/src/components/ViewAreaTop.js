import React from "react"

import Button from "./Button"

class ViewAreaTop extends React.Component {
    constructor() {
        super()
        this.handleComms = this.handleComms.bind(this)
    }

    handleComms(contactID, act) {
        alert(act, contactID)
    }

    render() {
    
        return (
            <div className="view-area-top">
                <div className="profile-picture-box"> <img src="https://via.placeholder.com/256" alt={"profile picture of " + this.props.selectedContact.name} /> </div>
                <div className="profile-contents-box">
                    <div className="headline-1">{this.props.selectedContact.name}</div>
                    <div className="headline-2">{this.props.selectedContact.email}</div>
                    <div>{this.props.selectedContact.info}</div>
                    <Button act="video-call" handler={this.handleComms} />
                    <Button act="audio-call" handler={this.handleComms} />
                    <Button act="chat" handler={this.handleComms} />
                    <div>remove connection</div>
                </div>
                <div className="top-right-box"> Settings  Logout </div>
            </div>
        )
    }
}

export default ViewAreaTop