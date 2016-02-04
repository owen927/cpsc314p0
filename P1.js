// UBC CPSC 314 (2015W2) -- P1
// HAVE FUN!!! :)

// ASSIGNMENT-SPECIFIC API EXTENSION
THREE.Object3D.prototype.setMatrix = function(a) {
  this.matrix=a;
  this.matrix.decompose(this.position,this.quaternion,this.scale);
}

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xFFFFFF); // white background colour
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(45,20,40);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

// SETUP HELPER GRID
// Note: Press Z to show/hide
var gridGeometry = new THREE.Geometry();
var i;
for(i=-50;i<51;i+=2) {
    gridGeometry.vertices.push( new THREE.Vector3(i,0,-50));
    gridGeometry.vertices.push( new THREE.Vector3(i,0,50));
    gridGeometry.vertices.push( new THREE.Vector3(-50,0,i));
    gridGeometry.vertices.push( new THREE.Vector3(50,0,i));
}

var gridMaterial = new THREE.LineBasicMaterial({color:0xBBBBBB});
var grid = new THREE.Line(gridGeometry,gridMaterial,THREE.LinePieces);

/////////////////////////////////
//   YOUR WORK STARTS BELOW    //
/////////////////////////////////

// MATERIALS
// Note: Feel free to be creative with this! 
var normalMaterial = new THREE.MeshNormalMaterial();

// function drawCube()
// Draws a unit cube centered about the origin.
// Note: You will be using this for all of your geometry
function makeCube() {
  var unitCube = new THREE.BoxGeometry(1,1,1);
  return unitCube;
}

//Up down
function rotate_Z(p)
{
	var rotateX =  new THREE.Matrix4().set(1,           0,           0,        0, 
										   0, Math.cos(p),-Math.sin(p),		   0, 
										   0, Math.sin(p), Math.cos(p), 	   0,
										   0,           0,           0,        1);
	return rotateX;
}

//left right
function rotate_X(p)
{
	var rotateY = new THREE.Matrix4().set(Math.cos(p),        0,   Math.sin(p),        0, 
	     	  										0,        1,             0,        0, 
	     	  							 -Math.sin(p), 	      0,   Math.cos(p),        0,
	     	  										0,        0,             0,        1);
	
	return rotateY;
	
}

var torsoRotMatrix = new THREE.Matrix4();


// GEOMETRY
//torso
var torsoGeometry = makeCube();
var non_uniform_scale = new THREE.Matrix4().set(5,0,0,0, 0,5,0,0, 0,0,8,0, 0,0,0,1);
torsoGeometry.applyMatrix(non_uniform_scale);

// TO-DO: SPECIFY THE REST OF YOUR STAR-NOSE MOLE'S GEOMETRY. 
// Note: You will be using transformation matrices to set the shape. 
// Note: You are not allowed to use the tools Three.js provides for 
//       rotation, translation and scaling.
// Note: The torso has been done for you (but feel free to modify it!)  
// Hint: Explicity declare new matrices using Matrix4().set     

//tail
var tailGeometry = makeCube();
var tail_scale = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,6,0, 0,0,0,1);
tailGeometry.applyMatrix(tail_scale);

//head
var headGeometry = makeCube();
var head_scale = new THREE.Matrix4().set(3,0,0,0, 0,3,0,0, 0,0,3.5,0, 0,0,0,1);
headGeometry.applyMatrix(head_scale);

//nose
var noseGeometry = makeCube();
var nose_scale = new THREE.Matrix4().set(3,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);
noseGeometry.applyMatrix(nose_scale);

//paw

var pawGeometry = makeCube();
var paw_scale = new THREE.Matrix4().set(3,0,0,0, 0,0.75,0,0, 0,0,4,0, 0,0,0,1);
pawGeometry.applyMatrix(paw_scale);

//claw
var clawGeometry = makeCube();
var claw_scale = new THREE.Matrix4().set(0.5,0,0,0, 0,0.5,0,0, 0,0,1,0, 0,0,0,1);
clawGeometry.applyMatrix(claw_scale);

