/**
 * Three.js 3D Scene Setup for Birthday Website
 * Creates animated 3D elements and background
 */

let scene, camera, renderer;
let particles = [];
let cakes = [];
let balloons = [];
let gifts = [];
let currentStage = 0;

class Particle {
  constructor() {
    const geometry = new THREE.SphereGeometry(Math.random() * 0.5 + 0.2, 8, 8);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
      emissive: new THREE.Color().setHSL(Math.random(), 0.5, 0.3),
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 40
    );
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2
    );
    this.rotation = {
      x: Math.random() * 0.01,
      y: Math.random() * 0.01,
      z: Math.random() * 0.01,
    };
    scene.add(this.mesh);
  }

  update() {
    this.mesh.position.add(this.velocity);
    this.mesh.rotation.x += this.rotation.x;
    this.mesh.rotation.y += this.rotation.y;
    this.mesh.rotation.z += this.rotation.z;

    // Wrap around boundaries
    if (this.mesh.position.x > 20) this.mesh.position.x = -20;
    if (this.mesh.position.x < -20) this.mesh.position.x = 20;
    if (this.mesh.position.y > 20) this.mesh.position.y = -20;
    if (this.mesh.position.y < -20) this.mesh.position.y = 20;
    if (this.mesh.position.z > 20) this.mesh.position.z = -20;
    if (this.mesh.position.z < -20) this.mesh.position.z = 20;
  }
}

class Cake {
  constructor(x = 0, y = 0, z = 0) {
    this.group = new THREE.Group();

    // Cake base
    const baseGeometry = new THREE.ConeGeometry(2, 1, 32);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff69b4,
      transparent: true,
      opacity: 1
    });
    this.baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    this.baseMesh.position.y = 0;
    this.group.add(this.baseMesh);

    // Candle
    const candleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 16);
    const candleMaterial = new THREE.MeshPhongMaterial({ color: 0xffdd00 });
    this.candle = new THREE.Mesh(candleGeometry, candleMaterial);
    this.candle.position.set(0, 1.5, 0);
    this.group.add(this.candle);

    // Flame
    const flameGeometry = new THREE.ConeGeometry(0.3, 0.8, 16);
    const flameMaterial = new THREE.MeshPhongMaterial({
      color: 0xff6b00,
      emissive: 0xff6b00,
    });
    this.flame = new THREE.Mesh(flameGeometry, flameMaterial);
    this.flame.position.set(0, 2.2, 0);
    this.group.add(this.flame);

    this.group.position.set(x, y, z);
    scene.add(this.group);
    this.time = 0;
  }

  update() {
    this.time += 0.02;
    this.group.rotation.y += 0.01;
    this.flame.scale.y = 1 + Math.sin(this.time * 2) * 0.2;
    this.flame.position.y = 2.2 + Math.sin(this.time) * 0.3;
  }
}

class Balloon {
  constructor(x = 0, y = 0, z = 0) {
    this.group = new THREE.Group();

    // Balloon sphere
    const balloonGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const balloonMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
      shininess: 100,
      transparent: true,
      opacity: 1
    });
    this.balloonMesh = new THREE.Mesh(balloonGeometry, balloonMaterial);
    this.balloonMesh.position.y = 2;
    this.group.add(this.balloonMesh);

    // String
    const stringGeometry = new THREE.TubeGeometry(
      new THREE.LineCurve3(
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0, 0, 0)
      ),
      8,
      0.05,
      8
    );
    const stringMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    this.string = new THREE.Mesh(stringGeometry, stringMaterial);
    this.group.add(this.string);

    this.group.position.set(x, y, z);
    scene.add(this.group);
    this.time = 0;
    this.amplitude = Math.random() * 2 + 1;
  }

  update() {
    this.time += 0.01;
    this.group.position.x += Math.sin(this.time) * 0.05;
    this.group.position.y += Math.cos(this.time * 0.5) * 0.02;
    this.group.rotation.z += 0.003;
  }
}

