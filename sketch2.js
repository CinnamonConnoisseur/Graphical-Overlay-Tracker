// Tracks points on hands in the webcam. 
// Uses p5.js v.1.9.0, and ml5-next-gen (2023):
// https://unpkg.com/ml5@0.20.0-alpha.3/dist/ml5.js

let myWebcam;
let myHandTracker;
let hands = [];
let trackerOptions = { maxHands: 2, flipHorizontal: true };
let webcamAlpha = 0; // reduce this to make video transparent

//----------------------------
function setup() {
    createCanvas(windowWidth, windowHeight);
	initializeWebcamAndHandTracker(); 
}

//----------------------------
function draw() {
	background('white');
	drawWebcamVideo(); 
	// drawAllHandPoints(); 
	drawLineBetweenWrist();
    drawTips(); 
    drawKnucles();
    drawKnuclesSemiCircle();
}

//----------------------------
function drawLineBetweenWrist(){
	if (hands.length > 0){
		let tx = hands[0].keypoints[WRIST].x;
		let ty = hands[0].keypoints[WRIST].y;
		let px = hands[0].keypoints[INDEX_MCP].x;
		let py = hands[0].keypoints[INDEX_MCP].y;
		stroke('black');
		strokeWeight(2);
		line(tx,ty, px,py);
	}
    if (hands.length > 0){
		let tx = hands[0].keypoints[WRIST].x;
		let ty = hands[0].keypoints[WRIST].y;
		let px = hands[0].keypoints[MIDDLE_MCP].x;
		let py = hands[0].keypoints[MIDDLE_MCP].y;
		stroke('black');
		strokeWeight(2);
		line(tx,ty, px,py);
	} 
    if (hands.length > 0){
		let tx = hands[0].keypoints[WRIST].x;
		let ty = hands[0].keypoints[WRIST].y;
		let px = hands[0].keypoints[RING_MCP].x;
		let py = hands[0].keypoints[RING_MCP].y;
		stroke('black');
		strokeWeight(2);
		line(tx,ty, px,py);
	}
    if (hands.length > 0){
		let tx = hands[0].keypoints[WRIST].x;
		let ty = hands[0].keypoints[WRIST].y;
		let px = hands[0].keypoints[PINKY_MCP].x;
		let py = hands[0].keypoints[PINKY_MCP].y;
		stroke('black');
		strokeWeight(2);
		line(tx,ty, px,py);
	}
    if (hands.length > 0){
		let tx = hands[0].keypoints[THUMB_CMC].x;
		let ty = hands[0].keypoints[THUMB_CMC].y;
		let px = hands[0].keypoints[THUMB_MCP].x;
		let py = hands[0].keypoints[THUMB_MCP].y;
		stroke('black');
		strokeWeight(2);
		line(tx,ty, px,py);
	}
    if (hands.length > 0){
		let tx = hands[0].keypoints[THUMB_IP].x;
		let ty = hands[0].keypoints[THUMB_IP].y;
		let px = hands[0].keypoints[THUMB_TIP].x;
		let py = hands[0].keypoints[THUMB_TIP].y;
		stroke('black');
		strokeWeight(2);
		line(tx,ty, px,py);
	}
    if (hands.length > 0){
		let tx = hands[0].keypoints[INDEX_PIP].x;
		let ty = hands[0].keypoints[INDEX_PIP].y;
		let px = hands[0].keypoints[INDEX_DIP].x;
		let py = hands[0].keypoints[INDEX_DIP].y;
		stroke('black');
		strokeWeight(2);
		line(tx,ty, px,py);
	}
    if (hands.length > 0){
		let tx = hands[0].keypoints[MIDDLE_PIP].x;
		let ty = hands[0].keypoints[MIDDLE_PIP].y;
		let px = hands[0].keypoints[MIDDLE_DIP].x;
		let py = hands[0].keypoints[MIDDLE_DIP].y;
		stroke('black');
		strokeWeight(2);
		line(tx,ty, px,py);
	}
    if (hands.length > 0){
		let tx = hands[0].keypoints[RING_PIP].x;
		let ty = hands[0].keypoints[RING_PIP].y;
		let px = hands[0].keypoints[RING_DIP].x;
		let py = hands[0].keypoints[RING_DIP].y;
		stroke('black');
		strokeWeight(2);
		line(tx,ty, px,py);
	}
    if (hands.length > 0){
		let tx = hands[0].keypoints[PINKY_PIP].x;
		let ty = hands[0].keypoints[PINKY_PIP].y;
		let px = hands[0].keypoints[PINKY_DIP].x;
		let py = hands[0].keypoints[PINKY_DIP].y;
		stroke('black');
		strokeWeight(2);
		line(tx,ty, px,py);
	}



}

