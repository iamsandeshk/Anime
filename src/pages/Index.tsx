
import React from "react";
import Layout from "@/components/Layout";
import VideoFeature from "@/components/VideoFeature";
import EmbeddedVideo from "@/components/EmbeddedVideo";
import CountdownTimer from "@/components/CountdownTimer";
import Poll from "@/components/Poll";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const Index = () => {
  useScrollAnimations();

  return (
    <Layout>
      <section id="hero" className="min-h-screen">
        <VideoFeature 
          title="Solo Leveling" 
          subtitle="Arise from the Shadow" 
        />
      </section>
      
      <section id="embedded-video" className="min-h-screen">
        <EmbeddedVideo 
          title="Latest Episode Preview" 
          videoId="d9MyW72ELq0"
        />
      </section>
      
      <section id="countdown" className="min-h-screen">
        <CountdownTimer 
          title="Next Episode Premieres In" 
        />
      </section>
      
      <section id="poll" className="min-h-screen mb-16">
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
