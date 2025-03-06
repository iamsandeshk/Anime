
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import Logo from "@/components/Logo";
import VideoFeature from "@/components/VideoFeature";
import EmbeddedVideo from "@/components/EmbeddedVideo";
import CountdownTimer from "@/components/CountdownTimer";
import Poll from "@/components/Poll";

const Index = () => {
  // Add fade-in-view class to elements that should animate on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".fade-in-view").forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <Logo />
      
      <section id="hero">
        <VideoFeature 
          title="Solo Leveling" 
          subtitle="Arise from the Shadow" 
        />
      </section>
      
      <section id="embedded-video">
        <EmbeddedVideo 
          title="Latest Episode Preview" 
          videoId="d9MyW72ELq0"
        />
      </section>
      
      <section id="countdown">
        <CountdownTimer 
          title="Next Episode Premieres In" 
        />
      </section>
      
      <section id="poll">
        <Poll 
          question="Will this episode break the internet again?" 
          options={[
            { id: "yes", text: "Yes, absolutely!" },
            { id: "no", text: "No, I don't think so" }
          ]}
        />
      </section>
      
      <footer className="py-8 text-center text-gray-400 text-sm">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Solo Leveling Experience</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
