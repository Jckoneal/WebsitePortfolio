import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const SkateboardBlog = () => {
  console.log('SkateboardBlog component is rendering');

  useEffect(() => {
    console.log('SkateboardBlog useEffect is running');
    console.log('SkateboardBlog component mounted');

    if (typeof window === 'undefined') {
      console.error('This code is running on the server, not the client');
      return;
    }

    // Get the canvas element
    const canvas = document.querySelector('#bg') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found!');
      return;
    }

    console.log('Canvas element found:', canvas);

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas,
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

    loader.load('/3d/Skateboard.glb', (gltf) => {
      console.log('Skateboard model loaded:', gltf);
      loadedSkateboard = gltf.scene;
      loadedSkateboard.position.set(0, -100, 0);
      loadedSkateboard.scale.set(0.5, 0.5, 0.5);
      scene.add(loadedSkateboard);
    }, undefined, (error) => {
      console.error('Error loading Skateboard.glb:', error);
    });

    loader.load('/3d/Wheel.glb', (gltf) => {
      console.log('Wheel model loaded:', gltf);
      loadedWheel = gltf.scene;
      loadedWheel.position.set(0, -100, 0);
      loadedWheel.scale.set(1, 1, 1);
      scene.add(loadedWheel);
    }, undefined, (error) => {
      console.error('Error loading Wheel.glb:', error);
    });

    loader.load('/3d/Trucks.glb', (gltf) => {
      console.log('Trucks model loaded:', gltf);
      loadedTrucks = gltf.scene;
      loadedTrucks.position.set(2.5, -100, 0);
      loadedTrucks.scale.set(15, 15, 15);
      scene.add(loadedTrucks);
    }, undefined, (error) => {
      console.error('Error loading Trucks.glb:', error);
    });

    // cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);  
    scene.add(cube);

    // Add a screenshot
    const Screenshot1 = new THREE.TextureLoader().load('/images/CADScreenshot1.jpg');
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
    let isMounted = true;

    function animate() {
      if (!isMounted) return; // Stop the animation loop if the component is unmounted
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      isMounted = false;
      window.removeEventListener('scroll', moveCamera);
    };
  }, []);

  return <canvas id="bg"></canvas>;
};

export default SkateboardBlog;