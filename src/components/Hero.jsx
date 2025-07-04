import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/all';
import { SplitText } from "gsap/all";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin( ScrollTrigger );

export default function Hero() {
    const navigate = useNavigate();
    useGSAP(() => {
        // leaves
        gsap.from(".left-leaf", {
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
        });
        gsap.from(".right-leaf", {
            x: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
        });

    // 🍃 Scroll Trigger for floating effect
    gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    })
      .to(".left-leaf", { y: -50 }, 0)
      .to(".right-leaf", { y: 50 }, 0);    
        
        // title
        const heroSplit = new SplitText(".title", {
            type: "chars, words",
        });
        
        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));	
        gsap.from(heroSplit.chars, {
            delay:1,
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
        });
        
        // lotus
        gsap.timeline({
	        ScrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
	        }})
        .from(".lotus", { 
            ease: "power4.out",  // 💫 slow smooth slide
            duration: 2 , 
            delay:1, 
            y: 350 
        }) 
        
        // button
        gsap.set(".hero-button", { opacity: 0, y: 20 });
        gsap.to(".hero-button", {
            opacity: 1,
            y: 0,
            delay: 2, // adjust based on how long your previous animations take
            duration: 0.3,
            ease: "power2.out"
        });
    })
  return (
    <section id="hero" className="relative top-22 sm:top-15 overflow-hidden min-h-screen">
        
        {/* leaves */}

        <img className='left-leaf absolute w-45 -left-10 top-5 sm:top-0 sm:w-60 lg:w-auto' src="left-leaf.png" alt="left-leaf" />
        <img className='right-leaf absolute w-45 -right-10 bottom-65 sm:top-5 sm:w-60 lg:w-auto' src="right-leaf.png" alt="right-leaf" />
        
       {/* title and button */}

        <div className="absolute top-55 sm:top-20 left-1/2 -translate-x-1/2 -translate-y-1/2; flex flex-col items-center gap-3 sm:gap-13">            
            <h1 className="title font-cinzel text-center w-70 md:w-auto text-5xl md:text-6xl xl:text-8xl font-semibold">SANGRAH</h1>
            <button className="hero-button px-6 py-2 font-cinzel text-lg text-white rounded-full bg-gradient-to-r from-[#f6b36a] via-[#FF7601] to-[#d84b00] hover:from-[#f39553] hover:to-[#c74000] transition-all hover:cursor-pointer duration-300 shadow-md hover:shadow-xl" onClick={ () => navigate('/login') }>
                LogIn / SignUP
            </button>
        </div>
        
        {/* lotus */}

        <img className='lotus z-2 w-380 absolute bottom-20 sm:top-70' src="lotus3.webp" alt="Lotus"/>

    </section>
  )
}