//nose tentacles
var tentaclesGeometry = makeCube();
var tentacle_scale = new THREE.Matrix4().set(0.3,0,0,0, 0,0.3,0,0, 0,0,1.5,0, 0,0,0,1);
tentaclesGeometry.applyMatrix(tentacle_scale);

var smalltentaclesGeometry = makeCube();
var tentacle_scale_small = new THREE.Matrix4().set(0.2,0,0,0, 0,0.2,0,0, 0,0,1.2,0, 0,0,0,1);
smalltentaclesGeometry.applyMatrix(tentacle_scale_small);

// MATRICES
var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2.5, 0,0,1,0, 0,0,0,1);

// TO-DO: INITIALIZE THE REST OF YOUR MATRICES 
// Note: Use of parent attribute is not allowed.
// Hint: Keep hierarchies in mind!   

//tail
var tailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-4, 0,0,0,1);

//head
var headMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,4.5, 0,0,0,1);

//nose
var noseMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,2, 0,0,0,1);

//paw
var front_right_pawMatrix = new THREE.Matrix4().set(1,0,0,-2, 0,1,0,-3, 0,0,1,3, 0,0,0,1);
front_right_pawMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawMatrix,rotate_Z(220.4));

var front_left_pawMatrix = new THREE.Matrix4().set(1,0,0,2, 0,1,0,-3, 0,0,1,3, 0,0,0,1);
front_left_pawMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawMatrix,rotate_Z(220.4));

var back_right_pawMatrix = new THREE.Matrix4().set(1,0,0,-2, 0,1,0,-3, 0,0,1,-3, 0,0,0,1);
back_right_pawMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawMatrix,rotate_Z(220.4));

var back_left_pawMatrix = new THREE.Matrix4().set(1,0,0,2, 0,1,0,-3, 0,0,1,-3, 0,0,0,1);
back_left_pawMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawMatrix,rotate_Z(220.4));

//claw
var claw_1Matrix = new THREE.Matrix4().set(1,0,0,1.5, 0,1,0,0,  0,0,1,2.5, 0,0,0,1);
var claw_2Matrix = new THREE.Matrix4().set(1,0,0,0.75, 0,1,0,0,  0,0,1,2.5, 0,0,0,1);
var claw_3Matrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0,  0,0,1,2.5, 0,0,0,1);
var claw_4Matrix = new THREE.Matrix4().set(1,0,0,-0.75, 0,1,0,0,  0,0,1,2.5, 0,0,0,1);
var claw_5Matrix = new THREE.Matrix4().set(1,0,0,-1.5, 0,1,0,0,  0,0,1,2.5, 0,0,0,1);

//nose tentacle big ones
//left
var tentacle_1Matrix = new THREE.Matrix4().set(1,0,0,1.5, 0,1,0,0.5,  0,0,1,1, 0,0,0,1);
tentacle_1Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_1Matrix, rotate_Z(219.8));
tentacle_1Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_1Matrix,rotate_X(-24.8));

var tentacle_2Matrix = new THREE.Matrix4().set(1,0,0,1.5, 0,1,0,0.2,  0,0,1,1, 0,0,0,1);
tentacle_2Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_2Matrix,rotate_X(-24.8));

var tentacle_3Matrix = new THREE.Matrix4().set(1,0,0,1.5, 0,1,0,-0.1,  0,0,1,1, 0,0,0,1);
tentacle_3Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_3Matrix, rotate_Z(220.1));
tentacle_3Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_3Matrix,rotate_X(-24.75));

var tentacle_4Matrix = new THREE.Matrix4().set(1,0,0,1.5, 0,1,0,-0.4,  0,0,1,1, 0,0,0,1);
tentacle_4Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_4Matrix,rotate_Z(220.15));
tentacle_4Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_4Matrix,rotate_X(-24.8));

var tentacle_5Matrix = new THREE.Matrix4().set(1,0,0,1.5, 0,1,0,-0.6,  0,0,1,1, 0,0,0,1);
tentacle_5Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_5Matrix,rotate_Z(220.3));
tentacle_5Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_5Matrix,rotate_X(-24.8));

