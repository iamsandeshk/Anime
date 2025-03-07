
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    // Hero section animations
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=100%', // Reduced from 150% to 100% to decrease spacing
        pin: true,
        scrub: 1
      }
    });

    // Ensure video plays automatically
    const videoElement = document.querySelector('#hero video');
    if (videoElement instanceof HTMLVideoElement) {
      videoElement.play().catch(err => console.error("Video play error:", err));
    }

    // Title animation - starts at bottom, moves to middle while scrolling
    heroTl.fromTo('#hero .hero-title', 
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    
    heroTl.fromTo('#hero .hero-subtitle', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );

    // Embedded video section - pin and slow scroll effect with reduced space
    gsap.timeline({
      scrollTrigger: {
        trigger: '#embedded-video',
        start: 'top bottom-=100', // Start animation earlier
        end: 'center center', // End when center reaches center
        scrub: 1.5,
        pin: true,
        pinSpacing: true
      }
    }).fromTo('#embedded-video .section-content', 
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    // Countdown section - pin and slow scroll effect with reduced space
    gsap.timeline({
      scrollTrigger: {
        trigger: '#countdown',
        start: 'top bottom-=100', // Start animation earlier
        end: 'center center', // End when center reaches center
        scrub: 1.5,
        pin: true,
        pinSpacing: true
      }
    }).fromTo('#countdown .section-content', 
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    // Poll section - pin and slow scroll effect with reduced space
    gsap.timeline({
      scrollTrigger: {
        trigger: '#poll',
        start: 'top bottom-=100', // Start animation earlier
        end: 'center center', // End when center reaches center
        scrub: 1.5,
        pin: true,
        pinSpacing: true
      }
    }).fromTo('#poll .section-content', 
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    return () => {
      // Clean up all ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
