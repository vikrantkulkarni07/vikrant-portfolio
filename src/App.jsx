import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Linkedin, Mail, ExternalLink, Code2, Cpu, Wrench, 
  Terminal, Globe, BookOpen, ChevronRight, Award, Zap,
  MonitorPlay, Briefcase, ArrowUpRight, Compass,
  Layers, Crosshair, Menu, X
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
    miniProjects: "https://vikranthw.netlify.app",
    youtube: "http://www.youtube.com/@VikrantCreatez"
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
      image: "https://drive.google.com/thumbnail?id=1AJF4AjwY6tFE67uHQP8KGFOgrMlkFKbi&sz=w1200",
      isFlagship: true
    },
    {
      title: "TarangSetu",
      category: "Embedded / Wireless Communication",
      description: "A hackathon-winning STEM wireless communication engineering kit designed for educational purposes and practical demonstrations of wireless signal transmission.",
      tags: ["Embedded", "Wireless", "STEM", "Hardware"],
      link: "https://tarangsetu.netlify.app/",
      image: "https://drive.google.com/thumbnail?id=1FEycaXG8UDibPcGNtQOXOM-TdBb-BB6W&sz=w1200",
      isFlagship: true
    },
    {
      title: "CeleStudy",
      category: "AI / Education",
      description: "An AI-powered personalized study companion designed to adapt to individual learning paces and optimize educational outcomes.",
      tags: ["AI", "Education Tech", "Personalization"],
      link: "https://celestudy.netlify.app",
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

// --- HOOKS ---
const useCinematicReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
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
      setTimeout(() => { setIndex((prev) => (prev + 1) % words.length); setFade(true); }, 500);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);
  return { text: words[index], fade };
};