var tentacle_6Matrix = new THREE.Matrix4().set(1,0,0,1.2, 0,1,0,0.6,  0,0,1,1, 0,0,0,1);
tentacle_6Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_6Matrix,rotate_Z(15.3));

var tentacle_7Matrix = new THREE.Matrix4().set(1,0,0,1.2, 0,1,0,-0.6,  0,0,1,1, 0,0,0,1);
tentacle_7Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_7Matrix,rotate_Z(220.3));

var tentacle_8Matrix = new THREE.Matrix4().set(1,0,0,0.85, 0,1,0,-0.6,  0,0,1,1, 0,0,0,1);
tentacle_8Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_8Matrix,rotate_Z(220.3));

var tentacle_9Matrix = new THREE.Matrix4().set(1,0,0,0.85, 0,1,0,0.6,  0,0,1,1, 0,0,0,1);
tentacle_9Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_9Matrix,rotate_Z(210.1));

//right
var tentacle_10Matrix = new THREE.Matrix4().set(1,0,0,-1.5, 0,1,0,0.5,  0,0,1,1, 0,0,0,1);
tentacle_10Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_10Matrix, rotate_Z(219.8));
tentacle_10Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_10Matrix,rotate_X(24.8));

var tentacle_11Matrix = new THREE.Matrix4().set(1,0,0,-1.5, 0,1,0,0.2,  0,0,1,1, 0,0,0,1);
tentacle_11Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_11Matrix,rotate_X(24.8));

var tentacle_12Matrix = new THREE.Matrix4().set(1,0,0,-1.5, 0,1,0,-0.1,  0,0,1,1, 0,0,0,1);
tentacle_12Matrx = new THREE.Matrix4().multiplyMatrices(tentacle_12Matrix, rotate_Z(230.1));
tentacle_12Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_12Matrix,rotate_X(24.75));

var tentacle_13Matrix = new THREE.Matrix4().set(1,0,0,-1.5, 0,1,0,-0.4,  0,0,1,1, 0,0,0,1);
tentacle_13Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_13Matrix,rotate_Z(220.15));
tentacle_13Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_13Matrix,rotate_X(24.8));

var tentacle_14Matrix = new THREE.Matrix4().set(1,0,0,-1.5, 0,1,0,-0.6,  0,0,1,1, 0,0,0,1);
tentacle_14Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_14Matrix,rotate_Z(220.3));
tentacle_14Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_14Matrix,rotate_X(24.8));

var tentacle_15Matrix = new THREE.Matrix4().set(1,0,0,-1.2, 0,1,0,0.6,  0,0,1,1, 0,0,0,1);
tentacle_15Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_15Matrix,rotate_Z(15.3));

var tentacle_16Matrix = new THREE.Matrix4().set(1,0,0,-1.2, 0,1,0,-0.6,  0,0,1,1, 0,0,0,1);
tentacle_16Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_16Matrix,rotate_Z(220.3));

var tentacle_17Matrix = new THREE.Matrix4().set(1,0,0,-0.85, 0,1,0,-0.6,  0,0,1,1, 0,0,0,1);
tentacle_17Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_17Matrix,rotate_Z(220.3));

var tentacle_18Matrix = new THREE.Matrix4().set(1,0,0,-0.85, 0,1,0,0.6,  0,0,1,1, 0,0,0,1);
tentacle_18Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_18Matrix,rotate_Z(210.1));

//small ones

var tentacle_19Matrix = new THREE.Matrix4().set(1,0,0,0.6, 0,1,0,0.2,  0,0,1,1, 0,0,0,1);
//tentacle_19Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_19Matrix,rotate_Z(210.1));

var tentacle_20Matrix = new THREE.Matrix4().set(1,0,0,0.6, 0,1,0,-0.2,  0,0,1,1, 0,0,0,1);
//tentacle_20Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_20Matrix,rotate_Z(220.3));

var tentacle_21Matrix = new THREE.Matrix4().set(1,0,0,-0.6, 0,1,0,0.2,  0,0,1,1, 0,0,0,1);
//tentacle_21Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_21Matrix,rotate_Z(220.3));

