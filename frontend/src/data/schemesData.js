export const statistics = [
  {
    id: 1,
    value: "2,500+",
    label: "Government Schemes",
    subtext: "Central & State welfare initiatives",
    icon: "Landmark",
    change: "+120 this month"
  },
  {
    id: 2,
    value: "50+",
    label: "Scheme Categories",
    subtext: "Agriculture, Education, Health & more",
    icon: "Layers",
    change: "All key sectors"
  },
  {
    id: 3,
    value: "28 States & 8 UTs",
    label: "States Covered",
    subtext: "Comprehensive Pan-India coverage",
    icon: "MapPin",
    change: "100% geographic reach"
  },
  {
    id: 4,
    value: "1.2 Million+",
    label: "Personalized Recommendations",
    subtext: "Citizen eligibility queries analyzed",
    icon: "Sparkles",
    change: "98.8% match confidence"
  }
];

export const schemeCategories = [
  {
    id: "education",
    name: "Education",
    icon: "GraduationCap",
    count: "320+ Schemes",
    color: "from-blue-600 to-indigo-700",
    lightBg: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Pre-matric, post-matric scholarships, fee waivers, fellowships, and skill training programs."
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: "Sprout",
    count: "280+ Schemes",
    color: "from-emerald-600 to-teal-700",
    lightBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "Income support, crop insurance, solar pump subsidies, seed grants, and soil health cards."
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "HeartPulse",
    count: "190+ Schemes",
    color: "from-rose-600 to-pink-700",
    lightBg: "bg-rose-50 text-rose-700 border-rose-200",
    description: "Ayushman Bharat coverage, maternal health benefits, free diagnostics, and critical illness support."
  },
  {
    id: "employment",
    name: "Employment",
    icon: "Briefcase",
    count: "215+ Schemes",
    color: "from-amber-600 to-orange-700",
    lightBg: "bg-amber-50 text-amber-700 border-amber-200",
    description: "Apprenticeship promotion, rural employment guarantees, startup seed funding, and vocational loans."
  },
  {
    id: "women",
    name: "Women Empowerment",
    icon: "Users",
    count: "175+ Schemes",
    color: "from-purple-600 to-violet-700",
    lightBg: "bg-purple-50 text-purple-700 border-purple-200",
    description: "Maternity aid, self-help group micro-credit, girl child security bonds, and safe working hostels."
  },
  {
    id: "housing",
    name: "Housing",
    icon: "Home",
    count: "110+ Schemes",
    color: "from-teal-600 to-cyan-700",
    lightBg: "bg-teal-50 text-teal-700 border-teal-200",
    description: "Pucca housing grants, credit-linked interest subsidies, and rural home construction assistance."
  },
  {
    id: "financial",
    name: "Financial Assistance",
    icon: "IndianRupee",
    count: "240+ Schemes",
    color: "from-sky-600 to-blue-700",
    lightBg: "bg-sky-50 text-sky-700 border-sky-200",
    description: "Direct benefit transfers, micro-pensions, Mudra collateral-free business loans, and insurance cover."
  },
  {
    id: "social-welfare",
    name: "Social Welfare",
    icon: "ShieldCheck",
    count: "260+ Schemes",
    color: "from-slate-700 to-slate-900",
    lightBg: "bg-slate-50 text-slate-700 border-slate-200",
    description: "Senior citizen allowances, disability aids, subsidized food security, and community pensions."
  }
];

export const howItWorksSteps = [
  {
    step: "01",
    title: "Create Your Profile",
    description: "Input basic details like state, age, occupation, and family income with total privacy.",
    icon: "UserPlus",
    accent: "bg-teal-500 text-white"
  },
  {
    step: "02",
    title: "Discover Eligible Schemes",
    description: "Our AI engine scans 2,500+ rules to shortlist every scheme you qualify for instantly.",
    icon: "Sparkles",
    accent: "bg-blue-600 text-white"
  },
  {
    step: "03",
    title: "Check Your Benefits",
    description: "Understand monetary subsidies, entitlement limits, and required documents clearly.",
    icon: "FileCheck2",
    accent: "bg-emerald-600 text-white"
  },
  {
    step: "04",
    title: "Apply with Confidence",
    description: "Access verified direct portal links, official checklists, and step-by-step guidance.",
    icon: "CheckCircle",
    accent: "bg-navy-900 text-white"
  }
];

