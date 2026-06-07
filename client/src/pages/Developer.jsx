import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Code2,
  Briefcase,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import me from "../assets/profile841.jpg";

// ==========================================
// 3D ORBITING SYSTEM ENGINE (THREE.JS)
// ==========================================
function FloatingCoreBackground(props) {
  const ref = useRef();
  
  // Create a spherical particle cluster shell mapping layout
  const [sphere] = useState(() => 
    random.inSphere(new Float32Array(3000), { radius: 1.6 })
  );

  // Silently rotate the canvas coordinate space down frame tickers smoothly
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.08;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#f97316" // Pure Vibrant Orange matching theme
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// ==========================================
// CORE VIEWPORT MAIN LAYOUT EXPORT
// ==========================================
export default function Developer() {
  const skills = [
    "React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS",
    "JavaScript", "Socket.IO", "OpenAI API", "JWT Auth", "Razorpay",
    "REST APIs", "Git & GitHub",
  ];

  const projects = [
    {
      title: "VOXHIRE – AI Interview Platform",
      desc: "AI-powered recruitment platform with AI mock interviews, ATS analysis, real-time code editor, and headshot generation.",
      tech: "MERN • OpenAI API • Socket.IO",
    },
    {
      title: "AI Resume Builder",
      desc: "Production-ready AI Resume Builder generating ATS-friendly resumes using OpenAI API.",
      tech: "MERN • OpenAI API",
    },
    {
      title: "CashewKart E-Commerce",
      desc: "Full-stack e-commerce platform with Razorpay integration, JWT auth, and responsive UI.",
      tech: "MERN • Razorpay • Tailwind",
    },
  ];

  const experience = [
    {
      role: "MERN Stack Intern & Team Lead",
      company: "UptoSkills",
      period: "Dec 2025 – Present",
    },
    {
      role: "MERN Stack Developer Intern",
      company: "XYZON Innovations",
      period: "May 2026 – Present",
    },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 font-sans">
      
      {/* 3D CANVAS LAYER INTEGRATION */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80 h-full w-full">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <FloatingCoreBackground />
        </Canvas>
      </div>

      {/* CORE FLAT GRADIENT GLOWS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* MAIN DATA SCENE CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-14 space-y-14">

        {/* HERO HEADER REGION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          {/* LEFT BIO STRIP */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-orange-100/80 backdrop-blur-md text-orange-600 px-4 py-2 rounded-full font-bold text-sm border border-orange-200/30">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              MERN Stack Developer
            </div>

            <div>
              <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-tight">
                Pavan Kalyan
                <span className="text-orange-500 block sm:inline">
                  {" "}Srinivas Robba
                </span>
              </h1>
              <p className="text-xl text-gray-500 mt-5 leading-relaxed font-medium">
                Full-Stack / MERN Stack Developer passionate about building scalable web applications, AI-powered tools, and modern digital experiences.
              </p>
            </div>

            {/* CONTACT ANCHOR PACKS */}
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:pavanrobba148@gmail.com"
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-orange-100 hover:border-orange-400 px-5 py-3 rounded-2xl font-bold text-gray-700 transition-all shadow-xs hover:shadow-md"
              >
                <Mail className="w-4 h-4 text-orange-500" />
                Email
              </a>
              <a
                href="https://github.com/Pavan-PK-148"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-orange-100 hover:border-orange-400 px-5 py-3 rounded-2xl font-bold text-gray-700 transition-all shadow-xs hover:shadow-md"
              >
                <FaGithub className="w-4 h-4 text-orange-500" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pavan-kalyan-srinivas-robba-723b43347/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-orange-100 hover:border-orange-400 px-5 py-3 rounded-2xl font-bold text-gray-700 transition-all shadow-xs hover:shadow-md"
              >
                <FaLinkedin className="w-4 h-4 text-orange-500" />
                LinkedIn
              </a>
            </div>

            {/* QUICK STATS METRIC INDEX MAP */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                ["2+", "Internships"],
                ["3+", "Major Projects"],
                ["10+", "Technologies"],
                ["2027", "Graduation"],
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-md border border-orange-100 rounded-2xl p-4 text-center shadow-xs"
                >
                  <h3 className="text-2xl font-black text-orange-500">{item[0]}</h3>
                  <p className="text-xs text-gray-500 font-bold mt-1 uppercase tracking-wider">{item[1]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT MEDIA PICTURE BLOCK OVER THREE.JS VIEW */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative flex justify-center z-10"
          >
            <div className="absolute inset-0 bg-orange-400/20 blur-3xl rounded-full pointer-events-none" />
            <div className="relative w-[320px] h-[420px] rounded-[40px] bg-white/40 backdrop-blur-md border border-white/40 shadow-2xl overflow-hidden ring-1 ring-orange-500/10">
              <img
                src={me}
                alt="Pavan Kalyan Srinivas Robba"
                className="w-full h-full object-cover select-none"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* ABOUT PARAGRAPH FRAME */}
        <section className="bg-white/80 backdrop-blur-md border border-orange-100/70 rounded-[40px] p-10 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-7 h-7 text-orange-500" />
            <h2 className="text-3xl font-black text-gray-900">About Me</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg font-medium">
            Motivated Full-Stack / MERN Stack Developer with experience building scalable web applications, RESTful APIs, and AI-powered platforms. Skilled in React.js, Node.js, Express.js, MongoDB, and OpenAI integrations with strong knowledge of responsive design, authentication systems, and cloud deployments.
          </p>
        </section>

        {/* SKILLS CHIP ENGINE */}
        <section>
          <h2 className="text-3xl font-black text-gray-900 mb-8">Technical Skills</h2>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, i) => (
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                key={i}
                className="bg-white/90 border border-orange-100 hover:border-orange-400 px-5 py-3 rounded-2xl shadow-xs font-bold text-gray-700 transition-colors cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </section>

        {/* WORK TIMELINES */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* EXPERIENCE BOX */}
          <div className="bg-white/80 backdrop-blur-md border border-orange-100/70 rounded-[35px] p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-7 h-7 text-orange-500" />
              <h2 className="text-3xl font-black text-gray-900">Experience</h2>
            </div>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <div key={i} className="border-l-4 border-orange-500 pl-5">
                  <h3 className="text-xl font-black text-gray-900">{exp.role}</h3>
                  <p className="text-orange-600 font-bold mt-1 text-sm">{exp.company}</p>
                  <p className="text-gray-400 font-bold mt-1 text-xs">{exp.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ACADEMICS BOX */}
          <div className="bg-white/80 backdrop-blur-md border border-orange-100/70 rounded-[35px] p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-7 h-7 text-orange-500" />
              <h2 className="text-3xl font-black text-gray-900">Education</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-orange-500 pl-5">
                <h3 className="text-xl font-black text-gray-900">GITAM University</h3>
                <p className="text-orange-600 font-bold mt-1 text-sm">B.Tech – Computer Science</p>
                <p className="text-gray-400 font-bold mt-1 text-xs">2023 – 2027 • GPA: 8.6</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-5">
                <h3 className="text-xl font-black text-gray-900">Sri Chaitanya Jr. College</h3>
                <p className="text-orange-600 font-bold mt-1 text-sm">Intermediate – MPC</p>
                <p className="text-gray-400 font-bold mt-1 text-xs">GPA: 8.6</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECT STACKS LIST MAP */}
        <section>
          <h2 className="text-3xl font-black text-gray-900 mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                whileHover={{ y: -6 }}
                key={i}
                className="bg-white/80 backdrop-blur-md border border-orange-100 hover:border-orange-300 transition-colors rounded-[35px] p-7 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{project.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium text-sm">{project.desc}</p>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-orange-600 font-bold text-xs bg-orange-50 px-3 py-1 rounded-lg">
                    {project.tech}
                  </span>
                  <button className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors cursor-pointer">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}