

import { useFrame } from '@react-three/fiber'
import { useSpring } from '@react-spring/three'
import { useSpringRef, a } from '@react-spring/three'


import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Clock } from 'three'

const Xbox = (props) => {
  const ref = useRef()
  const cursor = {
    x: 0,
    y: 0
  }

  window.addEventListener('mousemove', (event) => {
    cursor.x = (event.clientX - window.innerWidth / 2) / 5000
    cursor.y = (event.clientY - window.innerHeight / 2) / 5000

  })

  const clock = new Clock()
  // console.log(clock.startTime)
  useFrame((state, delta) => {
    if (clock.getElapsedTime() > 1.6)
      ref.current.lookAt(cursor.x, -cursor.y, 1)
  })


  const springRef = useSpringRef()

  const spring = useSpring({
    ref: springRef,
    from: { x: -2, opacity: 0 }
  })

  setTimeout(() => {

    springRef.start({
      to: { x: 0, opacity: 1 },
      config: { duration: 600 },
      delay: 1000
    })
  }, 0)
  console.log(spring.x)
  const { nodes, materials } = useGLTF('source/xbox controller.glb')
  return (
    <a.group ref={ref} {...props} dispose={null} position-x={spring.x}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.node_id62.geometry}
        material={materials['89']}
        // material= {new MeshNormalMaterial()}
        position={[0.025, -0.104, 0.214]}
        rotation={[0.598, -Math.PI / 2, 0]}
        scale={0.048}
      />
    </a.group>
  )
}

useGLTF.preload('source/xbox controller.glb')


export default Xbox