var tentacle_22Matrix = new THREE.Matrix4().set(1,0,0,-0.6, 0,1,0,-0.2,  0,0,1,1, 0,0,0,1);
//tentacle_22Matrix = new THREE.Matrix4().multiplyMatrices(tentacle_22Matrix,rotate_Z(210.1));


// CREATE BODY
var torso = new THREE.Mesh(torsoGeometry,normalMaterial);
torso.setMatrix(torsoMatrix);


// TO-DO: PUT TOGETHER THE REST OF YOUR STAR-NOSED MOLE AND ADD TO THE SCENE!
// Hint: Hint: Add one piece of geometry at a time, then implement the motion for that part. 
//             Then you can make sure your hierarchy still works properly after each step.


var tail = new THREE.Mesh(tailGeometry,normalMaterial);
tail.setMatrix(tailMatrix);

var head = new THREE.Mesh(headGeometry,normalMaterial);
head.setMatrix(headMatrix);

var nose = new THREE.Mesh(noseGeometry,normalMaterial);
nose.setMatrix(noseMatrix);

var front_right_paw = new THREE.Mesh(pawGeometry, normalMaterial);
var front_left_paw = new THREE.Mesh(pawGeometry, normalMaterial);
var back_right_paw = new THREE.Mesh(pawGeometry, normalMaterial);
var back_left_paw = new THREE.Mesh(pawGeometry, normalMaterial);
front_right_paw.setMatrix(front_right_pawMatrix);
front_left_paw.setMatrix(front_left_pawMatrix);
back_right_paw.setMatrix(back_right_pawMatrix);
back_left_paw.setMatrix(back_left_pawMatrix);

var front_right_claw_1 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_right_claw_2 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_right_claw_3 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_right_claw_4 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_right_claw_5 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_left_claw_1 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_left_claw_2 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_left_claw_3 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_left_claw_4 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_left_claw_5 = new THREE.Mesh(clawGeometry, normalMaterial);
front_right_claw_1.setMatrix(claw_1Matrix);
front_right_claw_2.setMatrix(claw_2Matrix);
front_right_claw_3.setMatrix(claw_3Matrix);
front_right_claw_4.setMatrix(claw_4Matrix);
front_right_claw_5.setMatrix(claw_5Matrix);
front_left_claw_1.setMatrix(claw_1Matrix);
front_left_claw_2.setMatrix(claw_2Matrix);
front_left_claw_3.setMatrix(claw_3Matrix);
front_left_claw_4.setMatrix(claw_4Matrix);
front_left_claw_5.setMatrix(claw_5Matrix);

var back_right_claw_1 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_right_claw_2 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_right_claw_3 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_right_claw_4 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_right_claw_5 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_left_claw_1 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_left_claw_2 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_left_claw_3 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_left_claw_4 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_left_claw_5 = new THREE.Mesh(clawGeometry, normalMaterial);
back_right_claw_1.setMatrix(claw_1Matrix);
back_right_claw_2.setMatrix(claw_2Matrix);
back_right_claw_3.setMatrix(claw_3Matrix);
back_right_claw_4.setMatrix(claw_4Matrix);
back_right_claw_5.setMatrix(claw_5Matrix);
back_left_claw_1.setMatrix(claw_1Matrix);
back_left_claw_2.setMatrix(claw_2Matrix);
back_left_claw_3.setMatrix(claw_3Matrix);
back_left_claw_4.setMatrix(claw_4Matrix);
back_left_claw_5.setMatrix(claw_5Matrix);

