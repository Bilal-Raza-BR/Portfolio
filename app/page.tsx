import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";
import Projects from "./Projects";
import About from "./About";
import Skills from "./Skills";
import Education from "./Education";
import Certificates from "./Certificates";
// import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Scene from "./Scene";
import Navbar from "./Navbar";

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
