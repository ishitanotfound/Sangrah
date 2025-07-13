import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navigate = useNavigate();

  // NAVBAR TRANSFORMATIONS
  useGSAP(() => {
    const timeline = gsap.timeline({
      ScrollTrigger: {
        trigger: 'nav',
        start: 'bottom top',
      },
    });
    timeline.fromTo(
      'nav',
      {
        backgroundColor: 'transparent',
      },
      {
        backgroundColor: '#eeddca66',
        backdropFilter: 'blur(0.5px)',
        duration: 1,
        ease: 'power1.inOut',
      }
    );
  });

  return (
    <nav className="fixed z-50 top-0 py-3 w-full">
      <div className="navbar flex flex-col md:flex-row md:justify-between items-center gap-2 px-10">
        
        {/* SANGRAH LOGO BUTTON */}
        <button
          className="font-cinzel text-3xl hover:cursor-pointer hover:scale-101"
          onClick={() => navigate('/', { replace: true })}
        >
          🪷SANGRAH
        </button>

        {/* NAVBAR ITEMS' LIST */}
        <ul className="flex gap-5 text-lg items-center">
          <li className="hover:text-[#FF7601] hover:scale-102">
            <Link to="/lists">Lists</Link>
          </li>
          <li className="hover:text-[#FF7601] hover:scale-102">
            <Link to="/groups">Groups</Link>
          </li>
          <li className="hover:text-[#FF7601] hover:scale-102">
            <Link to="/account">Account</Link>
          </li>
        </ul>
        
      </div>
    </nav>
  );
}
