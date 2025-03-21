import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const offset = 0;

const planeInitX = -25;
const planeInitY = -2.6;
const planeInitZ = -10;
const planeRotation: number[] = [(Math.PI/2)+.1, Math.PI, -.3];


const Scene3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      .1,
      1000
    );
    
    rendererRef.current = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    
    rendererRef.current.setPixelRatio(window.devicePixelRatio*1);

    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(rendererRef.current.domElement);

    
    const loader = new GLTFLoader();
    loader.load('./Assembly.gltf', (gltf) => {
      const plane = gltf.scene;
      plane.position.set(planeInitX, planeInitY, planeInitZ);
      plane.rotation.set(planeRotation[0], planeRotation[1], planeRotation[2]);
      plane.scale.set(5, 5, 5);
      sceneRef.current?.add(plane);
      
      // Animate the model on scroll
      const handleScroll = () => {
        const scrollY = window.scrollY;
        plane.position.x = planeInitX + scrollY * 0.07; // Adjust the multiplier as needed
        plane.position.y = planeInitY + scrollY * -0.002;
        plane.position.z = planeInitZ + scrollY * 0.02; // Adjust the multiplier as needed
        jack.rotation.x = scrollY * 0.006;
        jack.rotation.z = scrollY * 0.0003;
        jack.rotation.y = scrollY * 0.005;
        jack.position.x = scrollY * 0.03-8;
        jack.position.z = scrollY * 0.01-10;
        jack.position.y = scrollY * 0.01+4;
      };
      
      window.addEventListener('scroll', handleScroll);
    });
    const rocketLoader = new GLTFLoader();
    rocketLoader.load('./Dove-v2.glb', (gltf) => {
      const rocket = gltf.scene;
      rocket.position.set(6, -10, -10); // Initial position of the rocket
      rocket.scale.set(.5, .5, .5);
      rocket.rotation.set(Math.PI/2, Math.PI, 0);
      sceneRef.current?.add(rocket);

      // Animate the rocket on scroll
      const handleRocketScroll = () => {
        const scrollY = window.scrollY;
        rocket.position.y = -10 + scrollY * 0.05; // Adjust the multiplier as needed
      };

      window.addEventListener('scroll', handleRocketScroll);
    });
  
    // const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    // const sphereMaterial = new THREE.MeshPhongMaterial({
    //   color: 0xFCB615,
    //   transparent: true,
    //   opacity: 0.8,
    // });
    // const spheres: THREE.Mesh[] = [];
    // for (let i = 0; i < 5; i++) {
    //   const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    //   sphere.position.set(
    //     Math.random() * 15 - 5,
    //     Math.random() * 10 - 5,
    //     Math.random() * 15 - 15
    //   );
    //   sphere.scale.setScalar(Math.random() * 0.5 + 0.5);
    //   sceneRef.current.add(sphere);
    //   spheres.push(sphere);

    //   // Animate each sphere
    //   gsap.to(sphere.position, {
    //     y: `+=${Math.random() * 2 - 1}`,
    //     duration: 2 + Math.random() * 2,
    //     yoyo: true,
    //     repeat: -1,
    //     ease: "sine.inOut",
    //   });
    // }
    // Add a textured cube
    const textureLoader = new THREE.TextureLoader();
    const jackTextures = [
      textureLoader.load('./images/Jack2.png'),
      textureLoader.load('./images/Jack5.png'),
      textureLoader.load('./images/Jack.jpg'),
      textureLoader.load('./images/Jack6.JPG'),
      textureLoader.load('./images/Jack4.png'),
      textureLoader.load('./images/Jack3.png'),
    ];
    const jack = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      jackTextures.map((texture) => new THREE.MeshBasicMaterial({ map: texture }))
    );
    jack.position.set(-8, 4, -10);
    sceneRef.current?.add(jack);

    // Load PilotV3 model
    const pilotLoader = new GLTFLoader();
    pilotLoader.load('./3d/PilotV3.glb', (gltf) => {
      const pilot = gltf.scene;
      pilot.position.set(10, -5, -10); // Initial position of the pilot
      pilot.scale.set(.1, .1, .1); // Adjust scale as needed
      sceneRef.current?.add(pilot);
      pilot.rotation.x = 3.14/5 ;

      // Animate the pilot on scroll
      const handlePilotScroll = () => {
        const scrollY = window.scrollY;
        pilot.rotation.y = scrollY * 0.01; // Rotate the pilot
        pilot.rotation.x = 3.14/5 + scrollY * 0.0001;
        pilot.rotation.z = scrollY * 0.002;
        pilot.position.y = -5 + scrollY * 0.02; // Move the pilot up/down
        pilot.position.x = 10+ scrollY * 0.01; // Move the pilot left/right
         // Move the pilot left/right
      };

      window.addEventListener('scroll', handlePilotScroll);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    sceneRef.current.add(directionalLight);

    cameraRef.current.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (sceneRef.current && cameraRef.current && rendererRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        containerRef.current?.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
    }, []);


  return <div ref={containerRef} className="absolute inset-0" />;
};

export default Scene3D;