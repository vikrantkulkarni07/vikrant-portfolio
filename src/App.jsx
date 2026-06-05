import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Github, Linkedin, Mail, ExternalLink, Code2, Cpu, Wrench, 
  Terminal, Globe, BookOpen, ChevronRight, Award, Zap,
  MonitorPlay, Briefcase, FileText, ArrowUpRight, Compass,
  Layers, Crosshair
} from 'lucide-react';

// --- DATA ---
const PORTFOLIO_DATA = {
  personal: {
    name: "Vikrant Kulkarni",
    role: "Electronics & Telecommunication Engineering Student",
    email: "vikrantrk2007@gmail.com",
    profileImage: "https://avatars.githubusercontent.com/u/206585692?v=4", 
    taglines: [
      "Building practical engineering solutions",
      "Embedded Systems • IoT • AI/ML",
      "Product Builder & Open Source Contributor",
      "Bridging Hardware and Software"
    ],
    about: "I am an engineering builder focused on bridging the gap between hardware and software. I specialize in embedded systems, IoT ecosystems, and AI integrations, constantly exploring new ways to solve practical problems through technology. I believe in a 'builder mentality'—turning abstract concepts into functional, real-world products.",
    currentlyBuilding: [
      { name: "Sensic-U", desc: "IoT Healthcare Platform" },
      { name: "TarangSetu", desc: "Wireless Communication Kit" }
    ]
  },
  links: {
    github: "https://github.com/vikrantkulkarni07",
    linkedin: "https://www.linkedin.com/in/vikrant-kulkarni-a866b4329",
    leetcode: "https://leetcode.com/u/Vikrant_Kulkarni/",
    hackerrank: "https://www.hackerrank.com/profile/vikrant2007yt",
    medium: "https://medium.com/@VikrantKulkarni",
    blogger: "https://vikrantkulkarni07.blogspot.com",
    portfolio: "https://vikrantkulkarni07.github.io/portfolio/",
    miniProjects: "https://vikranthw.netlify.app"
  },
  skills: {
    "Programming": ["C", "C++", "Java", "Python", "Embedded C"],
    "Engineering": ["Embedded Systems", "IoT", "PCB Designing", "Operating Systems", "Simulation", "MATLAB", "REST APIs"],
    "Platforms": ["Arduino", "ESP32", "Raspberry Pi"],
    "Tools": ["KiCAD", "EasyEDA", "Fusion 360", "AutoCAD", "Git", "GitHub", "VS Code", "Postman"]
  },
  projects: [
    {
      title: "Sensic-U",
      category: "IoT Healthcare Platform",
      description: "An end-to-end IoT healthcare monitoring ecosystem featuring custom hardware integration, real-time dashboards, and seamless patient-doctor interaction capabilities.",
      tags: ["IoT", "Hardware", "Real-time", "Dashboard"],
      link: "#",
      isFlagship: true
    },
    {
      title: "CeleStudy",
      category: "AI / Education",
      description: "An AI-powered personalized study companion designed to adapt to individual learning paces and optimize educational outcomes.",
      tags: ["AI", "Education Tech", "Personalization"],
      link: "https://celestudy.netlify.app",
      isFlagship: true
    },
    {
      title: "TarangSetu",
      category: "Embedded / Wireless Communication",
      description: "A hackathon-winning STEM wireless communication engineering kit designed for educational purposes and practical demonstrations.",
      tags: ["Embedded", "Wireless", "STEM", "Hardware"],
      link: "https://tarangsetu.netlify.app/",
      isFlagship: false
    },
    {
      title: "Krushi Setu",
      category: "AgriTech",
      description: "A smart farming intelligence platform providing predictive insights to prevent agricultural overproduction and optimize yield.",
      tags: ["AgriTech", "Predictive AI", "Platform"],
      link: "https://krushisetuindia.netlify.app/",
      isFlagship: false
    },
    {
      title: "PrintsPass",
      category: "Utility / SaaS",
      description: "A smart photo gridding and printing platform streamlining the process of formatting and preparing images for physical output.",
      tags: ["SaaS", "Image Processing", "Utility"],
      link: "https://printspass.site/",
      isFlagship: false
    },
    {
      title: "Taxfolio",
      category: "FinTech Utility",
      description: "A streamlined invoice generation platform tailored for freelancers and small businesses.",
      tags: ["FinTech", "Web App", "Utility"],
      link: "https://taxfolio.netlify.app/",
      isFlagship: false
    },
    {
      title: "Magic Resistors",
      category: "Engineering Utility Tool",
      description: "A fast, responsive online utility for decoding resistor color bands instantly.",
      tags: ["Engineering Tool", "Utility", "Web"],
      link: "https://magicresistors.online/",
      isFlagship: false
    },
    {
      title: "Automated Certificate Generator",
      category: "Automation Tool",
      description: "A workflow automation solution for bulk generating and distributing personalized certificates.",
      tags: ["Automation", "Scripting", "Workflow"],
      link: "#",
      isFlagship: false
    }
  ],
  achievements: [
    "Hackathon Winner - TarangSetu",
    "GSSoC 2026 Contributor",
    "Cybersecurity Certified"
  ],
  certifications: [
    "Embedded Systems Design - NPTEL",
    "Embedded Systems Design - Maven Silicon",
    "MATLAB Onramp",
    "More to be added soon..."
  ]
};

