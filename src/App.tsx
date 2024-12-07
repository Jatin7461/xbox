import React, { Ref, RefObject, useEffect, useRef } from 'react';
import './App.css';
import Scene from './components/Scene';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import Description from './components/Description';
import { Canvas } from '@react-three/fiber';

function App() {
  // const sphere1: RefObject<any> = React.createRef()
  // const sphere1 = useRef<RefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>>(null)
  const sphere1 = useRef<any>(null)
  const sphere2 = useRef<any>(null)
  const lightRef = useRef<any>(null)
  const dummyLightRef = useRef<any>(null)
  const refs: any = {
    sphere1, lightRef, sphere2, dummyLightRef
  }

  const ref: RefObject<HTMLDivElement> = React.createRef()
  let xboxDimensions: any = {}
  let containerDimensions: any = {}
  const xbox = document.querySelector('.xbox')
  xboxDimensions = {
    x: xbox?.clientWidth, y: xbox?.clientHeight
  }
  useEffect(() => {



    // console.log(sphere1.current,'asdjflasdjkf')
  }, [])

  useGSAP(() => {

    console.log(xboxDimensions.x, 'asdhfkasjdf')
    gsap.to('.bg-color', {
      width: window.innerWidth / 2,
      height: window.innerHeight,
      duration: 1,
      delay: 0.4
    })

    gsap.to('.container-bg', {
      width: window.innerWidth * 1.5,
      height: window.innerHeight * 1.5,
      duration: 1.5,
      delay: 0.3
    })

    gsap.from('.description-container', {
      opacity: 0,
      xPercent: 50,
      duration: .5,
      delay: 1.3
    })

    setTimeout(() => {

      gsap.to(sphere1.current.material, {
        opacity: 1,
        delay: 1.2
      })
      gsap.to(sphere2.current.material, {
        opacity: 1,
        delay: 1.2
      })

      gsap.from(lightRef.current, {
        opacity: 200
      })
    }, 100)

  }, { scope: ref })

  return (
    <>
      <div ref={ref} className='container'>
        <div className='container-bg'></div>
        <div className='xbox'>
          {/* <LeftBackground /> */}
          <div className='bg-color'></div>
          <Canvas
            // ref={ref}
            camera={{
              fov: 18,
              position: [0, 0, 5]
            }}

          >

            <Scene ref={refs} />
          </Canvas>
        </div>

        <div className='description'>
          <Description />
        </div>
      </div>
    </>
  );
}

export default App;
