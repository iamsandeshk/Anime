
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    // Pin the hero section while scrolling
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true
    });

    // Animate hero content with a subtle fade in
    gsap.from('#hero .hero-content', {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top center',
        end: 'center center',
        scrub: 1
      },
      y: 30,
      opacity: 0,
      duration: 1
    });

    // Embedded video section slow scroll and fade in
    gsap.from('#embedded-video .section-content', {
      scrollTrigger: {
        trigger: '#embedded-video',
        start: 'top bottom',
        end: 'center center',
        scrub: 1.5
      },
      y: 100,
      opacity: 0
    });

    // Countdown section animation with a slow reveal
    gsap.from('#countdown .section-content', {
      scrollTrigger: {
        trigger: '#countdown',
        start: 'top bottom',
        end: 'center center',
        scrub: 1.5
      },
      y: 70,
      opacity: 0
    });

    // Poll section animation with staggered entrance
    gsap.from('#poll .section-content', {
      scrollTrigger: {
        trigger: '#poll',
        start: 'top bottom',
        end: 'center center',
        scrub: 1.5
      },
      y: 70,
      opacity: 0
    });

    return () => {
      // Clean up all ScrollTrigger instances when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
