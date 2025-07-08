import { navlinks } from '../../../Backend/index';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { useNavigate, Link } from 'react-router-dom'; // 👈 import Link

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navigate = useNavigate();

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
        backgoundFilter: 'blur(10px)',
        duration: 1,
        ease: 'power1.inOut',
      }
    );
  });

  return (
    <nav className="fixed z-5 top-0 py-3 w-full">
      <div className="navbar flex flex-col md:flex-row md:justify-between items-center gap-2 px-10">
        <button
          className="font-cinzel text-3xl hover:cursor-pointer hover:scale-101"
          onClick={() => {
            navigate('/', { replace: true });
          }}
        >
          🪷SANGRAH
        </button>

        <ul className="flex-center gap-5 text-lg">
          <li key='lists' className="hover:text-[#FF7601] hover:scale-102">
            <Link to='/lists'>Lists</Link> 
          </li>
          <li key='groups' className="hover:text-[#FF7601] hover:scale-102">
            <Link to='/groups'>Groups</Link> 
          </li>
          <li key='more' className="hover:text-[#FF7601] hover:scale-102">
            <Link to='/more'>More</Link> 
          </li>
        </ul>
      </div>
    </nav>
  );
}
