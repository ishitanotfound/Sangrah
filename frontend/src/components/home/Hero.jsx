import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/all';
import { SplitText } from "gsap/all";


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
        
        // title-gradient
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
        
        // button-to-login
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
        
        {/* LEAVES -------------------------------------------------*/}

        <img className='left-leaf absolute w-45 -left-10 top-2 md:top-10 lg:top-0 md:w-80 xl:w-auto' src="left-leaf.png" alt="left-leaf" />
        <img className='right-leaf absolute w-45 -right-10 bottom-65 sm:top-40 lg:top-5 md:w-80 lg:w-auto' src="right-leaf.png" alt="right-leaf" />
        
       {/* SANGRAH TITLE AND LOGIN BUTTON-------------------------- */}

        <div className="absolute top-40 sm:top-25 md:top-40 lg:top-20 left-1/2 -translate-x-1/2 -translate-y-1/2; flex flex-col items-center gap-3 sm:gap-5">   

            {/* SANGRAH-HERO-TITLE          */}
            <h1 className="title font-cinzel text-center w-70 md:w-auto text-5xl md:text-6xl xl:text-8xl font-semibold">SANGRAH</h1>

            {/* SUB-TITLE */}
            <p className="font-cinzel text-2xl text-[#9D0208] text-center opacity-0 animate-[fadeInUp_0.6s_ease-out_2s_forwards]">
            Your space to collect, organize, and share life’s to-dos with those who matter.
            </p>

            {/* LOGIN/SIGNUP BUTTON */}
            <button className="hero-button font-cinzel" onClick={ () => navigate('/login') }>
                LogIn / SignUP
            </button>

        </div>
        
        {/* lotus ----------------------------------------------------*/}

        <img className='lotus z-2 w-380 absolute bottom-20 md:top-90 lg:top-70' src="lotus3.webp" alt="Lotus"/>

    </section>
  )
}
