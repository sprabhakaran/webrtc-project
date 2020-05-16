import React from "react"

import ChatWindow from "./ChatWindow"

import CallWindow from "./CallWindow"

class ViewAreaBody extends React.Component {
    render() {
        if (this.props.inCallView) {
            return (
                <div className="view-area-with-video-and-chat">
                    <CallWindow />
                    <ChatWindow useShortWindow={true} />
                </div>
            )
        }
        return (
            <div>
                <ChatWindow useShortWindow={false} />
            </div>
        )
    }
}

export default ViewAreaBody