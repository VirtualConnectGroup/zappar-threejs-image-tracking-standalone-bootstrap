// ZapparThree provides a LoadingManager that shows a progress bar while
// the assets are downloaded
let manager = new ZapparThree.LoadingManager();

// Setup ThreeJS in the usual way
let renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Setup a Zappar camera instead of one of ThreeJS's cameras
let camera = new ZapparThree.Camera(
    {
    zNear: 0.1,
    zFar: 1000
    }
);

// The Zappar library needs your WebGL context, so pass it
ZapparThree.glContextSet(renderer.getContext());

// Create a ThreeJS Scene and set its background to be the camera background texture
let scene = new THREE.Scene();
scene.background = camera.backgroundTexture;

// Request the necessary permission from the user
ZapparThree.permissionRequestUI().then(function(granted) {
    if (granted) camera.start();
    else ZapparThree.permissionDeniedUI();
});

// Set up our image tracker group
// Pass our loading manager in to ensure the progress bar works correctly
let tracker = new ZapparThree.ImageTrackerLoader(manager).load("CheckMyMood-Target-General.zpt");
let trackerGroup = new ZapparThree.ImageAnchorGroup(camera, tracker);
scene.add(trackerGroup);

// Add some content
/*
let box = new THREE.Mesh(
    new THREE.BoxBufferGeometry(),
    new THREE.MeshBasicMaterial()
);
box.position.set(0, 0, 0.5);
trackerGroup.add(box);
*/


let loader = new THREE.TextureLoader();
//loader.crossOrigin = '';

var texturesList = [
    'AppleLogo.png',
    'WordPress.png',
    'Yoast.png',
    'USFlag.png',
    'birthday.jpeg'

];

let textureToShow = 0;

let randIndex = THREE.Math.randInt(0, texturesList.length -1);
let randTexture = loader.load(texturesList[randIndex]);

//let texture = loader.load("Yoast.png");

//texture.minFilter = THREE.LinearFilter;

let circle = new THREE.Mesh(
    new THREE.CircleGeometry( 2, 100),
    new THREE.MeshBasicMaterial( { map: randTexture, transparent: true, opacity: 1} )
    );

//Load the texture
loader.load(texturesList[textureToShow], function(tex){
    circle.map = tex;
    textureToShow++;;
    if(textureToShow > texturesList.length-1) {
        textureToShow = 0;
        console.log(textureToShow);
    }


trackerGroup.add(circle);
});

// Click interaction
var canvas = document.getElementsByTagName("canvas")[0];

canvas.addEventListener("click", function() {
  

 
 loader.load(arr[textureToShow], function(tex) {
  // Once the texture has loaded
  // Asign it to the material
  circle.map = tex;
  // Update the next texture to show
  textureToShow++;
  // Have we got to the end of the textures array
  if(textureToShow > arr.length-1) {
   textureToShow = 0;
  }
 }); 
 
});



// Set up our render loop
function render() {
    requestAnimationFrame(render);
    camera.updateFrame(renderer);

    renderer.render(scene, camera);
}

requestAnimationFrame(render);