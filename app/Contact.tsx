'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { Toaster, toast } from 'react-hot-toast';

const SocialIcon = ({ children, href }: { children: React.ReactNode, href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <motion.div 
      whileHover={{ y: -4, scale: 1.1 }}
      className="w-12 h-12 bg-[#0f2a44]/50 border border-[#0ea5e9]/20 rounded-full flex items-center justify-center text-white hover:bg-[#0ea5e9] hover:border-[#0ea5e9] transition-all duration-300 shadow-lg"
    >
      {children}
    </motion.div>
  </a>
);

const FormInput = ({ name, type = 'text', placeholder, isTextArea = false }: { name: string, type?: string, placeholder: string, isTextArea?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.5 }}
    className="relative"
  >
    {isTextArea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        rows={5}
        className="w-full bg-[#0b1320] border border-[#1e293b] rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all duration-300 resize-none"
      ></textarea>
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full bg-[#0b1320] border border-[#1e293b] rounded-xl py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-all duration-300"
      />
    )}
  </motion.div>
);

const ContactItem = ({ icon, title, value, href }: { icon: React.ReactNode, title: string, value: string, href?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false, amount: 0.2 }}
    transition={{ duration: 0.5 }}
    className="flex items-start gap-5"
  >
    <div className="w-12 h-12 shrink-0 bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 rounded-xl flex items-center justify-center text-[#0ea5e9]">
      {icon}
    </div>
    <div>
      <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">{title}</h4>
      {href ? (
        <a href={href} className="text-lg md:text-xl font-bold text-white hover:text-[#0ea5e9] transition-colors">
          {value}
        </a>
      ) : (
        <p className="text-lg md:text-xl font-bold text-white">{value}</p>
      )}
    </div>
  </motion.div>
);

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    
        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ;
    
    // Check if env variables are loaded
    if (!serviceID || !templateID || !publicKey) {
      toast.error('Configuration Error: Env variables missing');
      console.error('EmailJS Keys are undefined. Check .env.local file and restart server.');
      return;
    }

    emailjs.sendForm(
      serviceID,
      templateID,
      formRef.current,
      publicKey
    ).then(
      (result) => {
        console.log('Message sent:', result.text);
        toast.success('Message sent successfully!');
        formRef.current?.reset(); // Clear form after send
      },
      (error) => {
        console.error('Email send error:', error.text);
        toast.error('Failed to send message. Try again!');
      }
    );
  };

  return (
    <section id="contact" className="relative w-full bg-black py-24 md:py-32 px-6 md:px-12 z-20 overflow-hidden">
      <Toaster position="bottom-center" reverseOrder={false} />
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#0ea5e9]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#ff6a00]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-sm font-bold tracking-widest text-[#0ea5e9] uppercase mb-3">Contact</h2>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Work Together</h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </motion.div>

            <div className="space-y-10 mb-12">
              <ContactItem
                icon={<PhoneIcon />}
                title="Phone"
                value="0316-2039099"
                href="tel:03162039099"
              />
              <ContactItem
                icon={<EmailIcon />}
                title="Email"
                value="bilalraza2646@gmail.com"
                href="mailto:bilalraza2646@gmail.com"
              />
              <ContactItem
                icon={<LocationIcon />}
                title="Address"
                value="Karachi, Pakistan"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-4"
            >
              <SocialIcon href="https://github.com/Bilal-Raza-BR"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C7.1625 19.6125 6.5625 18.0375 6.5625 18.0375C6.1125 16.9 5.5 16.6 5.5 16.6C4.6 16.0125 5.575 16.025 5.575 16.025C6.55 16.1 7.0625 17.025 7.0625 17.025C7.925 18.55 9.3375 18.1125 9.9125 17.8625C9.9875 17.25 10.2375 16.825 10.5125 16.5875C8.3875 16.35 6.1625 15.55 6.1625 12.0125C6.1625 10.8625 6.5625 9.925 7.2125 9.1875C7.1125 8.95 6.7625 7.9 7.3125 6.5125C7.3125 6.5125 8.125 6.25 9.525 7.2C10.2875 7 11.15 6.8875 12 6.8875C12.85 6.8875 13.7125 7 14.475 7.2C15.875 6.25 16.6875 6.5125 16.6875 6.5125C17.2375 7.9 16.8875 8.95 16.7875 9.1875C17.4375 9.925 17.8375 10.8625 17.8375 12.0125C17.8375 15.5625 15.6125 16.35 13.475 16.5875C13.825 16.8875 14.1125 17.4625 14.1125 18.325C14.1125 19.5875 14.1 20.575 14.1 20.8125C14.1 21.075 14.2875 21.3875 14.7875 21.2875C19.1375 20.1625 22 16.425 22 12C22 6.475 17.525 2 12 2Z" fill="currentColor"/></svg></SocialIcon> 
              <SocialIcon href="https://www.linkedin.com/in/bilal-raza-3ba111322"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM8.5 18H5.5V9H8.5V18ZM7 7.5C6.17157 7.5 5.5 6.82843 5.5 6C5.5 5.17157 6.17157 4.5 7 4.5C7.82843 4.5 8.5 5.17157 8.5 6C8.5 6.82843 7.82843 7.5 7 7.5ZM18 18H15V13.75C15 12.5625 14.5 11.75 13.5 11.75C12.5 11.75 12 12.5625 12 13.75V18H9V9H12V10.5C12.5 9.5 13.5 9 14.5 9C16.5 9 18 10.5 18 13.25V18Z" fill="currentColor"/></svg></SocialIcon>
              <SocialIcon href="https://wa.me/923162039099">
  {/* WhatsApp Icon */}
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.52 3.48A11.8 11.8 0 0012.04 0C5.44 0 .08 5.36.08 11.96c0 2.11.55 4.17 1.6 6L0 24l6.2-1.63a11.93 11.93 0 005.84 1.49h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.21-3.49-8.42zM12.05 21.8c-1.8 0-3.57-.48-5.12-1.38l-.37-.22-3.68.97.98-3.58-.24-.37a9.77 9.77 0 01-1.5-5.26c0-5.4 4.4-9.8 9.8-9.8 2.62 0 5.09 1.02 6.94 2.88a9.75 9.75 0 012.87 6.93c0 5.4-4.4 9.83-9.78 9.83zm5.39-7.33c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.16 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
  </svg>
</SocialIcon>

              <SocialIcon href="https://mail.google.com/mail/?view=cm&fs=1&to=bilalraza2646@gmail.com" >
  {/* Gmail Icon */}
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 4h20v16H2V4zm10 7L2 6v12h20V6l-10 5z"/>
  </svg>
</SocialIcon>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="bg-[#0f2a44]/20 border border-[#0ea5e9]/20 p-8 md:p-10 rounded-3xl backdrop-blur-md shadow-2xl relative"
          >
            <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput name="name" placeholder="Name" />
                <FormInput name="email" type="email" placeholder="Email" />
              </div>
              <FormInput name="subject" placeholder="Subject" />
              <FormInput name="message" placeholder="Message" isTextArea={true} />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#ff6a00] to-[#ff8c32] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-[#ff6a00]/25 transition-all duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
        
      </div>
     
    </section>
  );
};

export default Contact;

// Optional: You can define your icons separately to clean up JSX
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);