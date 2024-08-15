import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// This is a whole new thing I'm wroking on right here

// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add some lighting
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Load a GLTF model
const loader = new GLTFLoader();
loader.load('assets/brick_1.glb', (gltf) => {
  const model = gltf.scene;

  // Center the model's pivot point
  const box = new THREE.Box3().setFromObject(model);
  const center = new THREE.Vector3();
  box.getCenter(center);
  model.position.sub(center); // Move the model to the center

  

  // Compute the bounding box of the model
  box.setFromObject(model);
  const size = new THREE.Vector3();
  box.getSize(size);

  // Function to create and position multiple models
  function createMultipleModels(count) {
    for (let i = 0; i < count; i++) {
      const clone = model.clone();
      clone.position.set(
        (i % 10) * size.x, // x position
        Math.floor(i / 10) * size.y, // y position
        0 // z position
      );
      scene.add(clone);
    }
  }

  // Create 100 models
  createMultipleModels(100);
});

// Set the camera position
camera.position.z = 20;

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});