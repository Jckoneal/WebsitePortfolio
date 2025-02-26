import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';



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
    loader.load('/src/assets/Assembly.gltf', (gltf) => {
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

      };
      
      window.addEventListener('scroll', handleScroll);
    });
    // // Create floating spheres
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
      window.removeEventListener('scroll', handleScroll);
      if (rendererRef.current) {
        containerRef.current?.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
    }, []);


  return <div ref={containerRef} className="absolute inset-0" />;
};

export default Scene3D;