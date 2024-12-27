import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

// Set up the camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

// Create the scene
const scene = new THREE.Scene();
let phone; // Variable to hold the phone model
let mixer; // Variable for animation mixer

// Load the 3D model
const loader = new GLTFLoader();
loader.load('phone.glb', // Path to your phone model
    function (gltf) {
        phone = gltf.scene;
        scene.add(phone);

        // If the model has animations, set up the mixer
        if (gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(phone);
            mixer.clipAction(gltf.animations[0]).play();
        }
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Optional: Loading progress
    },
    function (error) {
        console.error('An error occurred while loading the model:', error);
    }
);

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(400, 400); // Set the size of the canvas
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Animation loop
const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) mixer.update(0.02); // Update the mixer if it exists
};
reRender3D();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Scroll event to move the phone model
const arrPositionModel = [
    {
        id: 'contact',
        position: { x: 0, y: -1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    // You can add more sections here if needed
];

const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });

    let position_active = arrPositionModel.findIndex(
        (val) => val.id === currentSection
    );

    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(phone.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(phone.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        });
    }
};

// Listen for scroll events
window.addEventListener('scroll', () => {
    if (phone) {
        modelMove();
    }
});