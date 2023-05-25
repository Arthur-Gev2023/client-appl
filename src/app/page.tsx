/* eslint-disable react/no-unescaped-entities */
"use client"; // this is a client component 👈🏽

import Head from 'next/head'
import './globals.css'
import DashboardPage from './pages/dashboard/page';

export default function Home() {


  return (
    <>
      <div>
        <Head>
          <title>Page d'accueil</title>
        </Head>
        <DashboardPage />
      </div>
    </>
  )
}