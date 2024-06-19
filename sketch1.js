// Tracks points on hands in the webcam. 
// Uses p5.js v.1.9.0, and ml5-next-gen (2023):
// https://unpkg.com/ml5@0.20.0-alpha.3/dist/ml5.js

let myWebcam;
let myHandTracker;
let hands = [];
let trackerOptions = { maxHands: 2, flipHorizontal: true };
let webcamAlpha = 20; // reduce this to make video transparent

//----------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeWebcamAndHandTracker();
}

//----------------------------
function draw() {
  background('white');
  drawWebcamVideo();
  drawAllHandPoints();
}


//----------------------------
function drawAllHandPoints() {
  // Draw all the tracked hand points
  noFill();
  stroke('black');
  strokeWeight(1);
  textAlign(CENTER);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let keypoints = hand.keypoints;
    let keypoints3D = hand.keypoints3D; // use 3D keypoints to get depth information
    for (let j = 0; j < keypoints.length; j++) {
      let aKeypoint = keypoints[j];
      let z = keypoints3D[j].z; // get the z-coordinate (depth)
      let size = map(z, 0, 1, 25, 2); // map depth to circle size (adjust values as needed)

      // Check for specific keypoints and draw different shapes
      if (j === WRIST) {
        drawConcentricCircles(aKeypoint.x, aKeypoint.y, 3, size);
      } else if (j === THUMB_TIP || j === INDEX_TIP || j === MIDDLE_TIP || j === RING_TIP || j === PINKY_TIP) {
        drawSemiCircle(aKeypoint.x, aKeypoint.y, size);
      } else if (j === THUMB_CMC || j === THUMB_MCP || j === THUMB_IP || j === THUMB_TIP ) {
        drawDot(aKeypoint.x, aKeypoint.y, size / 2);
      } else {
        drawConcentricCircles(aKeypoint.x, aKeypoint.y, 3, size);
      }
    }
    // Draw lines connecting THUMB_CMC, THUMB_MCP, and THUMB_IP
    drawConnectingLines(hand);
    
  }
}

// Function to draw concentric circles
function drawConcentricCircles(x, y, numCircles, spacing) {
  for (let i = 0; i < numCircles; i++) {
    circle(x, y, (i + 1) * spacing); // Adjust the multiplication factor to increase the spacing between circles
  }
}

// Function to draw a semi-circle
function drawSemiCircle(x, y, size) {
  let radius = size / 3;
  arc(x, y, size, size, 0, PI);
}

// Function to draw a dot
function drawDot(x, y, size) {
  circle(x, y, size);
}

function drawLargeArc(x, y, size) {
  stroke('black');
  strokeWeight(1);
  noFill();
  arc(x, y, size, size, 0, PI);
}

// Function to draw lines connecting specific keypoints
function drawConnectingLines(hand) {
  let keypoints = hand.keypoints;

  let x1 = keypoints[THUMB_CMC].x;
  let y1 = keypoints[THUMB_CMC].y;
  let x2 = keypoints[THUMB_MCP].x;
  let y2 = keypoints[THUMB_MCP].y;
  let x3 = keypoints[THUMB_IP].x;
  let y3 = keypoints[THUMB_IP].y;

  stroke('black');
  fill('black');
  strokeWeight(1);
  line(x1, y1, x2, y2);
  line(x2, y2, x3, y3);
}

//==============================================================
// DON'T CHANGE ANYTHING BELOW THIS LINE.
//
//----------------------------
function initializeWebcamAndHandTracker() {
  // Create the webcam video, and start detecting hands:
  myWebcam = createCapture(VIDEO);
  myWebcam.size(windowWidth, windowHeight).hide();
  myHandTracker.detectStart(myWebcam, gotHands);
}

//----------------------------
function drawWebcamVideo() {
  // Draw the webcam video
  push();
  if (trackerOptions.flipHorizontal) {
    translate(myWebcam.width, 0);
    scale(-1, 1);
  }
  tint(255, 255, 255, webcamAlpha);
  image(myWebcam, 0, 0, myWebcam.width, myWebcam.height);
  pop();
}

//----------------------------
function preload() {
  // Load the Handpose model.
  myHandTracker = ml5.handpose(trackerOptions);
}
function gotHands(results) {
  // If fresh Handpose data is received, store it.
  hands = results;
}

//----------------------------
// The following hand point index labels may be useful:
const WRIST = 0;
const THUMB_CMC = 1;
const THUMB_MCP = 2;
const THUMB_IP = 3;
const THUMB_TIP = 4;
const INDEX_MCP = 5;
const INDEX_PIP = 6;
const INDEX_DIP = 7;
const INDEX_TIP = 8;
const MIDDLE_MCP = 9;
const MIDDLE_PIP = 10;
const MIDDLE_DIP = 11;
const MIDDLE_TIP = 12;
const RING_MCP = 13;
const RING_PIP = 14;
const RING_DIP = 15;
const RING_TIP = 16;
const PINKY_MCP = 17;
const PINKY_PIP = 18;
const PINKY_DIP = 19;
const PINKY_TIP = 20;
