import React from "react"

import ViewAreaTop from "./ViewAreaTop"
import ViewAreaBody from "./ViewAreaBody"
import ViewAreaFooter from "./ViewAreaFooter"

class ViewArea extends React.Component {

    constructor() {
        super()
        this.state = {
            inCallView: false
        }

        this.startVideoCall = this.startVideoCall.bind(this)
        this.endVideoCall = this.endVideoCall.bind(this)
    }



    startVideoCall(remotePeer) {
        console.log("starting video call with ", remotePeer)

        this.setState((oldState) => {
            return {
                inCallView: true
            }
        })

        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
            .then(function (stream) {
                let localVideoPlayer = document.getElementById("localVideo")
                localVideoPlayer.srcObject = stream

                // User remote stream here
                let remoteVideoPlayer = document.getElementById("remoteVideo")
                remoteVideoPlayer.srcObject = stream

            })
            .catch(function (err) {
                console.log("error getting user media: ", err)
            });

    }


    endVideoCall(remotePeer) {
        console.log("ending video call with ", remotePeer)

        this.setState((oldState) => {
            return {
                inCallView: false
            }
        })

    }


    render() {
        return (
            <div className="view-area">
                <ViewAreaTop selectedContact={this.props.selectedContact} />
                <ViewAreaBody inCallView={this.state.inCallView} />
                <ViewAreaFooter
                    startVideoCall={this.startVideoCall}
                    endVideoCall={this.endVideoCall}
                    inCallView={this.state.inCallView}
                />
            </div>
        )
    }
}

export default ViewArea