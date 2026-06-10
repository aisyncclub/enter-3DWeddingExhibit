import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BACKGROUNDS, type ThemeKey } from './backgrounds';
import { createParticles, type ParticleSystem } from './particles';

const GALLERY_RADIUS = 5.5;
const FRAME_W = 1.6;
const FRAME_H = 2.2;
const FRAME_SLOTS = 8;
const CAMERA_Y = 1.5;

export interface GalleryApi {
  loadPhoto: (index: number, dataUrl: string) => void;
  setTheme: (theme: ThemeKey) => void;
}

interface UseGalleryOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  theme: ThemeKey;
  photos: (string | null)[];
  onPhotoClick: (index: number) => void;
}

export function useGallery({ canvasRef, theme, photos, onPhotoClick }: UseGalleryOptions): RefObject<GalleryApi | null> {
  const apiRef = useRef<GalleryApi | null>(null);
  const themeRef = useRef(theme);
  const photosRef = useRef(photos);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // === Renderer ===
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // === Scene ===
    const scene = new THREE.Scene();

    // === Camera ===
    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100);
    camera.position.set(0, CAMERA_Y, 0.01);

    // === Controls ===
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.minDistance = 0.3;
    controls.maxDistance = 4.5;
    controls.minPolarAngle = Math.PI * 0.3;
    controls.maxPolarAngle = Math.PI * 0.7;
    controls.target.set(0, CAMERA_Y, 0);

    // === Floor ===
    const floorGeo = new THREE.CircleGeometry(11, 64);
    const floorMat = new THREE.MeshStandardMaterial({ roughness: 0.8, metalness: 0.0 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // === Ceiling ===
    const ceilGeo = new THREE.CircleGeometry(11, 64);
    const ceilMat = new THREE.MeshStandardMaterial({ roughness: 1.0, metalness: 0.0, side: THREE.BackSide });
    const ceiling = new THREE.Mesh(ceilGeo, ceilMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 5;
    scene.add(ceiling);

    // === Outer cylinder wall ===
    const wallGeo = new THREE.CylinderGeometry(10, 10, 5, 32, 1, true);
    const wallMat = new THREE.MeshStandardMaterial({ roughness: 0.9, side: THREE.BackSide });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.y = 2.5;
    scene.add(wall);

    // === Lighting ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5e0, 1.2);
    dirLight.position.set(0, 8, 0);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // === Photo Frames ===
    const frameGroups: THREE.Group[] = [];
    const photoMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < FRAME_SLOTS; i++) {
      const angle = (i / FRAME_SLOTS) * Math.PI * 2;
      const x = Math.sin(angle) * GALLERY_RADIUS;
      const z = Math.cos(angle) * GALLERY_RADIUS;

      // Gold frame backing
      const backingGeo = new THREE.BoxGeometry(FRAME_W + 0.14, FRAME_H + 0.14, 0.06);
      const backingMat = new THREE.MeshStandardMaterial({
        color: 0xc9a84c,
        metalness: 0.7,
        roughness: 0.3,
      });
      const backing = new THREE.Mesh(backingGeo, backingMat);
      backing.castShadow = true;

      // Photo plane
      const photoGeo = new THREE.PlaneGeometry(FRAME_W, FRAME_H);
      const photoMat = new THREE.MeshStandardMaterial({
        color: 0xf8eaf0,
        roughness: 0.6,
        metalness: 0.0,
      });
      const photoMesh = new THREE.Mesh(photoGeo, photoMat);
      photoMesh.position.z = 0.04;
      photoMesh.userData.frameIndex = i;

      // Spot light per frame (from above and slightly in front)
      const spot = new THREE.SpotLight(0xfff8e8, 2.5);
      spot.position.set(0, 3, -1);
      spot.target.position.set(0, CAMERA_Y, 0.5);
      spot.angle = 0.4;
      spot.penumbra = 0.5;
      spot.castShadow = false;

      const group = new THREE.Group();
      group.add(backing, photoMesh, spot, spot.target);
      group.position.set(x, CAMERA_Y + 0.4, z);
      group.lookAt(0, CAMERA_Y + 0.4, 0);
      scene.add(group);

      frameGroups.push(group);
      photoMeshes.push(photoMesh);
    }

    frameGroupsRef.current = frameGroups;
    photoMeshesRef.current = photoMeshes;

    // === Particles ===
    let particles: ParticleSystem | null = null;
    function setupParticles(t: ThemeKey) {
      if (particles) {
        scene.remove(particles.points);
        particles.dispose();
      }
      const cfg = BACKGROUNDS[t];
      particles = createParticles(t, cfg.particleColor);
      scene.add(particles.points);
    }

    // === Apply initial theme ===
    function applyTheme(t: ThemeKey) {
      const cfg = BACKGROUNDS[t];
      scene.fog = new THREE.FogExp2(cfg.fogColor, cfg.fogDensity);
      renderer.setClearColor(cfg.fogColor, 1);
      (floorMat as THREE.MeshStandardMaterial).color.setHex(cfg.floorColor);
      (floorMat as THREE.MeshStandardMaterial).metalness = cfg.floorMetal;
      (floorMat as THREE.MeshStandardMaterial).roughness = cfg.floorRough;
      (ceilMat as THREE.MeshStandardMaterial).color.setHex(cfg.skyColor);
      (wallMat as THREE.MeshStandardMaterial).color.setHex(cfg.wallColor);
      ambientLight.color.setHex(cfg.ambientColor);
      ambientLight.intensity = cfg.ambientIntensity;
      dirLight.color.setHex(cfg.dirLightColor);
      dirLight.intensity = cfg.dirLightIntensity;
      setupParticles(t);
    }

    applyTheme(themeRef.current);

    // === Load existing photos ===
    const textureLoader = new THREE.TextureLoader();
    photosRef.current.forEach((url, i) => {
      if (url && photoMeshes[i]) {
        const tex = textureLoader.load(url);
        tex.colorSpace = THREE.SRGBColorSpace;
        (photoMeshes[i].material as THREE.MeshStandardMaterial).map = tex;
        (photoMeshes[i].material as THREE.MeshStandardMaterial).color.setHex(0xffffff);
        (photoMeshes[i].material as THREE.MeshStandardMaterial).needsUpdate = true;
      }
    });

    // === API ===
    apiRef.current = {
      loadPhoto(index: number, dataUrl: string) {
        if (!photoMeshes[index]) return;
        const tex = textureLoader.load(dataUrl);
        tex.colorSpace = THREE.SRGBColorSpace;
        const mat = photoMeshes[index].material as THREE.MeshStandardMaterial;
        mat.map = tex;
        mat.color.setHex(0xffffff);
        mat.needsUpdate = true;
      },
      setTheme(t: ThemeKey) {
        applyTheme(t);
      },
    };

    // === Raycasting ===
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mouseDownTime = 0;
    let mouseDownPos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      mouseDownTime = Date.now();
      if (e instanceof MouseEvent) {
        mouseDownPos = { x: e.clientX, y: e.clientY };
      } else {
        mouseDownPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onMouseUp = (e: MouseEvent | TouchEvent) => {
      const elapsed = Date.now() - mouseDownTime;
      let upX: number, upY: number;
      if (e instanceof MouseEvent) {
        upX = e.clientX; upY = e.clientY;
      } else {
        upX = e.changedTouches[0].clientX; upY = e.changedTouches[0].clientY;
      }
      const dx = Math.abs(upX - mouseDownPos.x);
      const dy = Math.abs(upY - mouseDownPos.y);
      if (elapsed < 300 && dx < 8 && dy < 8) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((upX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((upY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(photoMeshes, false);
        if (hits.length > 0) {
          const idx = hits[0].object.userData.frameIndex as number;
          onPhotoClick(idx);
        }
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onMouseDown, { passive: true });
    canvas.addEventListener('touchend', onMouseUp);

    // === Resize ===
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // === Animation ===
    const clock = new THREE.Clock();
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      controls.update();
      if (particles) particles.update(delta);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onMouseDown);
      canvas.removeEventListener('touchend', onMouseUp);
      controls.dispose();
      renderer.dispose();
      particles?.dispose();
      scene.clear();
      apiRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef]);

  // Theme updates after mount
  useEffect(() => {
    apiRef.current?.setTheme(theme);
  }, [theme]);

  // Photo updates after mount
  useEffect(() => {
    photos.forEach((url, i) => {
      if (url) apiRef.current?.loadPhoto(i, url);
    });
  }, [photos]);

  return apiRef;
}
