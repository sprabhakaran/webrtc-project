'use strict'; /* what does this do? */

/* clean up */
window.onbeforeunload = function (e) { hangup(); }

var sendChannel, receiveChannel;
var sendButton = document.getElementById("send-button");
var sendTextarea = document.getElementById("data-channel-send");
var receiveTextarea = document.getElementById("data-channel-recieve");

var localVideo = document.querySelector('#local-video');
var remoteVideo = document.querySelector('#remote-video');

sendButton.onclick = sendData;

var isChannelReady = false;
var isInitiator = false;
var isStarted = false;

var localStream;
var remoteStream;
var peerCxn;


var pc_config = { 'iceServers': [{ 'url': 'stun:23.21.150.121' }] };


var pc_constraints = {
    'optional': [
        { 'DtlsSrtpKeyAgreement': true }
    ]
};
var sdpConstraints = {};

var room = prompt('Enter room name:');
var socket = io.connect("http://localhost:8181/");

if (room !== '') {
    console.log('Create or join room', room);
    socket.emit('create or join', room);
}

var constraints = { video: true, audio: true };

function attachMediaStream(videoDest, stream) {
    videoDest.srcObject = stream;
}

function handleUserMedia(stream) {
    localStream = stream;
    attachMediaStream(localVideo, stream);
    sendMessage('got user media');   
}

function handleUserMediaError(error) {
    console.log('navigator.getUserMedia error: ', error);
}

socket.on('created', function (room) {
    console.log('Created room ' + room);
    isInitiator = true;
    navigator.mediaDevices.getUserMedia(constraints).then(handleUserMedia).catch(handleUserMediaError);
    checkAndStart(); 
});

socket.on('full', function (room) {
    console.log('Room ' + room + ' is full');
});

socket.on('join', function (room) {
    console.log('Another peer made a request to join room ' + room);
    console.log('This peer is the initiator of room ' + room + '!');
    isChannelReady = true;
});

socket.on('joined', function (room) {
    console.log('This peer has joined room ' + room);
    isChannelReady = true;
    navigator.mediaDevices.getUserMedia(constraints).then(handleUserMedia).catch(handleUserMediaError);
    // console.log('Getting user media with constraints', constraints);
});


socket.on('log', function (array) {
    console.log(array.join(" "));
});


socket.on('message', function (message) {
    console.log('Received message:', message);
    if (message === 'got user media') {
        checkAndStart();
    } else if (message.type === 'offer') {
        if (!isInitiator && !isStarted) {
            checkAndStart();
        }
        peerCxn.setRemoteDescription(new RTCSessionDescription(message));
        doAnswer();
    } else if (message.type === 'answer' && isStarted) {
        peerCxn.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate' && isStarted) {
        var candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate
        });
        peerCxn.addIceCandidate(candidate);
    } else if (message === 'bye' && isStarted) {
        handleRemoteHangup();
    }
});

function sendMessage(message) {
    console.log('Sending message: ', message);
    socket.emit('message', message);
}

function checkAndStart() {
    console.log("check & start process....")
    if (!isStarted && typeof localStream != 'undefined' && isChannelReady) {
        createPeerConnection();
        isStarted = true;
        if (isInitiator) {
            doCall();
        }
    }
}


function createPeerConnection() {
    console.log("creating peer connection...")
    try {
        peerCxn = new RTCPeerConnection(pc_config, pc_constraints);
        peerCxn.addStream(localStream);
        peerCxn.onicecandidate = handleIceCandidate;
        console.log('Created RTCPeerConnnection with:\n' +
            ' config: \'' + JSON.stringify(pc_config) + '\';\n' +
            ' constraints: \'' + JSON.stringify(pc_constraints) + '\'.');
    } catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message);
        alert('Cannot create RTCPeerConnection object.');
        return;
    }
    peerCxn.onaddstream = handleRemoteStreamAdded;
    peerCxn.onremovestream = handleRemoteStreamRemoved;
    if (isInitiator) {
        try {
            // Create a reliable data channel
            sendChannel = peerCxn.createDataChannel("sendDataChannel",
                { reliable: true });
            console.log('Created send data channel');
        } catch (e) {
            alert('Failed to create data channel. ');
            console.log('createDataChannel() failed with exception: ' + e.message);
        }
        sendChannel.onopen = handleSendChannelStateChange;
        sendChannel.onmessage = handleMessage;
        sendChannel.onclose = handleSendChannelStateChange;
    } else { // Joiner
        peerCxn.ondatachannel = gotReceiveChannel;
    }
}

// Data channel management
function sendData() {
    var data = sendTextarea.value;
    if (isInitiator) sendChannel.send(data);
    else receiveChannel.send(data);
    console.log('Sent data: ' + data);
}
// Handlers...
function gotReceiveChannel(event) {
    console.log('Receive Channel Callback');
    receiveChannel = event.channel;
    receiveChannel.onmessage = handleMessage;
    receiveChannel.onopen = handleReceiveChannelStateChange;
    receiveChannel.onclose = handleReceiveChannelStateChange;
}
function handleMessage(event) {
    console.log('Received message: ' + event.data);
    receiveTextarea.value += event.data + '\n';
}
function handleSendChannelStateChange() {
    var readyState = sendChannel.readyState;
    console.log('Send channel state is: ' + readyState);
    if (readyState == "open") {
        sendTextarea.disabled = false;
        sendTextarea.focus();
        sendTextarea.placeholder = "";
        sendButton.disabled = false;
    } else {
        sendTextarea.disabled = true;
        sendButton.disabled = true;
    }
}

function handleReceiveChannelStateChange() {
    var readyState = receiveChannel.readyState;
    console.log('Receive channel state is: ' + readyState);
    // If channel ready, enable user's input
    if (readyState == "open") {
        sendTextarea.disabled = false;
        sendTextarea.focus();
        sendTextarea.placeholder = "";
        sendButton.disabled = false;
    } else {
        sendTextarea.disabled = true;
        sendButton.disabled = true;
    }
}

// ICE candidates management
function handleIceCandidate(event) {
    console.log('handleIceCandidate event: ', event);
    if (event.candidate) {
        sendMessage({
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate
        });
    } else {
        console.log('End of candidates.');
    }
}

// Create Offer
function doCall() {
    console.log('Creating Offer...');
    peerCxn.createOffer(setLocalAndSendMessage, onSignalingError, sdpConstraints);
}

// Signaling error handler
function onSignalingError(error) {
    console.log('Failed to create signaling message : ' + error.name);
}

// Create Answer
function doAnswer() {
    console.log('Sending answer to peer.');
    peerCxn.createAnswer(setLocalAndSendMessage, onSignalingError, sdpConstraints);
}

// Success handler for both createOffer()
// and createAnswer()
function setLocalAndSendMessage(sessionDescription) {
    peerCxn.setLocalDescription(sessionDescription);
    sendMessage(sessionDescription);
}

// Remote stream handlers...
function handleRemoteStreamAdded(event) {
    console.log('Remote stream added.');
    attachMediaStream(remoteVideo, event.stream);
    console.log('Remote stream attached!!.');
    remoteStream = event.stream;
}

function handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
}

// Clean-up functions...
function hangup() {
    console.log('Hanging up.');
    stop();
    sendMessage('bye');
}

function handleRemoteHangup() {
    console.log('Session terminated.');
    stop();
    isInitiator = false;
}

function stop() {
    isStarted = false;
    if (sendChannel) sendChannel.close();
    if (receiveChannel) receiveChannel.close();
    if (peerCxn) peerCxn.close();
    peerCxn = null;
    sendButton.disabled = true;
}