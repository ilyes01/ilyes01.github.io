import { useState, useEffect, useRef, createContext, useContext } from "react";

// ─── THEME ───
const themes = {
  dark: {
    bg: "#09090b", bgCard: "#111118", bgChip: "#1a1a2e",
    border: "#1e1e2e", borderHover: "#333",
    text: "#fafafa", textMuted: "#a1a1aa", textDim: "#71717a", textFaint: "#52525b", textGhost: "#3f3f46",
    accent: "#818cf8", accentHover: "#a5b4fc", accentBg: "#818cf815",
    green: "#34d399", greenBg: "#34d39915",
    chipBorder: "#27273a",
    shadow: "rgba(0,0,0,0.4)",
    navBg: "rgba(9,9,11,0.85)",
    selection: "#818cf880",
    glowOpacity: 0.12,
  },
  light: {
    bg: "#fafafa", bgCard: "#ffffff", bgChip: "#f0f0f5",
    border: "#e4e4e7", borderHover: "#c4c4cc",
    text: "#18181b", textMuted: "#52525b", textDim: "#71717a", textFaint: "#a1a1aa", textGhost: "#d4d4d8",
    accent: "#6366f1", accentHover: "#4f46e5", accentBg: "#6366f115",
    green: "#059669", greenBg: "#05966915",
    chipBorder: "#e4e4e7",
    shadow: "rgba(0,0,0,0.08)",
    navBg: "rgba(250,250,250,0.88)",
    selection: "#6366f140",
    glowOpacity: 0.06,
  },
};

