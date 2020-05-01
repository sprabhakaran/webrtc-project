// var constraints = { audio: false, video: true };
var video = document.querySelector("video");

var vgaButton = document.querySelector("button#vga");
var qvgaButton = document.querySelector("button#qvga");
var hdButton = document.querySelector("button#hd");

// Constraints object for low resolution video
var qvgaConstraints = {
    video: {
        mandatory: {
            maxWidth: 320,
            maxHeight: 240
        }
    }
};
// Constraints object for standard resolution video
var vgaConstraints = {
    video: {
        mandatory: {
            maxWidth: 640,
            maxHeight: 480
        }
    }
};
// Constraints object for high resolution video
var hdConstraints = {
    video: {
        mandatory: {
            minWidth: 1280,
            minHeight: 960
        }
    }
};

function capture(constraints) {
    console.log("constraints: ", constraints)
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
        window.stream = stream;
        video.srcObject = stream;
        video.play();
    })
    .catch(function (err) {
        console.log("Error gettin permisions. ", err.message)
    });
}

qvgaButton.onclick = function () { capture(qvgaConstraints) };
vgaButton.onclick = function () { capture(vgaConstraints) };
hdButton.onclick = function () { capture(hdConstraints) };