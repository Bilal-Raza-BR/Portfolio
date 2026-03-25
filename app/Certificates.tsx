'use client';
import { motion } from 'framer-motion';

const certificates = [
  {
    name: "HTML Essentials",
    authority: "Cisco Networking Academy",
    image: "/certificate/html.jpeg"
  },
  {
    name: "CSS Essentials",
    authority: "Cisco Networking Academy",
    image: "/certificate/css.jpeg"
  },
  {
    name: "JavaScript Essentials 1",
    authority: "Cisco Networking Academy",
    image: "/certificate/js-1.jpeg"
  },
  {
    name: "JavaScript Essentials 2",
    authority: "Cisco Networking Academy",
    image: "/certificate/js-2.jpeg"
  },
  {
    name: "12-Hour Hackathon",
    authority: "Saylani Mass IT Training",
    image: "/certificate/hackathon.jpeg"
  },
  {
    name: "Internship",
    authority: "Code Alpha",
    image: "/certificate/code-alpha.jpeg"
  },
];

const Certificates = () => {
  return (
    <section id="certificates" className="w-full bg-black py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-16 text-center"
        >
          Certifications
        </motion.h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
        <div className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] justify-center">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0f2a44]/30 border border-[#0ea5e9]/20 rounded-2xl backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_rgba(14,165,233,0.2)] hover:bg-[#0f2a44]/50 hover:border-[#0ea5e9]/50 transition-all duration-300 overflow-hidden group"
            >
              <div className="h-78 overflow-hidden relative bg-[#0b1320]">
                <img 
                  src={cert.image} 
                  alt={cert.name} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                <p className="text-gray-400">{cert.authority}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;