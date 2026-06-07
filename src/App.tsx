/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import {
  UNIVERSITY_INFO,
  COURSE_OVERVIEW_TEXT,
  COURSE_OBJECTIVES,
  COURSE_OUTCOMES,
  UNITS,
  WEEKLY_TEACHING_PLAN,
  LAB_EXPERIMENTS,
  LEARNING_RESOURCES,
  LAB_ASSESSMENTS_DATA
} from "./data";
import { downloadLabPDF } from "./pdfGenerator";
import { CHAPTERS_DEEP_DIVE } from "./chapterDetails";
import {
  BookOpen,
  Award,
  Activity,
  CheckCircle2,
  AlertCircle,
  Calendar,
  FlaskConical,
  Database,
  Cpu,
  Layers,
  Settings,
  Mail,
  FileText,
  ChevronRight,
  Info,
  Terminal,
  ArrowRight,
  Home,
  Code,
  TrendingUp,
  User,
  Download,
  Percent,
  ClipboardCheck,
  Calculator,
  LineChart as LineIcon,
  BarChart3 as BarIcon,
  ShieldAlert as ShieldIcon,
  Scale as ScaleIcon,
  ChevronDown,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState("home");
  const [currentUnitTab, setCurrentUnitTab] = useState<number>(1);
  const [openedChapterId, setOpenedChapterId] = useState<number | null>(1);
  const [activeAssessmentTab, setActiveAssessmentTab] = useState<"cnc" | "gripper" | "distributions" | "hypothesis">("cnc");

  // Chapter study-guide subtabs
  const [chapterSubTab, setChapterSubTab] = useState<"summary" | "theory" | "solved" | "sandbox">("summary");

  // Chapter 1 Sandbox: Outliers Calculator
  const [c1Samples, setC1Samples] = useState<number[]>([50.02, 49.99, 50.01, 50.04, 49.97]);
  const [c1NewSample, setC1NewSample] = useState<number>(50.15);

  // Chapter 3 Sandbox: Binomial SMT defector
  const [c3N, setC3N] = useState<number>(80);
  const [c3P, setC3P] = useState<number>(0.05);

  // Chapter 4 Sandbox: Hypothesis boundaries tracker
  const [c4TestValue, setC4TestValue] = useState<number>(2.45);

  // Interaction: Dynamic Bayes Calculator
  const [bayesPf, setBayesPf] = useState<number>(0.04);
  const [bayesPwf, setBayesPwf] = useState<number>(0.92);
  const [bayesPwn, setBayesPwn] = useState<number>(0.05);

  const bayesCalcObj = useMemo(() => {
    const pN = 1 - bayesPf;
    const pW = (bayesPwf * bayesPf) + (bayesPwn * pN);
    const pF_W = pW > 0 ? (bayesPwf * bayesPf) / pW : 0;
    const falseAlarmsShared = pW > 0 ? (bayesPwn * pN) / pW : 0;
    return {
      pN: Number(pN.toFixed(4)),
      pW: Number(pW.toFixed(4)),
      pF_W: Number(pF_W.toFixed(4)),
      falseAlarmsShared: Number(falseAlarmsShared.toFixed(4))
    };
  }, [bayesPf, bayesPwf, bayesPwn]);

  // Interaction: Hypothesis Test Decider
  const [selectedHypDataset, setSelectedHypDataset] = useState<number>(1);

  // Interaction: Dynamic Normal curve slider for process mean centering
  const [processMean, setProcessMean] = useState<number>(50.00);
  const [processSD, setProcessSD] = useState<number>(0.02166);

  // Scroll Progress indicator
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.pageYOffset / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Quick helper to map icon strings to lucide elements
  const renderIcon = (name: string, className = "h-5 w-5") => {
    switch (name) {
      case "BarChart3": return <BarIcon className={className} />;
      case "ShieldAlert": return <ShieldIcon className={className} />;
      case "Binary": return <Cpu className={className} />;
      case "Scale": return <ScaleIcon className={className} />;
      case "LineChart": return <LineIcon className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  // Regression coefficients solver on torque vs vibration dataset
  const correlationData = LAB_ASSESSMENTS_DATA.assessment3.parts[4];
  const torqueX = [11, 14, 13, 17, 15, 18];
  const vibrationY = [2.0, 2.6, 2.4, 3.3, 2.9, 3.6];

  const regressionLine = useMemo(() => {
    const n = torqueX.length;
    const sumX = torqueX.reduce((a, b) => a + b, 0);
    const sumY = vibrationY.reduce((a, b) => a + b, 0);
    const sumXY = torqueX.reduce((acc, x, i) => acc + x * vibrationY[i], 0);
    const sumX2 = torqueX.reduce((acc, x) => acc + x * x, 0);

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const c = (sumY - m * sumX) / n;

    // R^2 calculation
    const meanY = sumY / n;
    const ssTot = vibrationY.reduce((acc, y) => acc + Math.pow(y - meanY, 2), 0);
    const ssRes = vibrationY.reduce((acc, y, i) => {
      const predY = m * torqueX[i] + c;
      return acc + Math.pow(y - predY, 2);
    }, 0);
    const r2 = 1 - (ssRes / ssTot);

    return { slope: m, intercept: c, rSquare: r2 };
  }, []);

  // Function to scroll smoothly to sections
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Scroll height controller */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500 z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-indicator"
      />

      {/* Top Academic bar / Institutional Header identifier */}
      <div className="bg-slate-900 text-slate-400 py-2.5 px-4 text-xs font-mono border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>KLE TECH UNIVERSITY INGRESS — SPATIAL MATHEMATICS LABS</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="text-yellow-400 font-extrabold text-sm select-all bg-slate-800/80 px-2.5 py-0.5 rounded border border-slate-700/50 shadow-sm">
            STUDENT: SRUSHTI G JOSHI &bull; 01FE24BAR014
          </span>
          <span>PORTFOLIO REF: {UNIVERSITY_INFO.syllabusVersion}</span>
          <span>CAMPUS TIME: 2026 UTC</span>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-40 transition-all duration-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Brand identity area */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="h-10 w-10 bg-indigo-900 rounded-lg flex items-center justify-center text-white font-display font-bold text-lg shadow-md shadow-indigo-200 border border-slate-800">
              {UNIVERSITY_INFO.logoText.charAt(0)}
            </div>
            <div>
              <h1 className="font-display font-bold text-slate-900 tracking-tight leading-tight text-base sm:text-lg">
                {UNIVERSITY_INFO.name}
              </h1>
              <p className="text-[11px] text-indigo-700 font-semibold tracking-wide flex flex-wrap items-center gap-2 mt-1">
                <span>{UNIVERSITY_INFO.department}</span>
                <span className="text-slate-350 font-normal">&bull;</span>
                <span className="text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 border border-amber-500/50 px-2.5 py-0.5 rounded font-display font-black text-[11px] uppercase tracking-wide shadow-sm">
                  SRUSHTI G JOSHI &bull; 01FE24BAR014
                </span>
              </p>
            </div>
          </div>

          {/* Nav items list */}
          <nav className="hidden lg:flex items-center gap-1.5 text-sm font-medium">
            <button 
              onClick={() => scrollTo("home")}
              className={`px-3 py-2 rounded-md transition-all ${activeSection === "home" ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"}`}
              id="nav-btn-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollTo("about")} 
              className={`px-3 py-2 rounded-md transition-all ${activeSection === "about" ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"}`}
              id="nav-btn-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollTo("units")} 
              className={`px-3 py-2 rounded-md transition-all ${activeSection === "units" ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"}`}
              id="nav-btn-units"
            >
              Syllabus Units
            </button>
            <button 
              onClick={() => scrollTo("teaching-plan")} 
              className={`px-3 py-2 rounded-md transition-all ${activeSection === "teaching-plan" ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"}`}
              id="nav-btn-teaching-plan"
            >
              Weekly Schedule
            </button>
            <button 
              onClick={() => scrollTo("labs")} 
              className={`px-3 py-2 rounded-md transition-all ${activeSection === "labs" ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"}`}
              id="nav-btn-labs"
            >
              Laboratory
            </button>
            <button 
              onClick={() => scrollTo("assessments")} 
              className={`px-3.5 py-2 rounded-md transition-all bg-indigo-900 text-white font-medium hover:bg-amber-500 hover:text-slate-950 shadow-sm ml-2`}
              id="nav-btn-assessments"
            >
              Lab Reports
            </button>
          </nav>

          {/* Student Profile Card (Desktop Header) */}
          <div className="hidden lg:flex items-center gap-2.5 pl-4 border-l border-slate-200" id="desktop-student-profile">
            <div className="flex flex-col items-end text-right">
              <span className="text-sm font-black text-slate-900 uppercase tracking-tight">Srushti G Joshi</span>
              <span className="text-[10px] font-extrabold text-indigo-700 font-mono tracking-wider">01FE24BAR014</span>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-950 to-slate-900 text-yellow-400 flex items-center justify-center font-display font-black text-xs border border-indigo-905 shadow shadow-indigo-100">
              SG
            </div>
          </div>

          {/* Mini-Mobile Nav buttons */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={() => scrollTo("assessments")} 
              className="px-3 py-1.5 text-xs font-semibold bg-indigo-900 text-white rounded-md shadow"
            >
              Lab Reports
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("navigation-sidebar");
                if (element) {
                  element.classList.toggle("hidden");
                }
              }}
              className="p-1.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200"
              title="Toggle sidebar navigation menu"
              id="mobile-menu-toggle"
            >
              <Layers className="h-5 w-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Floating navigation mobile shelf */}
      <div 
        id="navigation-sidebar" 
        className="hidden fixed inset-y-0 right-0 z-50 w-64 bg-slate-900 text-white p-6 shadow-2xl flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <span className="font-display font-medium text-slate-300">Sections Directory</span>
            <button 
              onClick={() => {
                const element = document.getElementById("navigation-sidebar");
                if (element) element.classList.add("hidden");
              }}
              className="p-1 text-slate-400 hover:text-white"
              title="Close menu drawer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-3 flex flex-col">
            {["home", "about", "units", "teaching-plan", "labs", "assessments", "resources"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollTo(item);
                  const element = document.getElementById("navigation-sidebar");
                  if (element) element.classList.add("hidden");
                }}
                className="text-left px-4 py-2.5 rounded-lg text-sm text-slate-200 hover:bg-indigo-900 transition-all capitalize font-medium flex items-center justify-between"
              >
                <span>{item.replace("-", " ")}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs text-slate-500 border-t border-slate-800 pt-4">
          <p>{UNIVERSITY_INFO.department}</p>
          <p>© 2026 KLE Tech Academic</p>
        </div>
      </div>

      {/* Primary Container Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ========================================================================= */}
        {/* HERO SECTION / CORE HEADER */}
        {/* ========================================================================= */}
        <section id="home" className="mb-14 scroll-mt-24">
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-2xl border border-slate-100 p-8 sm:p-12 text-white shadow-xl shadow-slate-200">
            
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />

            {/* Micro academic badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6 relative z-10">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-mono border border-indigo-500/30">
                Course Plan: {UNIVERSITY_INFO.syllabusVersion}
              </span>
              <span className="px-3 py-1 bg-amber-500/20 text-yellow-300 rounded-full text-xs font-mono border border-amber-500/30">
                ISA & SEE Certified
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono border border-emerald-500/30">
                KLE Tech Department of Math
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8">
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4 leading-tight">
                  Applied Statistics
                </h2>
                <p className="text-yellow-400 font-mono font-medium text-lg mb-2">
                  COURSE CODE: {UNIVERSITY_INFO.courseCode} — SEMESTER {UNIVERSITY_INFO.semester.toUpperCase()}
                </p>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                  {COURSE_OVERVIEW_TEXT}
                </p>

                {/* Grid metrics for course specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <div className="text-center sm:text-left">
                    <span className="block text-slate-400 text-xs font-mono uppercase tracking-wider">Contact Scale</span>
                    <span className="block text-xl font-bold font-display text-white mt-0.5">30 + 24 (Lab)</span>
                  </div>
                  <div className="text-center sm:text-left border-l border-white/10 pl-2">
                    <span className="block text-slate-400 text-xs font-mono uppercase tracking-wider">Academic Year</span>
                    <span className="block text-xl font-bold font-display text-white mt-0.5">{UNIVERSITY_INFO.academicYear}</span>
                  </div>
                  <div className="text-center sm:text-left border-l border-white/10 pl-2">
                    <span className="block text-slate-400 text-xs font-mono uppercase tracking-wider">Evaluation</span>
                    <span className="block text-xl font-bold font-display text-white mt-0.5">50 CIE + 50 SEE</span>
                  </div>
                  <div className="text-center sm:text-left border-l border-white/10 pl-2">
                    <span className="block text-slate-400 text-xs font-mono uppercase tracking-wider font-semibold text-yellow-300">Lab Reports</span>
                    <span className="block text-lg font-bold font-display text-emerald-400 mt-0.5">4 Solved Tasks</span>
                  </div>
                </div>

              </div>

              {/* Progress gauge and student info panel */}
              <div className="lg:col-span-4 bg-slate-900/60 p-6 rounded-xl border border-slate-700/50">
                <h4 className="font-display font-semibold text-sm text-slate-200 mb-4 border-b border-slate-700 pb-2 flex items-center justify-between">
                  <span>Student Workspace</span>
                  <span className="text-xs font-mono text-indigo-400 font-medium">Verified Lab Work</span>
                </h4>
                
                {/* Solved portfolio card */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/5">
                    <span className="text-slate-400 text-xs font-mono">STUDENT NAME</span>
                    <span className="text-white font-medium font-mono">{UNIVERSITY_INFO.authors[2].name}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/5">
                    <span className="text-slate-400 text-xs font-mono">REGISTRATION SRN</span>
                    <span className="text-white font-medium font-mono">{UNIVERSITY_INFO.authors[2].srn}</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded border border-white/5">
                    <span className="text-slate-400 text-xs font-mono">AUTHORITY PLANNER</span>
                    <span className="text-indigo-300 font-medium">{UNIVERSITY_INFO.authors[0].name}</span>
                  </div>
                </div>

                {/* Interactive slider indicator */}
                <div className="mt-5 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
                    <span>SEMESTER SYLLABUS RUN</span>
                    <span>100% COMPLETE</span>
                  </div>
                  <div className="h-2 rounded bg-slate-800 w-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 rounded transition-all duration-500" style={{ width: "100%" }} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button 
                      onClick={() => scrollTo("assessments")} 
                      className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold font-display tracking-wide transition shadow-md shadow-indigo-950/20 text-center uppercase"
                    >
                      Audit Reports
                    </button>
                    <button 
                      onClick={() => scrollTo("teaching-plan")} 
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium font-display tracking-wide border border-slate-700 transition text-center uppercase"
                    >
                      Teaching Plan
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* ABOUT THE COURSE & OBJECTIVES */}
        {/* ========================================================================= */}
        <section id="about" className="mb-14 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Core Info Details */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-display font-medium text-indigo-900 text-xs tracking-wider uppercase mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                  Academic Context & Syllabus Alignment
                </h3>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mb-4">
                  About the Course & Prerequisites
                </h2>
                <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    This subject represents the mathematical baseline for engineering decisions in precision manufacturing system automation. By studying applied statistics, students move beyond simple visual approximations to rigorous data-driven conclusions.
                  </p>
                  <p>
                    <strong>Pre-University Mathematics:</strong> To successfully engage with this syllabus, students require prior mastery over differential indices, basic linear integration, algebra of permutations and combinations, and standard variables calculations.
                  </p>
                </div>
              </div>

              {/* Course Assessment Matrices */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <span className="block text-xs font-mono text-slate-500 mb-3 uppercase tracking-wider">Course In-Semester & ESA Weightage Marks</span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block text-xl font-bold font-display text-indigo-900">30% CIE Paper</span>
                    <span className="block text-slate-500 text-xs leading-tight">In-Semester Ass. (ISA1/2) Test Papers</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block text-xl font-bold font-display text-indigo-900">20% Labs</span>
                    <span className="block text-slate-500 text-xs leading-tight">Continuous Lab File Valuation</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="block text-xl font-bold font-display text-indigo-900">50% Semester</span>
                    <span className="block text-slate-500 text-xs leading-tight">End Semester Exam (SEE-Theory)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Course Learning Objectives */}
            <div className="lg:col-span-5 bg-indigo-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-lg shadow-indigo-100 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-semibold text-amber-400 text-xs tracking-wider uppercase mb-3 flex items-center gap-2">
                  <span className="h-1 w-3 rounded-full bg-amber-400" />
                  Course Objectives
                </h3>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mb-6">
                  What KLE Tech Engineers Master
                </h2>
                <div className="space-y-4 text-slate-300 text-sm">
                  {COURSE_OBJECTIVES.map((obj, i) => (
                    <div key={i} className="flex gap-3 leading-relaxed">
                      <span className="font-mono font-semibold text-emerald-400">{i + 1}.</span>
                      <p>{obj}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-5 border-t border-indigo-950 flex items-center gap-4 text-xs font-mono text-indigo-300">
                <span>AUTHOR: Dr. Narayan Swamy</span>
                <span>•</span>
                <span>CHECKED BY: Dr. G.N. Bhadri</span>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* COURSE OUTCOMES (COs) & PROGRAM OUTCOMES (POs) */}
        {/* ========================================================================= */}
        <section id="outcomes" className="mb-14 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold tracking-wider uppercase border border-indigo-100">
              MAPPING METRIC
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-3 tracking-tight">
              Course Outcomes (COs) & PO Articulation
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Course outcomes represent specialized competency checkpoints mapping to standard national accreditation benchmarks (Graduate Program Outcomes).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Cards breakdown of the 5 COs */}
            <div className="lg:col-span-7 space-y-4">
              {COURSE_OUTCOMES.map((co) => (
                <div 
                  key={co.id} 
                  className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm transition hover:shadow-md hover:border-indigo-100 flex gap-4 items-start"
                >
                  <div className="h-10 w-10 bg-indigo-50 text-indigo-700 font-display font-bold text-sm rounded-lg flex items-center justify-center shrink-0 border border-indigo-100 shadow-inner">
                    {co.code}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-display font-bold text-slate-950 text-sm sm:text-base">
                        Course Outcome {co.id}
                      </h4>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full font-mono font-medium">
                        Weight: {co.weightage}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      {co.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Articulation Matrix */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-sm p-6 overflow-hidden">
              <h4 className="font-display font-bold text-slate-905 text-sm sm:text-base border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                <span>Articulation Matrix Mapping (CIE / SEE)</span>
                <span className="text-xs font-mono text-slate-400">L: Low, M: Medium, H: High</span>
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono uppercase">
                      <th className="py-2.5 px-3 border border-slate-800 rounded-tl-lg">Outcome</th>
                      {["PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO9", "PO10", "PO12"].map((po) => (
                        <th key={po} className="py-2.5 px-1.5 border border-slate-800 text-center">{po}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COURSE_OUTCOMES.map((co) => (
                      <tr key={co.id} className="hover:bg-indigo-50/50 transition">
                        <td className="py-3 px-3 font-mono font-bold text-indigo-700 border border-slate-100">{co.code}</td>
                        {["PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO9", "PO10", "PO12"].map((poKey) => {
                          const level = co.poMapping[poKey] || "-";
                          let colClass = "text-slate-300";
                          if (level === "H") colClass = "text-indigo-900 bg-indigo-500/20 font-bold border-indigo-200/50";
                          if (level === "M") colClass = "text-sky-800 bg-sky-400/20 font-semibold border-sky-100";
                          if (level === "L") colClass = "text-emerald-800 bg-emerald-400/10 font-medium";
                          return (
                            <td key={poKey} className={`py-3 text-center border border-slate-150 font-mono text-[11px] ${colClass}`}>
                              {level}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 p-4 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-800 leading-relaxed space-y-1">
                <p className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="h-4 w-4 shrink-0 text-amber-600" />
                  Standard PO Reference Definitions
                </p>
                <p><strong>PO1 (Math & Science):</strong> Highly aligned across all outcomes. Core theoretical baseline.</p>
                <p><strong>PO5 (Modern Tool Labs):</strong> Represented via intensive deployment of Python pandas/matplotlib/numpy within lab portfolios.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* DETAILED MODULE / UNIT BREAKDOWN */}
        {/* ========================================================================= */}
        <section id="units" className="mb-14 scroll-mt-24">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-indigo-100 pb-4 mb-6">
              <div>
                <h3 className="font-display font-medium text-indigo-800 text-xs tracking-wider uppercase flex items-center gap-1.5">
                  <Database className="h-4 w-4" /> Comprehensive Chapter Frameworks
                </h3>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-1">
                  Syllabus Unit & Chapter Modules
                </h2>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                {UNITS.map((unit) => (
                  <button
                    key={unit.id}
                    onClick={() => {
                      setCurrentUnitTab(unit.id);
                      const unitChaps = unit.chapters;
                      if (unitChaps.length > 0) setOpenedChapterId(unitChaps[0].id);
                    }}
                    className={`px-4 py-2 rounded-md text-xs sm:text-sm font-semibold transition ${currentUnitTab === unit.id ? "bg-indigo-900 text-white shadow" : "text-slate-600 hover:text-slate-950"}`}
                  >
                    Unit {unit.id === 1 ? "I" : "II"}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Unit View container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Unit Meta and list of chapters */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <h4 className="font-display font-bold text-indigo-900 text-sm uppercase tracking-wide">
                    {UNITS[currentUnitTab - 1].name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {UNITS[currentUnitTab - 1].description}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="block text-xs font-mono font-medium text-slate-400 mb-2 uppercase">Core Chapters</span>
                  {UNITS[currentUnitTab - 1].chapters.map((chap) => (
                    <button
                      key={chap.id}
                      onClick={() => setOpenedChapterId(chap.id)}
                      className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between ${openedChapterId === chap.id ? "bg-indigo-50 hover:bg-indigo-50 border-indigo-200 text-indigo-950" : "bg-white border-slate-100 hover:bg-slate-50 text-slate-700"}`}
                    >
                      <div className="scale-95 shrink-0 p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-indigo-900">
                        {renderIcon(chap.iconName, "h-4 w-4")}
                      </div>
                      <div className="flex-1 ml-4 pr-2">
                        <span className="block text-slate-500 font-mono text-[10px] leading-none uppercase">CHAPTER {chap.number} — {chap.hours} LECTURE HOURS</span>
                        <span className="block font-display font-bold text-sm sm:text-base truncate mt-1">{chap.title}</span>
                      </div>
                      <ChevronRight className={`h-5 w-5 shrink-0 transition-transform ${openedChapterId === chap.id ? "transform rotate-90 text-indigo-700" : "text-slate-400"}`} />
                    </button>
                  ))}
                </div>
                           {/* Opened Chapter Detailed Content Display Panel */}
              <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 min-h-[420px] flex flex-col justify-between">
                {(() => {
                  const chap = UNITS.flatMap(u => u.chapters).find(c => c.id === openedChapterId);
                  if (!chap) {
                    return (
                      <div className="text-center py-12 text-slate-400">
                        <BookOpen className="h-10 w-10 mx-auto" />
                        <p className="mt-2 text-sm">Select a chapter module to view details.</p>
                      </div>
                    );
                  }

                  return (
                    <div className="space-y-5 animate-fadeIn">
                      
                      {/* Title area */}
                      <div className="border-b border-slate-200 pb-4">
                        <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 font-mono text-xs rounded font-semibold uppercase tracking-wider">
                          KLE Tech Curriculum Module Chapter {chap.number}
                        </span>
                        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight mt-2">
                          {chap.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-mono mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span>Lecture Hours Scheduled: <strong className="text-indigo-800">{chap.hours} Hours</strong></span>
                          <span>•</span>
                          <span>Unit Tab: Unit {currentUnitTab}</span>
                        </p>
                      </div>

                      {/* Expanded Sub-Navigation Tabs */}
                      <div className="flex bg-slate-200/60 p-1 rounded-lg border border-slate-200 text-xs font-semibold gap-1">
                        <button
                          onClick={() => setChapterSubTab("summary")}
                          className={`flex-1 py-1.5 rounded transition cursor-pointer text-center ${chapterSubTab === "summary" ? "bg-white text-indigo-950 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                        >
                          Syllabus Target
                        </button>
                        <button
                          onClick={() => setChapterSubTab("theory")}
                          className={`flex-1 py-1.5 rounded transition cursor-pointer text-center ${chapterSubTab === "theory" ? "bg-white text-indigo-950 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                        >
                          Lecture Notes
                        </button>
                        <button
                          onClick={() => setChapterSubTab("solved")}
                          className={`flex-1 py-1.5 rounded transition cursor-pointer text-center ${chapterSubTab === "solved" ? "bg-white text-indigo-950 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                        >
                          Solved Math
                        </button>
                        <button
                          onClick={() => setChapterSubTab("sandbox")}
                          className={`flex-1 py-1.5 rounded transition cursor-pointer text-center flex items-center justify-center gap-1 ${chapterSubTab === "sandbox" ? "bg-white text-indigo-950 shadow-sm font-bold" : "text-slate-600 hover:text-slate-900"}`}
                        >
                          <Calculator className="h-3.5 w-3.5 shrink-0" /> Sandbox
                        </button>
                      </div>

                      {/* Content Renderers */}
                      {chapterSubTab === "summary" && (
                        <div className="space-y-4 animate-fadeIn">
                          {/* Anchor Problem section */}
                          <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="block text-xs font-mono font-bold text-amber-800 uppercase leading-none mb-1">Chapter Anchor Problem Context</span>
                              <span className="block font-display font-semibold text-sm text-slate-900">{chap.anchorProblem}</span>
                            </div>
                          </div>

                          {/* Content Columns of Objectives & Concepts */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                            {/* Objectives List */}
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                              <h5 className="font-display font-bold text-xs text-indigo-900 border-b border-slate-100 pb-2 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                                <Activity className="h-4 w-4 text-indigo-600" /> Topic Learning Objectives
                              </h5>
                              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                                {chap.learningObjectives.map((obj, i) => (
                                  <li key={i} className="flex gap-2">
                                    <span className="text-indigo-500 font-bold shrink-0">•</span>
                                    <span>{obj}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Key Concepts */}
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                              <h5 className="font-display font-bold text-xs text-emerald-950 border-b border-slate-100 pb-2 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                                <Database className="h-4 w-4 text-emerald-600" /> Key Concepts Covered
                              </h5>
                              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                                {chap.keyConcepts.map((concept, i) => (
                                  <li key={i} className="flex gap-2">
                                    <span className="text-emerald-500 font-bold shrink-0">✔</span>
                                    <span>{concept}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Practical Engineering Application Uses */}
                          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100/50">
                            <h4 className="font-display font-bold text-xs text-indigo-900 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                              <Cpu className="h-4.5 w-4.5 text-indigo-700" /> Automation & Robotic Implementations
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              {chap.practicalApplications.map((app, i) => (
                                <div key={i} className="bg-white p-2.5 rounded border border-indigo-100 text-[11.5px] leading-snug text-slate-700">
                                  <span className="block font-mono font-bold text-indigo-600 mb-0.5">CASE USE 0{i + 1}</span>
                                  {app}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {chapterSubTab === "theory" && (
                        <div className="space-y-4 animate-fadeIn">
                          {(() => {
                            const deepCopy = CHAPTERS_DEEP_DIVE.find(d => d.chapterId === chap.id);
                            if (!deepCopy) return <p className="text-xs text-slate-400">Loading lecture materials...</p>;
                            return (
                              <div className="space-y-4 text-sm">
                                <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
                                  <p className="font-semibold text-indigo-950 text-xs uppercase font-mono tracking-wider mb-2">Subject Conceptual Overview</p>
                                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">{deepCopy.deepTheory}</p>
                                </div>
                                <div className="p-4 bg-slate-900 text-white rounded-xl font-mono text-center relative overflow-hidden">
                                  <div className="absolute top-2 left-3 text-[9px] uppercase tracking-wider text-slate-400">Core Governing Equation</div>
                                  <div className="text-base sm:text-lg font-bold text-yellow-300 pt-3 pb-1 font-sans">{deepCopy.criticalFormula}</div>
                                </div>
                                <div className="space-y-2.5">
                                  <h5 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-wider">Governing Formulas Explained</h5>
                                  <div className="grid grid-cols-1 gap-2">
                                    {deepCopy.formulas.map((f, i) => (
                                      <div key={i} className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm text-xs space-y-1">
                                        <div className="flex flex-wrap justify-between items-center border-b border-slate-100 pb-1 text-[11px] font-mono gap-2">
                                          <span className="font-bold text-indigo-950">{f.label}</span>
                                          <span className="font-bold text-indigo-600 bg-indigo-50 px-1.5 rounded">{f.expression}</span>
                                        </div>
                                        <p className="text-slate-500 text-[11px] font-sans leading-relaxed">{f.explanation}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="p-3.5 bg-indigo-955 text-slate-300 rounded-xl text-[11px] leading-relaxed">
                                  <strong className="text-emerald-400 block mb-1 uppercase font-mono tracking-wider">KLE TECH Automation Insight:</strong> {deepCopy.industrialInsight}
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {chapterSubTab === "solved" && (
                        <div className="space-y-4 animate-fadeIn">
                          {(() => {
                            const deepCopy = CHAPTERS_DEEP_DIVE.find(d => d.chapterId === chap.id);
                            if (!deepCopy) return null;
                            return (
                              <div className="space-y-4 text-xs">
                                {deepCopy.solvedProblems.map((prob, i) => (
                                  <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                    <div className="bg-slate-900 text-white px-4 py-2.5 font-display font-bold text-[10px] uppercase tracking-wider">
                                      Solved Practice Proof Exercise
                                    </div>
                                    <div className="p-4 space-y-3.5">
                                      <div className="p-3 bg-amber-50/50 border border-amber-100 rounded text-slate-800 leading-relaxed font-sans text-xs">
                                        <strong className="text-amber-800">QUESTION STATEMENT:</strong> {prob.question}
                                      </div>
                                      <div className="space-y-2 border-t border-slate-100 pt-3 font-mono text-[11px] text-slate-600">
                                        <span className="block text-slate-400 font-bold uppercase tracking-wider">Analytical Calculus Steps:</span>
                                        <div className="space-y-1.5 bg-slate-50 p-3 rounded border border-slate-100">
                                          {prob.steps.map((step, idx) => (
                                            <p key={idx} className="leading-relaxed">{step}</p>
                                          ))}
                                        </div>
                                      </div>
                                      <div className="flex flex-wrap justify-between items-center bg-indigo-50 p-2.5 rounded border border-indigo-100 font-mono text-[11px] gap-2">
                                        <span className="text-indigo-900 font-bold">VERIFIED EXAM ESTIMATE:</span>
                                        <span className="font-bold text-indigo-950 bg-white border border-indigo-200 px-2.5 py-0.5 rounded shadow-sm">{prob.finalAnswer}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {chapterSubTab === "sandbox" && (
                        <div className="space-y-4 animate-fadeIn">
                          {chap.id === 1 && (
                            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs shadow-sm space-y-3.5">
                              <span className="block font-bold text-slate-900 uppercase tracking-wide border-b pb-1.5 font-sans">Chapter 1 Simulator: Outlier Check Box</span>
                              <p className="text-slate-500 leading-normal">Inspect physical positioning records. Alter the candidate values to test outlier alerts based on Turkey fences:</p>
                              <div className="flex flex-wrap items-center gap-2">
                                <input
                                  type="number"
                                  step="0.01"
                                  value={c1NewSample}
                                  onChange={(e) => setC1NewSample(Number(e.target.value))}
                                  className="border border-slate-300 rounded px-2 py-1 text-slate-800 w-24 text-center font-mono focus:ring-1 focus:ring-indigo-500 outline-none"
                                />
                                <button
                                  onClick={() => {
                                    if (!c1Samples.includes(c1NewSample)) {
                                      setC1Samples([...c1Samples, c1NewSample].sort((a,b)=>a-b));
                                    }
                                  }}
                                  className="bg-indigo-900 hover:bg-indigo-800 text-white rounded px-3 py-1 font-semibold text-[11px] font-mono cursor-pointer"
                                >
                                  Insert Sample Value
                                </button>
                                <button
                                  onClick={() => setC1Samples([50.02, 49.99, 50.01, 50.04, 49.97])}
                                  className="text-slate-500 hover:text-slate-900 underline text-[11px] font-mono cursor-pointer"
                                >
                                  Reset Trial Data
                                </button>
                              </div>
                              <div className="p-3 bg-slate-50 rounded border border-slate-100 font-mono text-[11px] text-slate-700 space-y-1.5 leading-normal">
                                <p>Active Dataset Sample: <strong>[{c1Samples.join(", ")}]</strong></p>
                                {(() => {
                                  const sorted = [...c1Samples].sort((a,b)=>a-b);
                                  const n = sorted.length;
                                  const q1 = sorted[Math.floor(n * 0.25)];
                                  const q3 = sorted[Math.floor(n * 0.75)];
                                  const iqr = q3 - q1;
                                  const lf = q1 - 1.5 * iqr;
                                  const uf = q3 + 1.5 * iqr;
                                  const isOutlier = c1NewSample < lf || c1NewSample > uf;
                                  return (
                                    <>
                                      <p>Q1 Cutoff: <strong>{q1.toFixed(3)}</strong>  |  Q3 Cutoff: <strong>{q3.toFixed(3)}</strong></p>
                                      <p>Computed IQR Bounds: <strong>{iqr.toFixed(3)}</strong>  |  Stable Range Limits: <strong>[{lf.toFixed(3)}, {uf.toFixed(3)}]</strong></p>
                                      <div className={`p-2.5 rounded border mt-2 flex justify-between items-center font-sans ${isOutlier ? "bg-red-50 border-red-200 text-red-900" : "bg-emerald-50 border-emerald-200 text-emerald-900"}`}>
                                        <span>Candidate {c1NewSample} checking status:</span>
                                        <span className="font-mono font-bold uppercase shrink-0">{isOutlier ? "🚨 SYSTEM OUTLIER" : "✔ STABLE VIBRATION"}</span>
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          )}

                          {chap.id === 2 && (
                            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs shadow-sm space-y-3.5">
                              <span className="block font-bold text-slate-900 uppercase tracking-wide border-b pb-1.5 font-sans">Chapter 2 Simulator: Redundancy Flow Tree</span>
                              <p className="text-slate-500 leading-normal">Conditional signal channels updated dynamically with sliding inputs from our diagnostic tab:</p>
                              {(() => {
                                const pF = bayesPf;
                                const pN = 1 - pF;
                                const pW_F = bayesPwf;
                                const pW_N = 0.05;
                                const totalP = (pW_F * pF) + (pW_N * pN);
                                const postF_W = totalP > 0 ? (pW_F * pF) / totalP : 0;
                                return (
                                  <div className="space-y-2 font-mono text-[11px] bg-slate-900 text-slate-200 p-4 rounded-lg border border-slate-800 leading-normal">
                                    <p className="text-indigo-400">⚡ Dynamic Signal Probability Branches:</p>
                                    <p className="pl-3 border-l border-slate-700">1) Signal [Failure & Warning]: {pF.toFixed(2)} × {pW_F.toFixed(2)} = <strong>{(pF * pW_F).toFixed(4)}</strong></p>
                                    <p className="pl-3 border-l border-slate-700">2) Signal [Normal & False Alarm]: {pN.toFixed(2)} × {pW_N.toFixed(2)} = <strong>{(pN * pW_N).toFixed(4)}</strong></p>
                                    <div className="p-2.5 bg-yellow-500/15 text-yellow-300 rounded border border-yellow-500/20 text-xs mt-2 font-sans font-medium flex justify-between">
                                      <span>Posterior Alarm Validity P(F|W):</span>
                                      <strong>{(postF_W * 100).toFixed(2)}%</strong>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          {chap.id === 3 && (
                            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs shadow-sm space-y-4">
                              <span className="block font-bold text-slate-900 uppercase tracking-wide border-b pb-1.5 font-sans">Chapter 3 Simulator: Binomial defect PCB tester</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                                <div>
                                  <label className="block text-slate-500 mb-1">Batch SMT Size N: <strong className="text-slate-900">{c3N}</strong></label>
                                  <input
                                    type="range"
                                    min="10"
                                    max="120"
                                    step="5"
                                    value={c3N}
                                    onChange={(e) => setC3N(Number(e.target.value))}
                                    className="w-full accent-indigo-950 cursor-pointer"
                                  />
                                </div>
                                <div>
                                  <label className="block text-slate-500 mb-1">Constant Defect Risk p: <strong className="text-slate-900">{(c3P * 100).toFixed(1)}%</strong></label>
                                  <input
                                    type="range"
                                    min="0.01"
                                    max="0.20"
                                    step="0.01"
                                    value={c3P}
                                    onChange={(e) => setC3P(Number(e.target.value))}
                                    className="w-full accent-indigo-950 cursor-pointer"
                                  />
                                </div>
                              </div>
                              {(() => {
                                const expected = c3N * c3P;
                                const sd = Math.sqrt(c3N * c3P * (1 - c3P));
                                const zeroDefectsProb = Math.pow(1 - c3P, c3N);
                                return (
                                  <div className="bg-slate-50 p-3 rounded border border-slate-100 font-mono text-[11px] leading-relaxed space-y-1.5">
                                    <p>Expected Defects E[X]: <strong>{expected.toFixed(2)} joints</strong></p>
                                    <p>Standard Deviation Sigma: <strong>{sd.toFixed(3)}</strong></p>
                                    <div className="p-2.5 bg-indigo-50 rounded border border-indigo-100 font-sans flex justify-between items-center mt-2.5 text-indigo-950 font-medium">
                                      <span>Yield Probability (0 defects) P(X = 0):</span>
                                      <strong className="text-indigo-900 font-mono text-xs">{(zeroDefectsProb * 100).toFixed(3)}%</strong>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          )}

                          {chap.id === 4 && (
                            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs shadow-sm space-y-4">
                              <span className="block font-bold text-slate-900 uppercase tracking-wide border-b pb-1.5 font-sans">Chapter 4 Simulator: t-Test bounds verifier</span>
                              <div>
                                <label className="block font-mono text-slate-500 mb-1.5">Adjust Observed Test Statistic: <strong className="text-slate-900">{c4TestValue.toFixed(2)}</strong></label>
                                <input
                                  type="range"
                                  min="-4.0"
                                  max="4.0"
                                  step="0.05"
                                  value={c4TestValue}
                                  onChange={(e) => setC4TestValue(Number(e.target.value))}
                                  className="w-full accent-indigo-950 cursor-pointer"
                                />
                              </div>
                              <div className="p-3 bg-slate-50 rounded border border-slate-100 font-mono text-[11px] leading-relaxed space-y-1.5">
                                <p>Reference bounds: <strong>two-tailed critical-t (5% significance) = +/- 2.064</strong></p>
                                {(() => {
                                  const isRejected = Math.abs(c4TestValue) > 2.064;
                                  return (
                                    <div className={`p-2.5 rounded border mt-2 flex justify-between items-center font-sans ${isRejected ? "bg-red-50 border-red-200 text-red-900" : "bg-emerald-50 border-emerald-200 text-emerald-900"}`}>
                                      <span>Hypothesis Decision status:</span>
                                      <span className="font-mono font-bold uppercase">{isRejected ? "❌ REJECT NULL" : "✔ ACCEPT STATUS QUO"}</span>
                                    </div>
                                  );
                                })()}
                              </div>
                            </div>
                          )}

                          {chap.id === 5 && (
                            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs shadow-sm space-y-3.5 text-slate-700">
                              <span className="block font-bold text-slate-900 uppercase tracking-wide border-b pb-1.5 font-sans">Chapter 5 Simulator: Pearson R-Classifier</span>
                              <p className="text-slate-500 leading-normal">Explore how the OLS slope adapts when measuring correlation indices in sensor lines:</p>
                              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                                <div className="bg-rose-50 text-rose-900 p-2 rounded border border-rose-100">
                                  <span>r = -0.99</span>
                                  <span className="block text-[8px] text-slate-400">Anti-aligned</span>
                                </div>
                                <div className="bg-slate-100 text-slate-500 p-2 rounded border border-slate-200">
                                  <span>r = +0.02</span>
                                  <span className="block text-[8px] text-slate-400">Random Walk</span>
                                </div>
                                <div className="bg-emerald-50 text-emerald-900 p-2 rounded border border-emerald-100">
                                  <span>r = +0.99</span>
                                  <span className="block text-[8px] text-slate-400">Co-aligned</span>
                                </div>
                              </div>
                              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded font-sans text-indigo-950 font-medium flex justify-between items-center text-xs">
                                <span>Joint Spindle Correlation Value:</span>
                                <strong className="text-indigo-900 font-mono text-xs">+0.9979 (Unidirectional)</strong>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  );
                })()}
              </div>         </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* WEEKLY TEACHING PLAN TIMELINE / SCHEDULE */}
        {/* ========================================================================= */}
        <section id="teaching-plan" className="mb-14 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold tracking-wider uppercase border border-emerald-100">
              SEMESTER TIMELINE
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-3 tracking-tight">
              Weekly Lesson Schedule & Laboratory Flow
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Teaching schedule tracking progress of lectures alongside laboratory experiments conducted directly in the Department of Mathematics workspace.
            </p>
          </div>

          {/* Interactive Timeline Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Timeline column */}
            <div className="lg:col-span-8 space-y-6 relative border-l-2 border-indigo-100 pl-4 sm:pl-6 ml-4">
              {WEEKLY_TEACHING_PLAN.map((week, idx) => (
                <div key={week.id} className="relative animate-none">
                  
                  {/* Floating timeline dot */}
                  <span className="absolute -left-10 sm:-left-12 top-1.5 h-6 w-6 rounded-full bg-indigo-900 border-4 border-white flex items-center justify-center text-white text-[9px] font-bold font-mono">
                    {idx + 1}
                  </span>

                  {/* Week block */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-150 shadow-sm hover:border-slate-300 hover:shadow-md transition">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2 mb-3">
                      <div>
                        <span className="font-display font-bold text-slate-900 text-base">{week.weekName}</span>
                        <span className="ml-3 font-mono text-xs text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 font-semibold">
                          {week.hours} theory contact hours
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">LECTURE {idx * 4 + 1} - {(idx + 1) * 4}</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="block text-slate-400 text-[10px] font-mono uppercase tracking-wider">Topics Mapped</span>
                        <p className="text-slate-700 text-sm leading-relaxed font-semibold mt-0.5">
                          {week.topics.join(" • ")}
                        </p>
                      </div>

                      {week.isLabIncluded && week.labActivity && (
                        <div className="bg-emerald-50/70 border border-emerald-150 rounded-lg p-3 flex items-start gap-3">
                          <FlaskConical className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-xs font-mono font-bold text-emerald-800 uppercase leading-none mb-1">MAPPED LAB WORK</span>
                            <span className="block text-xs text-slate-700 leading-relaxed font-semibold">{week.labActivity}</span>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                        <span>Expected Deliverable:</span>
                        <span className="text-indigo-900 font-medium">{week.deliverable}</span>
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </div>

            {/* Sticky summary statistics helper */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
                <h4 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-400" /> Teaching Hours Summary
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded">
                    <div>
                      <span className="block text-[11px] font-mono text-slate-400">THEORY LECTURES COMPLETE</span>
                      <span className="block text-xl font-bold font-display mt-0.5 text-white">30 Academic Hours</span>
                    </div>
                    <span className="h-8 w-8 rounded bg-indigo-500/10 text-indigo-400 font-display flex items-center justify-center font-bold text-sm">30</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded">
                    <div>
                      <span className="block text-[11px] font-mono text-slate-400">LAB SLOTS SPAN</span>
                      <span className="block text-xl font-bold font-display mt-0.5 text-white">11 Slots (~24 Hours)</span>
                    </div>
                    <span className="h-8 w-8 rounded bg-emerald-500/10 text-emerald-400 font-display flex items-center justify-center font-bold text-sm">11</span>
                  </div>
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded">
                    <div>
                      <span className="block text-[11px] font-mono text-slate-400">MAPPED EXPERIMENTS COMPLETE</span>
                      <span className="block text-xl font-bold font-display mt-0.5 text-white">5 Core Experiments</span>
                    </div>
                    <span className="h-8 w-8 rounded bg-amber-500/10 text-yellow-300 font-display flex items-center justify-center font-bold text-sm">5</span>
                  </div>
                </div>
              </div>

              {/* Classroom insights and checkups */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-sm">
                <h5 className="font-display font-bold text-slate-950 text-sm uppercase mb-3 flex items-center gap-1.5">
                  <Info className="h-4.5 w-4.5 text-indigo-600" /> Pedagogy Guidelines
                </h5>
                <p className="text-slate-600 leading-relaxed text-xs">
                  At KLE Tech Math, we combine theory and execution. Students are required to solve structural engineering calculation sheets analytically prior to validating the dataset outcomes inside Python code. This dual-loop guarantees both deep mathematical comprehension and functional computing skills.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-500 font-mono">Mapped to CIE Rubrics (Page 6)</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* LABORATORY EXPERIMENTS MATRIX */}
        {/* ========================================================================= */}
        <section id="labs" className="mb-14 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold tracking-wider uppercase border border-indigo-100">
              PRACTICAL TRAINING
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-3 tracking-tight">
              Python Laboratorial Syllabus Index
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              The continuous evaluation schedule contains 5 major experiments. Review grading structures, core requirements, and practical evaluation parameters.
            </p>
          </div>

          {/* Grid list of the 5 Lab experiments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LAB_EXPERIMENTS.map((expt) => (
              <div 
                key={expt.id} 
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:border-indigo-200 hover:shadow-md transition group"
              >
                <div>
                  
                  {/* Top tags */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <span className="font-mono text-xs font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      EXPERIMENT NO. 0{expt.number}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Slots: {expt.slots} (4 Hours)</span>
                  </div>

                  {/* Title and info */}
                  <h3 className="font-display font-bold text-slate-950 text-lg group-hover:text-indigo-900 transition mt-1.5">
                    {expt.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-mono mt-1 mb-4 leading-relaxed">
                    <strong>Context:</strong> {expt.engineeringContext}
                  </p>

                  <div className="space-y-3.5 text-xs">
                    
                    {/* Aim */}
                    <div className="bg-slate-50 p-3 rounded">
                      <span className="block font-mono font-bold text-slate-400 uppercase tracking-wide leading-none mb-1">AIMS & DESCRIPTION</span>
                      <p className="text-slate-700 leading-normal font-semibold">
                        {expt.aim}
                      </p>
                    </div>

                    {/* Objectives */}
                    <div>
                      <span className="block font-mono font-bold text-slate-400 uppercase tracking-wide mb-1.5">Learning Goals Mapped:</span>
                      <ul className="space-y-1 text-slate-600 leading-relaxed pl-2">
                        {expt.learningObjectives.map((obj, i) => (
                          <li key={i} className="flex gap-1.5 items-start">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics list */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {expt.metrics.map((met, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-150 rounded text-[10px] font-mono font-medium">
                          {met}
                        </span>
                      ))}
                    </div>

                  </div>

                </div>

                {/* Rubric summary expandable widget trigger */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <span className="block text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider">Evaluation Rubric Mapping</span>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                    <div className="p-1.5 bg-slate-50 border border-slate-150 rounded">
                      <span className="block font-bold text-slate-700">Code/Math</span>
                      <span className="block text-indigo-700 font-semibold mt-0.5">10 Marks</span>
                    </div>
                    <div className="p-1.5 bg-slate-50 border border-slate-150 rounded">
                      <span className="block font-bold text-slate-700">Interpret</span>
                      <span className="block text-indigo-700 font-semibold mt-0.5">4 Marks</span>
                    </div>
                    <div className="p-1.5 bg-slate-50 border border-slate-150 rounded">
                      <span className="block font-bold text-slate-700">Decision</span>
                      <span className="block text-indigo-700 font-semibold mt-0.5">6 Marks</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LAB ASSESSMENTS PORTAL (THE HIGH-INNOVATION TABBED DASH BOARD) */}
        {/* ========================================================================= */}
        <section id="assessments" className="mb-14 scroll-mt-24">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            
            {/* Design accents */}
            <div className="absolute top-0 right-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-indigo-500 left-0" />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-indigo-100 pb-5 mb-6 gap-4">
              <div>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded text-xs font-mono font-bold border border-amber-100 uppercase tracking-widest inline-block">
                  CIE Continuous Evaluation Portal
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-2 flex items-center gap-1.5">
                  <ClipboardCheck className="h-7 w-7 text-indigo-900" /> Math Lab Assessments Worksheets
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-1">
                  Active verified answers submitted by student: <strong className="text-indigo-800">Srushti G Joshi (SRN: 01FE24BAR014)</strong>. Audit mathematical proofs and Python execution.
                </p>
              </div>
              
              {/* Selector Tabs */}
              <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-lg border border-slate-200">
                <button
                  onClick={() => setActiveAssessmentTab("cnc")}
                  className={`px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wide font-display transition ${activeAssessmentTab === "cnc" ? "bg-indigo-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  id="tab-btn-cnc"
                >
                  Expt 1: CNC Spindle
                </button>
                <button
                  onClick={() => setActiveAssessmentTab("gripper")}
                  className={`px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wide font-display transition ${activeAssessmentTab === "gripper" ? "bg-indigo-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  id="tab-btn-gripper"
                >
                  Expt 2: Bayes Gripper
                </button>
                <button
                  onClick={() => setActiveAssessmentTab("distributions")}
                  className={`px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wide font-display transition ${activeAssessmentTab === "distributions" ? "bg-indigo-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  id="tab-btn-distributions"
                >
                  Expt 3: SMT Models
                </button>
                <button
                  onClick={() => setActiveAssessmentTab("hypothesis")}
                  className={`px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wide font-display transition ${activeAssessmentTab === "hypothesis" ? "bg-indigo-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
                  id="tab-btn-hypothesis"
                >
                  Expt 4: Statistical Inference
                </button>
              </div>
            </div>

            {/* Assessment workspace contents */}
            <AnimatePresence mode="wait">
              
              {/* ======================= REPORT 1: CNC WORKSPACE======================== */}
              {activeAssessmentTab === "cnc" && (
                <motion.div
                  key="cnc-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="bg-indigo-950 p-6 rounded-xl border border-indigo-900 text-white">
                    <div className="flex flex-wrap justify-between items-center bg-white/5 px-4 py-2.5 rounded-lg text-xs gap-4 font-mono border border-white/10 mb-4 shadow-inner">
                      <span className="font-bold tracking-wide">PROJECT NO. 1 — PRECISION MACHINING</span>
                      <span className="font-extrabold text-amber-400 select-all tracking-wider">SRUSHTI G JOSHI (01FE24BAR014)</span>
                      <button
                        onClick={() => downloadLabPDF("cnc")}
                        className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 hover:shadow-lg font-display font-black tracking-wider uppercase rounded-md cursor-pointer transition-all shadow border border-amber-500 text-[11px] shrink-0"
                      >
                        <Download className="h-3.5 w-3.5 shrink-0 text-slate-950 animate-bounce" style={{ animationDuration: '3s' }} /> Download PDF Sheet
                      </button>
                    </div>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white leading-tight">
                      {LAB_ASSESSMENTS_DATA.assessment1.title}
                    </h3>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                      {LAB_ASSESSMENTS_DATA.assessment1.context}
                    </p>
                  </div>

                  {/* Calculations and variables overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Summary Parameters Table */}
                    <div className="lg:col-span-6 space-y-4">
                      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="bg-slate-900 text-white px-4 py-2.5 font-display font-bold text-xs uppercase tracking-wider">
                          Summary Statistical Parameters Mapped
                        </div>
                        <div className="divide-y divide-slate-150 text-xs">
                          {LAB_ASSESSMENTS_DATA.assessment1.parameters.map((p, i) => (
                            <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 transition">
                              <div>
                                <span className="block font-bold text-slate-900">{p.name}</span>
                                <span className="block text-slate-500 text-[10px] sm:text-[11px] mt-0.5 leading-none">{p.description}</span>
                              </div>
                              <span className="font-mono font-bold text-indigo-900 bg-indigo-50 border border-indigo-150 px-2.5 py-1 rounded">
                                {p.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Plots presentation & Interactive Centering Slider */}
                    <div className="lg:col-span-6 space-y-6">
                      
                      {/* Custom Box Plot rendering element */}
                      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <span className="block text-xs font-mono font-bold text-indigo-900 mb-1 leading-none uppercase">Interactive Spindle Calibration Sim</span>
                        <span className="block text-xs text-slate-500 mb-4 leading-snug">Drag slide pointers to adjust production focus center mean and watch capability boundaries adapt:</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                          <div>
                            <span className="block text-xs font-mono font-semibold text-slate-600 mb-1">Process Mean Cutter (mm): <strong className="text-indigo-800">{processMean.toFixed(4)} mm</strong></span>
                            <input 
                              type="range" 
                              min="49.95" 
                              max="50.05" 
                              step="0.001" 
                              value={processMean}
                              onChange={(e) => setProcessMean(Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none accent-indigo-950" 
                              id="range-slider-mean"
                            />
                            <span className="text-[10px] text-slate-400 font-mono flex justify-between mt-0.5"><span>49.95mm</span><span>50.05mm</span></span>
                          </div>
                          <div>
                            <span className="block text-xs font-mono font-semibold text-slate-600 mb-1">Standard Dev (Variation): <strong className="text-indigo-800">{(processSD * 1000).toFixed(1)} μm</strong></span>
                            <input 
                              type="range" 
                              min="0.005" 
                              max="0.05" 
                              step="0.002" 
                              value={processSD}
                              onChange={(e) => setProcessSD(Number(e.target.value))}
                              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none accent-indigo-950" 
                              id="range-slider-sd"
                            />
                            <span className="text-[10px] text-slate-400 font-mono flex justify-between mt-0.5"><span>5μm</span><span>50μm</span></span>
                          </div>
                        </div>

                        {/* Interactive SVG Normal Curve + specification bounds representation */}
                        <div className="relative mt-4 bg-slate-900 p-4 rounded-lg flex flex-col justify-between items-center overflow-hidden">
                          <span className="absolute top-2 left-3 text-[10px] uppercase font-mono text-slate-400">Normal density vs target specs</span>
                          
                          {/* Live parameters bar */}
                          <div className="flex gap-4 text-white text-[11px] font-mono mb-2 self-start pt-4">
                            <span>Process CV%: <strong className="text-yellow-300">{((processSD / processMean) * 100).toFixed(4)}%</strong></span>
                            <span>95% limits: <strong className="text-yellow-300">{(processMean - 1.96 * processSD).toFixed(2)} - {(processMean + 1.96 * processSD).toFixed(2)} mm</strong></span>
                          </div>

                          <svg viewBox="0 0 400 140" className="w-full h-36">
                            
                            {/* Grid boundaries for specifications 49.95 to 50.05 */}
                            <line x1="100" y1="20" x2="100" y2="120" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,3" />
                            <text x="104" y="30" fill="#f43f5e" fontSize="9" fontFamily="monospace">SPEC LSL 49.95</text>
                            
                            <line x1="300" y1="20" x2="300" y2="120" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,3" />
                            <text x="248" y="30" fill="#f43f5e" fontSize="9" fontFamily="monospace">SPEC USL 50.05</text>

                            {/* Ideal target line X = 50.00mm */}
                            <line x1="200" y1="10" x2="200" y2="125" stroke="#eab308" strokeWidth="1" />
                            <text x="187" y="130" fill="#eab308" fontSize="8" fontFamily="monospace">TARGET 50.00</text>

                            {/* Shifting Bell Curve Path calculated inside SVG coords */}
                            {(() => {
                              // Convert process mean & SD into translation offsets
                              // x mapped: 200 is 50.00. 100 coordinates scale represent 0.05mm. So 1 coordinate is 0.0005mm
                              // x_coord = 200 + (val - 50.00) / 0.05 * 100
                              const meanOffset = ((processMean - 50.00) / 0.05) * 100;
                              const sdScale = (processSD / 0.05) * 100;
                              
                              let pathD = `M 0,110 `;
                              for (let px = 20; px <= 380; px += 2) {
                                const val = 50.00 + ((px - 200) / 100) * 0.05;
                                const exponent = -0.5 * Math.pow((val - processMean) / processSD, 2);
                                // Normal density height mapped to 90px max height
                                const height = 80 * Math.exp(exponent) * (0.01 / processSD);
                                const py = 110 - Math.min(height, 90);
                                pathD += `L ${px},${py} `;
                              }
                              pathD += `L 400,110`;
                              return (
                                <g>
                                  {/* Bell curve shaded area */}
                                  <path d={pathD} fill="rgba(99, 102, 241, 0.25)" stroke="#6366f1" strokeWidth="2.5" />
                                  
                                  {/* Actual Mean Pointer */}
                                  <line x1={200 + meanOffset} y1="110" x2={200 + meanOffset} y2="10" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="2,2" />
                                  <text x={203 + meanOffset} y="55" fill="#6366f1" fontSize="9" fontFamily="monospace" fontWeight="bold">
                                    MEAN {processMean.toFixed(4)}
                                  </text>
                                </g>
                              );
                            })()}

                            {/* Ground baseline */}
                            <line x1="10" y1="110" x2="390" y2="110" stroke="#475569" strokeWidth="1.5" />
                          </svg>
                          <div className="flex justify-between w-full text-slate-500 font-mono text-[9px] pt-1 border-t border-slate-800">
                            <span>49.90 mm</span>
                            <span>49.95 mm (LSL)</span>
                            <span>50.00 mm (Focus Target)</span>
                            <span>50.05 mm (USL)</span>
                            <span>50.10 mm</span>
                          </div>
                        </div>

                      </div>

                      {/* Code and Analysis panels */}
                      <div className="bg-slate-900 rounded-xl p-5 border border-slate-850 text-xs font-mono text-indigo-200">
                        <span className="block text-slate-400 font-bold mb-2 uppercase text-[10px] tracking-wider flex items-center gap-1">
                          <Terminal className="h-4.5 w-4.5" /> Output Verification Code snippet
                        </span>
                        <pre className="max-h-48 overflow-y-auto leading-relaxed text-[11px] bg-slate-950 p-3 rounded border border-slate-800">
                          {LAB_ASSESSMENTS_DATA.assessment1.codeSnippet}
                        </pre>
                      </div>

                    </div>

                  </div>

                  {/* Compulsory structured interpretation writing */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-display font-bold text-slate-950 text-sm uppercase mb-3 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <FileText className="h-4.5 w-4.5 text-indigo-700" /> Engineering Analysis & Interpretation Report
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {LAB_ASSESSMENTS_DATA.assessment1.analysis}
                    </p>
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-110 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-700 leading-relaxed">
                        <p className="font-bold text-emerald-900 uppercase tracking-wide">COMPULSORY DECISION COMPLIANCE</p>
                        <p className="mt-0.5"><strong>Suite-Recommendation:</strong> No mechanical calibration is requested at this cycle. Spindle variation lies strictly within boundaries. The slight systemic offset of +0.0087 mm is well within tolerance bounds and poses zero drift risks.</p>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* ======================= REPORT 2: BAYESIAN WORKSPACE======================== */}
              {activeAssessmentTab === "gripper" && (
                <motion.div
                  key="gripper-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="bg-indigo-950 p-6 rounded-xl border border-indigo-900 text-white">
                    <div className="flex flex-wrap justify-between items-center bg-white/5 px-4 py-2.5 rounded-lg text-xs gap-4 font-mono border border-white/10 mb-4 shadow-inner">
                      <span className="font-bold tracking-wide">PROJECT NO. 2 — PROBABILISTIC SECURITY</span>
                      <span className="font-extrabold text-amber-400 select-all tracking-wider">SRUSHTI G JOSHI (01FE24BAR014)</span>
                      <button
                        onClick={() => downloadLabPDF("gripper")}
                        className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 hover:shadow-lg font-display font-black tracking-wider uppercase rounded-md cursor-pointer transition-all shadow border border-amber-500 text-[11px] shrink-0"
                      >
                        <Download className="h-3.5 w-3.5 shrink-0 text-slate-950 animate-bounce" style={{ animationDuration: '3s' }} /> Download PDF Sheet
                      </button>
                    </div>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white leading-tight">
                      {LAB_ASSESSMENTS_DATA.assessment2.title}
                    </h3>
                  </div>

                  {/* Calculations and variables overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Diagnostic Slider tool Panel */}
                    <div className="lg:col-span-6 space-y-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                      <h4 className="font-display font-bold text-sm text-indigo-900 border-b border-slate-100 pb-2 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                        <Calculator className="h-4.5 w-4.5 text-indigo-600" /> Dynamic Bayesian Diagnostics Tool
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        Tweak the slider knobs representing sensor and failure rates to see how the mathematical diagnostic posterior updates in real-time.
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="flex justify-between text-xs font-mono font-semibold text-slate-600 mb-1">
                            <span>Base Gripper Failure P(F)</span>
                            <span className="text-indigo-800 font-bold">{(bayesPf * 100).toFixed(1)}%</span>
                          </label>
                          <input 
                            type="range" 
                            min="0.01" 
                            max="0.25" 
                            step="0.01" 
                            value={bayesPf}
                            onChange={(e) => setBayesPf(Number(e.target.value))}
                            className="w-full accent-indigo-950 cursor-pointer"
                            id="bayes-pf-slider"
                          />
                        </div>

                        <div>
                          <label className="flex justify-between text-xs font-mono font-semibold text-slate-600 mb-1">
                            <span>Sensor Sensitivity P(W|F)</span>
                            <span className="text-indigo-800 font-bold">{(bayesPwf * 100).toFixed(1)}%</span>
                          </label>
                          <input 
                            type="range" 
                            min="0.70" 
                            max="0.99" 
                            step="0.01" 
                            value={bayesPwf}
                            onChange={(e) => setBayesPwf(Number(e.target.value))}
                            className="w-full accent-indigo-950 cursor-pointer"
                            id="bayes-pwf-slider"
                          />
                        </div>

                        <div>
                          <label className="flex justify-between text-xs font-mono font-semibold text-slate-600 mb-1">
                            <span>False Alarm Rate P(W|N)</span>
                            <span className="text-indigo-800 font-bold">{(bayesPwn * 100).toFixed(1)}%</span>
                          </label>
                          <input 
                            type="range" 
                            min="0.01" 
                            max="0.15" 
                            step="0.01" 
                            value={bayesPwn}
                            onChange={(e) => setBayesPwn(Number(e.target.value))}
                            className="w-full accent-indigo-950 cursor-pointer"
                            id="bayes-pwn-slider"
                          />
                        </div>
                      </div>

                      {/* Calculations steps updates visually */}
                      <div className="mt-6 pt-4 border-t border-slate-105 space-y-3 font-mono text-xs text-slate-600">
                        <div className="p-2.5 bg-slate-900 text-white rounded border border-slate-800 space-y-1.5 leading-relaxed text-[11px]">
                          <div>
                            <span className="text-indigo-400">P(Warning Alerts) P(W):</span>
                            <span className="block text-slate-200 mt-0.5">
                              P(W) = ({bayesPwf} × {bayesPf}) + ({bayesPwn} × {(1-bayesPf).toFixed(2)}) = <strong>{bayesCalcObj.pW}</strong>
                            </span>
                          </div>
                          <div>
                            <span className="text-indigo-400">P(True Failure | Action Alarm) P(F|W):</span>
                            <span className="block text-slate-200 mt-0.5">
                              P(F|W) = ({bayesPwf} × {bayesPf}) / {bayesCalcObj.pW} = <strong className="text-yellow-400 font-bold text-sm">{(bayesCalcObj.pF_W * 100).toFixed(2)}%</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Report analytical details */}
                    <div className="lg:col-span-6 space-y-6">
                      
                      {/* Solved Results panel */}
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
                        <div className="bg-slate-900 text-white px-4 py-2.5 font-display font-bold text-xs uppercase tracking-wider">
                          Analytical Bayesian Outcomes Sheet
                        </div>
                        <div className="divide-y divide-slate-100">
                          {LAB_ASSESSMENTS_DATA.assessment2.steps.map((step, idx) => (
                            <div key={idx} className="p-4 hover:bg-slate-50 transition">
                              <span className="block font-bold text-indigo-900">{step.title}</span>
                              <div className="bg-slate-50 font-mono text-[11px] p-2 rounded border border-slate-100 mt-2 space-y-1">
                                <span className="block text-slate-400">Formulation: {step.formula}</span>
                                <span className="block text-slate-700 leading-normal font-semibold">
                                  {idx === 0 
                                    ? `P(W) = (${bayesPwf} × ${bayesPf}) + (${bayesPwn} × ${(1-bayesPf).toFixed(2)}) = ${bayesCalcObj.pW}`
                                    : `P(F|W) = (${bayesPwf} × ${bayesPf}) / ${bayesCalcObj.pW} = ${(bayesCalcObj.pF_W * 100).toFixed(2)}%`}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Code presentation */}
                      <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-xs font-mono text-indigo-200">
                        <span className="block text-slate-400 font-bold mb-2 uppercase text-[10px] tracking-wider flex items-center gap-1">
                          <Terminal className="h-4.5 w-4.5" /> 10k Monte Carlo validation script
                        </span>
                        <pre className="max-h-48 overflow-y-auto leading-relaxed text-[11px] bg-slate-950 p-3 rounded border border-slate-800">
                          {LAB_ASSESSMENTS_DATA.assessment2.codeSnippet}
                        </pre>
                      </div>

                    </div>

                  </div>

                  {/* Compulsory structured interpretation writing */}
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h4 className="font-display font-bold text-slate-950 text-sm uppercase mb-3 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <FileText className="h-4.5 w-4.5 text-indigo-700" /> Engineering Analysis & Interpretation Report
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {LAB_ASSESSMENTS_DATA.assessment2.analysis}
                    </p>
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-110 flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs text-slate-700 leading-relaxed">
                        <p className="font-bold text-emerald-900 uppercase tracking-wide">DIAGNOSTIC PROCESS REMEDY PLAN</p>
                        <p className="mt-0.5"><strong>Action Plan:</strong> Do not trigger immediate machine line stops based on a single warning alert. We recommend placing a secondary tactile vibration checking sensor to fuse inputs, reducing the joint false warning rate from 5% down below 0.5%, which elevates posterior reliability past 90%.</p>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* ======================= REPORT 3: DISTRIBUTION MODELS ======================== */}
              {activeAssessmentTab === "distributions" && (
                <motion.div
                  key="distributions-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="bg-indigo-950 p-6 rounded-xl border border-indigo-900 text-white">
                    <div className="flex flex-wrap justify-between items-center bg-white/5 px-4 py-2.5 rounded-lg text-xs gap-4 font-mono border border-white/10 mb-4 shadow-inner">
                      <span className="font-bold tracking-wide">PROJECT NO. 3 — INDUSTRIAL DISTRIBUTIONS</span>
                      <span className="font-extrabold text-amber-400 select-all tracking-wider">SRUSHTI G JOSHI (01FE24BAR014)</span>
                      <button
                        onClick={() => downloadLabPDF("distributions")}
                        className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 hover:shadow-lg font-display font-black tracking-wider uppercase rounded-md cursor-pointer transition-all shadow border border-amber-500 text-[11px] shrink-0"
                      >
                        <Download className="h-3.5 w-3.5 shrink-0 text-slate-950 animate-bounce" style={{ animationDuration: '3s' }} /> Download PDF Sheet
                      </button>
                    </div>
                    <span className="text-xs font-mono uppercase text-slate-400">MATH LABORATORY EXPERIMENT NO 3</span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl mt-1 tracking-tight text-white leading-tight">
                      {LAB_ASSESSMENTS_DATA.assessment3.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Distribution Cards */}
                    <div className="lg:col-span-7 space-y-4">
                      {LAB_ASSESSMENTS_DATA.assessment3.parts.slice(0, 4).map((part) => (
                        <div key={part.partId} className="bg-white rounded-xl border border-slate-150 p-5 shadow-sm hover:border-slate-350 transition">
                          <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-150 text-indigo-700 font-mono text-[10px] rounded font-semibold uppercase">
                            {part.title}
                          </span>
                          <p className="text-xs text-slate-500 font-semibold font-mono mt-1 mb-3">
                            {part.context}
                          </p>
                          
                          <div className="divide-y divide-slate-100 border-t border-slate-100 text-xs">
                            {part.questions?.map((q, idx) => (
                              <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                                <div className="space-y-0.5">
                                  <span className="block font-semibold text-slate-800">{q.q}</span>
                                  <span className="block text-[10.5px] font-mono text-slate-400">Equation: {q.formula}</span>
                                </div>
                                <span className="font-mono bg-indigo-900 text-white font-semibold px-2 rounded-md self-start sm:self-center py-1">
                                  {q.calc}
                                </span>
                              </div>
                            ))}
                          </div>

                        </div>
                      ))}
                    </div>

                    {/* Torque vs Vibration regression display */}
                    <div className="lg:col-span-5 space-y-6">
                      
                      {/* Correlation Analysis Card */}
                      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-150 text-emerald-850 font-mono text-[10px] rounded font-semibold uppercase">
                          PART E: CALIBRATION CORRELATION STUDIES
                        </span>
                        <p className="text-xs text-slate-500 font-mono mt-1 mb-4 leading-normal">
                          Modeling correlation between fastening servo torque and mechanical spindle vibration indicators:
                        </p>

                        <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex flex-col justify-between items-center text-white mb-4">
                          <span className="text-[10px] uppercase font-mono text-slate-400 self-start">Interactive regression curve</span>
                          
                          {/* Scatter plot chart drawn dynamically inside SVG */}
                          <svg viewBox="0 0 300 150" className="w-full h-40 mt-2">
                            
                            {/* Grid boundaries */}
                            <line x1="40" y1="20" x2="40" y2="130" stroke="#334155" strokeWidth="1" />
                            <line x1="40" y1="130" x2="280" y2="130" stroke="#334155" strokeWidth="1" />
                            
                            {/* Fast regression calculations */}
                            {(() => {
                              // range X: 11 to 18. map x coordination: x_val -> 40 + (val - 10) / 10 * 220
                              // range Y: 2.0 to 3.6. map y coordination: y_val -> 130 - (val - 1.5) / 2.5 * 100
                              const mapX = (val: number) => 40 + ((val - 10) / 10) * 220;
                              const mapY = (val: number) => 130 - ((val - 1.5) / 2.5) * 100;

                              const points = torqueX.map((x, i) => ({
                                x: mapX(x),
                                y: mapY(vibrationY[i]),
                                rawX: x,
                                rawY: vibrationY[i]
                              }));

                              return (
                                <g>
                                  {/* Regression continuous line */}
                                  <line 
                                    x1={mapX(10)} 
                                    y1={mapY(regressionLine.slope * 10 + regressionLine.intercept)} 
                                    x2={mapX(20)} 
                                    y2={mapY(regressionLine.slope * 20 + regressionLine.intercept)} 
                                    stroke="#f43f5e" 
                                    strokeWidth="1.5" 
                                  />

                                  {/* Data points */}
                                  {points.map((pt, idx) => (
                                    <g key={idx} className="group cursor-pointer">
                                      <circle cx={pt.x} cy={pt.y} r="4.5" fill="#38bdf8" stroke="#1e1b4b" strokeWidth="1" />
                                      <text x={pt.x + 6} y={pt.y + 3} fill="#cbd5e1" fontSize="7" fontFamily="monospace">
                                        ({pt.rawX},{pt.rawY})
                                      </text>
                                    </g>
                                  ))}
                                </g>
                              );
                            })()}

                            <text x="5" y="70" fill="#94a3b8" fontSize="8" transform="rotate(-90 40 70)">VIB (mm/s)</text>
                            <text x="130" y="145" fill="#94a3b8" fontSize="8">TORQUE X (Nm)</text>
                          </svg>

                          <div className="flex justify-between w-full text-slate-500 font-mono text-[8px] pt-1 border-t border-slate-800">
                            <span>X Range: 10 - 20 Nm</span>
                            <span>Model Fit: Y = {regressionLine.intercept.toFixed(2)} + {regressionLine.slope.toFixed(2)}X</span>
                            <span>R² = {regressionLine.rSquare.toFixed(4)}</span>
                          </div>
                        </div>

                        {/* Calculated parameters list */}
                        <div className="divide-y divide-slate-100 border-t border-slate-100 text-xs">
                          {LAB_ASSESSMENTS_DATA.assessment3.parts[4].calculations?.map((calc, i) => (
                            <div key={i} className="py-2 flex justify-between items-center text-[11px] font-mono leading-none">
                              <span className="text-slate-500">{calc.param}:</span>
                              <span className="font-bold text-slate-900">{calc.value}</span>
                            </div>
                          ))}
                        </div>

                      </div>

                    </div>

                  </div>

                </motion.div>
              )}

              {/* ======================= REPORT 4: HYPOTHESIS TESTING ======================== */}
              {activeAssessmentTab === "hypothesis" && (
                <motion.div
                  key="hypothesis-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="bg-indigo-950 p-6 rounded-xl border border-indigo-900 text-white">
                    <div className="flex flex-wrap justify-between items-center bg-white/5 px-4 py-2.5 rounded-lg text-xs gap-4 font-mono border border-white/10 mb-4 shadow-inner">
                      <span className="font-bold tracking-wide">PROJECT NO. 4 — STATISTICAL HYPOTHESIS</span>
                      <span className="font-extrabold text-amber-400 select-all tracking-wider">SRUSHTI G JOSHI (01FE24BAR014)</span>
                      <button
                        onClick={() => downloadLabPDF("hypothesis")}
                        className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 hover:shadow-lg font-display font-black tracking-wider uppercase rounded-md cursor-pointer transition-all shadow border border-amber-500 text-[11px] shrink-0"
                      >
                        <Download className="h-3.5 w-3.5 shrink-0 text-slate-950 animate-bounce" style={{ animationDuration: '3s' }} /> Download PDF Sheet
                      </button>
                    </div>
                    <span className="text-xs font-mono uppercase text-slate-400">MATH LABORATORY EXPERIMENT NO 4</span>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl mt-1 tracking-tight text-white leading-tight">
                      {LAB_ASSESSMENTS_DATA.assessment4.title}
                    </h3>
                  </div>

                  {/* Selector tabs for hypothesis datasets */}
                  <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-205 max-w-full">
                    {LAB_ASSESSMENTS_DATA.assessment4.datasets.map((ds) => (
                      <button
                        key={ds.id}
                        onClick={() => setSelectedHypDataset(ds.id)}
                        className={`flex-1 px-3 py-2 rounded-md text-[11px] sm:text-xs font-bold uppercase transition ${selectedHypDataset === ds.id ? "bg-indigo-900 text-white shadow" : "text-slate-600 hover:text-slate-900"}`}
                        id={`hyp-ds-btn-${ds.id}`}
                      >
                        Dataset {ds.id}
                      </button>
                    ))}
                  </div>

                  {/* Calculations breakdown on selected dataset */}
                  {(() => {
                    const ds = LAB_ASSESSMENTS_DATA.assessment4.datasets.find(d => d.id === selectedHypDataset);
                    if (!ds) return null;

                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Analytical breakdown */}
                        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                          <div>
                            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 p-1 rounded">
                              Station Checklist: {ds.stationName}
                            </span>
                            <h4 className="font-display font-bold text-lg text-slate-950 mt-2.5">
                              Claim Context Goal
                            </h4>
                            <p className="text-slate-500 font-medium text-xs font-mono mt-1 leading-normal">
                              {ds.claim}
                            </p>
                          </div>

                          <div className="space-y-3 pt-2 text-xs">
                            <div className="p-3 bg-slate-50 rounded border border-slate-100">
                              <span className="block font-mono font-bold text-slate-400 uppercase tracking-wide leading-none mb-1">SAMPLE PARAMETERS</span>
                              <p className="text-slate-700 font-semibold">{ds.stats}</p>
                            </div>
                            <div className="p-3 bg-slate-50 rounded border border-slate-100">
                              <span className="block font-mono font-bold text-slate-400 uppercase tracking-wide leading-none mb-1">CONFIDENCE BOUNDS</span>
                              <p className="text-slate-755 font-semibold">{ds.interval}</p>
                            </div>
                          </div>

                          {/* Hypotheses statements */}
                          <div className="border-t border-slate-100 pt-4 space-y-3 text-xs">
                            <span className="block font-mono font-bold text-slate-400 uppercase tracking-wide">Analytical Hypothesis Decider</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="bg-indigo-50/50 p-3 rounded border border-indigo-100">
                                <span className="block text-[10px] text-indigo-800 font-mono font-semibold">Null Hypothesis</span>
                                <p className="font-mono mt-1 font-semibold">{ds.test.nullHyp}</p>
                              </div>
                              <div className="bg-indigo-50/50 p-3 rounded border border-indigo-100">
                                <span className="block text-[10px] text-indigo-805 font-mono font-semibold">Alternative Hypothesis</span>
                                <p className="font-mono mt-1 font-semibold">{ds.test.altHyp}</p>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Outcomes & recommendations */}
                        <div className="lg:col-span-5 space-y-6">
                          
                          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-white space-y-4">
                            <div className="border-b border-slate-800 pb-2.5 flex items-center justify-between">
                              <span className="block text-xs font-mono text-slate-400">DECISION GATE CHECK</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${ds.test.decision === "REJECT H0" ? "bg-red-500/20 text-red-300 border border-red-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"}`}>
                                {ds.test.decision}
                              </span>
                            </div>

                            <div className="space-y-3 font-mono text-xs text-slate-300 leading-relaxed">
                              <p>Test Statistic: <strong className="text-yellow-400 font-bold">{ds.test.statistic}</strong></p>
                              <p>Calculated p-value: <strong className="text-yellow-400 font-bold">{ds.test.pValue}</strong></p>
                              <p>Significance Threshold: <strong className="text-yellow-400 font-bold">alpha = 0.05</strong></p>
                            </div>

                            <div className="p-3 bg-white/5 rounded border border-white/5 text-[11px] text-indigo-300 leading-normal">
                              {ds.test.conclusion}
                            </div>
                          </div>

                          {/* Sample Size determination cards */}
                          <div className="bg-white p-5 rounded-xl border border-slate-200">
                            <span className="px-2 py-0.5 bg-purple-50 border border-purple-150 text-purple-800 font-mono text-[10px] rounded font-semibold uppercase leading-none">
                              Required sample size calculation
                            </span>
                            <h4 className="font-display font-bold text-slate-900 mt-2 text-sm leading-snug">
                              Mastering precision in future welding study tracks
                            </h4>
                            <div className="bg-slate-50 p-3 rounded font-mono text-[11px] text-slate-600 space-y-1.5 mt-3 leading-normal border border-slate-100">
                              <p className="text-slate-400">Formula: {LAB_ASSESSMENTS_DATA.assessment4.sampleSizeDetermination.formula}</p>
                              <p className="text-slate-700 font-semibold">{LAB_ASSESSMENTS_DATA.assessment4.sampleSizeDetermination.calculation}</p>
                            </div>
                          </div>

                        </div>

                      </div>
                    );
                  })()}

                </motion.div>
              )}

            </AnimatePresence>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* ASSIGNMENTS AND CLASSROOM HELPERS */}
        {/* ========================================================================= */}
        <section id="helper" className="mb-14 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl opacity-60" />
          
          <div className="max-w-3xl mb-8 relative z-10">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">Interactive Problem Solver</span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
              Classroom Review Questions & Solvers
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              We present select challenging review questions extracted from the official Course Plan. Click on card questions to see analytical mathematical formulas, derivations, and solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            
            {/* Question 1 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-indigo-400 font-bold block mb-1">CHAPTER 1: SIGNAL DISPERSION COMPARATIVE TRACKS</span>
                <h4 className="font-display font-semibold text-sm sm:text-base leading-snug">
                  Comparing drift stability across two high-volume packaging scales: (Scale A has Mean=50kg, SD=1kg; Scale B has Mean=5kg, SD=0.5kg). Which scale is more stable?
                </h4>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-900">
                <span className="block text-[11px] font-mono text-slate-500">KLE TECH RESOLVED SOLUTION:</span>
                <p className="text-xs text-slate-305 mt-1 leading-relaxed">
                  We calculate relative variance via the Coefficient of Variation ($CV = \\sigma / \\mu \\times 100$). \\\\
                  $CV_A = (1 / 50) \\times 100 = 2.0\\%$ \\\\
                  $CV_B = (0.5 / 5) \\times 100 = 10.0\\%$ \\\\
                  <strong>Conclusion:</strong> Packaging scale A is five times more stable compared to scale B. Comparing raw standard deviations (1kg vs 0.5kg) would be misleading without normalizing relative to process scope.
                </p>
              </div>
            </div>

            {/* Question 2 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-indigo-400 font-bold block mb-1">CHAPTER 3: STATISTICAL DISTRIBUTIONS</span>
                <h4 className="font-display font-semibold text-sm sm:text-base leading-snug">
                  Why is the Poisson distribution mathematically categorized as a limiting case helper of the Binomial distribution?
                </h4>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-900">
                <span className="block text-[11px] font-mono text-slate-500">KLE TECH RESOLVED SOLUTION:</span>
                <p className="text-xs text-slate-305 mt-1 leading-relaxed">
                  As the number of binary cycles ($n$) approaches infinity and single success probability ($p$) approaches zero, such that the mean product ($np = \\lambda$) remains stable, the Binomial formula converges mathematically onto the Poisson density. \\\\
                  <strong>Industrial Target:</strong> This approximation works with high fidelity for PCB solder joint inspection, where solder pin counts are heavy ($n = 1000$) but individual defect risk is extremely rare ($p = 0.001$). Here, mean error is $\\lambda = 1.0$.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SKILLS GAINED */}
        {/* ========================================================================= */}
        <section id="skills" className="mb-14 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="px-3 py-1 bg-yellow-50 text-amber-800 rounded-full text-xs font-semibold tracking-wider uppercase border border-amber-100">
              ACADEMIC SKILLS
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-3 tracking-tight">
              Engineering Capabilities Gained
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Review core automation, data, and mathematical software development skills acquired across this IV Semester coursework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Skill 1 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-805 flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h4 className="font-display font-extrabold text-slate-900 text-base mt-3 leading-snug">
                  Statistical Computing
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mt-2">
                  Processing raw mechanical sensor arrays, filtering noise, and executing quantitative summary calculations inside Python script files.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="block text-[10px] font-mono text-slate-400 mb-1 leading-none">PROFICIENCY METRIC</span>
                <div className="h-1.5 rounded-full bg-slate-100 w-full overflow-hidden">
                  <div className="h-full bg-indigo-650 rounded-full" style={{ width: "95%" }} />
                </div>
              </div>
            </div>

            {/* Skill 2 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-805 flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h4 className="font-display font-extrabold text-slate-900 text-base mt-3 leading-snug">
                  Uncertainty Modeling
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mt-2">
                  Formulating multi-sensor conditional probability trees, checking true diagnostics metrics, and establishing Bayesian updating.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="block text-[10px] font-mono text-slate-400 mb-1 leading-none">PROFICIENCY METRIC</span>
                <div className="h-1.5 rounded-full bg-slate-100 w-full overflow-hidden">
                  <div className="h-full bg-indigo-650 rounded-full" style={{ width: "90%" }} />
                </div>
              </div>
            </div>

            {/* Skill 3 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-850 flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h4 className="font-display font-extrabold text-slate-900 text-base mt-3 leading-snug">
                  Hypothesis Execution
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mt-2">
                  Formulating Null hypotheses (H0), standardizing tails, looking up t-critical limits, and executing robust process decisions.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="block text-[10px] font-mono text-slate-400 mb-1 leading-none">PROFICIENCY METRIC</span>
                <div className="h-1.5 rounded-full bg-slate-100 w-full overflow-hidden">
                  <div className="h-full bg-indigo-650 rounded-full" style={{ width: "85%" }} />
                </div>
              </div>
            </div>

            {/* Skill 4 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-850 flex items-center justify-center font-bold text-sm">
                  04
                </div>
                <h4 className="font-display font-extrabold text-slate-900 text-base mt-3 leading-snug">
                  Predictive Analysis
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mt-2">
                  Deploying linear and multiple regression and ANOVA curves to trace and model machine vibration boundaries based on servo torque.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="block text-[10px] font-mono text-slate-400 mb-1 leading-none">PROFICIENCY METRIC</span>
                <div className="h-1.5 rounded-full bg-slate-100 w-full overflow-hidden">
                  <div className="h-full bg-indigo-650 rounded-full" style={{ width: "95%" }} />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* LEARNING RESOURCES & REFERENCES */}
        {/* ========================================================================= */}
        <section id="resources" className="mb-14 scroll-mt-24">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="font-display font-bold text-slate-950 text-xl tracking-tight mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-indigo-900" /> Prescribed Textbook Resources & Reference Materials
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LEARNING_RESOURCES.map((res) => (
                <div key={res.id} className="bg-slate-50 border border-slate-150 p-5 rounded-xl flex gap-4 items-start hover:shadow-sm transition">
                  <div className="h-10 w-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center shrink-0 text-indigo-905">
                    {res.type === "Textbook" || res.type === "Reference Book" ? <FileText className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 text-[9px] font-mono font-bold rounded uppercase">
                        {res.type}
                      </span>
                      {res.badge && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-805 text-[9px] font-mono font-bold rounded uppercase">
                          {res.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-display font-semibold text-slate-900 text-sm sm:text-base leading-tight">
                      {res.title}
                    </h4>
                    <p className="text-slate-500 font-mono text-[10px] uppercase tracking-wide">
                      Author: {res.authors}
                    </p>
                    <p className="text-slate-600 text-xs leading-normal pt-1.5">
                      {res.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-150 leading-relaxed text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
              <p>Standards compliance: University Department of Mathematics Course Syllabus, KLE Technological University UG Criteria.</p>
              <div className="flex gap-4">
                <span className="hover:text-indigo-900 cursor-pointer font-medium">Terms of Use</span>
                <span className="hover:text-indigo-900 cursor-pointer font-medium">Department Portal</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-905 text-white border-t border-slate-800 pt-12 pb-6 mt-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
            
            {/* Identity Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-white text-slate-900 rounded flex items-center justify-center font-display font-bold text-base">
                  K
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-100 tracking-tight text-sm uppercase">{UNIVERSITY_INFO.name}</h3>
                  <p className="text-xs text-slate-500">{UNIVERSITY_INFO.department}</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                A dedicated UG digital portfolio archiving continuous evaluation assessments, programming scripts, t-test analysis and syllabus plans for course Applied Statistics (25EMAB218).
              </p>
            </div>

            {/* Quick sections map */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="font-display font-bold text-xs uppercase text-slate-400 tracking-wider">Quick Map Sections</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span onClick={() => scrollTo("home")} className="text-slate-400 hover:text-white cursor-pointer transition">Home</span>
                <span onClick={() => scrollTo("about")} className="text-slate-400 hover:text-white cursor-pointer transition">About</span>
                <span onClick={() => scrollTo("units")} className="text-slate-400 hover:text-white cursor-pointer transition">Chapters</span>
                <span onClick={() => scrollTo("teaching-plan")} className="text-slate-400 hover:text-white cursor-pointer transition">Schedule</span>
                <span onClick={() => scrollTo("labs")} className="text-slate-400 hover:text-white cursor-pointer transition">Laboratory</span>
                <span onClick={() => scrollTo("assessments")} className="text-slate-400 hover:text-white cursor-pointer transition flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block shrink-0" /> Reports</span>
              </div>
            </div>

            {/* Academic Checklist indicators */}
            <div className="md:col-span-4 space-y-3">
              <h5 className="font-display font-bold text-xs uppercase text-slate-400 tracking-wider">Academic Sign-off Status</h5>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Author: Dr. Narayan Swamy</span>
                  <span className="text-emerald-400 font-mono">Approved</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 border-t border-slate-900 pt-1.5">
                  <span>Audit checking: Dr. G.N. Bhadri</span>
                  <span className="text-emerald-400 font-mono">Approved</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 border-t border-slate-900 pt-1.5">
                  <span>Active Student Workspace</span>
                  <span className="text-indigo-400 font-mono">Verified File</span>
                </div>
              </div>
            </div>

          </div>

          {/* Low level copyright bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
            <p>© {UNIVERSITY_INFO.academicYear} KLE Technological University. All rights reserved.</p>
            <p>Designed and built for Srushti G Joshi UG portfolio curation. Technical contact: Department of Math.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
