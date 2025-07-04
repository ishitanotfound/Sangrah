import { navlinks } from '../../Backend/index';
import { useGSAP } from '@gsap/react' ;
import { ScrollTrigger } from 'gsap/all';
import gsap from "gsap";

gsap.registerPlugin( ScrollTrigger );

export default function Navbar() {
    useGSAP(() => {
        const timeline = gsap.timeline({
            ScrollTrigger: {
                trigger: 'nav', // tag ka naam h
                start: 'bottom top',
            }
        })
        timeline.fromTo('nav', {
            backgroundColor: 'transparent'
        }, {
            backgroundColor: '#eeddca66', // custom fade
            backgoundFilter: 'blur(10px)',
            duration: 1,
            ease:'power1.inOut'
        })
    });

  return (
    <nav className='fixed z-5 top-0 py-3 w-full'>
        <div className="navbar flex flex-col md:flex-row md:justify-between items-center gap-2 px-10">
            <button className="font-cinzel text-3xl hover:cursor-pointer hover:scale-101">🪷SANGRAH</button>
            <ul className='flex-center gap-5 text-lg'>
                {navlinks.map((item) => (
                    <li key={item.id} className='hover:text-[#FF7601] hover:scale-102'>
                        <a href={`${item.id}`}>
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
  )
}
