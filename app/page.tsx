import dynamic from "next/dynamic";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";
// import Testimonials from "./Testimonials";
import Scene from "./Scene";
import Navbar from "./Navbar";

const About = dynamic(() => import("./About"));
const Projects = dynamic(() => import("./Projects"));
const Skills = dynamic(() => import("./Skills"));
const Education = dynamic(() => import("./Education"));
const Certificates = dynamic(() => import("./Certificates"));
const Contact = dynamic(() => import("./Contact"));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Scene />
      <div className="relative">
        {/* Canvas aur Overlay ek hi container mein rahenge */}
        <ScrollyCanvas />
        <Overlay />
      </div>
      <div className="relative overflow-x-hidden">
        <About />
        <Projects />
        <Skills />
        <Education />
        <Certificates />
        {/* <Testimonials /> */}
        <Contact />
      </div>
    </main>
  );
}
