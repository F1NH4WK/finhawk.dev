import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Head>
      <meta charSet='utf-8'/>
      <title>Finhawk</title>
    </Head>

    <main className = "w-full h-screen flex items-center justify-center text-center p-[1em]">
      <h1 className = "text-[2rem]">This website is still being developed :)</h1>
    </main>
     
    </>
  )
}
