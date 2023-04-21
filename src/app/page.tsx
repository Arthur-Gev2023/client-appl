/* eslint-disable react/no-unescaped-entities */
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import GetAllProject from './composant/methodeProject'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div>
      <Head>
        <title>Page d'accueil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GetAllProject/>
        <h1>Bienvenue sur ma page d'accueil !</h1>
        <p>Ceci est un exemple de page d'accueil avec Next.js.</p>
      </main>
    </div>

    <div>
       <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/pages/arthur">Arthur</Link>
      </li>
      <li>
        <Link href="/pages/jhon">Jhon</Link>
      </li>
    </ul>
    </div>
    </>
  )
}