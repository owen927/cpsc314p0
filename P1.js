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
var headtorsoRotMatrix = new THREE.Matrix4();
var noseheadtorsoRotMatrix = new THREE.Matrix4();
var front_right_pawRotMatrix = new THREE.Matrix4();
var front_left_pawRotMatrix = new THREE.Matrix4();

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
var tailtorsoMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);
tail.setMatrix(tailtorsoMatrix);

var head = new THREE.Mesh(headGeometry,normalMaterial);
var headtorsoMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,headMatrix);
head.setMatrix(headtorsoMatrix);

var nose = new THREE.Mesh(noseGeometry,normalMaterial);
var noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(headtorsoMatrix,noseMatrix);
nose.setMatrix(noseheadtorsoMatrix);

var front_right_paw = new THREE.Mesh(pawGeometry, normalMaterial);
var front_right_pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,front_right_pawMatrix);
front_right_paw.setMatrix(front_right_pawtorsoMatrix);

var front_left_paw = new THREE.Mesh(pawGeometry, normalMaterial);
var front_left_pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,front_left_pawMatrix);
front_left_paw.setMatrix(front_left_pawtorsoMatrix);

var back_right_paw = new THREE.Mesh(pawGeometry, normalMaterial);
var back_right_pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,back_right_pawMatrix);
back_right_paw.setMatrix(back_right_pawtorsoMatrix);

var back_left_paw = new THREE.Mesh(pawGeometry, normalMaterial);
var back_left_pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,back_left_pawMatrix);
back_left_paw.setMatrix(back_left_pawtorsoMatrix);

var front_right_claw_1 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_right_claw_1pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawtorsoMatrix,claw_1Matrix);
front_right_claw_1.setMatrix(front_right_claw_1pawtorsoMatrix);

var front_right_claw_2 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_right_claw_2pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawtorsoMatrix,claw_2Matrix);
front_right_claw_2.setMatrix(front_right_claw_2pawtorsoMatrix);

var front_right_claw_3 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_right_claw_3pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawtorsoMatrix,claw_3Matrix);
front_right_claw_3.setMatrix(front_right_claw_3pawtorsoMatrix);

var front_right_claw_4 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_right_claw_4pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawtorsoMatrix,claw_4Matrix);
front_right_claw_4.setMatrix(front_right_claw_4pawtorsoMatrix);

var front_right_claw_5 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_right_claw_5pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawtorsoMatrix,claw_5Matrix);
front_right_claw_5.setMatrix(front_right_claw_5pawtorsoMatrix);

var back_right_claw_1 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_right_claw_1pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawtorsoMatrix,claw_1Matrix);
back_right_claw_1.setMatrix(back_right_claw_1pawtorsoMatrix);

var back_right_claw_2 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_right_claw_2pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawtorsoMatrix,claw_2Matrix);
back_right_claw_2.setMatrix(back_right_claw_2pawtorsoMatrix);

var back_right_claw_3 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_right_claw_3pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawtorsoMatrix,claw_3Matrix);
back_right_claw_3.setMatrix(back_right_claw_3pawtorsoMatrix);

var back_right_claw_4 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_right_claw_4pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawtorsoMatrix,claw_4Matrix);
back_right_claw_4.setMatrix(back_right_claw_4pawtorsoMatrix);

var back_right_claw_5 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_right_claw_5pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawtorsoMatrix,claw_5Matrix);
back_right_claw_5.setMatrix(back_right_claw_5pawtorsoMatrix);

var front_left_claw_1 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_left_claw_1pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawtorsoMatrix,claw_1Matrix);
front_left_claw_1.setMatrix(front_left_claw_1pawtorsoMatrix);

var front_left_claw_2 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_left_claw_2pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawtorsoMatrix,claw_2Matrix);
front_left_claw_2.setMatrix(front_left_claw_2pawtorsoMatrix);

var front_left_claw_3 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_left_claw_3pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawtorsoMatrix,claw_3Matrix);
front_left_claw_3.setMatrix(front_left_claw_3pawtorsoMatrix);

var front_left_claw_4 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_left_claw_4pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawtorsoMatrix,claw_4Matrix);
front_left_claw_4.setMatrix(front_left_claw_4pawtorsoMatrix);

var front_left_claw_5 = new THREE.Mesh(clawGeometry, normalMaterial);
var front_left_claw_5pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawtorsoMatrix,claw_5Matrix);
front_left_claw_5.setMatrix(front_left_claw_5pawtorsoMatrix);

var back_left_claw_1 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_left_claw_1pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawtorsoMatrix,claw_1Matrix);
back_left_claw_1.setMatrix(back_left_claw_1pawtorsoMatrix);

var back_left_claw_2 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_left_claw_2pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawtorsoMatrix,claw_2Matrix);
back_left_claw_2.setMatrix(back_left_claw_2pawtorsoMatrix);

var back_left_claw_3 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_left_claw_3pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawtorsoMatrix,claw_3Matrix);
back_left_claw_3.setMatrix(back_left_claw_3pawtorsoMatrix);

var back_left_claw_4 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_left_claw_4pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawtorsoMatrix,claw_4Matrix);
back_left_claw_4.setMatrix(back_left_claw_4pawtorsoMatrix);

var back_left_claw_5 = new THREE.Mesh(clawGeometry, normalMaterial);
var back_left_claw_5pawtorsoMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawtorsoMatrix,claw_5Matrix);
back_left_claw_5.setMatrix(back_left_claw_5pawtorsoMatrix);

var tentacle_1 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_1noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_1Matrix);
tentacle_1.setMatrix(tentacle_1noseheadtorsoMatrix);

var tentacle_2 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_2noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_2Matrix);
tentacle_2.setMatrix(tentacle_2noseheadtorsoMatrix);

var tentacle_3 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_3noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_3Matrix);
tentacle_3.setMatrix(tentacle_3noseheadtorsoMatrix);

var tentacle_4 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_4noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_4Matrix);
tentacle_4.setMatrix(tentacle_4noseheadtorsoMatrix);

var tentacle_5 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_5noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_5Matrix);
tentacle_5.setMatrix(tentacle_5noseheadtorsoMatrix);