export const sampleSchemes = [
  {
    id: 1,
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    category: "Agriculture",
    level: "Central Sector",
    benefit: "₹6,000 / year in 3 equal installments",
    description: "Direct income support to landholding farmer families across the country to meet domestic agricultural requirements.",
    eligibility: [
      "Small and marginal landholder farmer families",
      "Valid land ownership records in revenue databases",
      "Bank account linked with Aadhaar and e-KYC verified"
    ],
    documents: [
      "Aadhaar Card",
      "Land Ownership Documents / Khasra-Khatauni",
      "Active Bank Account with IFSC",
      "Active Mobile Number"
    ],
    officialUrl: "https://pmkisan.gov.in",
    department: "Ministry of Agriculture and Farmers Welfare"
  },
  {
    id: 2,
    name: "Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
    category: "Healthcare",
    level: "Centrally Sponsored",
    benefit: "₹5,00,000 cashless health cover per family/year",
    description: "World's largest government-funded healthcare assurance scheme providing cashless secondary and tertiary hospitalization care.",
    eligibility: [
      "Families identified under SECC 2011 deprivation criteria",
      "Occupational criteria for urban informal workers",
      "No restriction on family size, age, or gender"
    ],
    documents: [
      "Aadhaar Card or Ration Card",
      "Proof of Family Identity",
      "Ayushman PM-JAY Card or Golden Card"
    ],
    officialUrl: "https://pmjay.gov.in",
    department: "National Health Authority (NHA)"
  },
  {
    id: 3,
    name: "Pradhan Mantri Awas Yojana – Urban (PMAY-U)",
    category: "Housing",
    level: "Centrally Sponsored",
    benefit: "Up to ₹2.67 Lakh interest subsidy on home loans",
    description: "Ensures pucca houses for all eligible urban households including slum dwellers, EWS, and LIG categories.",
    eligibility: [
      "Family must not own a pucca house anywhere in India",
      "Household annual income up to ₹3 Lakh (EWS) or ₹6 Lakh (LIG)",
      "Female ownership or co-ownership mandatory for EWS/LIG"
    ],
    documents: [
      "Aadhaar card of all family members",
      "Income certificate from authorized revenue officer",
      "Bank statements of previous 6 months",
      "Land title or allotment deed"
    ],
    officialUrl: "https://pmaymis.gov.in",
    department: "Ministry of Housing and Urban Affairs"
  },
  {
    id: 4,
    name: "National Scholarship Portal – Post-Matric Scholarships",
    category: "Education",
    level: "Central Sector",
    benefit: "Full tuition reimbursement + ₹1,200/mo maintenance",
    description: "Financial assistance to students from minority and economically weaker sections pursuing post-secondary education.",
    eligibility: [
      "Students enrolled in Class 11, 12, ITI, Degree or Master courses",
      "Minimum 50% marks in previous final examination",
      "Annual family income not exceeding ₹2.50 Lakh"
    ],
    documents: [
      "Previous year academic marksheets",
      "Fee receipt of current admission",
      "Income certificate and Caste/Category certificate",
      "Student bank passbook copy"
    ],
    officialUrl: "https://scholarships.gov.in",
    department: "Ministry of Social Justice and Empowerment"
  },
  {
    id: 5,
    name: "Stand-Up India Scheme for Entrepreneurs",
    category: "Employment",
    level: "Central Sector",
    benefit: "Composite bank loan from ₹10 Lakh to ₹1 Crore",
    description: "Facilitates bank loans to at least one SC/ST and at least one woman borrower per bank branch for setting up greenfield enterprises.",
    eligibility: [
      "SC/ST and/or woman entrepreneurs above 18 years of age",
      "Loans available only for greenfield (first-time) ventures",
      "Non-individual enterprises must have 51% stake with SC/ST/Woman"
    ],
    documents: [
      "Identity and address proof",
      "Project Report with cost of project & means of finance",
      "Certificate of incorporation / partnership deed",
      "Category certificate (if applicable)"
    ],
    officialUrl: "https://www.standupmitra.in",
    department: "Department of Financial Services (DFS)"
  },
  {
    id: 6,
    name: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    category: "Financial Assistance",
    level: "Central Sector",
    benefit: "Working capital loan ₹10,000 to ₹50,000 with 7% interest subsidy",
    description: "Affordable working capital collateral-free credit to street vendors to resume their livelihoods affected by economic disruptions.",
    eligibility: [
      "Urban street vendors with Certificate of Vending or Identity Card",
      "Vendors left out of survey who have recommendation letters",
      "Repayments reward higher loan limits and cashback incentives"
    ],
    documents: [
      "Aadhaar Card",
      "Vending Certificate or LOR from Urban Local Body",
      "Bank Account details"
    ],
    officialUrl: "https://pmsvanidhi.mohua.gov.in",
    department: "Ministry of Housing and Urban Affairs"
  }
];

export const aiDemoConversations = [
  {
    id: 1,
    question: "I am a small farmer with 2 acres of land in Maharashtra. What schemes can I apply for?",
    answer: "Based on your landholding (2 acres) and location in Maharashtra, you are eligible for:\n1. **PM-KISAN**: ₹6,000 annual direct income support.\n2. **Namo Shetkari Mahasanman Yojana (State)**: Additional ₹6,000/year from Maharashtra Govt.\n3. **PM Fasal Bima Yojana**: Comprehensive crop insurance at just 1.5% - 2% premium.\n4. **Magel Tyala Shettale**: Farm pond subsidy up to ₹75,000 for drought resilience.",
    tag: "Agriculture & Small Farmers"
  },
  {
    id: 2,
    question: "What scholarships are available for female students pursuing computer science engineering?",
    answer: "Great news! Female STEM students have multiple specialized funding tracks:\n1. **AICTE Pragati Scholarship for Girls**: ₹50,000/year for tuition and laptop allowances.\n2. **Post-Matric Scholarship Scheme (NSP)**: Full tuition reimbursement based on category.\n3. **Google & Adobe Women Techmakers Fellowships**: Supplementary merit grants.\n4. **State Higher Education Fee Waivers**: Automatic concession on government college tuition fees.",
    tag: "Education & Women"
  },
  {
    id: 3,
    question: "How do I check if my family has Ayushman Bharat health insurance?",
    answer: "You can verify eligibility in 60 seconds without visiting any office:\n1. Enter your mobile number and state in SchemeSphere or on **mera.pmjay.gov.in**.\n2. Check via your Ration Card Number or SECC 2011 Household ID.\n3. If your name appears on the list, visit any nearest Common Service Centre (CSC) or empaneled hospital with your Aadhaar to get your physical **Ayushman Golden Card**.",
    tag: "Healthcare & Welfare"
  }
];

export const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" }
];
