var sendChannel, receiveChannel;

var startButton = document.getElementById("start-button");
var sendButton = document.getElementById("send-button");
var stopButton = document.getElementById("stop-button");

startButton.disabled = false;
sendButton.disabled = true;
stopButton.disabled = true;

startButton.onclick = createConnection;
sendButton.onclick = sendData;
stopButton.onclick = closeDataChannels;

function createConnection() {
    RTCPeerConnection = mozRTCPeerConnection;
    RTCSessionDescription = mozRTCSessionDescription;
    RTCIceCandidate = mozRTCIceCandidate;

    var servers = null;
    var pc_constraints = { 'optional': [{ 'DtlsSrtpKeyAgreement': true }] };

    localPeerConnection = new RTCPeerConnection(servers, pc_constraints);

    console.log("Created local peer connection object, with Data Channel");

    try {
        sendChannel = localPeerConnection.createDataChannel("sendDataChannel", { reliable: true });
        console.log('Created reliable send data channel');
    } catch (e) {
        console.log("unable to create data channel" + e.message);
    }

    localPeerConnection.onicecandidate = gotLocalCandidate;

    sendChannel.onopen = handleSendChannelStateChange;
    sendChannel.onclose = handleSendChannelStateChange;

    window.remotePeerConnection = new RTCPeerConnection(servers, pc_constraints);
    console.log('created remote peer connection with data channel');

    remotePeerConnection.onicecandidate = gotRemoteIceCandidate;
    remotePeerConnection.ondatachannel = gotReceiveChannel;

    localPeerConnection.createOffer(gotLocalDescription, onSignalingError);

    startButton.disabled = true;
    stopButton.disabled = false;
}

function gotRemoteIceCandidate(event) {
    console.log('remote ice callback');
    if (event.candidate) {
        localPeerConnection.addIceCandidate(event.candidate);
        // console.log('Remote ICE candidate: \n ' + event.candidate.candidate);
    }
}

function gotRemoteDescription(desc) {
    remotePeerConnection.setLocalDescription(desc);
    // console.log('Answer from remotePeerConnection\'s SDP: \n' + desc.sdp);
    localPeerConnection.setRemoteDescription(desc);
}

// Handler to be called whenever a new local ICE candidate becomes available
function gotLocalCandidate(event) {
    console.log('local ice callback');
    if (event.candidate) {
        remotePeerConnection.addIceCandidate(event.candidate);
        // console.log('Local ICE candidate: \n' + event.candidate.candidate);
    }
}
function gotLocalDescription(desc) {
    localPeerConnection.setLocalDescription(desc);
    // console.log('localPeerConnection\'s SDP: \n' + desc.sdp);
    remotePeerConnection.setRemoteDescription(desc);
    remotePeerConnection.createAnswer(gotRemoteDescription, onSignalingError);
}

function gotReceiveChannel(event) {
    console.log('Receive Channel Callback: event --> ' + event);
    receiveChannel = event.channel;
    receiveChannel.onopen = handleReceiveChannelStateChange;
    receiveChannel.onmessage = handleMessage;
    receiveChannel.onclose = handleReceiveChannelStateChange;
}

function handleMessage(event) {
    console.log('Received message: ' + event.data);
    document.getElementById("channel-receive").value = event.data;
    document.getElementById("channel-send").value = '';
}

function handleSendChannelStateChange() {
    var readyState = sendChannel.readyState;
    console.log('Send channel state is: ' + readyState);
    if (readyState == "open") {
        sendButton.disabled = false;
        sendButton.focus();
        sendButton.placeholder = "";

        sendButton.disabled = false;
        stopButton.disabled = false;
    } else {

        sendButton.disabled = true;
        sendButton.disabled = true;
        stopButton.disabled = true;
    }
}

function onSignalingError(err) {
    console.log("signalling error: ", err)
}

function handleReceiveChannelStateChange() {
    var readyState = receiveChannel.readyState;
    // console.log('Receive channel state is: ' + readyState);
}

function sendData(params) {
    var data = document.getElementById("channel-send").value;
    sendChannel.send(data);
    console.log('Sent data: ' + data);
}

function closeDataChannels() {
    sendChannel.close();
    receiveChannel.close();

    console.log('Closed data channels');

    localPeerConnection.close();
    remotePeerConnection.close();
    localPeerConnection = null;
    remotePeerConnection = null;

    console.log('Closed peer connections');

    startButton.disabled = false;
    sendButton.disabled = true;
    stopButton.disabled = true;
    sendChannel.value = "";
    receiveChannel.value = "";
    sendChannel.disabled = true;
}