var tentacle_6 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_6noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_6Matrix);
tentacle_6.setMatrix(tentacle_6noseheadtorsoMatrix);

var tentacle_7 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_7noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_7Matrix);
tentacle_7.setMatrix(tentacle_7noseheadtorsoMatrix);

var tentacle_8 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_8noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_8Matrix);
tentacle_8.setMatrix(tentacle_8noseheadtorsoMatrix);

var tentacle_9 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_9noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_9Matrix);
tentacle_9.setMatrix(tentacle_9noseheadtorsoMatrix);

var tentacle_10 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_10noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_10Matrix);
tentacle_10.setMatrix(tentacle_10noseheadtorsoMatrix);

var tentacle_11 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_11noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_11Matrix);
tentacle_11.setMatrix(tentacle_11noseheadtorsoMatrix);

var tentacle_12 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_12noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_12Matrix);
tentacle_12.setMatrix(tentacle_12noseheadtorsoMatrix);

var tentacle_13 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_13noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_13Matrix);
tentacle_13.setMatrix(tentacle_13noseheadtorsoMatrix);

var tentacle_14 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_14noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_14Matrix);
tentacle_14.setMatrix(tentacle_14noseheadtorsoMatrix);

var tentacle_15 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_15noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_15Matrix);
tentacle_15.setMatrix(tentacle_15noseheadtorsoMatrix);

var tentacle_16 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_16noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_16Matrix);
tentacle_16.setMatrix(tentacle_16noseheadtorsoMatrix);

var tentacle_17 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_17noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_17Matrix);
tentacle_17.setMatrix(tentacle_17noseheadtorsoMatrix);

var tentacle_18 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_18noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_18Matrix);
tentacle_18.setMatrix(tentacle_18noseheadtorsoMatrix);

var tentacle_19 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_19noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_19Matrix);
tentacle_19.setMatrix(tentacle_19noseheadtorsoMatrix);

var tentacle_20 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_20noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_20Matrix);
tentacle_20.setMatrix(tentacle_20noseheadtorsoMatrix);

var tentacle_21 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_21noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_21Matrix);
tentacle_21.setMatrix(tentacle_21noseheadtorsoMatrix);

var tentacle_22 =  new THREE.Mesh(tentaclesGeometry, normalMaterial);
var tentacle_22noseheadtorsoMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoMatrix,tentacle_22Matrix);
tentacle_22.setMatrix(tentacle_22noseheadtorsoMatrix);





scene.add(torso);
scene.add(head);
scene.add(nose);
scene.add(tail);
scene.add(front_right_paw);
scene.add(front_left_paw);
scene.add(back_right_paw);
scene.add(back_left_paw);
scene.add(front_right_claw_1);
scene.add(front_right_claw_2);
scene.add(front_right_claw_3);
scene.add(front_right_claw_4);
scene.add(front_right_claw_5);
scene.add(back_right_claw_1);
scene.add(back_right_claw_2);
scene.add(back_right_claw_3);
scene.add(back_right_claw_4);
scene.add(back_right_claw_5);
scene.add(front_left_claw_1);
scene.add(front_left_claw_2);
scene.add(front_left_claw_3);
scene.add(front_left_claw_4);
scene.add(front_left_claw_5);
scene.add(back_left_claw_1);
scene.add(back_left_claw_2);
scene.add(back_left_claw_3);
scene.add(back_left_claw_4);
scene.add(back_left_claw_5);
scene.add(tentacle_1);
scene.add(tentacle_2);
scene.add(tentacle_3);
scene.add(tentacle_4);
scene.add(tentacle_5);
scene.add(tentacle_6);
scene.add(tentacle_7);
scene.add(tentacle_8);
scene.add(tentacle_9);
scene.add(tentacle_10);
scene.add(tentacle_11);
scene.add(tentacle_12);
scene.add(tentacle_13);
scene.add(tentacle_14);
scene.add(tentacle_15);
scene.add(tentacle_16);
scene.add(tentacle_17);
scene.add(tentacle_18);
scene.add(tentacle_19);
scene.add(tentacle_20);
scene.add(tentacle_21);
scene.add(tentacle_22);






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

var torsoRotMatrix = new THREE.Matrix4();
var headtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,headMatrix);
var noseheadtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(headtorsoMatrix,noseMatrix);
var tailtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,tailMatrix);
var front_right_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,front_right_pawMatrix);
var front_left_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,front_left_pawMatrix);
var back_right_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,back_right_pawMatrix);
var back_left_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,back_left_pawMatrix);