// ─── TRANSLATIONS ───
const t = {
  en: {
    dir: "ltr",
    nav: ["About", "Experience", "Skills", "Projects", "Education", "Contact"],
    heroGreet: "Hi, I'm",
    heroName: "Elyes Laabidi",
    heroDesc: "I build scalable web platforms, real-time systems, and mobile apps — from SaaS architecture to pixel-perfect interfaces.",
    heroCta1: "View my work",
    heroCta2: "Get in touch",
    typingTexts: ["Full-Stack Developer", "Angular & Spring Boot", "MERN Stack", "Mobile App Developer", "SaaS Architect"],
    aboutLabel: "About",
    aboutTitle: "Engineer by training,\nbuilder by nature.",
    aboutP1: "I'm a full-stack software engineer based in Tunisia with a background in computer engineering from Holberton School. I specialize in building production-grade web platforms using Angular and Spring Boot microservices, as well as MERN stack applications.",
    aboutP2: "My recent work has been focused on building Symphonia — a multi-tenant SaaS call center platform involving real-time communication, SIP telephony integration, AI-powered tooling, and complex microservice orchestration. I thrive in environments where I own the full stack, from database design to deployment.",
    aboutP3: "I also develop mobile applications and have deep experience with languages including Java, JavaScript, TypeScript, Python, and C. I speak Arabic, French, and English fluently.",
    stats: [
      { num: "3+", label: "Years Experience" },
      { num: "8+", label: "Projects Delivered" },
      { num: "5+", label: "Languages Mastered" },
      { num: "3", label: "Languages Spoken" },
    ],
    expLabel: "Experience",
    expTitle: "Where I've worked",
    experience: [
      {
        role: "Full-Stack Software Engineer",
        company: "Symphonia (SaaS Startup)",
        period: "2023 — Present",
        type: "Full-time",
        points: [
          "Architected and developed a multi-tenant SaaS call center platform from the ground up using Angular and Spring Boot microservices (Auth, Campaign, Calls, Tenant, Licenses).",
          "Built a real-time WebSocket chat system with STOMP/SockJS featuring read receipts, browser notifications, role-based UIs, and full i18n (FR/EN/AR).",
          "Integrated SIP trunks (Dstny provider) with FreeSwitch ESL for VoIP telephony, including answering machine detection and intelligent recall scheduling.",
          "Designed and implemented an AI-powered drag-and-drop call script editor with LLM integration and PDF export.",
          "Managed PostgreSQL database architecture across multiple microservice-specific schemas with Spring Data JPA.",
        ],
      },
      {
        role: "Freelance Full-Stack Developer",
        company: "Self-Employed",
        period: "2023 — Present",
        type: "Freelance",
        points: [
          "Delivered end-to-end web applications for clients including e-commerce platforms, business dashboards, and content management systems.",
          "Provided technical consulting on architecture decisions, cloud infrastructure, and API design for small businesses.",
          "Built and deployed mobile-responsive web apps using MERN stack and Angular with modern CI/CD workflows.",
        ],
      },
    ],
    skillsLabel: "Tech Stack",
    skillsTitle: "Tools I work with",
    projectsLabel: "Projects",
    projectsTitle: "What I've built",
    projects: [
      { title: "Symphonia", tag: "SaaS Platform", desc: "Multi-tenant cloud call center platform with real-time WebSocket communication, SIP trunk integration, intelligent recall logic, and answering machine detection.", stack: ["Angular", "Spring Boot", "PostgreSQL", "FreeSwitch", "WebSocket", "Eureka"], color: "#818cf8" },
      { title: "Real-Time Chat System", tag: "Communication", desc: "Full-featured messaging system with STOMP/SockJS, read receipts, browser notifications, role-based UIs, dark mode, i18n (FR/EN/AR), and unread badges.", stack: ["Angular", "Spring Boot", "STOMP", "SockJS", "WebSocket"], color: "#34d399" },
      { title: "AI Script Editor", tag: "AI-Powered", desc: "Drag-and-drop decision tree editor for call scripts with AI generation via LLM integration. Includes PDF export with custom font rendering.", stack: ["Angular", "OpenRouter API", "Apache PDFBox", "Drag & Drop"], color: "#f59e0b" },
      { title: "E-Commerce Platform", tag: "Full-Stack", desc: "Complete e-commerce solution with product catalog, cart, Stripe payments, order management dashboard, and real-time inventory tracking.", stack: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Redux"], color: "#f472b6" },
      { title: "Media Delivery Platform", tag: "Cloud Storage", desc: "Wedding photographer media delivery app with dual-copy handling, secure permissions, and cloud storage integration.", stack: ["Angular", "Spring Boot", "PostgreSQL", "Cloudflare R2"], color: "#a78bfa" },
      { title: "Task & Project Tracker", tag: "Mobile App", desc: "Cross-platform mobile app for team task management with real-time sync, push notifications, Kanban boards, and offline-first architecture.", stack: ["React Native", "Node.js", "MongoDB", "Socket.io"], color: "#2dd4bf" },
      { title: "Analytics Dashboard", tag: "Data Viz", desc: "Live monitoring dashboard for KPIs and agent performance with auto-refreshing charts, filterable views, and CSV/PDF export.", stack: ["Angular", "Spring Boot", "PostgreSQL", "WebSocket", "Chart.js"], color: "#fb923c" },
      { title: "API Gateway & Auth Service", tag: "Backend", desc: "Centralized API gateway with JWT authentication, OAuth2, rate limiting, service discovery, and multi-tenant isolation.", stack: ["Spring Boot", "Spring Security", "Eureka", "PostgreSQL", "Redis", "Docker"], color: "#60a5fa" },
    ],
    eduLabel: "Education",
    eduTitle: "Certifications",
    education: [
      { school: "Holberton School — Tunis", degree: "Full Stack Software Developer", spec: "Web Development", date: "May 2023" },
      { school: "AfricaTek Academy", degree: "Certificat en Ingénierie Informatique", spec: "Développement Web — Cycle Holberton", date: "May 2023" },
    ],
    contactLabel: "Contact",
    contactTitle: "Let's work together",
    contactDesc: "I'm open to freelance projects, consulting, and full-time opportunities. Got an idea? Let's make it real.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    footer: "© 2026 Elyes Laabidi — Built with purpose.",
  },
  fr: {
    dir: "ltr",
    nav: ["À propos", "Expérience", "Compétences", "Projets", "Formation", "Contact"],
    heroGreet: "Bonjour, je suis",
    heroName: "Laabidi Elyes",
    heroDesc: "Je conçois des plateformes web évolutives, des systèmes temps réel et des applications mobiles — de l'architecture SaaS aux interfaces pixel-perfect.",
    heroCta1: "Voir mes projets",
    heroCta2: "Me contacter",
    typingTexts: ["Développeur Full-Stack", "Angular & Spring Boot", "Stack MERN", "Développeur Mobile", "Architecte SaaS"],
    aboutLabel: "À propos",
    aboutTitle: "Ingénieur de formation,\nbâtisseur par nature.",
    aboutP1: "Je suis ingénieur logiciel full-stack basé en Tunisie, diplômé en ingénierie informatique de Holberton School. Je me spécialise dans le développement de plateformes web en production avec Angular et Spring Boot microservices, ainsi que la stack MERN.",
    aboutP2: "Mon travail récent s'est concentré sur Symphonia — une plateforme SaaS multi-tenant de centre d'appels impliquant la communication temps réel, l'intégration de téléphonie SIP, des outils alimentés par l'IA, et une orchestration complexe de microservices.",
    aboutP3: "Je développe également des applications mobiles et j'ai une expérience approfondie avec Java, JavaScript, TypeScript, Python et C. Je parle couramment l'arabe, le français et l'anglais.",
    stats: [
      { num: "3+", label: "Années d'expérience" },
      { num: "8+", label: "Projets livrés" },
      { num: "5+", label: "Langages maîtrisés" },
      { num: "3", label: "Langues parlées" },
    ],
    expLabel: "Expérience",
    expTitle: "Où j'ai travaillé",
    experience: [
      {
        role: "Ingénieur Logiciel Full-Stack",
        company: "Symphonia (Startup SaaS)",
        period: "2023 — Présent",
        type: "Temps plein",
        points: [
          "Conception et développement d'une plateforme SaaS multi-tenant de centre d'appels avec Angular et Spring Boot microservices (Auth, Campaign, Calls, Tenant, Licenses).",
          "Développement d'un système de chat temps réel WebSocket avec STOMP/SockJS, accusés de lecture, notifications, UIs par rôle, et i18n (FR/EN/AR).",
          "Intégration de trunks SIP (fournisseur Dstny) avec FreeSwitch ESL pour la téléphonie VoIP, incluant la détection de répondeur et le rappel intelligent.",
          "Conception d'un éditeur de scripts d'appel drag-and-drop alimenté par IA avec intégration LLM et export PDF.",
          "Gestion de l'architecture PostgreSQL sur plusieurs schémas spécifiques aux microservices avec Spring Data JPA.",
        ],
      },
      {
        role: "Développeur Full-Stack Freelance",
        company: "Indépendant",
        period: "2023 — Présent",
        type: "Freelance",
        points: [
          "Livraison d'applications web complètes pour des clients : plateformes e-commerce, tableaux de bord, et systèmes de gestion de contenu.",
          "Conseil technique sur les décisions d'architecture, l'infrastructure cloud et la conception d'API pour les PME.",
          "Développement et déploiement d'applications web responsive avec MERN et Angular.",
        ],
      },
    ],
    skillsLabel: "Compétences",
    skillsTitle: "Mes outils de travail",
    projectsLabel: "Projets",
    projectsTitle: "Ce que j'ai construit",
    projects: [
      { title: "Symphonia", tag: "Plateforme SaaS", desc: "Plateforme multi-tenant de centre d'appels cloud avec communication WebSocket temps réel, intégration SIP, rappel intelligent et détection de répondeur.", stack: ["Angular", "Spring Boot", "PostgreSQL", "FreeSwitch", "WebSocket", "Eureka"], color: "#818cf8" },
      { title: "Système de Chat Temps Réel", tag: "Communication", desc: "Système de messagerie complet avec STOMP/SockJS, accusés de lecture, notifications, UIs par rôle, mode sombre, i18n (FR/EN/AR).", stack: ["Angular", "Spring Boot", "STOMP", "SockJS", "WebSocket"], color: "#34d399" },
      { title: "Éditeur de Scripts IA", tag: "IA", desc: "Éditeur d'arbre décisionnel drag-and-drop pour scripts d'appel avec génération IA et export PDF.", stack: ["Angular", "OpenRouter API", "Apache PDFBox", "Drag & Drop"], color: "#f59e0b" },
      { title: "Plateforme E-Commerce", tag: "Full-Stack", desc: "Solution e-commerce complète avec catalogue, panier, paiements Stripe, gestion des commandes et suivi d'inventaire temps réel.", stack: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Redux"], color: "#f472b6" },
      { title: "Plateforme de Livraison Média", tag: "Cloud", desc: "Application de livraison de médias pour photographes avec gestion double copie, permissions sécurisées et stockage cloud.", stack: ["Angular", "Spring Boot", "PostgreSQL", "Cloudflare R2"], color: "#a78bfa" },
      { title: "Gestionnaire de Tâches", tag: "App Mobile", desc: "Application mobile multiplateforme pour la gestion de tâches avec sync temps réel, notifications push, tableaux Kanban.", stack: ["React Native", "Node.js", "MongoDB", "Socket.io"], color: "#2dd4bf" },
      { title: "Tableau de Bord Analytique", tag: "Data Viz", desc: "Dashboard de monitoring en direct pour KPIs et performance des agents avec graphiques auto-rafraîchis et export CSV/PDF.", stack: ["Angular", "Spring Boot", "PostgreSQL", "WebSocket", "Chart.js"], color: "#fb923c" },
      { title: "Gateway API & Auth", tag: "Backend", desc: "Passerelle API centralisée avec authentification JWT, OAuth2, rate limiting, découverte de services et isolation multi-tenant.", stack: ["Spring Boot", "Spring Security", "Eureka", "PostgreSQL", "Redis", "Docker"], color: "#60a5fa" },
    ],
    eduLabel: "Formation",
    eduTitle: "Certifications",
    education: [
      { school: "Holberton School — Tunis", degree: "Développeur Logiciel Full Stack", spec: "Développement Web", date: "Mai 2023" },
      { school: "AfricaTek Academy", degree: "Certificat en Ingénierie Informatique", spec: "Développement Web — Cycle Holberton", date: "Mai 2023" },
    ],
    contactLabel: "Contact",
    contactTitle: "Travaillons ensemble",
    contactDesc: "Je suis ouvert aux projets freelance, au conseil et aux opportunités à temps plein. Vous avez une idée ? Concrétisons-la.",
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    footer: "© 2026 Laabidi Elyes — Construit avec passion.",
  },
  ar: {
    dir: "rtl",
    nav: ["نبذة", "الخبرة", "المهارات", "المشاريع", "التعليم", "تواصل"],
    heroGreet: "مرحباً، أنا",
    heroName: "إلياس العبيدي",
    heroDesc: "أبني منصات ويب قابلة للتوسع، أنظمة فورية، وتطبيقات موبايل — من هندسة SaaS إلى واجهات مثالية.",
    heroCta1: "شاهد أعمالي",
    heroCta2: "تواصل معي",
    typingTexts: ["مطور Full-Stack", "Angular و Spring Boot", "MERN Stack", "مطور تطبيقات موبايل", "مهندس SaaS"],
    aboutLabel: "نبذة",
    aboutTitle: "مهندس بالتكوين،\nبنّاء بالفطرة.",
    aboutP1: "أنا مهندس برمجيات full-stack مقيم في تونس، خريج هندسة معلوماتية من Holberton School. أتخصص في بناء منصات ويب إنتاجية باستخدام Angular و Spring Boot microservices، بالإضافة إلى تطبيقات MERN stack.",
    aboutP2: "عملي الأخير تركّز على بناء Symphonia — منصة SaaS متعددة المستأجرين لمراكز الاتصال تشمل الاتصال الفوري، دمج الهاتفية SIP، أدوات ذكاء اصطناعي، وتنسيق معقد للخدمات المصغرة.",
    aboutP3: "أطوّر أيضاً تطبيقات موبايل ولدي خبرة عميقة في Java، JavaScript، TypeScript، Python و C. أتحدث العربية والفرنسية والإنجليزية بطلاقة.",
    stats: [
      { num: "+3", label: "سنوات خبرة" },
      { num: "+8", label: "مشاريع منجزة" },
      { num: "+5", label: "لغات برمجة" },
      { num: "3", label: "لغات محكية" },
    ],
    expLabel: "الخبرة",
    expTitle: "أين عملت",
    experience: [
      {
        role: "مهندس برمجيات Full-Stack",
        company: "Symphonia (شركة SaaS ناشئة)",
        period: "2023 — الحالي",
        type: "دوام كامل",
        points: [
          "تصميم وتطوير منصة SaaS متعددة المستأجرين لمراكز الاتصال باستخدام Angular و Spring Boot microservices.",
          "بناء نظام محادثة فوري WebSocket مع STOMP/SockJS يتضمن إشعارات القراءة، إشعارات المتصفح، وواجهات حسب الأدوار.",
          "دمج خطوط SIP مع FreeSwitch ESL للهاتفية VoIP، بما في ذلك كشف الرد الآلي والاستدعاء الذكي.",
          "تصميم محرر سكربتات اتصال drag-and-drop مدعوم بالذكاء الاصطناعي مع تصدير PDF.",
          "إدارة هندسة قواعد بيانات PostgreSQL عبر مخططات متعددة خاصة بكل خدمة مصغرة.",
        ],
      },
      {
        role: "مطور Full-Stack مستقل",
        company: "عمل حر",
        period: "2023 — الحالي",
        type: "مستقل",
        points: [
          "تسليم تطبيقات ويب كاملة للعملاء تشمل منصات تجارة إلكترونية ولوحات تحكم وأنظمة إدارة محتوى.",
          "تقديم استشارات تقنية حول قرارات الهندسة والبنية التحتية السحابية وتصميم API.",
          "بناء ونشر تطبيقات ويب متجاوبة باستخدام MERN stack و Angular.",
        ],
      },
    ],
    skillsLabel: "المهارات",
    skillsTitle: "أدواتي",
    projectsLabel: "المشاريع",
    projectsTitle: "ما بنيته",
    projects: [
      { title: "Symphonia", tag: "منصة SaaS", desc: "منصة مراكز اتصال سحابية متعددة المستأجرين مع تواصل WebSocket فوري ودمج SIP وكشف الرد الآلي.", stack: ["Angular", "Spring Boot", "PostgreSQL", "FreeSwitch", "WebSocket", "Eureka"], color: "#818cf8" },
      { title: "نظام محادثة فوري", tag: "اتصال", desc: "نظام مراسلة كامل مع STOMP/SockJS، إشعارات قراءة، واجهات حسب الأدوار، وضع مظلم، ودعم متعدد اللغات.", stack: ["Angular", "Spring Boot", "STOMP", "SockJS", "WebSocket"], color: "#34d399" },
      { title: "محرر سكربتات ذكي", tag: "ذكاء اصطناعي", desc: "محرر شجرة قرارات drag-and-drop لسكربتات الاتصال مع توليد بالذكاء الاصطناعي وتصدير PDF.", stack: ["Angular", "OpenRouter API", "Apache PDFBox", "Drag & Drop"], color: "#f59e0b" },
      { title: "منصة تجارة إلكترونية", tag: "Full-Stack", desc: "حل تجارة إلكترونية كامل مع كتالوج منتجات وسلة وDFعات Stripe وإدارة الطلبات.", stack: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Redux"], color: "#f472b6" },
      { title: "منصة توصيل الوسائط", tag: "سحابي", desc: "تطبيق توصيل وسائط للمصورين مع إدارة نسخ مزدوجة وصلاحيات آمنة وتخزين سحابي.", stack: ["Angular", "Spring Boot", "PostgreSQL", "Cloudflare R2"], color: "#a78bfa" },
      { title: "مدير المهام", tag: "تطبيق موبايل", desc: "تطبيق موبايل متعدد المنصات لإدارة المهام مع مزامنة فورية وإشعارات ولوحات Kanban.", stack: ["React Native", "Node.js", "MongoDB", "Socket.io"], color: "#2dd4bf" },
      { title: "لوحة تحليلات", tag: "تصور بيانات", desc: "لوحة مراقبة مباشرة لمؤشرات الأداء مع رسوم بيانية تلقائية التحديث وتصدير CSV/PDF.", stack: ["Angular", "Spring Boot", "PostgreSQL", "WebSocket", "Chart.js"], color: "#fb923c" },
      { title: "بوابة API والمصادقة", tag: "باك إند", desc: "بوابة API مركزية مع مصادقة JWT و OAuth2 وتحديد المعدل واكتشاف الخدمات.", stack: ["Spring Boot", "Spring Security", "Eureka", "PostgreSQL", "Redis", "Docker"], color: "#60a5fa" },
    ],
    eduLabel: "التعليم",
    eduTitle: "الشهادات",
    education: [
      { school: "Holberton School — تونس", degree: "مطور برمجيات Full Stack", spec: "تطوير الويب", date: "ماي 2023" },
      { school: "AfricaTek Academy", degree: "شهادة في هندسة المعلوماتية", spec: "تطوير الويب — دورة Holberton", date: "ماي 2023" },
    ],
    contactLabel: "تواصل",
    contactTitle: "لنعمل معاً",
    contactDesc: "أنا منفتح على المشاريع المستقلة والاستشارات وفرص العمل. عندك فكرة؟ خلينا نحققها.",
    emailLabel: "البريد",
    phoneLabel: "الهاتف",
    footer: "© 2026 إلياس العبيدي — صُنع بشغف.",
  },
};

const SKILLS = {
  "Frontend": ["Angular", "React", "Next.js", "Tailwind CSS", "HTML/CSS", "JavaScript", "TypeScript"],
  "Backend": ["Spring Boot", "Node.js", "Express.js", "REST APIs", "GraphQL", "WebSocket/STOMP"],
  "Mobile": ["React Native", "Flutter"],
  "Languages": ["Java", "JavaScript", "TypeScript", "Python", "C"],
  "Database & Infra": ["PostgreSQL", "MongoDB", "Redis", "Docker", "MinIO", "Nginx"],
  "Tools & DevOps": ["Git", "GitHub", "Maven", "npm", "Linux", "WSL", "FreeSwitch"],
};

const sectionIds = ["about", "experience", "skills", "projects", "education", "contact"];

// ─── HOOKS ───
function useTyping(texts, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    let timeout;
    if (!deleting && charIdx < current.length) timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    else if (!deleting && charIdx === current.length) timeout = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0) timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    else if (deleting && charIdx === 0) { setDeleting(false); setIdx(i => (i + 1) % texts.length); }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, pause]);
  return display;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCounter(target, duration, shouldStart) {
  const [count, setCount] = useState(0);
  const numVal = parseInt(target);
  const hasPlus = typeof target === "string" && target.includes("+");
  useEffect(() => {
    if (!shouldStart || isNaN(numVal)) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * numVal));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [shouldStart, numVal, duration]);
  if (isNaN(numVal)) return target;
  return hasPlus ? count + "+" : String(count);
}

