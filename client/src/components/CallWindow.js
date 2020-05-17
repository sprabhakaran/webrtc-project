import React from "react"

function CallWindow() {
    return (
            <div className="call-bar">
                <video autoPlay id="localVideo" />
                <video autoPlay id="remoteVideo" />
            </div>
    )
}

export default CallWindow