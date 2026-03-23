'use client';
import { motion } from 'framer-motion';

// const skills = [
//   { name: "HTML5", level: "98%" },
//   { name: "CSS3", level: "95%" },
//   { name: "JavaScript/ES6", level: "90%" },
//   { name: "React/Next", level: "90%" },
//   { name: "Node/Express", level: "85%" },
//   { name: "Firebase", level: "80%" },
//   { name: "MongoDB", level: "85%" },
  
//   { name: "Tailwind CSS", level: "95%" },
//   { name: "Bootstrap", level: "90%" },
//   { name: "TypeScript", level: "85%" },
//   { name: "Vercel", level: "85%" },
//   { name: "Netlify", level: "85%" },
//   { name: "Render", level: "80%" },
//   { name: "Railway", level: "80%" },
//   { name: "Postman", level: "90%" },
//   { name: "Git/GitHub", level: "90%" },
// ];
const skills = [
  { name: "Next.js", level: "70%" },
  { name: "Tailwind CSS", level: "95%" },
  { name: "Git", level: "65%" },
  { name: "GitHub", level: "70%" },
  { name: "VS Code", level: "90%" },
  // { name: "Linux (Ubuntu)", level: "50%" },
  // { name: "C++", level: "40%" },

  { name: "HTML5", level: "80%" },
  { name: "CSS3", level: "90%" },
  { name: "JavaScript (ES6+)", level: "95%" },
  { name: "TypeScript", level: "65%" },

  { name: "Material UI", level: "60%" },
  { name: "Firebase", level: "90%" },

  { name: "MongoDB", level: "60%" },
  { name: "Express.js", level: "60%" },
  { name: "React.js", level: "80%" },
  { name: "Node.js", level: "60%" },

  // { name: "Redux Toolkit", level: "40%" },
  { name: "Postman", level: "35%" },

  { name: "Vercel", level: "70%" },
  // { name: "Neon (PostgreSQL)", level: "30%" },
  // { name: "Prisma", level: "30%" },
  // { name: "AWS", level: "10%" },

  // { name: "Three.js", level: "10%" },
  // { name: "Solidity", level: "10%" },
];
const Skills = () => {
  return (
    <section id="skills" className="w-full bg-black py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-16 text-center"
        >
          Technical Skills
        </motion.h2>
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(255, 106, 0, 0.5)" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-[#0f2a44]/30 border border-[#ff6a00]/20 rounded-2xl backdrop-blur-sm text-center hover:bg-[#0f2a44]/50 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-3">{skill.name}</h3>
              <div className="w-full bg-[#0f2a44] rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-[#ff6a00] to-[#f2a065] h-full rounded-full"
                  style={{ width: '0%' }}
                  whileInView={{ width: skill.level }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div> */}
    <div className="flex flex-wrap justify-center gap-6">
  {skills.map((skill, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}

      className="
     + flex-[1_1_260px] 
       + max-w-[300px]
        p-6 
        bg-[#0f2a44]/30 border border-[#ff6a00]/20 
        rounded-2xl backdrop-blur-sm text-center 
        hover:bg-[#0f2a44]/50 transition-all
      "
    >
      <h3 className="text-lg font-bold text-white mb-3">
        {skill.name}
      </h3>

      <div className="w-full bg-[#0f2a44] rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-[#ff6a00] to-[#f2a065] h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: skill.level }}
          transition={{ duration: 1 }}
        />
      </div>

      <p className="text-sm text-gray-400 mt-2">{skill.level}</p>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
};

export default Skills;