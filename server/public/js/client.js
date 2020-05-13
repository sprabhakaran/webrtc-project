var localStream, localPeerConnection, remotePeerConnection;
var localVideo = document.getElementById("local-video");
var remoteVideo = document.getElementById("remote-video");

var startButton = document.getElementById("start-button");
var callButton = document.getElementById("call-button");
var hangupButton = document.getElementById("hang-button");

startButton.disabled = false;
callButton.disabled = true;
hangupButton.disabled = true;

startButton.onclick = start;
callButton.onclick = call;
hangupButton.onclick = hangup;

function successCallback(stream) {
    console.log("receiving local stream");
    localStream = stream;
    localVideo.srcObject = stream;
    callButton.disabled = false;
}

function start() {
    console.log("requesting local stream");
    startButton.disabled = true;

    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
        .then(successCallback).catch(function (err) { console.log("getUserMedia Failed. ", err) });
}

function call() {
    console.log("starting a call")
    callButton.disabled = true;
    hangupButton.disabled = false;

    RTCPeerConnection = mozRTCPeerConnection;
    RTCSessionDescription = mozRTCSessionDescription;
    RTCIceCandidate = mozRTCIceCandidate;

    console.log("RTC peer cxn: ", RTCPeerConnection);
    
    // servers has the information to find and access the STUN & TURN servers
    var servers = null;

    // Local Peer Connection
    localPeerConnection = new RTCPeerConnection(servers);
    console.log("created local peer connection object");
    localPeerConnection.onicecandidate = gotLocalIceCandidate;


    // Remote Peer Connection
    remotePeerConnection = new RTCPeerConnection(servers);
    console.log("created remote peer connection object");
    remotePeerConnection.onicecandidate = gotRemoteIceCandidate;

    remotePeerConnection.onaddstream = gotRemoteStream;

    localPeerConnection.addStream(localStream);
    console.log("added local stream to local peer connection")

    // Singalling process
    localPeerConnection.createOffer(gotLocalDescription, onSignalingError);
}

function gotLocalDescription(description) {
    localPeerConnection.setLocalDescription(description);
    console.log("Offer from localPeerConnection: \n" + description.sdp);
    remotePeerConnection.setRemoteDescription(description);
    remotePeerConnection.createAnswer(gotRemoteDescription, onSignalingError);
}

function gotRemoteDescription(description) {
    remotePeerConnection.setLocalDescription(description);
    console.log("Answer from remotePeerConnection: \n" + description.sdp);
    localPeerConnection.setRemoteDescription(description);
}

function onSignalingError(err) {
    console.log("Error creating a signal: ", err)
}

function gotLocalIceCandidate(event) {
    if (event.candidate) {
        remotePeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        console.log("Local ICE candidate: \n" + event.candidate.candidate)
    }
}

function hangup() {
    console.log("ending call")
    // Closing peer connections
    localPeerConnection.close();
    remotePeerConnection.close();

    // Reseting local variables
    localPeerConnection = null;
    remotePeerConnection = null;

    hangupButton.disabled = true;
    callButton.disabled = false;
}

function gotRemoteStream(event) {
    remoteVideo.srcObject = event.stream;
    console.log("Received remote stream");
}

// Handler to be called whenever a new remote ICE candidate becomes available
function gotRemoteIceCandidate(event) {
    if (event.candidate) {
        localPeerConnection.addIceCandidate(new RTCIceCandidate(event.candidate));
        console.log("Remote ICE candidate: \n " + event.candidate.candidate);
    }
}