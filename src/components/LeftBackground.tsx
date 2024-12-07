import { Canvas } from "@react-three/fiber"

const LeftBackground = () => {
    return <>
        <Canvas>
            <ambientLight />
            <mesh>
                {/* <planeGeometry args={[10, 10]} /> */}
                <sphereGeometry />
                <meshStandardMaterial color={"yellow"} />
            </mesh>
        </Canvas>
    </>
}


export default LeftBackground

