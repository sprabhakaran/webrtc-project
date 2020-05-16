import React from "react"

import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class ViewAreaFooter extends React.Component{
    render(){

        if (this.props.inCallView){
            return (
                <div className="view-area-footer-in-call">
                    <textarea placeholder="Enter your message" ></textarea>
                    <button> <FontAwesomeIcon icon={faPaperPlane} /> Send </button>
                    <button id="hang-button" onClick={() => {this.props.endVideoCall("x")}}> <FontAwesomeIcon icon={faVideo} /> Hang </button>
                </div>
            )
        }

        return (
            <div className="view-area-footer">
                <textarea placeholder="Enter your message" ></textarea>
                <button> <FontAwesomeIcon icon={faPaperPlane} /> Send </button>
                <button onClick={() => {this.props.startVideoCall("x")}}> <FontAwesomeIcon icon={faVideo} /> Video </button>
                <button> <FontAwesomeIcon icon={faPhoneAlt} /> Audio </button>
            </div>
        )
    }
}

export default ViewAreaFooter