var tentacle_1 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_2 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_3 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_4 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_5 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_6 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_7 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_8 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_9 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_10 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_11 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_12 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_13 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_14 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_15 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_16 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_17 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_18 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_19 =  new THREE.Mesh(smalltentaclesGeometry, normalMaterial);
var tentacle_20 =  new THREE.Mesh(smalltentaclesGeometry, normalMaterial);
var tentacle_21 =  new THREE.Mesh(smalltentaclesGeometry, normalMaterial);
var tentacle_22 =  new THREE.Mesh(smalltentaclesGeometry, normalMaterial);
tentacle_1.setMatrix(tentacle_1Matrix);
tentacle_2.setMatrix(tentacle_2Matrix);
tentacle_3.setMatrix(tentacle_3Matrix);
tentacle_4.setMatrix(tentacle_4Matrix);
tentacle_5.setMatrix(tentacle_5Matrix);
tentacle_6.setMatrix(tentacle_6Matrix);
tentacle_7.setMatrix(tentacle_7Matrix);
tentacle_8.setMatrix(tentacle_8Matrix);
tentacle_9.setMatrix(tentacle_9Matrix);
tentacle_10.setMatrix(tentacle_10Matrix);
tentacle_11.setMatrix(tentacle_11Matrix);
tentacle_12.setMatrix(tentacle_12Matrix);
tentacle_13.setMatrix(tentacle_13Matrix);
tentacle_14.setMatrix(tentacle_14Matrix);
tentacle_15.setMatrix(tentacle_15Matrix);
tentacle_16.setMatrix(tentacle_16Matrix);
tentacle_17.setMatrix(tentacle_17Matrix);
tentacle_18.setMatrix(tentacle_18Matrix);
tentacle_19.setMatrix(tentacle_19Matrix);
tentacle_20.setMatrix(tentacle_20Matrix);
tentacle_21.setMatrix(tentacle_21Matrix);
tentacle_22.setMatrix(tentacle_22Matrix);


torso.add(tail);
head.add(nose);
torso.add(head);

front_right_paw.add(front_right_claw_1);
front_right_paw.add(front_right_claw_2);
front_right_paw.add(front_right_claw_3);
front_right_paw.add(front_right_claw_4);
front_right_paw.add(front_right_claw_5);
front_left_paw.add(front_left_claw_1);
front_left_paw.add(front_left_claw_2);
front_left_paw.add(front_left_claw_3);
front_left_paw.add(front_left_claw_4);
front_left_paw.add(front_left_claw_5);

back_right_paw.add(back_right_claw_1);
back_right_paw.add(back_right_claw_2);
back_right_paw.add(back_right_claw_3);
back_right_paw.add(back_right_claw_4);
back_right_paw.add(back_right_claw_5);
back_left_paw.add(back_left_claw_1);
back_left_paw.add(back_left_claw_2);
back_left_paw.add(back_left_claw_3);
back_left_paw.add(back_left_claw_4);
back_left_paw.add(back_left_claw_5);

nose.add(tentacle_1);
nose.add(tentacle_2);
nose.add(tentacle_3);
nose.add(tentacle_4);
nose.add(tentacle_5);
nose.add(tentacle_6);
nose.add(tentacle_7);
nose.add(tentacle_8);
nose.add(tentacle_9);
nose.add(tentacle_10);
nose.add(tentacle_11);
nose.add(tentacle_12);
nose.add(tentacle_13);
nose.add(tentacle_14);
nose.add(tentacle_15);
nose.add(tentacle_16);
nose.add(tentacle_17);
nose.add(tentacle_18);
nose.add(tentacle_19);
nose.add(tentacle_20);
nose.add(tentacle_21);
nose.add(tentacle_22);

torso.add(front_right_paw);
torso.add(front_left_paw);
torso.add(back_right_paw);
torso.add(back_left_paw);

scene.add(torso);




// APPLY DIFFERENT JUMP CUTS/ANIMATIONS TO DIFFERNET KEYS
// Note: The start of "U" animation has been done for you, you must implement the hiearchy and jumpcut.
// Hint: There are other ways to manipulate and grab clock values!!
// Hint: Check THREE.js clock documenation for ideas.
// Hint: It may help to start with a jumpcut and implement the animation after.
// Hint: Where is updateBody() called?
var clock = new THREE.Clock(true);

var p0; // start position or angle
var p1; // end position or angle
var time_length; // total time of animation
var time_start; // start time of animation
var time_end; // end time of animation
var p; // current frame
var animate = false; // animate?

