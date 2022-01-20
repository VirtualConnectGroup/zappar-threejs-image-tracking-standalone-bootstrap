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

const image_radius = 100;
const number_of_images = 8;
const radius = 400;
const radian_interval = (2.0 * Math.PI) / number_of_images;
const center_of_wheel = {
  x: 0,
  y: 0
};

let loader = new THREE.TextureLoader();
let texture = loader.load('AppleLogo.png');
texture.minFilter = THREE.LinearFilter;

let circle = new THREE.Mesh(
    new THREE.CircleGeometry( 2, 100),
    new THREE.MeshBasicMaterial( { map: texture, transparent: true, opacity: 1} )
    );

    //circle.material.side = THREE.DoubleSide;
    /*circle.position.set(
        center_of_wheel.x + Math.cos(radian_interval * 1) * radius,
        center_of_wheel.y + Math.sin(radian_interval * 1) * radius,
        0);

*/
circle.position.set(0,0,.002);

trackerGroup.add(circle);




// Set up our render loop
function render() {
    requestAnimationFrame(render);
    camera.updateFrame(renderer);

    renderer.render(scene, camera);
}

requestAnimationFrame(render);