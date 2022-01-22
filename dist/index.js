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
let tracker = new ZapparThree.ImageTrackerLoader(manager).load("assets/CheckMyMood-Target-General.zpt");
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

textureLists = 0;
totalResponses = 0;
responseIndex = 0;


let loader = new THREE.TextureLoader();
//loader.crossOrigin = '';

const texturesList = [
    'assets/AppleLogo.png',
    'assets/WordPress.png',
    'assets/Yoast.png',
    'assets/USFlag.png',
    'assets/birthday.jpeg'

];


let textureToShow = 0;
// Load // 

    let randIndex = THREE.Math.randInt(0, texturesList.length -1);
    let randTexture = loader.load(texturesList[randIndex]);
    let circleGeometry = new THREE.CircleGeometry( 2, 100);
    let meshMaterial = new THREE.MeshBasicMaterial( { map: randTexture, transparent: true, opacity: 1} );
    let circle = new THREE.Mesh(circleGeometry,meshMaterial);

    console.log(meshMaterial);
    
    loader.load(texturesList[textureToShow], function(tex){
        // Once the texture has loaded
        // Asign it to the material
        meshMaterial.map = tex;
        
        textureToShow++;;
      

    })
    console.log(textureToShow);
    console.log(randTexture);
    trackerGroup.add(circle)

// Spin Through Images

const loopButton = document.getElementById('loopButton');

var raycaster = new THREE.Raycaster(); // Needed for object intersection
var mouse = new THREE.Vector2(); //Needed for mouse coordinates
window.addEventListener('click', onDocumentMouseDown, false);
render();

textureToShow = 0;

function onDocumentMouseDown(event) {

    // Welcome to the exciting world of raycasting !
    // First let's get some mouse coordinates:
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // This is basically converting 2d coordinates to 3d Space:
    raycaster.setFromCamera(mouse, camera);
    // And checking if it intersects with an array object
    var intersects = raycaster.intersectObjects([circle]);
    
    // does your cursor intersect the object on click ? 
    //console.log(intersects.length > 0 ? "yes" : "no");
    
    // And finally change the icon:

  
    
     let loader = new THREE.TextureLoader();
     const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }
 
         let randIndex = THREE.Math.randInt(0, texturesList.length -1);
    
    loader.load(texturesList[(randIndex], function(tex){
        meshMaterial.map = tex;

        sleep(1000);
    
    })
    //textureToShow++;
    console.log(meshMaterial.map.image);
    //console.log(texturesList.length);
    console.log(randIndex);

    
}
    








// Set up our render loop
function render() {
    requestAnimationFrame(render);
    camera.updateFrame(renderer);

    renderer.render(scene, camera);


}

requestAnimationFrame(render);