// --- UI PRIMITIVES ---
const CinematicReveal = ({ children, delay = 0, className = "", direction = "up" }) => {
  const [ref, isVisible] = useCinematicReveal();
  const transforms = { up: "translate-y-12", down: "-translate-y-12", left: "translate-x-12", right: "-translate-x-12", none: "" };
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0 blur-none" : `opacity-0 ${transforms[direction]} blur-sm`
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
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    setRotate({ x: ((y - rect.height / 2) / rect.height) * -8, y: ((x - rect.width / 2) / rect.width) * 8 });
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };
  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    if (cardRef.current) { cardRef.current.style.setProperty("--mouse-x", "-1000px"); cardRef.current.style.setProperty("--mouse-y", "-1000px"); }
  };
  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`tilt-card ${className}`}
      style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`, transition: 'transform 0.15s ease-out' }}>
      <div className="tilt-card-content">{children}</div>
    </div>
  );
};

const Button = ({ href, primary, children, icon: Icon, target = "_blank" }) => {
  const base = "group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold transition-all duration-500 text-sm tracking-wide overflow-hidden";
  const prim = "text-cyan-400 border border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:bg-cyan-500/10";
  const sec  = "bg-white/5 backdrop-blur-md text-slate-300 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white";
  const C = href ? 'a' : 'button';
  return (
    <C href={href} target={href && href !== '#' ? target : undefined} rel={href && href !== '#' ? "noopener noreferrer" : undefined}
      className={`${base} ${primary ? prim : sec}`}>
      {primary && <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
      <span className="relative z-10 flex items-center gap-2">{children}{Icon && <Icon size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}</span>
    </C>
  );
};

// --- NAVIGATION (Mobile Responsive + Transparent) ---
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Arsenal", href: "#skills" },
    { label: "Systems", href: "#projects" },
    { label: "Communicate", href: "#contact" },
  ];

  const handleNavClick = (href) => {
    setMenuOpen(false);
    // small delay so menu closes before scroll
    setTimeout(() => { document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/40 backdrop-blur-2xl border-b border-white/[0.06] py-3 shadow-[0_4px_40px_rgba(0,0,0,0.6)]'
          : 'bg-transparent backdrop-blur-none py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-700 flex items-center justify-center relative overflow-hidden shadow-[0_0_16px_rgba(6,182,212,0.35)]">
              <span className="relative z-10 text-white font-black text-sm tracking-tight">VK</span>
            </div>
            <span className="text-white font-black tracking-tighter text-lg opacity-80 group-hover:opacity-100 transition-opacity hidden sm:block">
              VIKRANT<span className="text-cyan-400">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {navLinks.map(link => (
              <a key={link.label} href={link.href}
                className="relative hover:text-white transition-colors duration-300 group py-1">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-slate-300 hover:text-white hover:border-white/20 transition-all"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Frosted backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />

        {/* Menu panel */}
        <div className={`absolute top-0 right-0 h-full w-72 bg-slate-950/90 border-l border-white/[0.07] flex flex-col pt-24 pb-10 px-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Glow accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

          <nav className="flex flex-col gap-2">
            {navLinks.map((link, i) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-4 px-4 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/[0.08] transition-all duration-200 font-semibold text-xl tracking-wide group"
                style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              >
                <span className="text-cyan-400/60 font-mono text-xs mr-3">0{i + 1}.</span>
                {link.label}
                <ChevronRight size={16} className="inline ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-cyan-400" />
              </button>
            ))}
          </nav>

          <div className="mt-auto border-t border-white/[0.06] pt-8 flex gap-4">
            {[
              { icon: Github, url: PORTFOLIO_DATA.links.github },
              { icon: Linkedin, url: PORTFOLIO_DATA.links.linkedin },
              { icon: Mail, url: `mailto:${PORTFOLIO_DATA.personal.email}` },
            ].map(({ icon: Icon, url }, i) => (
              <a key={i} href={url} target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// --- HERO ---
const InterstellarBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();
    const particles = Array.from({ length: 350 }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * Math.max(window.innerWidth, window.innerHeight),
      speed: 0.0004 + Math.random() * 0.0008,
      radius: Math.random() * 1.4,
      alpha: Math.random(),
      color: Math.random() > 0.82 ? '#06b6d4' : Math.random() > 0.82 ? '#8b5cf6' : '#ffffff'
    }));
    const draw = () => {
      ctx.fillStyle = 'rgba(2,6,23,0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2, cy = canvas.height / 2;
      particles.forEach(p => {
        p.angle += p.speed;
        const x = cx + Math.cos(p.angle) * p.distance;
        const y = cy + Math.sin(p.angle) * p.distance;
        ctx.beginPath();
        ctx.arc(x, y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.4 + Math.sin(Date.now() * 0.0008 + p.angle) * 0.6);
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width / 3);
      g.addColorStop(0, 'rgba(6,182,212,0.04)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80" />;
};

const Hero = () => {
  const { text: rotatingText, fade } = useRotatingText(PORTFOLIO_DATA.personal.taglines);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <InterstellarBackground />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 w-full">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <CinematicReveal delay={100} direction="right">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-4 leading-[1.05]">
              HI, I'M <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">VIKRANT</span>
            </h1>
          </CinematicReveal>
          <CinematicReveal delay={400} direction="right">
            <div className="h-14 flex items-center justify-center md:justify-start mb-8 border-l-2 border-cyan-500/50 pl-4">
              <h2 className={`text-lg md:text-xl font-light text-slate-400 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                {rotatingText}
              </h2>
            </div>
          </CinematicReveal>
          <CinematicReveal delay={650} direction="up">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Button href="#projects" primary icon={ArrowUpRight}>Explore Systems</Button>
              <Button href={PORTFOLIO_DATA.links.miniProjects} icon={Zap}>Engineering Lab</Button>
            </div>
          </CinematicReveal>
        </div>

        <div className="flex-1 flex justify-center md:justify-end w-full max-w-sm">
          <CinematicReveal delay={500} direction="left" className="relative group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-cyan-500/15 blur-[90px] rounded-full mix-blend-screen group-hover:bg-cyan-400/25 transition-all duration-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-indigo-500/15 blur-[60px] rounded-full mix-blend-screen animate-pulse" />
            <div className="relative z-10 w-60 h-60 md:w-72 md:h-72 rounded-full p-[3px] bg-gradient-to-br from-cyan-400/30 via-transparent to-indigo-500/30 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-t-cyan-400/60 animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-[-12px] rounded-full border border-dashed border-slate-700/50 animate-[spin_24s_linear_infinite_reverse]" />
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 rounded-full" />
                <img src={PORTFOLIO_DATA.personal.profileImage} alt={PORTFOLIO_DATA.personal.name}
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
            </div>
            <div className="absolute -right-3 top-8 bg-black/70 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl animate-[float_4s_ease-in-out_infinite]">
              <Cpu className="text-cyan-400" size={22} />
            </div>
            <div className="absolute -left-6 bottom-16 bg-black/70 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-2xl animate-[float_5s_ease-in-out_1s_infinite_reverse]">
              <MonitorPlay className="text-indigo-400" size={22} />
            </div>
          </CinematicReveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-white">Scroll to Initiate</span>
        <div className="w-px h-10 bg-gradient-to-b from-cyan-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

// --- ABOUT ---
const About = () => {
  const [showCerts, setShowCerts] = useState(false);
  return (
    <section id="about" className="py-28 relative z-10 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">
        <CinematicReveal>
          <div className="flex items-center gap-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">01.</span> CORE IDENTITY
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-900/60 to-transparent" />
          </div>
        </CinematicReveal>

        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          <CinematicReveal delay={200} className="md:col-span-7">
            <TiltCard className="h-full bg-slate-900/40 border border-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-56 h-56 bg-cyan-900/10 rounded-full blur-[80px]" />
              <Compass className="text-cyan-500/10 absolute -bottom-8 -right-8" size={180} strokeWidth={1} />
              <div className="relative z-10 space-y-6">
                <p className="text-slate-300 leading-relaxed text-lg font-light">{PORTFOLIO_DATA.personal.about}</p>
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <p className="text-slate-400 leading-relaxed text-base font-light">
                  My approach combines rigorous academic engineering principles with a hacker's mentality. I don't just write code; I architect physical and digital systems. From routing traces on a custom PCB to deploying machine learning models on edge devices, I view the entire stack as a single cohesive product.
                </p>
              </div>
            </TiltCard>
          </CinematicReveal>

          <div className="md:col-span-5 flex flex-col gap-6">
            <CinematicReveal delay={350}>
              <TiltCard className="bg-slate-900/60 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-cyan-500/3 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="flex items-center gap-3 text-white font-bold mb-6 text-base tracking-wider uppercase">
                  <Layers className="text-cyan-400" size={20} /> Currently Architecting
                </h3>
                <ul className="space-y-5 relative z-10">
                  {PORTFOLIO_DATA.personal.currentlyBuilding.map((item, idx) => (
                    <li key={idx} className="group/item cursor-default">
                      <span className="text-white font-semibold flex items-center gap-2 group-hover/item:text-cyan-400 transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 flex-shrink-0" />{item.name}
                      </span>
                      <span className="text-xs text-slate-500 font-mono ml-3.5 mt-0.5 block">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </CinematicReveal>

            <CinematicReveal delay={500}>
              <TiltCard className="bg-slate-900/40 border border-white/5 rounded-3xl p-8">
                <h3 className="flex items-center gap-3 text-white font-bold mb-6 text-base tracking-wider uppercase">
                  <Crosshair className="text-indigo-400" size={20} /> Milestones
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {PORTFOLIO_DATA.achievements.map((ach, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-black/50 border border-white/5 text-slate-300 text-xs font-mono hover:border-indigo-500/40 transition-colors">
                      {ach}
                    </span>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-5">
                  <button onClick={() => setShowCerts(!showCerts)}
                    className="flex items-center justify-between w-full p-3.5 rounded-xl bg-slate-800/50 border border-white/8 hover:border-cyan-500/40 transition-all group/btn">
                    <span className="flex items-center gap-3 text-white font-medium text-sm">
                      <Award className="text-cyan-400" size={18} /> Licenses & Certifications
                    </span>
                    <ChevronRight className={`text-slate-500 transition-transform duration-300 ${showCerts ? 'rotate-90' : ''}`} size={18} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ${showCerts ? 'max-h-64 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                    <ul className="space-y-2.5 px-2 pt-1">
                      {PORTFOLIO_DATA.certifications.map((cert, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-1.5 flex-shrink-0" />{cert}
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

// --- SKILLS ---
const Skills = () => {
  const icons = { "Programming": Code2, "Engineering": Cpu, "Platforms": MonitorPlay, "Tools": Terminal };
  return (
    <section id="skills" className="py-28 relative bg-[#020617] border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-900/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <CinematicReveal>
          <div className="flex items-center gap-6 mb-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-indigo-900/60" />
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">02.</span> TECHNICAL ARSENAL
            </h2>
          </div>
        </CinematicReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.keys(PORTFOLIO_DATA.skills).map((category, idx) => {
            const Icon = icons[category];
            return (
              <CinematicReveal key={category} delay={idx * 120} direction="up">
                <TiltCard className="h-full p-7 rounded-3xl bg-slate-900/30 border border-white/5 group hover:bg-slate-900/50 transition-colors">
                  <div className="flex flex-col items-start gap-4 mb-7">
                    <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 text-indigo-400 group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-500">
                      <Icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-wide">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PORTFOLIO_DATA.skills[category].map(skill => (
                      <span key={skill} className="px-2.5 py-1.5 text-[11px] font-mono rounded-md bg-black/60 text-slate-400 border border-transparent group-hover:border-white/8 hover:!text-white hover:!border-indigo-400/40 cursor-default transition-all duration-300">
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

// --- PROJECTS ---
const Projects = () => {
  const flagship = PORTFOLIO_DATA.projects.filter(p => p.isFlagship);
  const others   = PORTFOLIO_DATA.projects.filter(p => !p.isFlagship);
  const [imgErrors, setImgErrors] = useState({});

  return (
    <section id="projects" className="py-28 relative bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6">
        <CinematicReveal>
          <div className="flex items-center gap-6 mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">03.</span> FEATURED SYSTEMS
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-900/60 to-transparent" />
          </div>
        </CinematicReveal>

        {/* Flagship Projects */}
        <div className="space-y-28 mb-28">
          {flagship.map((project, idx) => (
            <CinematicReveal key={project.title} delay={100} direction={idx % 2 === 0 ? "right" : "left"}>
              <div className="relative grid md:grid-cols-12 gap-8 items-center group">

                {/* Image Panel */}
                <div className={`md:col-span-7 ${idx % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <TiltCard className="w-full">
                    <a href={project.link !== '#' ? project.link : undefined}
                      target="_blank" rel="noreferrer"
                      className="block relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-white/8 group-hover:border-cyan-500/30 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                      
                      {/* Actual project image */}
                      {project.image && !imgErrors[project.title] ? (
                        <>
                          <img
                            src={project.image}
                            alt={project.title}
                            onError={() => setImgErrors(e => ({ ...e, [project.title]: true }))}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {/* Subtle overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                          {/* Top-right tag */}
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-cyan-400 font-mono text-[10px] tracking-widest uppercase">
                            {project.category}
                          </div>
                        </>
                      ) : (
                        /* Fallback if image fails */
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-slate-900 to-blue-900/30" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                            <Cpu size={72} className="text-slate-600 group-hover:text-cyan-400/50 transition-colors duration-500" />
                            <span className="font-mono text-slate-500 tracking-[0.5em] text-lg group-hover:text-cyan-400/60 transition-colors duration-500">
                              {project.title.toUpperCase()}
                            </span>
                          </div>
                        </>
                      )}
                    </a>
                  </TiltCard>
                </div>

                {/* Content Panel */}
                <div className={`md:col-span-5 ${idx % 2 === 0 ? 'md:order-2 md:text-right' : 'md:order-1 md:text-left'}`}>
                  <div className="inline-block px-3 py-1 mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] tracking-wider uppercase">
                    ✦ Featured
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-5 group-hover:text-cyan-300 transition-colors duration-500">
                    {project.link !== '#'
                      ? <a href={project.link} target="_blank" rel="noreferrer">{project.title}</a>
                      : project.title}
                  </h3>
                  <div className={`p-6 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/5 mb-6 hover:border-white/10 transition-colors ${idx % 2 === 0 ? 'md:-ml-12' : 'md:-mr-12'}`}>
                    <p className="text-slate-300 leading-relaxed font-light">{project.description}</p>
                  </div>
                  <ul className={`flex flex-wrap gap-2 font-mono text-[10px] text-slate-500 mb-6 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    {project.tags.map(tag => <li key={tag} className="px-2 py-1 bg-black/50 rounded border border-white/5">{tag}</li>)}
                  </ul>
                  {project.link !== '#' && (
                    <div className={`flex items-center gap-4 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                      <a href={project.link} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors font-bold text-sm group/lnk">
                        View Project <ArrowUpRight size={18} className="group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CinematicReveal>
          ))}
        </div>

        {/* Other Projects Grid */}
        <CinematicReveal direction="up">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-2xl font-bold text-white tracking-wide">Other Projects</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
        </CinematicReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((project, idx) => (
            <CinematicReveal key={project.title} delay={idx * 80} direction="up">
              <TiltCard className="h-full">
                <div className="h-full p-7 rounded-3xl bg-slate-900/30 border border-white/5 hover:bg-slate-900/50 hover:border-white/10 flex flex-col group relative overflow-hidden transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-600/0 group-hover:from-cyan-500/4 group-hover:to-blue-600/4 transition-colors duration-500" />
                  <div className="flex justify-between items-center mb-7 relative z-10">
                    <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-slate-500 group-hover:text-cyan-400 group-hover:border-cyan-500/25 transition-all duration-400">
                      <Briefcase size={22} strokeWidth={1.5} />
                    </div>
                    {project.link !== '#' && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-cyan-400 transition-colors">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors relative z-10">
                    {project.link !== '#'
                      ? <a href={project.link} target="_blank" rel="noreferrer">{project.title}</a>
                      : project.title}
                  </h4>
                  <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed font-light relative z-10">{project.description}</p>
                  <ul className="flex flex-wrap gap-2.5 text-[10px] font-mono tracking-wider uppercase text-slate-600 mt-auto relative z-10">
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

// --- LAB CTA ---
const LabCTA = () => (
  <section className="py-28 relative overflow-hidden bg-black border-y border-white/5">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06)_0%,transparent_70%)]" />
    <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
      <CinematicReveal direction="up">
        <div className="inline-flex justify-center mb-8 relative">
          <div className="absolute inset-0 bg-cyan-500/15 blur-xl rounded-full animate-pulse" />
          <div className="p-5 rounded-2xl bg-black border border-cyan-500/25 text-cyan-400 relative z-10 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <Wrench size={36} strokeWidth={1.5} />
          </div>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-5 tracking-tight">ENGINEERING LAB</h2>
        <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto font-light leading-relaxed">
          A dedicated portal for unpolished experiments, hardware schematics, IoT testbeds, and mechanical builds.
        </p>
        <Button href={PORTFOLIO_DATA.links.miniProjects} primary icon={ChevronRight}>Visit the Lab</Button>
      </CinematicReveal>
    </div>
  </section>
);

// --- PROFILES ---
const ProfilesAndContent = () => {
  const profiles = [
    { name: "GitHub", url: PORTFOLIO_DATA.links.github, icon: Github, hover: "group-hover:text-white group-hover:border-white/20" },
    { name: "LeetCode", url: PORTFOLIO_DATA.links.leetcode, icon: Code2, hover: "group-hover:text-[#FFA116] group-hover:border-[#FFA116]/25" },
    { name: "HackerRank", url: PORTFOLIO_DATA.links.hackerrank, icon: Terminal, hover: "group-hover:text-[#00EA64] group-hover:border-[#00EA64]/25" }
  ];
 const content = [
    { name: "Medium", url: PORTFOLIO_DATA.links.medium, icon: BookOpen },
    { name: "Blogger", url: PORTFOLIO_DATA.links.blogger, icon: Globe },
    { name: "YouTube", url: PORTFOLIO_DATA.links.youtube, icon: MonitorPlay }
  ];
  return (
    <section className="py-28 bg-[#020617] relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14">
        <div>
          <CinematicReveal direction="right">
            <h3 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-7 flex items-center gap-3">
              <div className="w-6 h-px bg-slate-700" /> Coding Profiles
            </h3>
            <div className="flex flex-col gap-3">
              {profiles.map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noreferrer"
                  className={`flex items-center justify-between p-5 rounded-2xl bg-slate-900/30 border border-white/5 transition-all duration-300 group hover:bg-black ${p.hover}`}>
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 text-slate-400 group-hover:text-inherit transition-colors">
                      <p.icon size={22} />
                    </div>
                    <span className="font-bold text-slate-300 group-hover:text-white transition-colors tracking-wide">{p.name}</span>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-700 group-hover:text-inherit opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              ))}
            </div>
          </CinematicReveal>
        </div>
        <div>
          <CinematicReveal delay={100} direction="left">
            <h3 className="text-xs font-mono tracking-widest text-slate-500 uppercase mb-7 flex items-center gap-3">
              <div className="w-6 h-px bg-slate-700" /> Articles & Blogs
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {content.map(c => (
                <TiltCard key={c.name} className="h-full">
                  <a href={c.url} target="_blank" rel="noreferrer"
                    className="flex flex-col items-center justify-center p-10 h-full rounded-2xl bg-slate-900/30 border border-white/5 hover:border-cyan-500/25 hover:bg-black transition-all duration-400 group text-center">
                    <c.icon size={32} className="text-slate-500 mb-5 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-400" strokeWidth={1.5} />
                    <span className="font-bold text-slate-300 group-hover:text-white transition-colors tracking-wide text-sm">{c.name}</span>
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

// --- FOOTER ---
const Footer = () => (
  <footer id="contact" className="py-24 border-t border-white/5 relative overflow-hidden bg-black">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-gradient-to-t from-cyan-900/15 to-transparent blur-[100px] rounded-full pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
      <CinematicReveal direction="up">
        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">LET'S CONNECT.</h2>
        <p className="text-slate-400 max-w-md mx-auto mb-10 font-light leading-relaxed">
          My communication channels are open. Engineering challenges, software architecture, or collaborative ventures — reach out.
        </p>
        <Button href={`mailto:${PORTFOLIO_DATA.personal.email}`} primary icon={Mail}>Send a Message</Button>
        <div className="flex justify-center gap-4 mt-16 mb-10">
          {[
            { icon: Github, url: PORTFOLIO_DATA.links.github, label: "GitHub" },
            { icon: Linkedin, url: PORTFOLIO_DATA.links.linkedin, label: "LinkedIn" },
            { icon: Mail, url: `mailto:${PORTFOLIO_DATA.personal.email}`, label: "Email" }
          ].map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}
              className="p-3.5 rounded-full bg-slate-900/50 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 transition-all duration-300 border border-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <s.icon size={20} />
            </a>
          ))}
        </div>
        <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />
        <p className="text-slate-700 text-xs font-mono tracking-widest uppercase">
          Designed & Built by {PORTFOLIO_DATA.personal.name}<br />
          <span className="opacity-50">© {new Date().getFullYear()} • All rights reserved.</span>
        </p>
      </CinematicReveal>
    </div>
  </footer>
);

// --- APP ---
const App = () => (
  <div className="bg-[#020617] min-h-screen text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden">
    <style dangerouslySetInnerHTML={{__html: `
      :root { color-scheme: dark; --mouse-x: -1000px; --mouse-y: -1000px; }
      html { scroll-behavior: smooth; }
      body { margin: 0; background: #000; overflow-x: hidden; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #000; }
      ::-webkit-scrollbar-thumb { background: #1e293b; }
      ::-webkit-scrollbar-thumb:hover { background: #06b6d4; }
      .tilt-card { position: relative; transform-style: preserve-3d; border-radius: 1.5rem; }
      .tilt-card::before {
        content: "";
        position: absolute;
        inset: -1px;
        border-radius: inherit;
        background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(6,182,212,0.35), transparent 40%);
        opacity: 0;
        transition: opacity 0.5s;
        z-index: 0;
        pointer-events: none;
      }
      .tilt-card:hover::before { opacity: 1; }
      .tilt-card-content { position: relative; z-index: 1; height: 100%; border-radius: inherit; }
      @keyframes float {
        0%,100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-12px) rotate(4deg); }
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

export default App;
