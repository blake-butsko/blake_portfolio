import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// computer model
const loader = new GLTFLoader();
loader.load('assets/test12.glb', (glb) => {
  const model = glb.scene;
  model.position.set(-0.05, -0.48, 0.9);
  // 85
  model.rotation.y = Math.PI - (10*Math.PI/180);
  scene.add(model);
  renderer.render(scene, camera);
});

loader.load('assets/trees_29_33_V.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  // model.scale.set(0.5, 0.5, 0.5);
  model.position.set(1, 0.3, -1.8);
  // model.position.set(0, 0.2, 0);
  renderer.render(scene, camera);
});

loader.load('assets/construction_scene2.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  model.rotation.set(0, -Math.PI / 2, 0);
  model.position.set(-10,-1,8);
  renderer.render(scene, camera);
});

// loader.load('assets/cement_pipes.glb', (gltf) => {
//   const model = gltf.scene;
//   scene.add(model);
//   model.position.set(0, -1, 10);
//   renderer.render(scene, camera);
// });
loader.load('assets/pipe_display_right.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  model.position.set(3,3.5,17.7);
  model.rotation.set(0, Math.PI, 0);
  
  // model.position.set(0,-1,28);
  // model.position.set(11, -4, 12);
  renderer.render(scene, camera);
});

loader.load('assets/Concrete_pipefbx.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  model.position.set(9, -4, 20);
  renderer.render(scene, camera);
});

loader.load('assets/road5.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  model.position.set(0,0, 7);
  renderer.render(scene, camera);
});

// Export from here
// import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';

// const exporter = new OBJExporter();
// const objData = exporter.parse(scene);

// const blob = new Blob([objData], { type: 'text/plain' });
// const link = document.createElement('a');
// link.href = URL.createObjectURL(blob);
// link.download = 'scene.obj';
// link.click();


// Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
const axesHelper = new THREE.AxesHelper(5);
// // const controls = new THREE.TransformControls(camera, renderer.domElement);
// // controls.attach(object); // Attach the object to the controls
scene.add(axesHelper)

// let orbit = new OrbitControls( currentCamera, renderer.domElement );
// orbit.update();
// orbit.addEventListener( 'change', render );

// let control = new TransformControls( currentCamera, renderer.domElement );
// control.addEventListener( 'change', render );
// control.addEventListener( 'dragging-changed', function ( event ) {
//   orbit.enabled = ! event.value;
// } );

// function addRectangularPrisms() {
//   const textureLoader = new THREE.TextureLoader();

//   // Load four different textures
//   const textures = [
//     textureLoader.load('assets/brick1.jpg'),
//     textureLoader.load('assets/brick2.jpg'),
//     textureLoader.load('assets/brick3.jpg'),
//     textureLoader.load('assets/brick4.jpg'),
//   ];

//   // Create an array of geometries and materials for four prisms
//   const prisms = textures.map((texture) => {
//     const geometry = new THREE.BoxGeometry(1, 1, 1); // Adjust size as needed
//     const material = new THREE.MeshStandardMaterial({ map: texture });
//     return new THREE.Mesh(geometry, material);
//   });

//   // Add multiple prisms with random positions
//   for (let i = 0; i < 50; i++) { // Adjust the number of prisms
//     const prism = prisms[Math.floor(Math.random() * prisms.length)].clone();

//     // Set random positions
//     const [x, y, z] = Array(3)
//       .fill()
//       .map(() => THREE.MathUtils.randFloatSpread(100));

//     prism.position.set(x, y, z);

//     // Add the prism to the scene
//     scene.add(prism);
//   }
// }

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('sky1.jpg');
scene.background = spaceTexture;

// Avatar

// const jeffTexture = new THREE.TextureLoader().load('jeff.png');

// const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

// scene.add(jeff);

// Moon

// const moonTexture = new THREE.TextureLoader().load('moon.jpg');
// const normalTexture = new THREE.TextureLoader().load('normal.jpg');

// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//     normalMap: normalTexture,
//   })
// );

// scene.add(moon);

// moon.position.z = 30;
// moon.position.setX(-10);

// jeff.position.z = -5;
// jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  // jeff.rotation.y += 0.01;
  // jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  // moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
// renderer.render(scene, camera);