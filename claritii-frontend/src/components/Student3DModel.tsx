

// import { useRef, Suspense } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF, Float, ContactShadows } from "@react-three/drei";
// import * as THREE from "three";

// function StudentModel({ onClick }: { onClick: () => void }) {
//   const modelRef = useRef<THREE.Group>(null);
//   const { scene } = useGLTF("/school_student.glb");

//   useFrame((state) => {
//     if (!modelRef.current) return;

//     const time = state.clock.elapsedTime;

//     // Very subtle natural movement
//     modelRef.current.position.y = -1.15 + Math.sin(time * 0.7) * 0.035;

//     // Keep the model smoothly facing forward
//     modelRef.current.rotation.y += (0 - modelRef.current.rotation.y) * 0.05;

//     modelRef.current.rotation.x += (0 - modelRef.current.rotation.x) * 0.05;

//     // Smoothly maintain the large size
//     const targetScale = 3.6;
//     const currentScale = modelRef.current.scale.x;

//     const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);

//     modelRef.current.scale.set(newScale, newScale, newScale);
//   });

//   return (
//     <group
//       ref={modelRef}
//       onClick={onClick}
//       scale={2.5}
//       position={[1.4, -1, 0]}
//       rotation={[0, 0, 0]}
//     >
//       <primitive object={scene} />
//     </group>
//   );
// }

// function Loader() {
//   return (
//     <mesh>
//       <sphereGeometry args={[0.35, 32, 32]} />
//       <meshStandardMaterial color="#3DC6E7" wireframe />
//     </mesh>
//   );
// }

// export const Student3DModel = ({
//   onModelClick,
// }: {
//   onModelClick: () => void;
// }) => {
//   return (
//     <div className="w-full h-full relative mt-14">
//       <Canvas
//         camera={{
//           position: [8, 1.5, 4.5],
//           fov: 35,
//           near: 0.1,
//           far: 1000,
//         }}
//         style={{ background: "transparent" }}
//         dpr={[1, 2]}
//         gl={{
//           antialias: true,
//           alpha: true,
//         }}
//       >
//         {/* Base lighting */}
//         <ambientLight intensity={1} />

//         {/* Main light */}
//         <directionalLight position={[5, 5, 5]} intensity={1.8} castShadow />

//         {/* Soft side lighting */}
//         <directionalLight
//           position={[-5, 3, 3]}
//           intensity={0.8}
//           color="#68DCD2"
//         />

//         {/* Front light for face visibility */}
//         <pointLight position={[0, 2, 4]} intensity={0.8} color="#ffffff" />

//         {/* Soft accent light */}
//         <pointLight position={[2, 1, 3]} intensity={0.5} color="#3DC6E7" />

//         <Suspense fallback={<Loader />}>
//           <Float speed={0.8} rotationIntensity={0} floatIntensity={0.25}>
//             <StudentModel onClick={onModelClick} />
//           </Float>
//         </Suspense>

//         {/* Ground shadow */}
//         <ContactShadows
//           position={[1.4, -2.65, 0]}
//           opacity={0.3}
//           scale={9}
//           blur={2.8}
//           far={4}
//           color="#3DC6E7"
//         />
//       </Canvas>
//     </div>
//   );
// };


// import { useRef, Suspense } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF, Float, ContactShadows, Center } from "@react-three/drei"; // Center इम्पोर्ट किया
// import * as THREE from "three";

// function CombinedStudentModel({ onClick }: { onClick: () => void }) {
//   const modelRef = useRef<THREE.Group>(null);
  
//   const booksGltf = useGLTF("/books.glb");
//   const capGltf = useGLTF("/graduation_cap.glb");

//   useFrame((state) => {
//     if (!modelRef.current) return;
//     const time = state.clock.elapsedTime;
    
//     modelRef.current.position.y = -0.3 + Math.sin(time * 0.7) * 0.035;
    
//     modelRef.current.rotation.y += (0 - modelRef.current.rotation.y) * 0.05;
//     modelRef.current.rotation.x += (0 - modelRef.current.rotation.x) * 0.05;

//     const targetScale = 1.2; 
//     const currentScale = modelRef.current.scale.x;
//     const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
//     modelRef.current.scale.set(newScale, newScale, newScale);
//   });

//   return (
//     <group 
//       ref={modelRef} 
//       onClick={onClick} 
//       scale={1.0} 
//       // राइट साइड की खाली जगह में सेंटर करने के लिए परफेक्ट पोजीशन
//       position={[2.2, -0.3, 0]} 
//       rotation={[0.1, -0.4, 0]} 
//     >
//       {/* <Center> दोनों मॉडल्स के ओरिजिनल अजीब पाइवट पॉइंट को ऑटोमैटिकली ठीक कर देगा */}
//       <Center>
//         {/* 1. नीचे किताबों का मॉडल */}
//         <primitive object={booksGltf.scene} position={[0, 0, 0]} />

//         {/* 2. किताबों के ठीक ऊपर ग्रेजुएशन कैप (गैप के हिसाब से Y को एडजस्ट करें) */}
//         <primitive object={capGltf.scene} position={[0, 0.5, 0]} />
//       </Center>
//     </group>
//   );
// }

// function Loader() {
//   return (
//     <mesh>
//       <sphereGeometry args={[0.2, 32, 32]} />
//       <meshStandardMaterial color="#3DC6E7" wireframe />
//     </mesh>
//   );
// }

// export const Student3DModel = ({ onModelClick }: { onModelClick: () => void }) => {
//   return (
//     <div className="w-full h-full relative mt-14">
//       <Canvas
//         camera={{
//           position:[0, 0.75, 0], // कैमरे को बिल्कुल सामने और पास सेट किया ताकि मॉडल सही दिखे
//           fov: 45,
//           near: 0.1,
//           far: 1000,
//         }}
//         style={{ background: "transparent" }}
//         dpr={[1, 2]}
//         gl={{ antialias: true, alpha: true }}
//       >
//         <ambientLight intensity={1.5} />
//         <directionalLight position={[5, 5, 5]} intensity={2.0} castShadow />
//         <directionalLight position={[-5, 3, 3]} intensity={1.0} color="#68DCD2" />
//         <pointLight position={[0, 2, 4]} intensity={1.0} color="#ffffff" />

//         <Suspense fallback={<Loader />}>
//           <Float speed={0.8} rotationIntensity={0} floatIntensity={0.25}>
//             <CombinedStudentModel onClick={onModelClick} />
//           </Float>
//         </Suspense>

//         {/* शैडो को मॉडल के नए पोजीशन के नीचे सिंक किया */}
//         <ContactShadows 
//           position={[2.2, -1.8, 0]} 
//           opacity={0.35} 
//           scale={7} 
//           blur={2.5} 
//           far={4} 
//           color="#3DC6E7" 
//         />
//       </Canvas>
//     </div>
//   );
// };
