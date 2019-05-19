//User constrols sphere
let video;
let poseNet;
let noseX;
let noseY;
let pulsoEX = 0;
let pulsoEY = 0;
let pulsoDX = 0;
let pulsoDY = 0;
let pulsoEXant = 0;
let pulsoEYant = 0;
let pulsoDXant = 0;
let pulsoDYant = 0;
let deltaEX = 0;
let deltaEY = 0;
let deltaDX =0;
let deltaDY = 0;
let free = false;
var noseYMax = -50.01;
var noseYMin = 1000.01;
let angle = 0.2;
let telax = 1300;
let telay = 650;
let raio = 100;
let canvasx=telax-10, canvasy=telay-10;
let textBefore = 'Acene com a cabeça para parar';
let esferaX = telax/4;
let esferaY = 0.;


function setup() {
  createCanvas(canvasx,canvasy,WEBGL);
  video = createCapture(VIDEO);
  video.hide();
  console.log(ml5);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pulsoEX = poses[0].pose.keypoints[9].position.x;
    pulsoEY = poses[0].pose.keypoints[9].position.y;
    pulsoDX = poses[0].pose.keypoints[10].position.x;
    pulsoDY = poses[0].pose.keypoints[10].position.y;
    noseX = poses[0].pose.keypoints[0].position.x;
    noseY = poses[0].pose.keypoints[0].position.y;
    
  }
}

function modelReady() {
}

function nymax(noseY) {
  if (noseY > noseYMax) {
    noseYmax = noseY;
  } else {
    noseYmax = noseYMax;
  }
  return noseYmax;
}

function nymin(noseY) {
  if (noseY < noseYMin) {
    noseYmin = noseY;
  } else {
    noseYmin = noseYMin
  }
  return noseYmin;
}

// ==================================
function draw() {
   
 
    deltaDX = pulsoDX - pulsoDXant;
    pulsoDXant = pulsoDX;
    //if (abs(deltaDX) < 80){
      esferaX += -deltaDX;
    //}

    deltaDY = pulsoDY - pulsoDYant;
    pulsoDYant = pulsoDY;
    if (abs(deltaDY) < 80){
      esferaY += -deltaDY;
    }
  
  background(151); 
  texture(video);

  push();
  translate(-esferaX,-esferaY, 0 );
  //translate(-telax/5-pulsoDX/10,-telay/4-pulsoDY, 0 );
  rotateY(angle);
  sphere(raio);
  
  if(!free){
  rotateY(angle);
  rotateX(angle);
    rotateZ(angle);
  } else {remove();}
  //  } else {clear();}
  pop();
  translate(0,0,-100);
  plane(telax,telay);
  angle += 0.01;
  noseYMin = nymin(noseY);
  noseYMax = nymax(noseY);
  if ((noseYMax - noseYMin) > 70) {
    free = true;
  }
  //console.log(pulsoEY, pulsoEX);
  
}
