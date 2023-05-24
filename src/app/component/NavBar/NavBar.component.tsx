"use client"; // this is a client component 👈🏽
import Link from 'next/link';
import './NavBar.css';


function NavBar() {

  return (
    <>
      <div className="navbar">
        <Link href="/pages/dashboard">Accueil</Link>
        <Link href="/pages/EditPage">Edit</Link>
      </div>
    </>
  )

}

export default NavBar;