// function init_animation()
// Initializes parametgers and sets animate flag to true.
// Input: start position or angle, end position or angle, and total time of animation.
function init_animation(p_start,p_end,t_length){
  p0 = p_start;
  p1 = p_end;
  time_length = t_length;
  time_start = clock.getElapsedTime();
  time_end = time_start + time_length;
  animate = true; // flag for animation
  return;
}

function updateBody() {
  switch(true)
  {
  	  //body left/right
      case(key == "U" || key =="E" && animate):
	      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
      
//      	  if(jump_cut == false)
//      	` {  
			      if (time > time_end){
			        p = p1;
			        animate = false;
			        break;
			      }
			
			      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
			      
			      if(key == "U")
			    	  p = -p;
//      	  }
//      	  else
//      	  {
//      		 p = p1;
//      	  }
	      torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotate_Z(p));
	            torso.setMatrix(torsoRotMatrix); 
      

      break

      // TO-DO: IMPLEMENT JUMPCUT/ANIMATION FOR EACH KEY!
      // Note: Remember spacebar sets jumpcut/animate!
      
      //head left/right
      case(key == "H"|| key == "G" && animate):
    	 
	      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
	
	      if (time > time_end){
	    	  p = p1;
	    	  animate = false;
	    	  break;
	      }
	      
	      	
	      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
	      
	      if(key == "H")
	    	  p = -p;
	      
      	
		  var headRotMatrix = new THREE.Matrix4().multiplyMatrices(headMatrix,rotate_X(p));
		  head.setMatrix(headRotMatrix); 

    	  
      break
            
      //tail left/right
      case(key == "T" || key == "V" && animate):
     	 
	      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
	
	      if (time > time_end){
	    	  p = p1;
	    	  animate = false;
	    	  break;
	      }
	
	      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
	      
	      if(key == "V")
	    	  p = -p;
	      
		  var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(tailMatrix,rotate_X(p));
		  tail.setMatrix(tailRotMatrix); 

    	  
      break
      
      //dig
      case(key == "D" && animate):
      	 
	      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
	
	      if (time > time_end){
	    	  p = p1;
	    	  animate = false;
	    	  break;
	      }
	
	      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
	      

		  var pawRotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawMatrix,rotate_Z(p));
		  front_right_paw.setMatrix(pawRotMatrix); 
		  
		  var pawRotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawMatrix,rotate_Z(p));
		  front_left_paw.setMatrix(pawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(claw_1Matrix,rotate_Z(p));
		  front_right_claw_1.setMatrix(clawRotMatrix);
		  front_left_claw_1.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(claw_2Matrix,rotate_Z(p));
		  front_right_claw_2.setMatrix(clawRotMatrix);
		  front_left_claw_2.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(claw_3Matrix,rotate_Z(p));
		  front_right_claw_3.setMatrix(clawRotMatrix);
		  front_left_claw_3.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(claw_4Matrix,rotate_Z(p));
		  front_right_claw_4.setMatrix(clawRotMatrix);
		  front_left_claw_4.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(claw_5Matrix,rotate_Z(p));
		  front_right_claw_5.setMatrix(clawRotMatrix);
		  front_left_claw_5.setMatrix(clawRotMatrix);
		  
      break
      
      case(key == "N" && animate):
       	 
	      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
	
	      if (time > time_end){
	    	  p = p1;
	    	  animate = false;
	    	  break;
	      }
	
	      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
	      
	      var sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(tentacle_1Matrix,rotate_X(p));
	      //sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
	      tentacle_1.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(tentacle_2Matrix,rotate_X(p));
	      //sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
		  tentacle_2.setMatrix(sidetentacleRotMatrix);
		  
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(tentacle_3Matrix,rotate_X(p));
	      //sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
	      tentacle_3.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(tentacle_4Matrix,rotate_X(p));
	      tentacle_4.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(tentacle_5Matrix,rotate_X(p));
	      //sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
	 	  tentacle_5.setMatrix(sidetentacleRotMatrix);
	 	  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_6Matrix,rotate_Z(-p));
		  tentacle_6.setMatrix(sidetentacleRotMatrix);
		  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_7Matrix,rotate_Z(p));
		  tentacle_7.setMatrix(sidetentacleRotMatrix);
		  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_8Matrix,rotate_Z(p));
		  tentacle_8.setMatrix(sidetentacleRotMatrix);
		  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_9Matrix,rotate_Z(-p));
		  tentacle_9.setMatrix(sidetentacleRotMatrix);
		  
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(tentacle_10Matrix,rotate_X(-p));
	      //sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
	      tentacle_10.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(tentacle_11Matrix,rotate_X(-p));
	      //sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
		  tentacle_11.setMatrix(sidetentacleRotMatrix);
		  
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(tentacle_12Matrix,rotate_X(-p));
	      //sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
	      tentacle_12.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(tentacle_13Matrix,rotate_X(-p));
	      tentacle_13.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(tentacle_14Matrix,rotate_X(-p));
	      //sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
	 	  tentacle_14.setMatrix(sidetentacleRotMatrix);
	 	  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_15Matrix,rotate_Z(-p));
		  tentacle_15.setMatrix(sidetentacleRotMatrix);
		  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_16Matrix,rotate_Z(p));
		  tentacle_16.setMatrix(sidetentacleRotMatrix);
		  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_17Matrix,rotate_Z(p));
		  tentacle_17.setMatrix(sidetentacleRotMatrix);
		  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_18Matrix,rotate_Z(-p));
		  tentacle_18.setMatrix(sidetentacleRotMatrix);
		  
		  //small
		  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_19Matrix,rotate_Z(-p));
		  tentacle_19.setMatrix(sidetentacleRotMatrix);
		  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_20Matrix,rotate_Z(p));
		  tentacle_20.setMatrix(sidetentacleRotMatrix);
		  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_21Matrix,rotate_Z(-p));
		  tentacle_21.setMatrix(sidetentacleRotMatrix);
		  
	 	  sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(tentacle_22Matrix,rotate_Z(p));
		  tentacle_22.setMatrix(sidetentacleRotMatrix);
	  break
      
    default:
      break;
  }
}

