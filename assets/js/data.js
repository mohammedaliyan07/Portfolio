/* ============================================================
   Mohammed Aliyan — Portfolio Data
   Certifications dataset extracted & verified (28 credentials)
   ============================================================ */

const PROFILE = {
  name: "Mohammed Aliyan",
  dob: "28 November 2005",
  email: "aliyan8834@gmail.com",
  github: "https://github.com/mohammedaliyan07",
  githubUser: "mohammedaliyan07",
  education: "B.Com (Computer Applications) — Final Year",
  university: "Kakatiya University",
  graduation: "Class of 2027",
  location: "India",
  avatar: "assets/img/profile-square.jpg",
  portrait: "assets/img/profile.jpg"
};

const CERTS = [
  {
    id: "gemini-google",
    title: "Gemini Certified Student",
    issuer: "Google for Education",
    issued: "2026-02",
    credential: "",
    category: "ai",
    featured: true,
    skills: ["Gemini AI", "Generative AI", "Prompting", "AI Tools"]
  },
  {
    id: "open-science-nasa",
    title: "Open Science Essentials",
    issuer: "NASA",
    issued: "2026-08",
    credential: "",
    category: "data",
    featured: true,
    skills: ["Open Science", "Research Data", "Data Management", "Collaboration"]
  },
  {
    id: "ai-career-umd",
    title: "AI and Career Empowerment",
    issuer: "University of Maryland, Robert H. Smith School of Business",
    issued: "2026-05",
    credential: "",
    category: "ai",
    featured: true,
    skills: ["Applied AI", "Career Strategy", "AI in Business"]
  },
  {
    id: "prompt-eng-aws",
    title: "Foundations of Prompt Engineering",
    issuer: "AWS Training & Certification",
    issued: "2025-09",
    credential: "",
    category: "ai",
    featured: true,
    skills: ["Prompt Engineering", "LLMs", "Anthropic Claude", "Amazon Bedrock"]
  },
  {
    id: "digital-skills-ai-accenture",
    title: "Digital Skills: Artificial Intelligence",
    issuer: "Accenture",
    issued: "2025-10",
    credential: "5pqp7rh",
    category: "ai",
    featured: true,
    skills: ["Artificial Intelligence", "Machine Learning", "Data Strategy"]
  },
  {
    id: "prompt-eng-dubai",
    title: "Prompt Engineering",
    issuer: "Dubai Future Foundation",
    issued: "",
    credential: "",
    category: "ai",
    featured: true,
    skills: ["Prompt Engineering", "AI Systems", "Future Skills"]
  },
  {
    id: "genai-infosys",
    title: "Generative AI for All",
    issuer: "Infosys Springboard",
    issued: "2025-02",
    credential: "",
    category: "ai",
    featured: true,
    skills: ["Generative AI", "AI Fundamentals", "AI Applications"]
  },
  {
    id: "ai-business-hp",
    title: "AI for Business Professionals",
    issuer: "HP LIFE · HP Foundation",
    issued: "2025-09",
    credential: "1d70e301-b40c-4377-af3a-adef95e21b08",
    category: "ai",
    featured: false,
    skills: ["AI in Business", "AI Ethics", "AI Productivity", "Prompting"]
  },
  {
    id: "ai-entrepreneurship-intel",
    title: "AI for Entrepreneurship",
    issuer: "Intel · Skill India Digital Hub",
    issued: "2025-01",
    credential: "",
    category: "ai",
    featured: false,
    skills: ["AI Strategy", "Entrepreneurship", "Digital Transformation"]
  },
  {
    id: "security-analyst-reliance",
    title: "Security Analyst Certificate Programme",
    issuer: "Reliance Foundation Skilling Academy",
    issued: "2025-01",
    credential: "RFSA00066150",
    category: "cybersecurity",
    featured: false,
    skills: ["Security Analysis", "Threat Detection", "Incident Response", "Risk Assessment"]
  },
  {
    id: "security-analyst-skill-india",
    title: "Security Analyst Certificate Programme",
    issuer: "Skill India · NSDC · Reliance Foundation Skilling Academy",
    issued: "2025-01",
    credential: "",
    category: "cybersecurity",
    featured: false,
    skills: ["Security Analysis", "Cybersecurity Fundamentals", "Threat Mitigation"]
  },
  {
    id: "cybersecurity-analyst-tata",
    title: "Cybersecurity Analyst Job Simulation",
    issuer: "Tata Group · Forage",
    issued: "2025-06",
    credential: "",
    category: "cybersecurity",
    featured: true,
    skills: ["Security Analysis", "Threat Intelligence", "Incident Response"]
  },
  {
    id: "cyber-security-tech-mahindra",
    title: "Cyber Security",
    issuer: "Tech Mahindra · Skill India · NSDC",
    issued: "2025-01",
    credential: "",
    category: "cybersecurity",
    featured: false,
    skills: ["Cyber Security", "Network Security", "Security Awareness"]
  },
  {
    id: "cyber-awareness-hp",
    title: "Introduction to Cybersecurity Awareness",
    issuer: "HP LIFE · HP Foundation",
    issued: "2025-01",
    credential: "d81bad65-5789-4b9a-ac97-5f4d25e347ad",
    category: "cybersecurity",
    featured: false,
    skills: ["Cyber Awareness", "Phishing", "Online Safety", "Data Protection"]
  },
  {
    id: "capm-simplilearn",
    title: "CAPM® Certification Course",
    issuer: "Simplilearn",
    issued: "2025-01",
    credential: "7780284",
    category: "project-management",
    featured: false,
    skills: ["Project Management", "Planning & Scheduling", "Risk Management", "Agile"]
  },
  {
    id: "pm101-simplilearn",
    title: "Project Management 101 — PMP® Certification Training",
    issuer: "Simplilearn",
    issued: "2025-01",
    credential: "7815888",
    category: "project-management",
    featured: false,
    skills: ["PMP Fundamentals", "Project Lifecycle", "Stakeholder Management"]
  },
  {
    id: "pm-simulation-siemens",
    title: "Project Manager Job Simulation",
    issuer: "Siemens · Forage",
    issued: "2025-06",
    credential: "",
    category: "project-management",
    featured: true,
    skills: ["Project Planning", "Risk Management", "Stakeholder Communication"]
  },
  {
    id: "product-mgmt-ea",
    title: "Product Management Job Simulation",
    issuer: "Electronic Arts · Forage",
    issued: "2025-06",
    credential: "",
    category: "project-management",
    featured: true,
    skills: ["Product Strategy", "Product Lifecycle", "Roadmapping", "User Focus"]
  },
  {
    id: "agile-pm-hp",
    title: "Agile Project Management",
    issuer: "HP LIFE · HP Foundation",
    issued: "2025-01",
    credential: "6473f4e0-4e96-4fa8-8200-0c7527090b2b",
    category: "project-management",
    featured: false,
    skills: ["Agile", "Scrum & Kanban", "MVP", "Iterative Delivery"]
  },
  {
    id: "data-analysis-excel",
    title: "Data Analysis: Visualisations in Excel",
    issuer: "The Open University (OpenLearn)",
    issued: "2025-08",
    credential: "B126_1",
    category: "data",
    featured: false,
    skills: ["Excel", "Data Analysis", "Data Visualisation", "Charts"]
  },
  {
    id: "data-visualisation-tata",
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata Group · Forage",
    issued: "2025-02",
    credential: "",
    category: "data",
    featured: true,
    skills: ["Data Visualisation", "Business Insights", "Storytelling with Data"]
  },
  {
    id: "mdm-tcs",
    title: "Master Data Management for Beginners",
    issuer: "TCS iON",
    issued: "2025-01",
    credential: "71279-27691467-1016",
    category: "data",
    featured: false,
    skills: ["Master Data Management", "Data Quality", "Data Governance"]
  },
  {
    id: "area-manager-walmart",
    title: "Area Manager Job Simulation",
    issuer: "Walmart · Forage",
    issued: "2025-06",
    credential: "",
    category: "business",
    featured: true,
    skills: ["Operations Management", "Leadership", "Problem Solving", "Staffing"]
  },
  {
    id: "hr-development-mindluster",
    title: "Human Resource Development",
    issuer: "Mind Luster",
    issued: "2024-12",
    credential: "1e9c83aa",
    category: "business",
    featured: false,
    skills: ["HR Development", "People Management", "Talent Processes"]
  },
  {
    id: "financial-literacy-unicef",
    title: "Financial Literacy",
    issuer: "UNICEF",
    issued: "2025-01",
    credential: "",
    category: "finance",
    featured: true,
    skills: ["Financial Literacy", "Budgeting", "Saving & Planning"]
  },
  {
    id: "financial-mgmt-skill-india",
    title: "Financial Management Skills",
    issuer: "Skill India · NSDC",
    issued: "2025-01",
    credential: "",
    category: "finance",
    featured: false,
    skills: ["Financial Management", "Budgeting", "Financial Planning"]
  },
  {
    id: "general-insurance-skill-india",
    title: "Fundamentals of General Insurance",
    issuer: "Skill India · NSDC",
    issued: "2025-01",
    credential: "",
    category: "finance",
    featured: false,
    skills: ["General Insurance", "Risk Coverage", "Insurance Products"]
  },
  {
    id: "graphic-design-canva",
    title: "Graphic Design Essentials",
    issuer: "Canva Design School",
    issued: "2025-09",
    credential: "745516",
    category: "design",
    featured: false,
    skills: ["Graphic Design", "Canva", "Visual Communication"]
  }
];

