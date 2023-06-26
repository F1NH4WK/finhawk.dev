import { Inter } from 'next/font/google'
import Head from 'next/head'
import Particles, { IParticlesProps } from 'react-particles'
import { loadFull } from "tsparticles";
import { useCallback } from 'react';
import particles from '@/assets/particles.json';
import { Engine } from 'tsparticles-engine';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const particlesInit = useCallback(async (engine: Engine) => {
      await loadFull(engine);
  }, []);

  return (
    <>
    <Head>
      <meta charSet='utf-8'/>
      <title>Finhawk</title>
    </Head>

    <main className = "w-full h-screen flex items-center justify-center text-center p-[1em]">
      <h1 className = "text-[2rem]">This website is still being developed :)</h1>
      <Particles
        id='tsparticles'
        className='particles-bg'
        init={particlesInit}
        options={particles as IParticlesProps['options']}
      /> 
    </main>
     
    </>
  )
}