// ─── CONSTELLATION BACKGROUND ───
function ConstellationBg({ theme, mode }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let w, h;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    // Create nodes
    const count = 60;
    if (nodesRef.current.length === 0) {
      for (let i = 0; i < count; i++) {
        nodesRef.current.push({
          x: Math.random() * 2000, y: Math.random() * 2000,
          vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
        });
      }
    }
    const nodes = nodesRef.current;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const accent = mode === "dark" ? "129,140,248" : "79,70,229";
      const isLight = mode === "light";
      const mouse = mouseRef.current;

      // Update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // Mouse attraction
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          n.x += dx * 0.002;
          n.y += dy * 0.002;
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * (isLight ? 0.35 : 0.15);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${accent},${opacity})`;
            ctx.lineWidth = isLight ? 0.8 : 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const opacity = (1 - dist / 200) * (isLight ? 0.6 : 0.3);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${accent},${opacity})`;
          ctx.lineWidth = isLight ? 1.2 : 0.8;
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glow = dist < 200 ? 1.5 : 1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * glow, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent},${dist < 200 ? (isLight ? 0.8 : 0.6) : (isLight ? 0.45 : 0.25)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, [mode]);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0,
    }} />
  );
}

// ─── COMPONENTS ───
function Section({ id, children, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <section id={id} ref={ref} className={className} style={{
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease", position: "relative", zIndex: 1,
    }}>{children}</section>
  );
}

