import React, { useRef, useState, useMemo } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";

/**
 * DeveloperModel renders the 3D model, centers/scales it automatically,
 * applies realistic PBR materials based on vertex locations,
 * and adds float, rotation, sway, and breathing animations.
 */
export default function DeveloperModel() {
  const obj = useLoader(OBJLoader, "/models/base.obj");
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Compute model bounds, center the geometry, and scale to fit perfectly in viewport
  const modelGroup = useMemo(() => {
    const cloned = obj.clone();
    
    // 1. Calculate bounding box of the loaded OBJ model
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    
    // 2. Shift all children so they are centered relative to the pivot [0, 0, 0]
    cloned.position.x = -center.x;
    cloned.position.y = -center.y;
    cloned.position.z = -center.z;
    
    // Wrap inside a parent group for clean local coordinate animations
    const wrapper = new THREE.Group();
    wrapper.add(cloned);
    
    // 3. Compute scale factor to fit the complete character safely within the canvas
    const maxDim = Math.max(size.x, size.y, size.z);
    // Standard size of 2.2 leaves ~10-15% padding when viewed from distance 4 (fov 45)
    const scaleFactor = 2.2 / maxDim;
    wrapper.scale.set(scaleFactor, scaleFactor, scaleFactor);
    
    // 4. Apply high-fidelity PBR procedural coloring based on vertex positions
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Define a base MeshStandardMaterial
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#ffffff"),
          roughness: 0.8,
          metalness: 0.1,
        });
        
        // Inject a custom shader modifier to color different parts of the single mesh
        material.onBeforeCompile = (shader) => {
          // Pass local coordinates from vertex shader to fragment shader
          shader.vertexShader = shader.vertexShader.replace(
            "#include <common>",
            `#include <common>
             varying vec3 vLocalPosition;`
          );
          shader.vertexShader = shader.vertexShader.replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
             vLocalPosition = position;`
          );
          
          shader.fragmentShader = shader.fragmentShader.replace(
            "#include <common>",
            `#include <common>
             varying vec3 vLocalPosition;
             uniform float uHoverGlow;`
          );
          
          shader.fragmentShader = shader.fragmentShader.replace(
            "#include <color_fragment>",
            `#include <color_fragment>
             
             // Base colors and physical properties
             vec3 customColor = vec3(0.16, 0.16, 0.18); // default charcoal pants
             float customMetalness = 0.0;
             float customRoughness = 0.85;
             float customEmissive = 0.0;
             
             // Height boundaries (Y goes from 0.0 to 1.9)
             
             // A. Hair (Top of head)
             if (vLocalPosition.y > 1.70) {
               customColor = vec3(0.03, 0.03, 0.03); // Dark black hair
               customRoughness = 0.95;
             }
             // B. Face, Neck, Ears, and Eyes (Skin tone / Eyes)
             else if (vLocalPosition.y > 1.48 && vLocalPosition.y <= 1.70 && vLocalPosition.z > -0.15) {
               // Render back/sides of head as hair
               if (vLocalPosition.z < -0.02 || abs(vLocalPosition.x) > 0.11) {
                 customColor = vec3(0.03, 0.03, 0.03); // Hair
                 customRoughness = 0.95;
               } 
               // Detect Eyes (facial front region)
               else if (vLocalPosition.y > 1.57 && vLocalPosition.y < 1.62 && vLocalPosition.z > 0.07 && abs(vLocalPosition.x) > 0.025 && abs(vLocalPosition.x) < 0.055) {
                 customColor = vec3(0.18, 0.09, 0.04); // Dark brown eyes
                 customRoughness = 0.1;
               }
               else {
                 customColor = vec3(0.78, 0.58, 0.44); // Natural medium skin tone
                 customRoughness = 0.6;
               }
             }
             // C. Laptop (Silver aluminum)
             else if (vLocalPosition.z > 0.16 && vLocalPosition.y > 0.70 && vLocalPosition.y < 0.96 && abs(vLocalPosition.x) < 0.28) {
               customColor = vec3(0.75, 0.75, 0.77); // Silver aluminum
               customMetalness = 0.9;
               customRoughness = 0.2;
               // Tech details (logo/accents) - blue emissive glow
               if (vLocalPosition.z > 0.26 || abs(vLocalPosition.x) > 0.24) {
                 customEmissive = 1.0;
               }
             }
             // D. Chair (Black ergonomic office chair)
             else if (vLocalPosition.z < -0.14 || (vLocalPosition.y < 0.55 && vLocalPosition.z < 0.1)) {
               customColor = vec3(0.07, 0.07, 0.08); // Black ergonomic chair
               customRoughness = 0.8;
             }
             // E. Shoes (White shoes at bottom)
             else if (vLocalPosition.y < 0.18) {
               customColor = vec3(0.94, 0.94, 0.94); // White shoes
               customRoughness = 0.5;
             }
             // F. Pants (Dark charcoal)
             else if (vLocalPosition.y >= 0.18 && vLocalPosition.y < 0.78) {
               customColor = vec3(0.16, 0.16, 0.18);
               customRoughness = 0.85;
             }
             // G. Torso & Upper Arms (Jacket/Shirt/Hands)
             else if (vLocalPosition.y >= 0.78 && vLocalPosition.y <= 1.48) {
               // White shirt (chest center)
               if (vLocalPosition.y > 0.92 && vLocalPosition.y < 1.32 && vLocalPosition.z > 0.06 && abs(vLocalPosition.x) < 0.08) {
                 customColor = vec3(0.95, 0.95, 0.95);
                 customRoughness = 0.8;
               } 
               // Skin tone hands on lap
               else if (vLocalPosition.y > 0.78 && vLocalPosition.y < 0.88 && abs(vLocalPosition.x) > 0.20 && vLocalPosition.z > 0.1) {
                 customColor = vec3(0.78, 0.58, 0.44); // Natural skin tone
                 customRoughness = 0.6;
                 // Black metallic watch on left wrist
                 if (vLocalPosition.x < -0.21 && vLocalPosition.y > 0.80) {
                   customColor = vec3(0.10, 0.10, 0.11); // black metallic
                   customMetalness = 0.9;
                   customRoughness = 0.15;
                 }
               } 
               // Matte black jacket
               else {
                 customColor = vec3(0.08, 0.08, 0.09);
                 customRoughness = 0.75;
               }
             }
             
             diffuseColor.rgb = customColor;
            `
          );
          
          shader.fragmentShader = shader.fragmentShader.replace(
            "#include <roughnessmap_fragment>",
            `#include <roughnessmap_fragment>
             roughnessFactor = customRoughness;`
          );
          shader.fragmentShader = shader.fragmentShader.replace(
            "#include <metalnessmap_fragment>",
            `#include <metalnessmap_fragment>
             metalnessFactor = customMetalness;`
          );
          shader.fragmentShader = shader.fragmentShader.replace(
            "#include <emissivemap_fragment>",
            `#include <emissivemap_fragment>
             if (customEmissive > 0.0) {
               vEmission = vec3(0.0, 0.55, 1.0) * customEmissive * (1.8 + uHoverGlow * 1.2);
             }`
          );
        };
        
        // Define hover uniform to control glow intensity dynamically
        material.userData.hoverGlow = { value: 0 };
        material.onBeforeCompile = ((originalOnBeforeCompile) => {
          return (shader) => {
            originalOnBeforeCompile(shader);
            shader.uniforms.uHoverGlow = material.userData.hoverGlow;
          };
        })(material.onBeforeCompile);

        child.material = material;
      }
    });
    
    return wrapper;
  }, [obj]);

  const targetScale = new THREE.Vector3();

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // 1. Gentle floating (6px equivalent in scene scale = ~0.04)
    meshRef.current.position.y = Math.sin(time * 0.9) * 0.04;

    // 2. Slow Y-axis rotation
    meshRef.current.rotation.y = time * 0.10;

    // 3. Natural sway (organic movement on X and Z axes)
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.02;
    meshRef.current.rotation.z = Math.cos(time * 0.7) * 0.015;

    // 4. Idle breathing (scale oscillation)
    const breathing = 1.0 + Math.sin(time * 1.5) * 0.008;
    
    // 5. Hover enlargement & glow update
    const hoverMultiplier = hovered ? 1.05 : 1.0;
    const finalScale = breathing * hoverMultiplier;

    targetScale.set(finalScale, finalScale, finalScale);
    meshRef.current.scale.lerp(targetScale, 0.1);

    // Smoothly animate hover glow uniform
    modelGroup.traverse((child) => {
      if (child.isMesh && child.material.userData.hoverGlow) {
        child.material.userData.hoverGlow.value = THREE.MathUtils.lerp(
          child.material.userData.hoverGlow.value,
          hovered ? 1.0 : 0.0,
          0.1
        );
      }
    });
  });

  return (
    <primitive
      ref={meshRef}
      object={modelGroup}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    />
  );
}