const CATEGORIES = [
  { id: "all", label: "All", icon: "✦" },
  { id: "ai", label: "AI & Prompt Engineering", icon: "🤖" },
  { id: "cybersecurity", label: "Cybersecurity", icon: "🛡️" },
  { id: "project-management", label: "Project & Product Mgmt", icon: "📋" },
  { id: "data", label: "Data & Analytics", icon: "📊" },
  { id: "business", label: "Business & Operations", icon: "💼" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "design", label: "Design", icon: "🎨" }
];

const SKILL_GROUPS = [
  {
    name: "AI & Prompt Engineering",
    level: 88,
    icon: "🤖",
    tags: ["Prompt Engineering", "Generative AI", "Gemini", "Claude", "Amazon Bedrock", "AI for Business", "AI Ethics"]
  },
  {
    name: "Cybersecurity",
    level: 78,
    icon: "🛡️",
    tags: ["Security Analysis", "Threat Detection", "Incident Response", "Risk Assessment", "Security Awareness"]
  },
  {
    name: "Project & Product Management",
    level: 82,
    icon: "📋",
    tags: ["CAPM®", "PMP Fundamentals", "Agile", "Scrum & Kanban", "Product Strategy", "Stakeholder Management"]
  },
  {
    name: "Data & Analytics",
    level: 74,
    icon: "📊",
    tags: ["Excel", "Data Visualisation", "Master Data Management", "Open Science", "Business Insights"]
  },
  {
    name: "Business & Finance",
    level: 76,
    icon: "💼",
    tags: ["Financial Literacy", "Operations Management", "HR Development", "Insurance", "Entrepreneurship"]
  },
  {
    name: "Tools & Design",
    level: 70,
    icon: "🎨",
    tags: ["Canva", "Graphic Design", "Visual Communication"]
  }
];

const ISSUER_MARQUEE = [
  "Google", "AWS", "NASA", "Accenture", "Tata Group", "Walmart", "Siemens",
  "Electronic Arts", "Infosys", "UNICEF", "University of Maryland", "Intel",
  "HP Foundation", "Tech Mahindra", "TCS iON", "Canva", "Reliance Foundation",
  "Dubai Future Foundation", "Simplilearn", "Skill India · NSDC"
];