// --- CUSTOM HOOKS ---
const useCinematicReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const useRotatingText = (words, interval = 3000) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 500);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return { text: words[index], fade };
};

// --- UI COMPONENTS ---
const CinematicReveal = ({ children, delay = 0, className = "", direction = "up" }) => {
  const [ref, isVisible] = useCinematicReveal();
  
  const transforms = {
    up: "translate-y-16",
    down: "-translate-y-16",
    left: "translate-x-16",
    right: "-translate-x-16",
    none: "translate-y-0"
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible 
          ? "opacity-100 translate-y-0 translate-x-0 blur-none scale-100" 
          : `opacity-0 ${transforms[direction]} blur-md scale-95`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotate({ x: rotateX, y: rotateY });
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    if(cardRef.current) {
       cardRef.current.style.setProperty("--mouse-x", `-1000px`);
       cardRef.current.style.setProperty("--mouse-y", `-1000px`);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`tilt-card ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div className="tilt-card-glow" />
      <div className="tilt-card-content">
        {children}
      </div>
    </div>
  );
};

const Button = ({ href, primary, children, icon: Icon, target = "_blank" }) => {
  const baseStyle = "group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold transition-all duration-500 overflow-hidden tracking-wide text-sm";
  const primaryStyle = "bg-transparent text-cyan-400 border border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:bg-cyan-500/10";
  const secondaryStyle = "bg-white/5 backdrop-blur-md text-slate-300 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white";
  const Component = href ? 'a' : 'button';
  
  return (
    <Component 
      href={href} 
      target={href && href !== '#' ? target : undefined}
      rel={href && href !== '#' ? "noopener noreferrer" : undefined}
      className={`${baseStyle} ${primary ? primaryStyle : secondaryStyle}`}
    >
      {primary && <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
      </span>
    </Component>
  );
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-black tracking-tighter text-white flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-900 flex items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            <span className="relative z-10 font-bold">VK</span>
          </div>
          <span className="opacity-80 group-hover:opacity-100 transition-opacity">VIKRANT.</span>
        </a>
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
          <a href="#about" className="hover:text-cyan-400 transition-colors duration-300">About</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors duration-300">Arsenal</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors duration-300">Systems</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors duration-300">Communicate</a>
        </div>
      </div>
    </nav>
  );
};

const InterstellarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 400; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        baseX: canvas.width / 2,
        baseY: canvas.height / 2,
        distance: Math.random() * (canvas.width > canvas.height ? canvas.width : canvas.height),
        angle: Math.random() * Math.PI * 2,
        speed: 0.0005 + Math.random() * 0.001,
        alpha: Math.random(),
        color: Math.random() > 0.8 ? '#06b6d4' : (Math.random() > 0.8 ? '#8b5cf6' : '#ffffff')
      });
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particles.forEach(p => {
        p.angle += p.speed;
        p.x = centerX + Math.cos(p.angle) * p.distance;
        p.y = centerY + Math.sin(p.angle) * p.distance;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.5 + Math.sin(Date.now() * 0.001 + p.angle) * 0.5);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 3);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.05)');
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />;
};

const Hero = () => {
  const { text: rotatingText, fade } = useRotatingText(PORTFOLIO_DATA.personal.taglines);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <InterstellarBackground />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 w-full mt-10">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <CinematicReveal delay={100} direction="right">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
              HI, I'M <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                VIKRANT
              </span>
            </h1>
          </CinematicReveal>

          <CinematicReveal delay={500} direction="right">
            <div className="h-16 flex items-center justify-center md:justify-start mb-10 border-l-2 border-cyan-500/50 pl-4">
              <h2 className={`text-xl md:text-2xl font-light text-slate-400 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                {rotatingText}
              </h2>
            </div>
          </CinematicReveal>

          <CinematicReveal delay={700} direction="up">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button href="#projects" primary icon={ArrowUpRight}>Explore Systems</Button>
              <Button href={PORTFOLIO_DATA.links.miniProjects} icon={Zap}>Engineering Lab</Button>
            </div>
          </CinematicReveal>
        </div>

        <div className="flex-1 flex justify-center md:justify-end w-full max-w-md">
          <CinematicReveal delay={600} direction="left" className="relative group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cyan-500/20 blur-[80px] rounded-full mix-blend-screen group-hover:bg-cyan-400/30 transition-all duration-700"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-indigo-500/20 blur-[60px] rounded-full mix-blend-screen animate-pulse"></div>
            
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full p-2 border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <div className="absolute inset-0 rounded-full border border-cyan-500/30 border-t-cyan-400 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-[-10px] rounded-full border border-dashed border-slate-700 animate-[spin_20s_linear_infinite_reverse]"></div>
              
              <div className="w-full h-full rounded-full overflow-hidden relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                 <img 
                    src={PORTFOLIO_DATA.personal.profileImage} 
                    alt={PORTFOLIO_DATA.personal.name}
                    className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                 />
              </div>
            </div>

            <div className="absolute -right-4 top-10 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl animate-[float_4s_ease-in-out_infinite]">
              <Cpu className="text-cyan-400" size={24} />
            </div>
            <div className="absolute -left-8 bottom-20 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl animate-[float_5s_ease-in-out_infinite_reverse]">
              <MonitorPlay className="text-indigo-400" size={24} />
            </div>
          </CinematicReveal>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] uppercase font-mono tracking-widest text-white">Scroll to Initiate</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};

const About = () => {
  const [showCerts, setShowCerts] = useState(false);

  return (
    <section id="about" className="py-32 relative z-10 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">
        <CinematicReveal>
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">01.</span> CORE IDENTITY
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-900 to-transparent"></div>
          </div>
        </CinematicReveal>

        <div className="grid md:grid-cols-12 gap-12 items-stretch">
          <CinematicReveal delay={200} className="md:col-span-7">
            <TiltCard className="h-full bg-slate-900/40 border border-white/5 backdrop-blur-sm rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-[80px]"></div>
              <Compass className="text-cyan-500/20 absolute -bottom-10 -right-10" size={200} strokeWidth={1} />
              
              <div className="relative z-10 prose prose-invert prose-lg max-w-none">
                <p className="text-slate-300 leading-relaxed text-lg font-light">
                  {PORTFOLIO_DATA.personal.about}
                </p>
                <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <p className="text-slate-400 leading-relaxed text-base">
                  My approach combines rigorous academic engineering principles with a hacker's mentality. I don't just write code; I architect physical and digital systems. From routing traces on a custom PCB to deploying machine learning models on edge devices, I view the entire stack as a single cohesive product.
                </p>
              </div>
            </TiltCard>
          </CinematicReveal>

          <div className="md:col-span-5 flex flex-col gap-8">
            <CinematicReveal delay={400}>
              <TiltCard className="bg-gradient-to-br from-slate-900/80 to-black border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="flex items-center gap-3 text-white font-bold mb-6 tracking-wide text-lg">
                  <Layers className="text-cyan-400" size={24} />
                  CURRENTLY ARCHITECTING
                </h3>
                <ul className="space-y-6 relative z-10">
                  {PORTFOLIO_DATA.personal.currentlyBuilding.map((item, idx) => (
                    <li key={idx} className="flex flex-col group/item cursor-default">
                      <span className="text-white font-medium text-lg group-hover/item:text-cyan-400 transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></span>
                        {item.name}
                      </span>
                      <span className="text-sm text-slate-500 font-mono ml-3.5 mt-1">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </CinematicReveal>
            
            <CinematicReveal delay={600}>
              <TiltCard className="bg-slate-900/40 border border-white/5 rounded-3xl p-8">
                 <h3 className="flex items-center gap-3 text-white font-bold mb-6 tracking-wide text-lg">
                  <Crosshair className="text-indigo-400" size={24} />
                  MILESTONES
                </h3>
                <div className="flex flex-wrap gap-3 relative z-10 mb-8">
                  {PORTFOLIO_DATA.achievements.map((ach, i) => (
                    <span key={i} className="px-4 py-2 rounded-lg bg-black/50 border border-white/5 text-slate-300 text-sm font-mono hover:border-indigo-500/50 transition-colors">
                      {ach}
                    </span>
                  ))}
                </div>

                <div className="relative z-10 border-t border-white/5 pt-6">
                  <button 
                    onClick={() => setShowCerts(!showCerts)}
                    className="flex items-center justify-between w-full p-4 rounded-xl bg-slate-800/50 border border-white/10 hover:border-cyan-500/50 transition-all group"
                  >
                    <span className="flex items-center gap-3 text-white font-medium">
                      <Award className="text-cyan-400" size={20} />
                      Licenses & Certifications
                    </span>
                    <ChevronRight className={`text-slate-400 transition-transform duration-300 ${showCerts ? 'rotate-90' : ''}`} size={20} />
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showCerts ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <ul className="space-y-3 px-2">
                      {PORTFOLIO_DATA.certifications.map((cert, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-1.5 flex-shrink-0"></span>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TiltCard>
            </CinematicReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const categories = Object.keys(PORTFOLIO_DATA.skills);
  const icons = {
    "Programming": Code2,
    "Engineering": Cpu,
    "Platforms": MonitorPlay,
    "Tools": Terminal
  };

  return (
    <section id="skills" className="py-32 relative bg-[#020617] border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-[100%] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <CinematicReveal>
          <div className="flex items-center gap-6 mb-20">
             <div className="h-[1px] flex-1 bg-gradient-to-l from-indigo-900 to-transparent"></div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">02.</span> TECHNICAL SKILLS
            </h2>
          </div>
        </CinematicReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => {
            const Icon = icons[category];
            return (
              <CinematicReveal key={category} delay={idx * 150} direction="up">
                <TiltCard className="h-full p-8 rounded-3xl bg-slate-900/30 border border-white/5 group hover:bg-slate-900/50 transition-colors">
                  <div className="flex flex-col items-start gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-indigo-400 group-hover:scale-110 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-500">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {PORTFOLIO_DATA.skills[category].map(skill => (
                      <span key={skill} className="px-3 py-1.5 text-xs font-mono rounded-md bg-black/60 text-slate-400 border border-transparent group-hover:border-white/10 hover:!text-white hover:!border-indigo-400/50 cursor-default transition-all duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </CinematicReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const flagshipProjects = PORTFOLIO_DATA.projects.filter(p => p.isFlagship);
  const otherProjects = PORTFOLIO_DATA.projects.filter(p => !p.isFlagship);

  return (
    <section id="projects" className="py-32 relative bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">
        <CinematicReveal>
          <div className="flex items-center gap-6 mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">03.</span> FEATURED PROJECTS
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-900 to-transparent"></div>
          </div>
        </CinematicReveal>

        <div className="space-y-32 mb-32">
          {flagshipProjects.map((project, idx) => (
            <CinematicReveal key={project.title} delay={100} direction={idx % 2 === 0 ? "right" : "left"}>
              <div className="relative grid md:grid-cols-12 gap-10 items-center group">
                <div className={`md:col-span-7 relative z-10 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <TiltCard className="block w-full">
                    <a href={project.link} target="_blank" rel="noreferrer" className="block relative rounded-3xl overflow-hidden aspect-[16/10] bg-black border border-white/10 group-hover:border-cyan-500/30 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-transparent to-blue-900/40 opacity-50 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 group-hover:scale-105 transition-transform duration-700 ease-out">
                        <Cpu size={80} className="opacity-20 mb-4 group-hover:text-cyan-400 group-hover:opacity-40 transition-all duration-500" />
                        <span className="font-mono text-2xl tracking-[0.5em] opacity-30 group-hover:text-cyan-400 group-hover:opacity-60 transition-all duration-500">
                          {project.title.toUpperCase()}
                        </span>
                      </div>
                    </a>
                  </TiltCard>
                </div>

                <div className={`md:col-span-5 relative z-20 ${idx % 2 === 0 ? 'md:order-2 md:text-right' : 'md:order-1 md:text-left'}`}>
                  <div className="inline-block px-3 py-1 mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs tracking-wider uppercase">
                    Featured
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-6 group-hover:text-cyan-400 transition-colors duration-500">
                    <a href={project.link} target="_blank" rel="noreferrer">{project.title}</a>
                  </h3>
                  
                  <div className={`p-8 rounded-3xl bg-slate-900/80 backdrop-blur-xl text-slate-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 mb-8 relative z-30 hover:border-white/10 transition-colors ${idx % 2 === 0 ? 'md:-ml-16' : 'md:-mr-16'}`}>
                    <p className="leading-relaxed text-lg font-light">{project.description}</p>
                  </div>

                  <ul className={`flex flex-wrap gap-3 font-mono text-xs text-slate-400 mb-8 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    {project.tags.map(tag => (
                      <li key={tag} className="px-2 py-1 bg-black/50 rounded border border-white/5">{tag}</li>
                    ))}
                  </ul>

                  <div className={`flex items-center gap-6 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                     <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors font-bold group/link" aria-label="External Link">
                        View Project <ArrowUpRight size={20} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                     </a>
                  </div>
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>

        <CinematicReveal direction="up">
          <div className="flex items-center gap-4 mb-12">
            <h3 className="text-2xl font-bold text-white tracking-wide">Other Projects</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
          </div>
        </CinematicReveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, idx) => (
            <CinematicReveal key={project.title} delay={idx * 100} direction="up">
              <TiltCard className="h-full">
                <div className="h-full p-8 rounded-3xl bg-slate-900/30 border border-white/5 hover:bg-slate-900/50 hover:border-white/10 transition-all duration-300 flex flex-col group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 group-hover:from-cyan-500/5 group-hover:to-blue-600/5 transition-colors duration-500"></div>

                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all duration-500">
                      <Briefcase size={24} strokeWidth={1.5} />
                    </div>
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>

                  <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors relative z-10">
                    <a href={project.link} target="_blank" rel="noreferrer">{project.title}</a>
                  </h4>
                  <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed font-light relative z-10">{project.description}</p>
                  
                  <ul className="flex flex-wrap gap-2 text-[10px] font-mono tracking-widest uppercase text-slate-500 mt-auto relative z-10">
                    {project.tags.map(tag => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              </TiltCard>
            </CinematicReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const LabCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-black border-y border-white/5">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-black to-black"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <CinematicReveal direction="up">
          <div className="inline-flex justify-center mb-8 relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
            <div className="p-5 rounded-2xl bg-black border border-cyan-500/30 text-cyan-400 relative z-10 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <Wrench size={40} strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">ENGINEERING LAB</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            A dedicated portal for unpolished experiments, hardware schematics, IoT testbeds, and mechanical builds that defy standard software constraints.
          </p>
          <Button href={PORTFOLIO_DATA.links.miniProjects} primary icon={ChevronRight}>
            Visit the Lab
          </Button>
        </CinematicReveal>
      </div>
    </section>
  );
};

const ProfilesAndContent = () => {
  const profiles = [
    { name: "GitHub", url: PORTFOLIO_DATA.links.github, icon: Github, color: "group-hover:text-white group-hover:border-white/30" },
    { name: "LeetCode", url: PORTFOLIO_DATA.links.leetcode, icon: Code2, color: "group-hover:text-[#FFA116] group-hover:border-[#FFA116]/30" },
    { name: "HackerRank", url: PORTFOLIO_DATA.links.hackerrank, icon: Terminal, color: "group-hover:text-[#00EA64] group-hover:border-[#00EA64]/30" }
  ];

  const content = [
    { name: "Medium", url: PORTFOLIO_DATA.links.medium, icon: BookOpen },
    { name: "Blogger", url: PORTFOLIO_DATA.links.blogger, icon: Globe }
  ];

  return (
    <section className="py-32 bg-[#020617] relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <CinematicReveal direction="right">
            <h3 className="text-sm font-mono tracking-widest text-slate-500 uppercase mb-8 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-slate-700"></div>
              Coding Profiles
            </h3>
            <div className="flex flex-col gap-4">
              {profiles.map((p, i) => (
                <a key={p.name} href={p.url} target="_blank" rel="noreferrer" className={`flex items-center justify-between p-6 rounded-2xl bg-slate-900/30 border border-white/5 transition-all duration-300 group ${p.color} hover:bg-black`}>
                  <div className="flex items-center gap-5">
                    <div className="p-3 rounded-lg bg-black/50 border border-white/5 text-slate-400 group-hover:text-inherit transition-colors">
                      <p.icon size={24} />
                    </div>
                    <span className="font-bold text-lg text-slate-300 group-hover:text-white transition-colors tracking-wide">{p.name}</span>
                  </div>
                  <ArrowUpRight size={20} className="text-slate-600 group-hover:text-inherit opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              ))}
            </div>
          </CinematicReveal>
        </div>

        <div>
          <CinematicReveal delay={100} direction="left">
            <h3 className="text-sm font-mono tracking-widest text-slate-500 uppercase mb-8 flex items-center gap-4">
              <div className="w-8 h-[1px] bg-slate-700"></div>
              Articles & Blogs
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {content.map((c, i) => (
                <TiltCard key={c.name} className="h-full">
                  <a href={c.url} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-10 h-full rounded-2xl bg-slate-900/30 border border-white/5 hover:border-cyan-500/30 hover:bg-black transition-all duration-500 group text-center">
                    <c.icon size={36} className="text-slate-500 mb-6 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-500" strokeWidth={1.5} />
                    <span className="font-bold text-slate-300 group-hover:text-white transition-colors tracking-wide">{c.name}</span>
                  </a>
                </TiltCard>
              ))}
            </div>
          </CinematicReveal>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="py-24 border-t border-white/5 relative overflow-hidden bg-black">
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-cyan-900/20 to-transparent blur-[100px] rounded-full pointer-events-none"></div>
       
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <CinematicReveal direction="up">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">LET'S CONNECT.</h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-12 text-lg font-light leading-relaxed">
            My communication channels are open. Whether it's a structural engineering challenge, a software architecture query, or a collaborative venture.
          </p>
          
          <Button href={`mailto:${PORTFOLIO_DATA.personal.email}`} primary icon={Mail}>
            Send a Message
          </Button>

          <div className="flex justify-center gap-4 mt-20 mb-12">
            {[
              { icon: Github, url: PORTFOLIO_DATA.links.github, label: "GitHub" },
              { icon: Linkedin, url: PORTFOLIO_DATA.links.linkedin, label: "LinkedIn" },
              { icon: Mail, url: `mailto:${PORTFOLIO_DATA.personal.email}`, label: "Email" }
            ].map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer" aria-label={social.label} className="p-4 rounded-full bg-slate-900/50 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 transition-all duration-300 border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <social.icon size={22} />
              </a>
            ))}
          </div>
          
          <div className="h-[1px] w-full max-w-xs mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>

          <p className="text-slate-600 text-xs font-mono tracking-widest uppercase">
            Designed & Built by {PORTFOLIO_DATA.personal.name}
            <br />
            <span className="opacity-50">© {new Date().getFullYear()} • All rights reserved.</span>
          </p>
        </CinematicReveal>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="bg-[#020617] min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          color-scheme: dark;
          --mouse-x: -1000px;
          --mouse-y: -1000px;
        }
        html { scroll-behavior: smooth; }
        body { margin: 0; background-color: #000; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #000; border-left: 1px solid rgba(255,255,255,0.05); }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 0px; }
        ::-webkit-scrollbar-thumb:hover { background: #06b6d4; box-shadow: 0 0 10px #06b6d4; }
        .tilt-card { position: relative; transform-style: preserve-3d; border-radius: 1.5rem; }
        .tilt-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(6, 182, 212, 0.4), transparent 40%);
          opacity: 0;
          transition: opacity 0.5s;
          z-index: 0;
          pointer-events: none;
        }
        .tilt-card:hover::before { opacity: 1; }
        .tilt-card-content { position: relative; z-index: 1; height: 100%; border-radius: inherit; background: inherit; background-clip: padding-box; }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}} />
      
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <LabCTA />
        <ProfilesAndContent />
      </main>
      <Footer />
    </div>
  );
};

export default App;
