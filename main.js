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
loader.load('assets/old_computer.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);

  // Optionally, set the position, scale, and rotation of the model
  // left to right, up/down, back/forth
  // Have a just black screen by default then screen turn off animation have it scroll out a few increments (but somehow don't let the person scroll into the computer) - just have it turn off and have it look at the computer like remove the black part or have a computer a few z increments closer then move that back
  // Or just have the og model move back
  model.position.set(0, -0.2, -0.1); // -0.2,-0.1
  // model.scale.set(1, 1, 1);
  model.rotation.set(0, -Math.PI/2, 0);

  // Render the scene again to display the model
  renderer.render(scene, camera);
});
loader.load('assets/urban_building.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  // control.attach( model );

  // Optionally, set the position, scale, and rotation of the model
  // left to right, up/down, back/forth
  model.position.set(1.5, -0.8, 4.6);
  model.scale.set(0.0125, 0.0125, 0.0125);
  model.rotation.set(0, Math.PI/2, 0);

  // Render the scene again to display the model
  renderer.render(scene, camera);
});

loader.load('assets/side_table1.glb', (gltf) => {
  const model = gltf.scene;
  scene.add(model);
  model.position.set(0, -1, 10);
  renderer.render(scene, camera);
});
// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

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

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('jeff.png');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.075;
  // moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();