import React from "react"

import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class ViewAreaFooter extends React.Component{
    render(){
        return (
            <div className="view-area-footer">
                <textarea placeholder="Enter your message" ></textarea>
                <button> <FontAwesomeIcon icon={faPaperPlane} /> Send </button>
                <button> <FontAwesomeIcon icon={faVideo} /> Video </button>
                <button> <FontAwesomeIcon icon={faPhoneAlt} /> Audio </button>
            </div>
        )
    }
}

export default ViewAreaFooter