function SectionLabel({ text, theme }) {
  return <p style={{
    fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: "0.75rem",
    letterSpacing: "0.15em", textTransform: "uppercase", color: theme.accent, marginBottom: "0.75rem",
  }}>{text}</p>;
}

function AnimatedSkills({ items, theme }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {items.map((s, si) => (
        <span key={s} className="skill-chip" style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.9)",
          transition: "all 0.4s ease " + (si * 60) + "ms",
        }}>{s}</span>
      ))}
    </div>
  );
}

function AnimatedStats({ stats, theme }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: 16, marginTop: 36, paddingTop: 36, borderTop: "1px solid " + theme.border,
    }}>
      {stats.map((s, idx) => {
        const val = useCounter(s.num, 1500, visible);
        return (
          <div key={idx} style={{ textAlign: "center" }}>
            <p style={{ fontSize: "1.6rem", fontWeight: 700, color: theme.accent, fontFamily: "'JetBrains Mono', monospace" }}>{val}</p>
            <p style={{ fontSize: "0.78rem", color: theme.textFaint, marginTop: 4 }}>{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN ───
export default function Portfolio() {
  const [mode, setMode] = useState("dark");
  const [lang, setLang] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const theme = themes[mode];
  const i = t[lang];
  const typed = useTyping(i.typingTexts);
  const isRtl = i.dir === "rtl";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e) => {
      document.querySelectorAll('.card').forEach(card => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useEffect(() => {
    const close = () => setLangMenuOpen(false);
    if (langMenuOpen) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [langMenuOpen]);

  const scrollTo = (idx) => {
    document.getElementById(sectionIds[idx])?.scrollIntoView({ behavior: "smooth" });
  };

  const langLabels = { en: "EN", fr: "FR", ar: "عر" };
  const langFull = { en: "English", fr: "Français", ar: "العربية" };

  return (
    <div dir={i.dir} style={{
      fontFamily: isRtl ? "'Noto Sans Arabic', 'Inter', sans-serif" : "'Inter', -apple-system, sans-serif",
      background: theme.bg, color: theme.text, minHeight: "100vh", overflowX: "hidden",
      transition: "background 0.4s, color 0.4s",
    }}>
      <ConstellationBg theme={theme} mode={mode} />
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: mode === "dark"
          ? "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(129,140,248,0.12), transparent), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(99,102,241,0.08), transparent), radial-gradient(ellipse 50% 30% at 10% 60%, rgba(168,85,247,0.06), transparent)"
          : "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79,70,229,0.12), transparent), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(129,140,248,0.1), transparent), radial-gradient(ellipse 50% 30% at 10% 60%, rgba(168,85,247,0.06), transparent)",
        transition: "background 0.4s",
      }} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${theme.bg}; transition: background 0.4s; }
        ::selection { background: ${theme.selection}; color: ${theme.text}; }
        a { color: inherit; text-decoration: none; }

        .nav-glass { backdrop-filter: blur(16px) saturate(180%); -webkit-backdrop-filter: blur(16px) saturate(180%); }

        .hero-glow {
          position: absolute; width: 600px; height: 600px; border-radius: 50%;
          filter: blur(120px); opacity: ${theme.glowOpacity}; pointer-events: none;
        }

        .skill-chip {
          padding: 6px 14px; border-radius: 6px; font-size: 0.82rem;
          background: ${theme.bgChip}; border: 1px solid ${theme.chipBorder};
          color: ${theme.textMuted}; transition: all 0.08s ease-out; white-space: nowrap; cursor: default;
        }
        .skill-chip:hover { border-color: ${theme.accent}; color: ${theme.text}; transform: translateY(-2px) scale(1.05); }

        .card {
          background: ${theme.bgCard}; border: 1px solid ${theme.border};
          border-radius: 12px; padding: 28px; transition: all 0.3s ease; cursor: default;
          position: relative; overflow: hidden;
        }
        .card::after {
          content: ''; position: absolute; inset: 0; border-radius: 12px;
          opacity: 0; transition: opacity 0.4s; pointer-events: none;
          background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(129,140,248,0.06), transparent 40%);
        }
        .card:hover { border-color: ${theme.borderHover}; transform: translateY(-3px); box-shadow: 0 12px 40px ${theme.shadow}; }
        .card:hover::after { opacity: 1; }

        .cursor-blink {
          display: inline-block; width: 2px; height: 1.1em; background: ${theme.accent};
          margin-${isRtl ? "right" : "left"}: 2px; vertical-align: text-bottom;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px;
          border-radius: 8px; font-weight: 500; font-size: 0.9rem;
          transition: all 0.25s; cursor: pointer; border: none;
          font-family: inherit;
        }
        .cta-primary { background: ${theme.accent}; color: ${mode === "dark" ? "#09090b" : "#fff"}; }
        .cta-primary:hover { background: ${theme.accentHover}; transform: translateY(-2px); box-shadow: 0 4px 20px ${theme.accent}40; }
        .cta-secondary { background: transparent; color: ${theme.textMuted}; border: 1px solid ${theme.border}; }
        .cta-secondary:hover { border-color: ${theme.accent}; color: ${theme.text}; }

        .edu-card {
          background: ${theme.bgCard}; border: 1px solid ${theme.border};
          border-radius: 12px; padding: 24px 28px; position: relative; overflow: hidden;
          transition: all 0.3s ease;
        }
        .edu-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px ${theme.shadow}; }
        .edu-card::before {
          content: ''; position: absolute; top: 0; ${isRtl ? "right" : "left"}: 0;
          width: 3px; height: 100%; background: ${theme.accent};
        }

        .toggle-btn {
          background: ${theme.bgChip}; border: 1px solid ${theme.border};
          border-radius: 8px; padding: 7px 10px; cursor: pointer;
          color: ${theme.textMuted}; transition: all 0.2s; display: flex; align-items: center;
          gap: 6px; font-size: 0.8rem; font-family: inherit; position: relative;
        }
        .toggle-btn:hover { border-color: ${theme.accent}; color: ${theme.text}; }

        .lang-dropdown {
          position: absolute; top: calc(100% + 6px); ${isRtl ? "left" : "right"}: 0;
          background: ${theme.bgCard}; border: 1px solid ${theme.border};
          border-radius: 8px; overflow: hidden; z-index: 200;
          box-shadow: 0 8px 24px ${theme.shadow}; min-width: 130px;
        }
        .lang-option {
          padding: 10px 16px; cursor: pointer; font-size: 0.84rem;
          color: ${theme.textMuted}; transition: all 0.15s; display: block;
          width: 100%; border: none; background: none; text-align: ${isRtl ? "right" : "left"};
          font-family: inherit;
        }
        .lang-option:hover { background: ${theme.bgChip}; color: ${theme.text}; }
        .lang-active { color: ${theme.accent}; }

        .contact-link {
          display: flex; align-items: center; gap: 12px; padding: 14px 18px;
          background: ${theme.bgCard}; border: 1px solid ${theme.border};
          border-radius: 10px; text-decoration: none; color: ${theme.textMuted};
          transition: all 0.2s;
        }
        .contact-link:hover { border-color: ${theme.accent}; transform: translateY(-2px); color: ${theme.text}; }

        .social-btn {
          display: flex; align-items: center; gap: 8px; padding: 10px 20px;
          background: ${theme.bgCard}; border: 1px solid ${theme.border};
          border-radius: 8px; text-decoration: none; color: ${theme.textMuted};
          font-size: 0.85rem; transition: all 0.2s;
        }
        .social-btn:hover { border-color: ${theme.accent}; color: ${theme.text}; transform: translateY(-2px); }

        .project-dot {
          transition: all 0.3s;
        }
        .card:hover .project-dot {
          transform: scale(1.5);
        }

        @media (max-width: 768px) { .hero-glow { width: 300px; height: 300px; } .hide-mobile { display: none !important; } }
      `}</style>

      {/* ─── NAV ─── */}
      <nav className="nav-glass" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? theme.navBg : "transparent",
        borderBottom: scrolled ? `1px solid ${theme.border}` : "1px solid transparent",
        transition: "all 0.3s", padding: "0 24px",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto", display: "flex",
          alignItems: "center", justifyContent: "space-between", height: 64,
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: "1.1rem",
            color: theme.accent, letterSpacing: "-0.02em",
          }}>
            EL<span style={{ color: theme.text }}>.</span>
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div className="hide-mobile" style={{ display: "flex", gap: 28, alignItems: "center" }}>
              {i.nav.map((label, idx) => (
                <span key={idx} onClick={() => scrollTo(idx)} style={{
                  fontSize: "0.85rem", color: theme.textMuted, cursor: "pointer",
                  transition: "color 0.2s", fontWeight: 400,
                }}
                  onMouseEnter={e => e.target.style.color = theme.text}
                  onMouseLeave={e => e.target.style.color = theme.textMuted}
                >{label}</span>
              ))}
            </div>

            <button className="toggle-btn" onClick={() => setMode(m => m === "dark" ? "light" : "dark")} title="Toggle theme">
              {mode === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              )}
            </button>

            <div style={{ position: "relative" }}>
              <button className="toggle-btn" onClick={(e) => { e.stopPropagation(); setLangMenuOpen(o => !o); }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
                {langLabels[lang]}
              </button>
              {langMenuOpen && (
                <div className="lang-dropdown" onClick={e => e.stopPropagation()}>
                  {Object.entries(langFull).map(([code, name]) => (
                    <button key={code} className={`lang-option ${lang === code ? "lang-active" : ""}`}
                      onClick={() => { setLang(code); setLangMenuOpen(false); }}>
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <header style={{
        position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "120px 24px 80px", overflow: "hidden",
      }}>
        <div className="hero-glow" style={{ background: theme.accent, top: "10%", [isRtl ? "right" : "left"]: "-10%" }} />
        <div className="hero-glow" style={{ background: "#6366f1", bottom: "5%", [isRtl ? "left" : "right"]: "-5%" }} />
        <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: theme.accent, marginBottom: 16, letterSpacing: "0.05em" }}>
            {i.heroGreet}
          </p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 16, color: mode === "dark" ? "#e0e7ff" : "#312e81" }}>
            {i.heroName}
          </h1>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: theme.textMuted, marginBottom: 32, minHeight: "1.6em" }}>
            {typed}<span className="cursor-blink" />
          </div>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: theme.textDim, maxWidth: 680, margin: "0 auto 40px" }}>
            {i.heroDesc}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="cta-btn cta-primary" onClick={() => scrollTo(3)}>
              {i.heroCta1}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: isRtl ? "scaleX(-1)" : "none" }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="cta-btn cta-secondary" onClick={() => scrollTo(5)}>{i.heroCta2}</button>
          </div>
        </div>
      </header>

      {/* ─── ABOUT ─── */}
      <Section id="about">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <SectionLabel text={i.aboutLabel} theme={theme} />
          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: 20, letterSpacing: "-0.02em", whiteSpace: "pre-line", color: mode === "dark" ? "#e0e7ff" : "#1e1b4b" }}>{i.aboutTitle}</h2>
          <div style={{ color: theme.textMuted, lineHeight: 1.8, fontSize: "1rem", display: "flex", flexDirection: "column", gap: 16 }}>
            <p>{i.aboutP1}</p><p>{i.aboutP2}</p><p>{i.aboutP3}</p>
          </div>
          <AnimatedStats stats={i.stats} theme={theme} />
        </div>
      </Section>

      {/* ─── EXPERIENCE ─── */}
      <Section id="experience">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <SectionLabel text={i.expLabel} theme={theme} />
          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: 36, letterSpacing: "-0.02em", color: mode === "dark" ? "#e0e7ff" : "#1e1b4b" }}>{i.expTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {i.experience.map((exp, idx) => (
              <div key={idx} className="card">
                <div style={{ position: "absolute", top: 0, [isRtl ? "right" : "left"]: 0, width: "100%", height: 2, background: `linear-gradient(${isRtl ? "270deg" : "90deg"}, ${theme.accent}, #6366f1, transparent)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 600, marginBottom: 4 }}>{exp.role}</h3>
                    <p style={{ color: theme.accent, fontSize: "0.9rem" }}>{exp.company}</p>
                  </div>
                  <div style={{ textAlign: isRtl ? "left" : "right" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: theme.textDim }}>{exp.period}</span>
                    <span style={{ display: "block", fontSize: "0.7rem", color: theme.green, background: theme.greenBg, padding: "2px 8px", borderRadius: 4, marginTop: 4, fontFamily: "'JetBrains Mono', monospace", width: "fit-content", marginLeft: isRtl ? 0 : "auto", marginRight: isRtl ? "auto" : 0 }}>{exp.type}</span>
                  </div>
                </div>
                <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0 }}>
                  {exp.points.map((p, j) => (
                    <li key={j} style={{ color: theme.textMuted, fontSize: "0.88rem", lineHeight: 1.6, paddingLeft: isRtl ? 0 : 16, paddingRight: isRtl ? 16 : 0, position: "relative" }}>
                      <span style={{ position: "absolute", [isRtl ? "right" : "left"]: 0, top: "0.5em", width: 5, height: 5, borderRadius: "50%", background: theme.textFaint }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── SKILLS ─── */}
      <Section id="skills">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <SectionLabel text={i.skillsLabel} theme={theme} />
          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: 36, letterSpacing: "-0.02em", color: mode === "dark" ? "#e0e7ff" : "#1e1b4b" }}>{i.skillsTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat}>
                <p style={{ fontSize: "0.8rem", color: theme.textFaint, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10, fontWeight: 500 }}>{cat}</p>
                <AnimatedSkills items={items} theme={theme} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── PROJECTS ─── */}
      <Section id="projects">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <SectionLabel text={i.projectsLabel} theme={theme} />
          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: 36, letterSpacing: "-0.02em", color: mode === "dark" ? "#e0e7ff" : "#1e1b4b" }}>{i.projectsTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {i.projects.map((p, idx) => (
              <div key={idx} className="card">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
                  <div className="project-dot" style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, boxShadow: `0 0 12px ${p.color}60` }} />
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 600 }}>{p.title}</h3>
                  <span style={{ fontSize: "0.72rem", color: theme.accent, background: theme.accentBg, padding: "3px 10px", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace" }}>{p.tag}</span>
                </div>
                <p style={{ color: theme.textMuted, lineHeight: 1.7, fontSize: "0.92rem", marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.stack.map(t => (
                    <span key={t} style={{ fontSize: "0.72rem", color: theme.textDim, border: `1px solid ${theme.chipBorder}`, padding: "2px 8px", borderRadius: 4, fontFamily: "'JetBrains Mono', monospace" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── EDUCATION ─── */}
      <Section id="education">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <SectionLabel text={i.eduLabel} theme={theme} />
          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: 36, letterSpacing: "-0.02em", color: mode === "dark" ? "#e0e7ff" : "#1e1b4b" }}>{i.eduTitle}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {i.education.map((e, idx) => (
              <div key={idx} className="edu-card">
                <p style={{ fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", color: theme.accent, marginBottom: 8 }}>{e.date}</p>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 4 }}>{e.degree}</h3>
                <p style={{ color: theme.textMuted, fontSize: "0.9rem" }}>{e.spec}</p>
                <p style={{ color: theme.textFaint, fontSize: "0.85rem", marginTop: 6 }}>{e.school}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section id="contact">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px 120px", textAlign: "center" }}>
          <SectionLabel text={i.contactLabel} theme={theme} />
          <h2 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: 16, letterSpacing: "-0.02em", color: mode === "dark" ? "#e0e7ff" : "#1e1b4b" }}>{i.contactTitle}</h2>
          <p style={{ color: theme.textDim, fontSize: "1rem", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 36px" }}>{i.contactDesc}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, maxWidth: 700, margin: "0 auto 36px", textAlign: isRtl ? "right" : "left" }}>
            {[
              { label: i.emailLabel, value: "ilyeslabidi2501@gmail.com", href: "mailto:ilyeslabidi2501@gmail.com", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
              { label: i.phoneLabel, value: "+216 52 822 252", href: "tel:+21652822252", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
            ].map((c, idx) => (
              <a key={idx} href={c.href} className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.icon}/></svg>
                <div>
                  <p style={{ fontSize: "0.7rem", color: theme.textFaint, marginBottom: 2 }}>{c.label}</p>
                  <p style={{ fontSize: "0.82rem", color: theme.textMuted }}>{c.value}</p>
                </div>
              </a>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            {[
              { label: "GitHub", url: "https://github.com/ilyes01", icon: "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" },
              { label: "LinkedIn", url: "https://www.linkedin.com/in/ilyeslabidi25", icon: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1 4.98 2.12 4.98 3.5zM5 8H0v16h5V8zm7.98 0h-4.96v16h4.96v-8.4c0-4.67 6.03-5.05 6.03 0V24H24v-9.93c0-7.88-8.92-7.59-11.02-3.71V8z" },
            ].map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="social-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={s.icon}/></svg>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${theme.border}`, padding: "24px", textAlign: "center",
        fontSize: "0.78rem", color: theme.textGhost, fontFamily: "'JetBrains Mono', monospace",
      }}>
        {i.footer}
      </footer>
    </div>
  );
}
