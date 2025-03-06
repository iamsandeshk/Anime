
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  useEffect(() => {
    // Logo animation
    gsap.from('.logo-container', {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=100%',
        scrub: 1.5
      },
      opacity: 0,
      y: -50,
      duration: 1
    });

    // Video section pin and parallax
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: '+=100%',
      pin: true,
      pinSpacing: true
    });

    // Embedded video section slow scroll
    gsap.from('#embedded-video', {
      scrollTrigger: {
        trigger: '#embedded-video',
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      y: 100,
      opacity: 0
    });

    // Countdown section animation
    gsap.from('#countdown', {
      scrollTrigger: {
        trigger: '#countdown',
        start: 'top center',
        end: 'center center',
        scrub: 1.5
      },
      y: 50,
      opacity: 0
    });

    // Poll section animation
    gsap.from('#poll', {
      scrollTrigger: {
        trigger: '#poll',
        start: 'top center',
        end: 'center center',
        scrub: 1.5
      },
      y: 50,
      opacity: 0
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
};
