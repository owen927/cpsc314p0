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
//var tentaclesGeometry = makecube();
//var tentacle_scale = new THREE.Matrix4().set(0.3,0,0,0, 0,0.3,0,0, 0,0,1.5,0, 0,0,0,1);
//tentaclesGeometry.applyMatrix(tentacle_scale);

// MATRICES
var torsoMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,2.5, 0,0,1,0, 0,0,0,1);

// TO-DO: INITIALIZE THE REST OF YOUR MATRICES 
// Note: Use of parent attribute is not allowed.
// Hint: Keep hierarchies in mind!   
       
var tailMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,-4, 0,0,0,1);
var headMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,4.5, 0,0,0,1);
var noseMatrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0, 0,0,1,2, 0,0,0,1);

var paw_tilt =  new THREE.Matrix4().set(1,        0,         0,        0, 
										0, Math.cos(220.4),-Math.sin(220.4), 0, 
										0, Math.sin(220.4), Math.cos(220.4), 0,
										0,        0,         0,        1);
var front_right_pawMatrix = new THREE.Matrix4().set(1,0,0,-2, 0,1,0,-3, 0,0,1,3, 0,0,0,1);
front_right_pawMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawMatrix,paw_tilt);
var front_left_pawMatrix = new THREE.Matrix4().set(1,0,0,2, 0,1,0,-3, 0,0,1,3, 0,0,0,1);
front_left_pawMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawMatrix,paw_tilt);
var back_right_pawMatrix = new THREE.Matrix4().set(1,0,0,-2, 0,1,0,-3, 0,0,1,-3, 0,0,0,1);
back_right_pawMatrix = new THREE.Matrix4().multiplyMatrices(back_right_pawMatrix,paw_tilt);
var back_left_pawMatrix = new THREE.Matrix4().set(1,0,0,2, 0,1,0,-3, 0,0,1,-3, 0,0,0,1);
back_left_pawMatrix = new THREE.Matrix4().multiplyMatrices(back_left_pawMatrix,paw_tilt);

var claw_1Matrix = new THREE.Matrix4().set(1,0,0,1.5, 0,1,0,0,  0,0,1,2.5, 0,0,0,1);
var claw_2Matrix = new THREE.Matrix4().set(1,0,0,0.75, 0,1,0,0,  0,0,1,2.5, 0,0,0,1);
var claw_3Matrix = new THREE.Matrix4().set(1,0,0,0, 0,1,0,0,  0,0,1,2.5, 0,0,0,1);
var claw_4Matrix = new THREE.Matrix4().set(1,0,0,-0.75, 0,1,0,0,  0,0,1,2.5, 0,0,0,1);
var claw_5Matrix = new THREE.Matrix4().set(1,0,0,-1.5, 0,1,0,0,  0,0,1,2.5, 0,0,0,1);

// CREATE BODY
var torso = new THREE.Mesh(torsoGeometry,normalMaterial);
torso.setMatrix(torsoMatrix);


// TO-DO: PUT TOGETHER THE REST OF YOUR STAR-NOSED MOLE AND ADD TO THE SCENE!
// Hint: Hint: Add one piece of geometry at a time, then implement the motion for that part. 
//             Then you can make sure your hierarchy still works properly after each step.


var tail = new THREE.Mesh(tailGeometry,normalMaterial);
	var head = new THREE.Mesh(headGeometry,normalMaterial);
	var nose = new THREE.Mesh(noseGeometry,normalMaterial);
	var front_right_paw = new THREE.Mesh(pawGeometry, normalMaterial);
	var front_left_paw = new THREE.Mesh(pawGeometry, normalMaterial);
	var back_right_paw = new THREE.Mesh(pawGeometry, normalMaterial);
	var back_left_paw = new THREE.Mesh(pawGeometry, normalMaterial);
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
	head.setMatrix(headMatrix);
	tail.setMatrix(tailMatrix);
	nose.setMatrix(noseMatrix);
	front_right_paw.setMatrix(front_right_pawMatrix);
	front_left_paw.setMatrix(front_left_pawMatrix);
	back_right_paw.setMatrix(back_right_pawMatrix);
	back_left_paw.setMatrix(back_left_pawMatrix);
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
	
	      if (time > time_end){
	        p = p1;
	        animate = false;
	        break;
	      }
	
	      p = (p1 - p0)*((time-time_start)/time_length) + p0; // current frame 
	      
	      if(key == "E")
	    	  p = -p;
	
	      var rotateZ = new THREE.Matrix4().set(1,        0,         0,        0, 
	                                            0, Math.cos(-p),-Math.sin(-p), 0, 
	                                            0, Math.sin(-p), Math.cos(-p), 0,
	                                            0,        0,         0,        1);
	
	      var torsoRotMatrix = new THREE.Matrix4().multiplyMatrices(torsoMatrix,rotateZ);
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
	      
	      var rotateX = new THREE.Matrix4().set(Math.cos(p),        0,   Math.sin(p),        0, 
					  							     	  0,        1,	    	   0,        0, 
					  						   -Math.sin(p), 		0,   Math.cos(p),        0,
		   												  0,        0,             0,        1);
	      	
		  var headRotMatrix = new THREE.Matrix4().multiplyMatrices(headMatrix,rotateX);
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
	      
	      var rotateX = new THREE.Matrix4().set(Math.cos(p),        0,   Math.sin(p),        0, 
	    		  										  0,        1,	    	   0,        0, 
	    		  							   -Math.sin(p), 		0,   Math.cos(p),        0,
	    		  										  0,        0,             0,        1);

		  var tailRotMatrix = new THREE.Matrix4().multiplyMatrices(tailMatrix,rotateX);
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
	      
	  
	      var rotateX = new THREE.Matrix4().set(1,        0,         0,        0, 
	    		  								 0, Math.cos(p),-Math.sin(p), 0, 
	    		  								 0, Math.sin(p), Math.cos(p), 0,
	    		  								 0,        0,         0,        1);
	      
		  var pawRotMatrix = new THREE.Matrix4().multiplyMatrices(front_right_pawMatrix,rotateX);
		  front_right_paw.setMatrix(pawRotMatrix); 
		  
		  var pawRotMatrix = new THREE.Matrix4().multiplyMatrices(front_left_pawMatrix,rotateX);
		  front_left_paw.setMatrix(pawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(claw_1Matrix,rotateX);
		  front_right_claw_1.setMatrix(clawRotMatrix);
		  front_left_claw_1.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(claw_2Matrix,rotateX);
		  front_right_claw_2.setMatrix(clawRotMatrix);
		  front_left_claw_2.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(claw_3Matrix,rotateX);
		  front_right_claw_3.setMatrix(clawRotMatrix);
		  front_left_claw_3.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(claw_4Matrix,rotateX);
		  front_right_claw_4.setMatrix(clawRotMatrix);
		  front_left_claw_4.setMatrix(clawRotMatrix);
		  
		  var clawRotMatrix = new THREE.Matrix4().multiplyMatrices(claw_5Matrix,rotateX);
		  front_right_claw_5.setMatrix(clawRotMatrix);
		  front_left_claw_5.setMatrix(clawRotMatrix);
		  
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
keyboard.domElement.addEventListener('keydown',function(event){
  if (event.repeat)
    return;
  if(keyboard.eventMatches(event,"Z")){  // Z: Reveal/Hide helper grid
    grid_state = !grid_state;
    grid_state? scene.add(grid) : scene.remove(grid);}   
  else if(keyboard.eventMatches(event,"0")){    // 0: Set camera to neutral position, view reset
    camera.position.set(45,0,0);
    camera.lookAt(scene.position);}
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