// LISTEN TO KEYBOARD
// Hint: Pay careful attention to how the  keys already specified work!
var keyboard = new THREEx.KeyboardState();
var grid_state = false;
var key;
var jump_cut = false;
keyboard.domElement.addEventListener('keydown',function(event){
  if (event.repeat)
    return;
  if(keyboard.eventMatches(event,"Z")){  // Z: Reveal/Hide helper grid
    grid_state = !grid_state;
    grid_state? scene.add(grid) : scene.remove(grid);}   
  else if(keyboard.eventMatches(event,"0")){    // 0: Set camera to neutral position, view reset
    camera.position.set(45,0,0);
    camera.lookAt(scene.position);}
  else if(keyboard.eventMatches(event," ")){ 
  	if(jump_cut == false)
  	{
  		jump_cut = true;	
  	}
  	else
  	{
  		jump_cut = false
  	}	}
  else if(keyboard.eventMatches(event,"U")){ 
    (key == "U")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "U")}  
  else if(keyboard.eventMatches(event,"E")){ 
	    (key == "E")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "E")}  
  else if(keyboard.eventMatches(event,"H")){ 
	    (key == "H")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "H")}
  else if(keyboard.eventMatches(event,"G")){ 
	    (key == "G")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "G")}
  else if(keyboard.eventMatches(event,"T")){ 
	    (key == "T")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "T")}
  else if(keyboard.eventMatches(event,"V")){ 
	    (key == "V")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "V")}
  else if(keyboard.eventMatches(event,"D")){ 
	    (key == "D")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "D")}
  else if(keyboard.eventMatches(event,"N")){ 
	    (key == "N")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "N")}

  // TO-DO: BIND KEYS TO YOUR JUMP CUTS AND ANIMATIONS
  // Note: Remember spacebar sets jumpcut/animate! 
  // Hint: Look up "threex.keyboardstate by Jerome Tienne" for more info.



    });

// SETUP UPDATE CALL-BACK
// Hint: It is useful to understand what is being updated here, the effect, and why.
function update() {
  updateBody();

  requestAnimationFrame(update);
  renderer.render(scene,camera);
}

update();