class Gift {
  constructor(x = 0, y = 0, z = 0) {
    this.group = new THREE.Group();

    // Box
    const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.8, 0.5),
      transparent: true,
      opacity: 1
    });
    this.box = new THREE.Mesh(boxGeometry, boxMaterial);
    this.group.add(this.box);

    // Ribbon
    const ribbonGeometry = new THREE.BoxGeometry(1.6, 0.1, 1.6);
    const ribbonMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    this.ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
    this.ribbon.position.z = 0.01;
    this.group.add(this.ribbon);

    // Bow
    const bowGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const bowMaterial = new THREE.MeshPhongMaterial({ color: 0xff1493 });
    this.bow = new THREE.Mesh(bowGeometry, bowMaterial);
    this.bow.position.y = 0.8;
    this.group.add(this.bow);

    this.group.position.set(x, y, z);
    scene.add(this.group);
    this.time = 0;
  }

  update() {
    this.time += 0.02;
    this.group.rotation.y += 0.02;
    this.group.position.y += Math.sin(this.time) * 0.02;
  }
}

function initThreeJS() {
  // Scene setup
  const canvas = document.getElementById("canvas3d");
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a0a2e);
  scene.fog = new THREE.Fog(0x1a0a2e, 100, 200);

  // Camera
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 15;

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xff6b9d, 1, 100);
  pointLight1.position.set(10, 10, 10);
  pointLight1.castShadow = true;
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x9b59b6, 0.8, 100);
  pointLight2.position.set(-10, -10, 10);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xffd700, 0.6, 100);
  pointLight3.position.set(0, 0, -20);
  scene.add(pointLight3);

  // Create initial particles
  for (let i = 0; i < 30; i++) {
    particles.push(new Particle());
  }

  // Create stage objects
  for (let i = 0; i < 3; i++) {
    cakes.push(new Cake((i - 1) * 8, -5, 0));
  }

  for (let i = 0; i < 4; i++) {
    balloons.push(new Balloon((i - 1.5) * 5, 8, -5 + i * 2));
  }

  for (let i = 0; i < 2; i++) {
    gifts.push(new Gift((i - 0.5) * 6, 0, 5));
  }

  // Animation loop
  animate();

  // Handle resize
  window.addEventListener("resize", onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);

  // Update particles
  particles.forEach((particle) => particle.update());

  // Update 3D objects based on stage
  if (currentStage === 0) {
    // Hero stage - show cakes
    cakes.forEach((cake) => cake.update());
  } else if (currentStage === 1) {
    // Bubble stage - show balloons
    balloons.forEach((balloon) => balloon.update());
  } else if (currentStage === 2) {
    // Puzzle stage - show gifts
    gifts.forEach((gift) => gift.update());
  } else if (currentStage === 3) {
    // Wish stage - show all
    cakes.forEach((cake) => cake.update());
    balloons.forEach((balloon) => balloon.update());
    gifts.forEach((gift) => gift.update());
  }

  // Rotate scene slowly
  scene.rotation.z += 0.0001;

  renderer.render(scene, camera);
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

function setThreeStage(stage) {
  currentStage = stage;
  updateSceneForStage();
}

function updateSceneForStage() {
  // Fade in/out 3D objects based on stage
  const fadeIntensity = 0.2;

  cakes.forEach((cake) => {
    cake.group.visible = currentStage === 0 || currentStage === 3;
    if (cake.group.visible) {
      cake.baseMesh.material.opacity = currentStage === 3 ? fadeIntensity : 1;
    }
  });

  balloons.forEach((balloon) => {
    balloon.group.visible = currentStage === 1 || currentStage === 3;
    if (balloon.group.visible) {
      balloon.balloonMesh.material.opacity =
        currentStage === 3 ? fadeIntensity : 1;
    }
  });

  gifts.forEach((gift) => {
    gift.group.visible = currentStage === 2 || currentStage === 3;
    if (gift.group.visible) {
      gift.box.material.opacity = currentStage === 3 ? fadeIntensity : 1;
    }
  });
}

function addConfetti3D(count = 50) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThreeJS);
} else {
  initThreeJS();
}