function updateBody() {
  switch(true)
  {
  	  //body left/right
      case((key == "U" || key =="E") && animate && jump_cut == false):
	      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
      

			      if (time > time_end){
			        p = p1;
			        animate = false;
			        break;
			      }
			
			      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
			      
			      if(key == "U")
			    	  p = -p;

	      torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotate_Z(p));
	      torso.setMatrix(torsoRotMatrix);
	      
	      tailtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,tailMatrix);
	      tail.setMatrix(tailtorsoRotMatrix);
	      
          headtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,headMatrix);
	      head.setMatrix(headtorsoRotMatrix);
	      
	      noseheadtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(headtorsoRotMatrix,noseMatrix);
    	  nose.setMatrix(noseheadtorsoRotMatrix);
    	  
    	  front_right_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,front_right_pawMatrix);
    	  front_right_paw.setMatrix(front_right_pawRotMatrix);
    	  
    	  front_left_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,front_left_pawMatrix);
    	  front_left_paw.setMatrix(front_left_pawRotMatrix);
    	  
    	  back_right_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,back_right_pawMatrix);
    	  back_right_paw.setMatrix(back_right_pawRotMatrix);
    	  
    	  back_left_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,back_left_pawMatrix);
    	  back_left_paw.setMatrix(back_left_pawRotMatrix);
    	  
    	  front_right_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,claw_1Matrix);
    	  front_right_claw_1.setMatrix(front_right_claw1RotMatrix);
    	  
    	  front_right_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,claw_2Matrix);
    	  front_right_claw_2.setMatrix(front_right_claw1RotMatrix);
    	  
    	  front_right_claw3RotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,claw_3Matrix);
    	  front_right_claw_3.setMatrix(front_right_claw3RotMatrix);
    	  
    	  front_right_claw4RotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,claw_4Matrix);
    	  front_right_claw_4.setMatrix(front_right_claw4RotMatrix);
    	  
    	  front_right_claw5RotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,claw_5Matrix);
    	  front_right_claw_5.setMatrix(front_right_claw5RotMatrix);
    	  
    	  front_left_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,claw_1Matrix);
    	  front_left_claw_1.setMatrix(front_left_claw1RotMatrix);
    	  
    	  front_left_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,claw_2Matrix);
    	  front_left_claw_2.setMatrix(front_left_claw1RotMatrix);
    	  
    	  front_left_claw3RotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,claw_3Matrix);
    	  front_left_claw_3.setMatrix(front_left_claw3RotMatrix);
    	  
    	  front_left_claw4RotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,claw_4Matrix);
    	  front_left_claw_4.setMatrix(front_left_claw4RotMatrix);
    	  
    	  front_left_claw5RotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,claw_5Matrix);
    	  front_left_claw_5.setMatrix(front_left_claw5RotMatrix);
    	  
    	  back_right_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,claw_1Matrix);
    	  back_right_claw_1.setMatrix(back_right_claw1RotMatrix);
    	  
    	  back_right_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,claw_2Matrix);
    	  back_right_claw_2.setMatrix(back_right_claw1RotMatrix);
    	  
    	  back_right_claw3RotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,claw_3Matrix);
    	  back_right_claw_3.setMatrix(back_right_claw3RotMatrix);
    	  
    	  back_right_claw4RotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,claw_4Matrix);
    	  back_right_claw_4.setMatrix(back_right_claw4RotMatrix);
    	  
    	  back_right_claw5RotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,claw_5Matrix);
    	  back_right_claw_5.setMatrix(back_right_claw5RotMatrix);
    	  
    	  back_left_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawRotMatrix,claw_1Matrix);
    	  back_left_claw_1.setMatrix(back_left_claw1RotMatrix);
    	  
    	  back_left_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawRotMatrix,claw_2Matrix);
    	  back_left_claw_2.setMatrix(back_left_claw1RotMatrix);
    	  
    	  back_left_claw3RotMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawRotMatrix,claw_3Matrix);
    	  back_left_claw_3.setMatrix(back_left_claw3RotMatrix);
    	  
    	  back_left_claw4RotMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawRotMatrix,claw_4Matrix);
    	  back_left_claw_4.setMatrix(back_left_claw4RotMatrix);
    	  
    	  back_left_claw5RotMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawRotMatrix,claw_5Matrix);
    	  back_left_claw_5.setMatrix(back_left_claw5RotMatrix);
    	  
    	  tentacle_1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_1Matrix);
    	  tentacle_1.setMatrix(tentacle_1RotMatrix);
    	  
    	  tentacle_2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_2Matrix);
    	  tentacle_2.setMatrix(tentacle_2RotMatrix);
    	  
    	  tentacle_3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_3Matrix);
    	  tentacle_3.setMatrix(tentacle_3RotMatrix);
    	  
    	  tentacle_4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_4Matrix);
    	  tentacle_4.setMatrix(tentacle_4RotMatrix);
    	  
    	  tentacle_5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_5Matrix);
    	  tentacle_5.setMatrix(tentacle_5RotMatrix);
    	  
    	  tentacle_6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_6Matrix);
    	  tentacle_6.setMatrix(tentacle_6RotMatrix);
    	  
    	  tentacle_7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_7Matrix);
    	  tentacle_7.setMatrix(tentacle_7RotMatrix);
    	  
    	  tentacle_8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_8Matrix);
    	  tentacle_8.setMatrix(tentacle_8RotMatrix);
    	  
    	  tentacle_9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_9Matrix);
    	  tentacle_9.setMatrix(tentacle_9RotMatrix);
    	  
    	  tentacle_10RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_10Matrix);
    	  tentacle_10.setMatrix(tentacle_10RotMatrix);
    	  
    	  tentacle_11RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_11Matrix);
    	  tentacle_11.setMatrix(tentacle_11RotMatrix);
    	  
    	  tentacle_12RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_12Matrix);
    	  tentacle_12.setMatrix(tentacle_12RotMatrix);
    	  
    	  tentacle_13RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_13Matrix);
    	  tentacle_13.setMatrix(tentacle_13RotMatrix);
    	  
    	  tentacle_14RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_14Matrix);
    	  tentacle_14.setMatrix(tentacle_14RotMatrix);
    	  
    	  tentacle_15RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_15Matrix);
    	  tentacle_15.setMatrix(tentacle_15RotMatrix);
    	  
    	  tentacle_16RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_16Matrix);
    	  tentacle_16.setMatrix(tentacle_16RotMatrix);
    	  
    	  tentacle_17RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_17Matrix);
    	  tentacle_17.setMatrix(tentacle_17RotMatrix);
    	  
    	  tentacle_18RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_18Matrix);
    	  tentacle_18.setMatrix(tentacle_18RotMatrix);
    	  
    	  tentacle_19RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_19Matrix);
    	  tentacle_19.setMatrix(tentacle_19RotMatrix);
    	  
    	  tentacle_20RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_20Matrix);
    	  tentacle_20.setMatrix(tentacle_20RotMatrix);
    	  
    	  tentacle_21RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_21Matrix);
    	  tentacle_21.setMatrix(tentacle_21RotMatrix);
    	  
    	  tentacle_22RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_22Matrix);
    	  tentacle_22.setMatrix(tentacle_22RotMatrix);
    	  
    	  
    	  

      break
      
      case((key == "U" || key =="E") && animate && jump_cut == true):
    	 
    	  p = p1;
    
      
          if(key == "U")
	    	  p = -p;
          
	      torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,rotate_Z(p));
	      torso.setMatrix(torsoRotMatrix);
	      
	      tailtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,tailMatrix);
          tail.setMatrix(tailtorsoRotMatrix);
	      
          headtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,headMatrix);
	      head.setMatrix(headtorsoRotMatrix);
	      
	      noseheadtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(headtorsoRotMatrix,noseMatrix);
    	  nose.setMatrix(noseheadtorsoRotMatrix);
    	  
    	  front_right_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,front_right_pawMatrix);
    	  front_right_paw.setMatrix(front_right_pawRotMatrix);
    	  
    	  front_left_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,front_left_pawMatrix);
    	  front_left_paw.setMatrix(front_left_pawRotMatrix);
    	  
    	  back_right_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,back_right_pawMatrix);
    	  back_right_paw.setMatrix(back_right_pawRotMatrix);
    	  
    	  back_left_pawRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoRotMatrix,back_left_pawMatrix);
    	  back_left_paw.setMatrix(back_left_pawRotMatrix);
    	  
    	  front_right_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,claw_1Matrix);
    	  front_right_claw_1.setMatrix(front_right_claw1RotMatrix);
    	  
    	  front_right_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,claw_2Matrix);
    	  front_right_claw_2.setMatrix(front_right_claw1RotMatrix);
    	  
    	  front_right_claw3RotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,claw_3Matrix);
    	  front_right_claw_3.setMatrix(front_right_claw3RotMatrix);
    	  
    	  front_right_claw4RotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,claw_4Matrix);
    	  front_right_claw_4.setMatrix(front_right_claw4RotMatrix);
    	  
    	  front_right_claw5RotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,claw_5Matrix);
    	  front_right_claw_5.setMatrix(front_right_claw5RotMatrix);
    	  
    	  front_left_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,claw_1Matrix);
    	  front_left_claw_1.setMatrix(front_left_claw1RotMatrix);
    	  
    	  front_left_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,claw_2Matrix);
    	  front_left_claw_2.setMatrix(front_left_claw1RotMatrix);
    	  
    	  front_left_claw3RotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,claw_3Matrix);
    	  front_left_claw_3.setMatrix(front_left_claw3RotMatrix);
    	  
    	  front_left_claw4RotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,claw_4Matrix);
    	  front_left_claw_4.setMatrix(front_left_claw4RotMatrix);
    	  
    	  front_left_claw5RotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,claw_5Matrix);
    	  front_left_claw_5.setMatrix(front_left_claw5RotMatrix);
    	  
    	  back_right_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,claw_1Matrix);
    	  back_right_claw_1.setMatrix(back_right_claw1RotMatrix);
    	  
    	  back_right_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,claw_2Matrix);
    	  back_right_claw_2.setMatrix(back_right_claw1RotMatrix);
    	  
    	  back_right_claw3RotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,claw_3Matrix);
    	  back_right_claw_3.setMatrix(back_right_claw3RotMatrix);
    	  
    	  back_right_claw4RotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,claw_4Matrix);
    	  back_right_claw_4.setMatrix(back_right_claw4RotMatrix);
    	  
    	  back_right_claw5RotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,claw_5Matrix);
    	  back_right_claw_5.setMatrix(back_right_claw5RotMatrix);
    	  
    	  back_left_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawRotMatrix,claw_1Matrix);
    	  back_left_claw_1.setMatrix(back_left_claw1RotMatrix);
    	  
    	  back_left_claw1RotMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawRotMatrix,claw_2Matrix);
    	  back_left_claw_2.setMatrix(back_left_claw1RotMatrix);
    	  
    	  back_left_claw3RotMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawRotMatrix,claw_3Matrix);
    	  back_left_claw_3.setMatrix(back_left_claw3RotMatrix);
    	  
    	  back_left_claw4RotMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawRotMatrix,claw_4Matrix);
    	  back_left_claw_4.setMatrix(back_left_claw4RotMatrix);
    	  
    	  back_left_claw5RotMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawRotMatrix,claw_5Matrix);
    	  back_left_claw_5.setMatrix(back_left_claw5RotMatrix);
    	  
    	  tentacle_1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_1Matrix);
    	  tentacle_1.setMatrix(tentacle_1RotMatrix);
    	  
    	  tentacle_2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_2Matrix);
    	  tentacle_2.setMatrix(tentacle_2RotMatrix);
    	  
    	  tentacle_3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_3Matrix);
    	  tentacle_3.setMatrix(tentacle_3RotMatrix);
    	  
    	  tentacle_4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_4Matrix);
    	  tentacle_4.setMatrix(tentacle_4RotMatrix);
    	  
    	  tentacle_5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_5Matrix);
    	  tentacle_5.setMatrix(tentacle_5RotMatrix);
    	  
    	  tentacle_6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_6Matrix);
    	  tentacle_6.setMatrix(tentacle_6RotMatrix);
    	  
    	  tentacle_7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_7Matrix);
    	  tentacle_7.setMatrix(tentacle_7RotMatrix);
    	  
    	  tentacle_8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_8Matrix);
    	  tentacle_8.setMatrix(tentacle_8RotMatrix);
    	  
    	  tentacle_9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_9Matrix);
    	  tentacle_9.setMatrix(tentacle_9RotMatrix);
    	  
    	  tentacle_10RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_10Matrix);
    	  tentacle_10.setMatrix(tentacle_10RotMatrix);
    	  
    	  tentacle_11RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_11Matrix);
    	  tentacle_11.setMatrix(tentacle_11RotMatrix);
    	  
    	  tentacle_12RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_12Matrix);
    	  tentacle_12.setMatrix(tentacle_12RotMatrix);
    	  
    	  tentacle_13RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_13Matrix);
    	  tentacle_13.setMatrix(tentacle_13RotMatrix);
    	  
    	  tentacle_14RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_14Matrix);
    	  tentacle_14.setMatrix(tentacle_14RotMatrix);
    	  
    	  tentacle_15RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_15Matrix);
    	  tentacle_15.setMatrix(tentacle_15RotMatrix);
    	  
    	  tentacle_16RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_16Matrix);
    	  tentacle_16.setMatrix(tentacle_16RotMatrix);
    	  
    	  tentacle_17RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_17Matrix);
    	  tentacle_17.setMatrix(tentacle_17RotMatrix);
    	  
    	  tentacle_18RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_18Matrix);
    	  tentacle_18.setMatrix(tentacle_18RotMatrix);
    	  
    	  tentacle_19RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_19Matrix);
    	  tentacle_19.setMatrix(tentacle_19RotMatrix);
    	  
    	  tentacle_20RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_20Matrix);
    	  tentacle_20.setMatrix(tentacle_20RotMatrix);
    	  
    	  tentacle_21RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_21Matrix);
    	  tentacle_21.setMatrix(tentacle_21RotMatrix);
    	  
    	  tentacle_22RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_22Matrix);
    	  tentacle_22.setMatrix(tentacle_22RotMatrix);
      

      break

      // TO-DO: IMPLEMENT JUMPCUT/ANIMATION FOR EACH KEY!
      // Note: Remember spacebar sets jumpcut/animate!
      
      //head left/right
      case((key == "H"|| key == "G") && animate && jump_cut == false):
    	 
	      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
	
	      if (time > time_end){
	    	  p = p1;
	    	  animate = false;
	    	  break;
	      }
	      
	      	
	      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
	      
	      if(key == "H")
	    	  p = -p;
	      
      	  
		  headRotMatrix = new THREE.Matrix4().multiplyMatrices(headtorsoRotMatrix,rotate_X(p));
		  head.setMatrix(headRotMatrix); 
		  
		  noseheadtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
		  nose.setMatrix(noseheadtorsoRotMatrix);
		  
		  tentacle_1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_1Matrix);
    	  tentacle_1.setMatrix(tentacle_1RotMatrix);
    	  
    	  tentacle_2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_2Matrix);
    	  tentacle_2.setMatrix(tentacle_2RotMatrix);
    	  
    	  tentacle_3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_3Matrix);
    	  tentacle_3.setMatrix(tentacle_3RotMatrix);
    	  
    	  tentacle_4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_4Matrix);
    	  tentacle_4.setMatrix(tentacle_4RotMatrix);
    	  
    	  tentacle_5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_5Matrix);
    	  tentacle_5.setMatrix(tentacle_5RotMatrix);
    	  
    	  tentacle_6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_6Matrix);
    	  tentacle_6.setMatrix(tentacle_6RotMatrix);
    	  
    	  tentacle_7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_7Matrix);
    	  tentacle_7.setMatrix(tentacle_7RotMatrix);
    	  
    	  tentacle_8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_8Matrix);
    	  tentacle_8.setMatrix(tentacle_8RotMatrix);
    	  
    	  tentacle_9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_9Matrix);
    	  tentacle_9.setMatrix(tentacle_9RotMatrix);
    	  
    	  tentacle_10RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_10Matrix);
    	  tentacle_10.setMatrix(tentacle_10RotMatrix);
    	  
    	  tentacle_11RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_11Matrix);
    	  tentacle_11.setMatrix(tentacle_11RotMatrix);
    	  
    	  tentacle_12RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_12Matrix);
    	  tentacle_12.setMatrix(tentacle_12RotMatrix);
    	  
    	  tentacle_13RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_13Matrix);
    	  tentacle_13.setMatrix(tentacle_13RotMatrix);
    	  
    	  tentacle_14RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_14Matrix);
    	  tentacle_14.setMatrix(tentacle_14RotMatrix);
    	  
    	  tentacle_15RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_15Matrix);
    	  tentacle_15.setMatrix(tentacle_15RotMatrix);
    	  
    	  tentacle_16RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_16Matrix);
    	  tentacle_16.setMatrix(tentacle_16RotMatrix);
    	  
    	  tentacle_17RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_17Matrix);
    	  tentacle_17.setMatrix(tentacle_17RotMatrix);
    	  
    	  tentacle_18RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_18Matrix);
    	  tentacle_18.setMatrix(tentacle_18RotMatrix);
    	  
    	  tentacle_19RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_19Matrix);
    	  tentacle_19.setMatrix(tentacle_19RotMatrix);
    	  
    	  tentacle_20RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_20Matrix);
    	  tentacle_20.setMatrix(tentacle_20RotMatrix);
    	  
    	  tentacle_21RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_21Matrix);
    	  tentacle_21.setMatrix(tentacle_21RotMatrix);
    	  
    	  tentacle_22RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_22Matrix);
    	  tentacle_22.setMatrix(tentacle_22RotMatrix);
    	  
      break
      
      case((key == "H"|| key == "G") && animate && jump_cut == true):
     	 
	       p = p1;
      
	      if(key == "H")
	    	  p = -p;
	      
      	
	      headRotMatrix = new THREE.Matrix4().multiplyMatrices(headtorsoRotMatrix,rotate_X(p));
		  head.setMatrix(headRotMatrix); 
		  
		  noseheadtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
		  nose.setMatrix(noseheadtorsoRotMatrix);
		  
		  tentacle_1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_1Matrix);
    	  tentacle_1.setMatrix(tentacle_1RotMatrix);
    	  
    	  tentacle_2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_2Matrix);
    	  tentacle_2.setMatrix(tentacle_2RotMatrix);
    	  
    	  tentacle_3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_3Matrix);
    	  tentacle_3.setMatrix(tentacle_3RotMatrix);
    	  
    	  tentacle_4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_4Matrix);
    	  tentacle_4.setMatrix(tentacle_4RotMatrix);
    	  
    	  tentacle_5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_5Matrix);
    	  tentacle_5.setMatrix(tentacle_5RotMatrix);
    	  
    	  tentacle_6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_6Matrix);
    	  tentacle_6.setMatrix(tentacle_6RotMatrix);
    	  
    	  tentacle_7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_7Matrix);
    	  tentacle_7.setMatrix(tentacle_7RotMatrix);
    	  
    	  tentacle_8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_8Matrix);
    	  tentacle_8.setMatrix(tentacle_8RotMatrix);
    	  
    	  tentacle_9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_9Matrix);
    	  tentacle_9.setMatrix(tentacle_9RotMatrix);
    	  
    	  tentacle_10RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_10Matrix);
    	  tentacle_10.setMatrix(tentacle_10RotMatrix);
    	  
    	  tentacle_11RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_11Matrix);
    	  tentacle_11.setMatrix(tentacle_11RotMatrix);
    	  
    	  tentacle_12RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_12Matrix);
    	  tentacle_12.setMatrix(tentacle_12RotMatrix);
    	  
    	  tentacle_13RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_13Matrix);
    	  tentacle_13.setMatrix(tentacle_13RotMatrix);
    	  
    	  tentacle_14RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_14Matrix);
    	  tentacle_14.setMatrix(tentacle_14RotMatrix);
    	  
    	  tentacle_15RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_15Matrix);
    	  tentacle_15.setMatrix(tentacle_15RotMatrix);
    	  
    	  tentacle_16RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_16Matrix);
    	  tentacle_16.setMatrix(tentacle_16RotMatrix);
    	  
    	  tentacle_17RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_17Matrix);
    	  tentacle_17.setMatrix(tentacle_17RotMatrix);
    	  
    	  tentacle_18RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_18Matrix);
    	  tentacle_18.setMatrix(tentacle_18RotMatrix);
    	  
    	  tentacle_19RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_19Matrix);
    	  tentacle_19.setMatrix(tentacle_19RotMatrix);
    	  
    	  tentacle_20RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_20Matrix);
    	  tentacle_20.setMatrix(tentacle_20RotMatrix);
    	  
    	  tentacle_21RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_21Matrix);
    	  tentacle_21.setMatrix(tentacle_21RotMatrix);
    	  
    	  tentacle_22RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_22Matrix);
    	  tentacle_22.setMatrix(tentacle_22RotMatrix);

    	  
      break
            
      //tail left/right
      case((key == "T" || key == "V") && animate && jump_cut == false):
     	 
	      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
	
	      if (time > time_end){
	    	  p = p1;
	    	  animate = false;
	    	  break;
	      }
	
	      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
	      
	      if(key == "V")
	    	  p = -p;
	      
		  var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(tailtorsoRotMatrix,rotate_X(p));
		  tail.setMatrix(tailRotMatrix); 

    	  
      break
      
      case((key == "T" || key == "V") && animate && jump_cut == true):
      	 
    	  p = p1;
      
	     if(key == "V")
	    	  p = -p;
	      
		  var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(tailtorsoRotMatrix,rotate_X(p));
		  tail.setMatrix(tailRotMatrix); 

    	  
      break
      
      //dig
      case(key == "D" && animate && jump_cut == false):
      	 
	      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
	
	      if (time > time_end){
	    	  p = p1;
	    	  animate = false;
	    	  break;
	      }
	
	      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
	      

		  var pawrightRotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,rotate_Z(p));
		  front_right_paw.setMatrix(pawrightRotMatrix); 
		  
		  var pawleftRotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,rotate_Z(p));
		  front_left_paw.setMatrix(pawleftRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_1Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_right_claw_1.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_1Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_1.setMatrix(clawRotMatrix);

		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_2Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_right_claw_2.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_2Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_2.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_3Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_right_claw_3.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_3Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_3.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_4Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_right_claw_4.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_4Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_4.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_5Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_right_claw_5.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_5Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_5.setMatrix(clawRotMatrix);
		  
      break
      
      case(key == "D" && animate && jump_cut == true):
       	 
	      p = p1;
	      

	  var pawrightRotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawRotMatrix,rotate_Z(p));
	  front_right_paw.setMatrix(pawrightRotMatrix); 
	  
	  var pawleftRotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,rotate_Z(p));
	  front_left_paw.setMatrix(pawleftRotMatrix);
	  
	  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_1Matrix);
	  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
	  front_right_claw_1.setMatrix(clawRotMatrix);
	  
	  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_1Matrix);
	  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
	  front_left_claw_1.setMatrix(clawRotMatrix);

	  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_2Matrix);
	  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
	  front_right_claw_2.setMatrix(clawRotMatrix);
	  
	  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_2Matrix);
	  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
	  front_left_claw_2.setMatrix(clawRotMatrix);
	  
	  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_3Matrix);
	  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
	  front_right_claw_3.setMatrix(clawRotMatrix);
	  
	  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_3Matrix);
	  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
	  front_left_claw_3.setMatrix(clawRotMatrix);
	  
	  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_4Matrix);
	  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
	  front_right_claw_4.setMatrix(clawRotMatrix);
	  
	  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_4Matrix);
	  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
	  front_left_claw_4.setMatrix(clawRotMatrix);
	  
	  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_5Matrix);
	  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
	  front_right_claw_5.setMatrix(clawRotMatrix);
	  
	  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_5Matrix);
	  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
	  front_left_claw_5.setMatrix(clawRotMatrix);
		  
      break
      
      case(key == "N" && animate && jump_cut == false):
       	 
	      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
	
	      if (time > time_end){
	    	  p = p1;
	    	  animate = false;
	    	  break;
	      }
	
	      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
	      
	      var sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_1Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
	      tentacle_1.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_2Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
	      tentacle_2.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_3Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
	      tentacle_3.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_4Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
	      tentacle_4.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_5Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
	      tentacle_5.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_6Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
	      tentacle_6.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_7Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
	      tentacle_7.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_8Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
	      tentacle_8.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_9Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
	      tentacle_9.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_10Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
	      tentacle_10.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_11Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
	      tentacle_11.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_12Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
	      tentacle_12.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_13Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
	      tentacle_13.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_14Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
	      tentacle_14.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_15Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
	      tentacle_15.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_16Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
	      tentacle_16.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_17Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
	      tentacle_17.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_18Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
	      tentacle_18.setMatrix(sidetentacleRotMatrix);
	      
  		  //small
		  
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_19Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
	      tentacle_19.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_20Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
	      tentacle_20.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_21Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
	      tentacle_21.setMatrix(sidetentacleRotMatrix);
	      
	      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_22Matrix);
	      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
	      tentacle_22.setMatrix(sidetentacleRotMatrix);

	  break
	  
      case(key == "N" && animate && jump_cut == true):
        	 
    	  p = p1;
	      
      var sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_1Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
      tentacle_1.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_2Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
      tentacle_2.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_3Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
      tentacle_3.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_4Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
      tentacle_4.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_5Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
      tentacle_5.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_6Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
      tentacle_6.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_7Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
      tentacle_7.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_8Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
      tentacle_8.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_9Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
      tentacle_9.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_10Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
      tentacle_10.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_11Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
      tentacle_11.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_12Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
      tentacle_12.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_13Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
      tentacle_13.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_14Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
      tentacle_14.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_15Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
      tentacle_15.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_16Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
      tentacle_16.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_17Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
      tentacle_17.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_18Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
      tentacle_18.setMatrix(sidetentacleRotMatrix);
      
		  //small
	  
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_19Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
      tentacle_19.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_20Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
      tentacle_20.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_21Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
      tentacle_21.setMatrix(sidetentacleRotMatrix);
      
      sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_22Matrix);
      sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
      tentacle_22.setMatrix(sidetentacleRotMatrix);
      
	  break;
	  
      case(key == "S" && animate && jump_cut == false ):
     	 
	      var time = clock.getElapsedTime(); // t seconds passed since the clock started.
	
	      if (time > time_end){
	    	  p = p1;
	    	  animate = false;
	    	  break;
	      }
	      
	      	
	      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
	      
	  
	      //paw

		  
		  var pawleftRotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,rotate_Z(p));
		  front_left_paw.setMatrix(pawleftRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_1Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_1.setMatrix(clawRotMatrix);

		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_2Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_2.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_3Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_3.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_4Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_4.setMatrix(clawRotMatrix);
		 
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawleftRotMatrix,claw_5Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_5.setMatrix(clawRotMatrix);
		  
		  var pawrightRotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,rotate_Z(p));
		  back_right_paw.setMatrix(pawrightRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_1Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  back_right_claw_1.setMatrix(clawRotMatrix);

		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_2Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  back_right_claw_2.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_3Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  back_right_claw_3.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_4Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  back_right_claw_4.setMatrix(clawRotMatrix);
		 
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_5Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  back_right_claw_5.setMatrix(clawRotMatrix);
		  
	      //tail
		  var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(tailtorsoRotMatrix,rotate_X(-p));
		  tail.setMatrix(tailRotMatrix); 

	      //head
      	  
		  headRotMatrix = new THREE.Matrix4().multiplyMatrices(headtorsoRotMatrix,rotate_X(-p));
		  head.setMatrix(headRotMatrix); 
		  
		  noseheadtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
		  nose.setMatrix(noseheadtorsoRotMatrix);
		  
		  tentacle_1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_1Matrix);
    	  tentacle_1.setMatrix(tentacle_1RotMatrix);
    	  
    	  tentacle_2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_2Matrix);
    	  tentacle_2.setMatrix(tentacle_2RotMatrix);
    	  
    	  tentacle_3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_3Matrix);
    	  tentacle_3.setMatrix(tentacle_3RotMatrix);
    	  
    	  tentacle_4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_4Matrix);
    	  tentacle_4.setMatrix(tentacle_4RotMatrix);
    	  
    	  tentacle_5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_5Matrix);
    	  tentacle_5.setMatrix(tentacle_5RotMatrix);
    	  
    	  tentacle_6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_6Matrix);
    	  tentacle_6.setMatrix(tentacle_6RotMatrix);
    	  
    	  tentacle_7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_7Matrix);
    	  tentacle_7.setMatrix(tentacle_7RotMatrix);
    	  
    	  tentacle_8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_8Matrix);
    	  tentacle_8.setMatrix(tentacle_8RotMatrix);
    	  
    	  tentacle_9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_9Matrix);
    	  tentacle_9.setMatrix(tentacle_9RotMatrix);
    	  
    	  tentacle_10RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_10Matrix);
    	  tentacle_10.setMatrix(tentacle_10RotMatrix);
    	  
    	  tentacle_11RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_11Matrix);
    	  tentacle_11.setMatrix(tentacle_11RotMatrix);
    	  
    	  tentacle_12RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_12Matrix);
    	  tentacle_12.setMatrix(tentacle_12RotMatrix);
    	  
    	  tentacle_13RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_13Matrix);
    	  tentacle_13.setMatrix(tentacle_13RotMatrix);
    	  
    	  tentacle_14RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_14Matrix);
    	  tentacle_14.setMatrix(tentacle_14RotMatrix);
    	  
    	  tentacle_15RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_15Matrix);
    	  tentacle_15.setMatrix(tentacle_15RotMatrix);
    	  
    	  tentacle_16RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_16Matrix);
    	  tentacle_16.setMatrix(tentacle_16RotMatrix);
    	  
    	  tentacle_17RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_17Matrix);
    	  tentacle_17.setMatrix(tentacle_17RotMatrix);
    	  
    	  tentacle_18RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_18Matrix);
    	  tentacle_18.setMatrix(tentacle_18RotMatrix);
    	  
    	  tentacle_19RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_19Matrix);
    	  tentacle_19.setMatrix(tentacle_19RotMatrix);
    	  
    	  tentacle_20RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_20Matrix);
    	  tentacle_20.setMatrix(tentacle_20RotMatrix);
    	  
    	  tentacle_21RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_21Matrix);
    	  tentacle_21.setMatrix(tentacle_21RotMatrix);
    	  
    	  tentacle_22RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_22Matrix);
    	  tentacle_22.setMatrix(tentacle_22RotMatrix);
    	  
    	  var sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_1Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
          tentacle_1.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_2Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
          tentacle_2.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_3Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
          tentacle_3.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_4Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
          tentacle_4.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_5Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
          tentacle_5.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_6Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_6.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_7Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_7.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_8Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_8.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_9Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_9.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_10Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
          tentacle_10.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_11Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
          tentacle_11.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_12Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
          tentacle_12.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_13Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
          tentacle_13.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_14Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
          tentacle_14.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_15Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_15.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_16Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_16.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_17Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_17.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_18Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_18.setMatrix(sidetentacleRotMatrix);
          
    		  //small
    	  
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_19Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_19.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_20Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_20.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_21Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_21.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_22Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_22.setMatrix(sidetentacleRotMatrix);
          
     
    	  
      break
	  
   /*   case(key == "S" && animate && jump_cut == false && s_count == true):
     	 
	  var time = clock.getElapsedTime(); // t seconds passed since the clock started.

	  if (time > time_end){
	   	  p = p1;
	   	  animate = false;
	   	  break;
	  }
	      
	      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
	      s_count = false;
 //paw

		  
		  var pawlRotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawRotMatrix,rotate_Z(p));
		  front_left_paw.setMatrix(pawrightRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_1Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_1.setMatrix(clawRotMatrix);

		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_2Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_2.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_3Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_3.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_4Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_4.setMatrix(clawRotMatrix);
		 
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_5Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  front_left_claw_5.setMatrix(clawRotMatrix);
		  
		  var pawrightRotMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawRotMatrix,rotate_Z(p));
		  back_right_paw.setMatrix(pawrightRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_1Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  back_right_claw_1.setMatrix(clawRotMatrix);

		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_2Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  back_right_claw_2.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_3Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  back_right_claw_3.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_4Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  back_right_claw_4.setMatrix(clawRotMatrix);
		 
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(pawrightRotMatrix,claw_5Matrix);
		  clawRotMatrix = new THREE.Matrix4().multiplyMatrices(clawRotMatrix,rotate_Z(p));
		  back_right_claw_5.setMatrix(clawRotMatrix);
		  
		  //paw
		  
		  
	      //tail
		  var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(tailtorsoRotMatrix,rotate_X(-p));
		  tail.setMatrix(tailRotMatrix); 

	      //head
      	  
		  headRotMatrix = new THREE.Matrix4().multiplyMatrices(headtorsoRotMatrix,rotate_X(-p));
		  head.setMatrix(headRotMatrix); 
		  
		  noseheadtorsoRotMatrix = new THREE.Matrix4().multiplyMatrices(headRotMatrix,noseMatrix);
		  nose.setMatrix(noseheadtorsoRotMatrix);
		  
		  tentacle_1RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_1Matrix);
    	  tentacle_1.setMatrix(tentacle_1RotMatrix);
    	  
    	  tentacle_2RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_2Matrix);
    	  tentacle_2.setMatrix(tentacle_2RotMatrix);
    	  
    	  tentacle_3RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_3Matrix);
    	  tentacle_3.setMatrix(tentacle_3RotMatrix);
    	  
    	  tentacle_4RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_4Matrix);
    	  tentacle_4.setMatrix(tentacle_4RotMatrix);
    	  
    	  tentacle_5RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_5Matrix);
    	  tentacle_5.setMatrix(tentacle_5RotMatrix);
    	  
    	  tentacle_6RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_6Matrix);
    	  tentacle_6.setMatrix(tentacle_6RotMatrix);
    	  
    	  tentacle_7RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_7Matrix);
    	  tentacle_7.setMatrix(tentacle_7RotMatrix);
    	  
    	  tentacle_8RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_8Matrix);
    	  tentacle_8.setMatrix(tentacle_8RotMatrix);
    	  
    	  tentacle_9RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_9Matrix);
    	  tentacle_9.setMatrix(tentacle_9RotMatrix);
    	  
    	  tentacle_10RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_10Matrix);
    	  tentacle_10.setMatrix(tentacle_10RotMatrix);
    	  
    	  tentacle_11RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_11Matrix);
    	  tentacle_11.setMatrix(tentacle_11RotMatrix);
    	  
    	  tentacle_12RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_12Matrix);
    	  tentacle_12.setMatrix(tentacle_12RotMatrix);
    	  
    	  tentacle_13RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_13Matrix);
    	  tentacle_13.setMatrix(tentacle_13RotMatrix);
    	  
    	  tentacle_14RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_14Matrix);
    	  tentacle_14.setMatrix(tentacle_14RotMatrix);
    	  
    	  tentacle_15RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_15Matrix);
    	  tentacle_15.setMatrix(tentacle_15RotMatrix);
    	  
    	  tentacle_16RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_16Matrix);
    	  tentacle_16.setMatrix(tentacle_16RotMatrix);
    	  
    	  tentacle_17RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_17Matrix);
    	  tentacle_17.setMatrix(tentacle_17RotMatrix);
    	  
    	  tentacle_18RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_18Matrix);
    	  tentacle_18.setMatrix(tentacle_18RotMatrix);
    	  
    	  tentacle_19RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_19Matrix);
    	  tentacle_19.setMatrix(tentacle_19RotMatrix);
    	  
    	  tentacle_20RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_20Matrix);
    	  tentacle_20.setMatrix(tentacle_20RotMatrix);
    	  
    	  tentacle_21RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_21Matrix);
    	  tentacle_21.setMatrix(tentacle_21RotMatrix);
    	  
    	  tentacle_22RotMatrix = new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_22Matrix);
    	  tentacle_22.setMatrix(tentacle_22RotMatrix);
    	  
    	  var sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_1Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
          tentacle_1.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_2Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
          tentacle_2.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_3Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
          tentacle_3.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_4Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
          tentacle_4.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_5Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(p));
          tentacle_5.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_6Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_6.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_7Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_7.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_8Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_8.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_9Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_9.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_10Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
          tentacle_10.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_11Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
          tentacle_11.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_12Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
          tentacle_12.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_13Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
          tentacle_13.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_14Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_X(-p));
          tentacle_14.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_15Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_15.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_16Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_16.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_17Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_17.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_18Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_18.setMatrix(sidetentacleRotMatrix);
          
    		  //small
    	  
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_19Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_19.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_20Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_20.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_21Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(-p));
          tentacle_21.setMatrix(sidetentacleRotMatrix);
          
          sidetentacleRotMatrix =  new THREE.Matrix4().multiplyMatrices(noseheadtorsoRotMatrix,tentacle_22Matrix);
          sidetentacleRotMatrix = new THREE.Matrix4().multiplyMatrices(sidetentacleRotMatrix,rotate_Z(p));
          tentacle_22.setMatrix(sidetentacleRotMatrix);

      break*/
      
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
var s_count = false;
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
  else if(keyboard.eventMatches(event,"S")){ 
	    (key == "S")? init_animation(p1,p0,time_length) : (init_animation(0,Math.PI/4,1), key = "S")}	    

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