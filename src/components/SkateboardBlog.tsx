import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') as HTMLCanvasElement,
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 6;

// Lights
const pointLight = new THREE.PointLight(0xffffff, 5, 0, 0.001);
pointLight.position.set(0, 1, 5);
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(pointLight, ambientLight);

// GLTFLoader instance
const loader = new GLTFLoader();

// Load 3D Models
let loadedSkateboard: THREE.Group | null = null;
let loadedWheel: THREE.Group | null = null;
let loadedTrucks: THREE.Group | null = null;

loader.load('/engineering-website-astro/assets/3d/Skateboard.glb', (gltf) => {
  loadedSkateboard = gltf.scene;
  loadedSkateboard.position.set(0, -100, 0);
  loadedSkateboard.scale.set(0.5, 0.5, 0.5);
  scene.add(loadedSkateboard);
});

loader.load('/engineering-website-astro/assets/3d/Wheel.glb', (gltf) => {
  loadedWheel = gltf.scene;
  loadedWheel.position.set(0, -100, 0);
  loadedWheel.scale.set(1, 1, 1);
  scene.add(loadedWheel);
});

loader.load('/engineering-website-astro/assets/3d/Trucks.glb', (gltf) => {
  loadedTrucks = gltf.scene;
  loadedTrucks.position.set(2.5, -100, 0);
  loadedTrucks.scale.set(15, 15, 15);
  scene.add(loadedTrucks);
});

// Add a screenshot
const Screenshot1 = new THREE.TextureLoader().load('/engineering-website-astro/assets/CADScreenshot1.jpg');
const CADScreenshot1 = new THREE.Mesh(
  new THREE.BoxGeometry(8, 6, 0.1),
  new THREE.MeshBasicMaterial({ map: Screenshot1 })
);
CADScreenshot1.position.set(5, -100, -4);
scene.add(CADScreenshot1);



// Camera movement on scroll
function moveCamera() {
  const t = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY;
  const offset = t - 100; // Adjust for navbar height

  // Rotate and move the cube


  // Update skateboard position
  if (loadedSkateboard) {
    loadedSkateboard.position.x = 0.1 + offset * 0.004;
    loadedSkateboard.position.y = -17 + offset * 0.0125;
    loadedSkateboard.rotation.y = 3 + offset * 0.005;
    loadedSkateboard.rotation.x = offset * -0.0005;
  }

  // Update wheel position
  if (loadedWheel) {
    loadedWheel.position.x = 6 - offset * 0.004;
    loadedWheel.position.y = -14 + offset * 0.0125;
    loadedWheel.rotation.y = 1.5 - offset * 0.01;
  }

  // Update trucks position
  if (loadedTrucks) {
    loadedTrucks.position.y = -7.5 + offset * 0.01;
    loadedTrucks.rotation.y = offset * 0.005;
    loadedTrucks.rotation.x = offset * 0.0005;
  }

  // Update screenshot position
  CADScreenshot1.position.y = -20 + offset * 0.015;

  // Update camera position
  camera.position.x = offset * 0.0002;
  camera.position.y = offset * 0.0002;
}

window.addEventListener('scroll', moveCamera);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();