function drawTips() {
    fill('black');
	stroke('black');
	strokeWeight(2);
	
	for (let i = 0; i < hands.length; i++) {
		let hand = hands[i];
		let keypoints = hand.keypoints; // also available: keypoints3D
		
		// Fingertip keypoints indices
		const fingertipIndices = [THUMB_TIP, INDEX_TIP, MIDDLE_TIP, RING_TIP, PINKY_TIP];
		
		for (let j = 0; j < fingertipIndices.length; j++) {
			let fingertipIndex = fingertipIndices[j];
			let aKeypoint = keypoints[fingertipIndex];
			circle(aKeypoint.x, aKeypoint.y, 10);
            
            
		}
	}
}

function drawKnucles() {
    fill('black');

	for (let i = 0; i < hands.length; i++) {
		let hand = hands[i];
		let keypoints = hand.keypoints; // also available: keypoints3D
		
		// Fingertip keypoints indices
		const knuckleIndices = [INDEX_MCP, MIDDLE_MCP, RING_MCP, PINKY_MCP, THUMB_MCP];
		
		for (let j = 0; j < knuckleIndices.length; j++) {
			let knuckleIndex = knuckleIndices[j];
			let aKeypoint = keypoints[knuckleIndex];
			circle(aKeypoint.x, aKeypoint.y, 15);
		}
	}
}

function drawKnuclesSemiCircle() {
    noFill();
	stroke('black');
	strokeWeight(2);
	
	for (let i = 0; i < hands.length; i++) {
		let hand = hands[i];
		let keypoints = hand.keypoints; // also available: keypoints3D
		
		// Fingertip keypoints indices
		const knuckleIndices = [INDEX_MCP, MIDDLE_MCP, RING_MCP, PINKY_MCP, THUMB_MCP, ];
		
		for (let j = 0; j < knuckleIndices.length; j++) {
			let knuckleIndex = knuckleIndices[j];
			let aKeypoint = keypoints[knuckleIndex];
            drawSemiCircle(aKeypoint.x, aKeypoint.y, 30); 
            drawSemiCircle(aKeypoint.x, aKeypoint.y, 50); 
		}
	}
}


// Function to draw a semi-circle
function drawSemiCircle(x, y, size) {
    let radius = size / 3;
    arc(x, y, size, size, 0, PI);
  }


//----------------------------
function drawAllHandPoints(){
	// Draw all the tracked hand points
	noStroke();
	fill('black');
	textAlign(CENTER);
	
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
		let keypoints = hand.keypoints; // also available: keypoints3D
    for (let j = 0; j < keypoints.length; j++) {
      let aKeypoint = keypoints[j];
      circle(aKeypoint.x, aKeypoint.y, 10);
			textSize(11); 
			text(j, aKeypoint.x, aKeypoint.y-7);
    }
		
		let whichHand = hand.handedness;
		let wx = keypoints[WRIST].x;
		let wy = keypoints[WRIST].y;
		text(whichHand, wx,wy-50); 
  }
}

function keyPressed() {
    saveCanvas('p5-picture', 'png')
  }

//==============================================================
// DON'T CHANGE ANYTHING BELOW THIS LINE.
//
//----------------------------
function initializeWebcamAndHandTracker(){
	// Create the webcam video, and start detecting hands:
  myWebcam = createCapture(VIDEO);
  myWebcam.size(640, 480).hide();
  myHandTracker.detectStart(myWebcam, gotHands);
}

//----------------------------
function drawWebcamVideo(){
	// Draw the webcam video
	push();
	if (trackerOptions.flipHorizontal){
		translate(myWebcam.width,0); 
		scale(-1,1);
	}
	tint(255,255,255,webcamAlpha); 
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