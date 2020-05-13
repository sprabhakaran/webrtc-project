import React from "react"

class Button extends React.Component {
    render() {
        let buttonContents = ""
        switch (this.props.act) {
            case "video-call":
                buttonContents = "Video Call"
                break;
            case "audio-call":
                buttonContents = "Audio Call"
                break;
            case "chat":
                buttonContents = "Chat"
                break;
            default:
                break;
        }

        return (
            <div>
                <button className="button" onClick={()=>{this.props.handler("x", "y")}}>{buttonContents}</button>
            </div>
        )
    }
}

export default Button