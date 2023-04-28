/* eslint-disable react/no-unescaped-entities */
"use client"; // this is a client component 👈🏽

import Head from 'next/head'
import DashboardFilter from './component/dashboard-filter.component/dashboard-filter.component'
import RequestContent from './component/dashboard-request.component/dasboard-request-content.component'
import { useState } from 'react'

import './globals.css'
import DashboardPage from './pages/dashboard/page';

export default function Home() {
  

  return (
    <>
    <div>
      <Head>
        <title>Page d'accueil</title>
      </Head>

      <main>
      <DashboardPage/>
      </main>
    </div>

    
    </>
  )
}