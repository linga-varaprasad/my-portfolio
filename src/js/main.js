import * as THREE from 'three';
import Typed from 'typed.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import lottie from 'lottie-web';

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize AOS with a small delay to ensure proper loading
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false,
            startEvent: 'load'
        });
    }, 100);
});

// Typed.js initialization
window.addEventListener('load', () => {
    const typed = new Typed('#typed-text', {
        strings: [
            'Full Stack Developer',
            'React Developer',
            'Django Developer'
        ],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        cursorChar: '|',
        fadeOut: true,
        fadeOutClass: 'typed-fade-out',
        fadeOutDelay: 500
    });
});

// Profile Animation
const profileAnimation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets8.lottiefiles.com/packages/lf20_w51pcehl.json' // Developer animation
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Three.js Background
const initThreeBackground = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.querySelector('#particles-js');
    if (container) {
        container.appendChild(renderer.domElement);
    }

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    
    for (let i = 0; i < 5000; i++) {
        vertices.push(
            THREE.MathUtils.randFloatSpread(2000),
            THREE.MathUtils.randFloatSpread(2000),
            THREE.MathUtils.randFloatSpread(2000)
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ 
        color: 0x4a90e2,
        size: 2,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 1000;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0001;
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
};

// Initialize Three.js background after window loads
window.addEventListener('load', () => {
    initThreeBackground();
});

// Form submission handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Here you would typically send the form data to your backend
        // For now, we'll just simulate a submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
}

// Initialize tooltips
tippy('[data-tippy-content]', {
    theme: 'light',
    animation: 'scale'
});
