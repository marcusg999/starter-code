// Set up scene
var scene = new THREE.Scene();

// Set up camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Create the canvas element and add it to the page
// Setting alpha: true creates a transparent bg
var renderer = new THREE.WebGLRenderer({alpha:false});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Create a Cube
var geometry = new THREE.BoxGeometry( 5, 5, 24 );
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh( geometry, material );
cube.position.x = 1.2
scene.add( cube );




var geometry = new THREE.SphereGeometry(3.3,32,32);
var material = new THREE.MeshNormalMaterial();
var sphere = new THREE.Mesh( geometry, material );
sphere.position.x = 1.2
scene.add(sphere)

camera.position.z = 2

// add interactivity
$(document).mousemove(function(event) {
    var y = event.pageX / window.innerWidth - 0.5
    var x = event.pageY / window.innerHeight - 0.5;
    var scalingFactor = 2

    camera.rotation.y = y * scalingFactor;
    camera.rotation.x = x * scalingFactor;
});

// // particles attempt #1
// var particles = [];
// for (var i = 0; i < 100; i++) {
//   var geometry = new THREE.SphereGeometry( 5, 32, 32 );
//   var material = new THREE.MeshNormalMaterial(  );
//   var sphere = new THREE.Mesh( geometry, material );
//
//   // Randomize starting positions
//   sphere.position.x = Math.random() * 500 - 250,
//   sphere.position.y = Math.random() * 500 - 250,
//   sphere.position.z = Math.random() * 500 - 250,
//
//   scene.add( sphere );
//   particles.push(sphere);
// }

// particle attempt #2
// optimized rendering
// create the particle variables
var particleCount = 1000,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.PointsMaterial({
      //color: "#f0f",
      size: 5,
      vertexColors: THREE.VertexColors
    });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vector3(pX, pY, pZ);

  // add it to the geometry
  particles.vertices.push(particle);

  // add colors
  particles.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()))
}

// create the particle system
var particleSystem = new THREE.Points( particles, pMaterial);

// add it to the scene
scene.add(particleSystem);

// move the camera back, so we can see more particles
camera.position.z = 22


// The render loop
function render() {
    requestAnimationFrame( render );

    // Any updates to scene, camera, or objects go here
    // That is, this is where the animation happens!
    cube.rotation.x += .023 // rotation vectors are in radians
    cube.rotation.y += .09 // rotation vectors are in radians
    cube.rotation.z += .013
    // camera.rotation.y +=0.01

    // swirl the particles
    particleSystem.rotation.y += .01;

    renderer.render( scene, camera );
}
render();
