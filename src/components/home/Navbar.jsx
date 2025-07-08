import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

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

  // 🔒 Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed z-50 top-0 py-3 w-full">
      <div className="navbar flex flex-col md:flex-row md:justify-between items-center gap-2 px-10">
        <button
          className="font-cinzel text-3xl hover:cursor-pointer hover:scale-101"
          onClick={() => navigate('/', { replace: true })}
        >
          🪷SANGRAH
        </button>

        <ul className="flex gap-5 text-lg items-center">
          <li className="hover:text-[#FF7601] hover:scale-102">
            <Link to="/lists">Lists</Link>
          </li>
          <li className="hover:text-[#FF7601] hover:scale-102">
            <Link to="/groups">Groups</Link>
          </li>

          {/* More Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              className="text-lg hover:text-[#FF7601] transition-all hover:cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              More
            </button>

            {isDropdownOpen && (
              <ul className="absolute right-0 top-8 bg-white text-sm shadow-md rounded-lg w-44 p-2 space-y-1 z-50">
                <li className="px-3 py-1 hover:bg-gray-100 rounded cursor-pointer">
                  Account
                </li>
                <li className="px-3 py-1 text-red-600 hover:bg-red-100 rounded cursor-pointer">
                  Logout
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
