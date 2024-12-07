import { Sparkles } from '@react-three/drei'
import { forwardRef, Ref, RefObject, Suspense, useEffect, useState, } from 'react';
import React from 'react';
import Xbox from './Xbox';
import { a, useSpring, useSpringRef } from '@react-spring/three';
import { Controller, useTransition } from '@react-spring/web';
import { useFrame } from '@react-three/fiber'
import { BufferGeometry, Color, DirectionalLight, Material, Mesh, NormalBufferAttributes, Object3DEventMap, Vector3, } from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
interface Prop {
    name: string
}

const Scene = forwardRef<any, {}>(({ }, ref: any) => {

    const colors = [
        { bg: "#d700e3", light: "purple" },
        { bg: "#418dff", light: "#0d009e" },
        { bg: "#00c431", light: "#116f00" },
    ]

    let colorIndex = 1

    const lightRef: Ref<any> = React.createRef()
    const [toggleLight, setLight] = useState(true)
    const { sphere1, sphere2, dummyLightRef } = ref
    const springRef = useSpringRef()
    const spring = useSpring({
        from: { y1: -0.5, y2: 0.5, opacity: 0 },
        ref: springRef
    })


    const springRef2 = useSpringRef()
    const spring2 = useSpring({
        from: { color: colors[0].light },
        ref: springRef2
    })


    setTimeout(() => {

        springRef.start({
            to: [
                { y1: 0.5, y2: -0.250 },
                { y1: -0.5, y2: 0.25 }
            ],
            config: {
                duration: 40000,
            },
            loop: true
        })

    }, 500)



    const toggle = () => {
        // setLight(!toggleLight)

        springRef2.start({
            to: [
                { color: colors[colorIndex].light }
            ],
            config: { duration: 1000 }
        })
        gsap.to('.bg-color', {
            backgroundColor: colors[colorIndex].bg,
            duration: 1
        })
        colorIndex = (colorIndex + 1) % 3
    }


    setInterval(() => {
        toggle()
    }, 5000)


    useFrame(() => {
        // console.log(lightRef.current.color)
        console.log(spring2.color)
    })

    const sparkles = useSpring({
        from: { color: "purple" },
        to: { color: "green" }
    })

    return <>
        <a.directionalLight color={spring2.color} position={[0, -1, 1]} intensity={10} />
        <a.directionalLight

            ref={lightRef}
            position={[0, 1, 1]}
            color={spring2.color} intensity={100} />
        <Suspense>
            <Xbox />
        </Suspense>
        <a.mesh ref={sphere1} position-x={0.6} position-y={spring.y1}>
            <sphereGeometry args={[0.1]} />
            <a.meshStandardMaterial
                opacity={0}
                transparent
                color={spring2.color}
            />

        </a.mesh>
        <a.mesh ref={sphere2} position-x={-0.8} position-y={spring.y2}>
            <sphereGeometry args={[0.2]} />
            <a.meshStandardMaterial opacity={0} transparent color={spring2.color} />
        </a.mesh>

    </>
})

export default Scene