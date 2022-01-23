// ZapparThree provides a LoadingManager that shows a progress bar while
// the assets are downloaded
let manager = new ZapparThree.LoadingManager();

// The SDK is supported on many different browsers, but there are some that
// don't provide camera access. This function detects if the browser is supported
// For more information on support, check out the readme over at
// https://www.npmjs.com/package/@zappar/zappar-threejs
if (ZapparThree.browserIncompatible()) {
    // The browserIncompatibleUI() function shows a full-page dialog that informs the user
    // they're using an unsupported browser, and provides a button to 'copy' the current page
    // URL so they can 'paste' it into the address bar of a compatible alternative.
    ZapparThree.browserIncompatibleUI();
  
    // If the browser is not compatible, we can avoid setting up the rest of the page
    // so we throw an exception here.
    throw new Error('Unsupported browser');
  }

// Setup ThreeJS in the usual way
const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });


// Create a ThreeJS Scene and set its background to be the camera background texture
let scene = new THREE.Scene();



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
scene.background = camera.backgroundTexture;
document.body.appendChild(renderer.domElement);

// The Zappar library needs your WebGL context, so pass it
ZapparThree.glContextSet(renderer.getContext());



// Request the necessary permission from the user
ZapparThree.permissionRequestUI().then(function(granted) {
    if (granted) camera.start();
    else ZapparThree.permissionDeniedUI();
});

// Set up our image tracker group
// Pass our loading manager in to ensure the progress bar works correctly
let tracker = new ZapparThree.ImageTrackerLoader(manager).load("assets/7GHV-Valentines_Target_transparent.zpt");
let trackerGroup = new ZapparThree.ImageAnchorGroup(camera, tracker);
scene.add(trackerGroup);


textureList = 0;
totalResponses = 0;
responseIndex = 0;

let loader = new THREE.TextureLoader();
//loader.crossOrigin = '';

const launchImage = [
    "assets/7GHV-Valentines_Button.png"
];

const texturesList = [
    'assets/AppleLogo.png',
    'assets/WordPress.png',
    'assets/Yoast.png',
    'assets/USFlag.png',
    'assets/birthday.jpeg'

];

let objects = [];
let textureToShow = 0;
// Load 


    let randIndex = THREE.Math.randInt(0, texturesList.length -1);
    let randTexture = loader.load(texturesList[randIndex]);
    let circleGeometry = new THREE.CircleGeometry( 1, 100);
    let meshMaterial = new THREE.MeshBasicMaterial( { map: randTexture, transparent: true, opacity: 1} );
    let circle = new THREE.Mesh(circleGeometry,meshMaterial);
    objects.push(circle);
    console.log(meshMaterial);
    
    loader.load(launchImage[0], function(tex){
        // Once the texture has loaded
        // Asign it to the material
        meshMaterial.map = tex;
        
        

    })
    //console.log(textureToShow);
    //console.log(randTexture);
    trackerGroup.add(circle)

// Spin Through Images



const raycaster = new THREE.Raycaster(); // Needed for object intersection

//3d mouse
var canvas = document.getElementsByTagName("canvas")[0];


canvas.addEventListener("click", onMouseDown, false);
    console.log(randIndex);
//push everything into an object for raycasting


function onMouseDown(event) {
    event.preventDefault;

    let rand = THREE.Math.randInt(0, texturesList.length -1);
    console.log(rand);

    const mouse3D = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerheight) * 2 - 1,
        0.5
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse3D, camera);
      const intersects = raycaster.intersectObjects(objects);

      console.log(intersects);
  
    loader.load(texturesList[rand], function(tex) {
        // Once the texture has loaded
        // Asign it to the material
        meshMaterial.map = tex;
        // Update the next texture to show
        //textureToShow++;
        // Have we got to the end of the textures array
        // if(textureToShow > texturesList.length-1) {
        //  textureToShow = 0;
        // }

       });
    
   
    console.log("MouseDown");
    }

    // append canvas to dom element
   
    //document.getElementById("container");


  
  // update loop
    function update() {

  
    //rotations go here
      //textureToShow++;
    (texturesList[randIndex], function(tex){
    meshMaterial.map = tex;
    meshMaterial.needsUpdate = true;
   
    })
  
  }

  
    // x
//     const mouse3D = new THREE.Vector3( (event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerheight) * 2 - 1, 0.5 )
//     const raycaster = new THREE.Raycaster()
//     raycaster.setFromCamera(mouse3D, camera)
//     const intersects = raycaster.intersectObjects(objects);
// if(intersects.length > 0){
//       intersects[0].object.material.color.setHex( Math.random() * 0xffffff )
//     }
  

    // // Welcome to the exciting world of raycasting !
    // // First let's get some mouse coordinates:
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // // This is basically converting 2d coordinates to 3d Space:
    // raycaster.setFromCamera(mouse, camera);
    // // And checking if it intersects with an array object
    // var intersects = raycaster.intersectObjects([circle]);
    
    // // does your cursor intersect the object on click ? 
    // //console.log(intersects.length > 0 ? "yes" : "no");
    
    // // And finally change the color:

  
    
    
 
 
    
    
   

    

/////// Add Video Recorder
/*
const canvas = document.querySelector('canvas');

const recorder = ZapparVideoRecorder.createCanvasVideoRecorder(canvas, {
  quality: 25,
  speed: 10,
  halfSample: true,
});

recordButton.addEventListener('click', () => {
  recorder.start();
});

stopRecordButton.addEventListener('click', () => {
  recorder.stop();
});

recorder.onComplete.bind(async (res) => {
  ZapparSharing({
    data: await res.asDataURL(),
  });

  ZapparSharing({
    data: url,
    fileNamePrepend: 'Zappar', // The name of  the file.
    shareTitle: 'Hello World!', // The title for the social share.
    shareText: 'Hello World!', // The body text for the social share.
    shareUrl: 'www.zappar.com', // The url for the social share.
    hideShareButton: true, // Hide the share button.
    onSave: () => {
      console.log('Image was saved');
    },
    onShare: () => {
      console.log('Share button was pressed');
    },
    onClose: () => {
      console.log('Dialog was closed');
    },
  });
  

});
*/






// Set up our render loop
function render() {
    requestAnimationFrame(render);
    camera.updateFrame(renderer);

    renderer.render(scene, camera);


}

requestAnimationFrame(render);

