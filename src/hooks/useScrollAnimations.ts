
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    // Video section animations
    const videoTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1
      }
    });

    // Ensure video plays automatically
    const videoElement = document.querySelector('#hero video');
    if (videoElement instanceof HTMLVideoElement) {
      videoElement.play().catch(err => console.error("Video play error:", err));
    }

    // Title animation - starts hidden, fades in while scrolling
    videoTl.fromTo('#hero .hero-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    
    videoTl.fromTo('#hero .hero-subtitle', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );

    // Embedded video section slow scroll and fade in
    gsap.timeline({
      scrollTrigger: {
        trigger: '#embedded-video',
        start: 'top bottom',
        end: 'top center',
        scrub: 1.5,
        pin: true,
        pinSpacing: true
      }
    }).fromTo('#embedded-video .section-content', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    // Countdown section animation with a slow reveal and pin
    gsap.timeline({
      scrollTrigger: {
        trigger: '#countdown',
        start: 'top bottom',
        end: 'top center',
        scrub: 1.5,
        pin: true,
        pinSpacing: true
      }
    }).fromTo('#countdown .section-content', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    // Poll section animation with staggered entrance and pin
    gsap.timeline({
      scrollTrigger: {
        trigger: '#poll',
        start: 'top bottom',
        end: 'top center',
        scrub: 1.5,
        pin: true,
        pinSpacing: true
      }
    }).fromTo('#poll .section-content', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    return () => {
      // Clean up all ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
