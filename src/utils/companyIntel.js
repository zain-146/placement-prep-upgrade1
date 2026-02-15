// Known enterprise companies list
const KNOWN_ENTERPRISES = [
  'amazon', 'google', 'microsoft', 'meta', 'facebook', 'apple', 'netflix', 'uber', 'airbnb',
  'infosys', 'tcs', 'wipro', 'cognizant', 'accenture', 'capgemini', 'hcl', 'tech mahindra',
  'ibm', 'oracle', 'salesforce', 'adobe', 'intel', 'cisco', 'vmware', 'dell', 'hp',
  'deloitte', 'kpmg', 'ey', 'pwc', 'mckinsey', 'bcg', 'bain',
  'jpmorgan', 'goldman sachs', 'morgan stanley', 'barclays', 'citi', 'hsbc',
  'walmart', 'target', 'costco', 'flipkart', 'paytm', 'phonepe', 'razorpay',
  'samsung', 'lg', 'sony', 'qualcomm', 'nvidia', 'amd',
  'zoho', 'freshworks', 'atlassian', 'servicenow', 'workday', 'splunk',
  'paypal', 'stripe', 'square', 'visa', 'mastercard',
  'twitter', 'linkedin', 'snap', 'pinterest', 'spotify', 'slack',
  'boeing', 'lockheed', 'northrop', 'raytheon',
  'johnson & johnson', 'pfizer', 'novartis', 'roche',
  'reliance', 'tata', 'mahindra', 'birla', 'adani', 'hdfc', 'icici',
];

// Known mid-size companies
const KNOWN_MIDSIZE = [
  'zomato', 'swiggy', 'dunzo', 'meesho', 'cred', 'groww', 'zerodha', 'upstox',
  'byju', 'unacademy', 'vedantu', 'toppr', 'whitehat',
  'oyo', 'makemytrip', 'yatra', 'cleartrip', 'goibibo',
  'ola', 'rapido', 'bounce', 'vogo',
  'dream11', 'mpl', 'games24x7',
  'postman', 'hasura', 'browserstack', 'druva', 'icertis',
  'nykaa', 'myntra', 'ajio', 'lenskart', 'firstcry',
  'practo', 'pharmeasy', '1mg', 'netmeds',
  'cars24', 'spinny', 'droom', 'cardekho',
  'urban company', 'housejoy',
  'slice', 'jupiter', 'fi', 'niyo',
];

// Industry keywords for inference
const INDUSTRY_KEYWORDS = {
  'E-commerce': ['ecommerce', 'e-commerce', 'retail', 'shopping', 'cart', 'marketplace'],
  'Fintech': ['fintech', 'banking', 'payment', 'finance', 'trading', 'investment', 'insurance', 'lending'],
  'Healthcare': ['health', 'medical', 'pharma', 'hospital', 'clinical', 'biotech', 'diagnostic'],
  'EdTech': ['education', 'learning', 'edtech', 'course', 'tutorial', 'student', 'academic'],
  'SaaS': ['saas', 'software as a service', 'cloud platform', 'b2b', 'enterprise software'],
  'Social Media': ['social', 'media', 'content', 'community', 'networking', 'influencer'],
  'Gaming': ['gaming', 'game', 'esports', 'fantasy', 'entertainment'],
  'Logistics': ['logistics', 'delivery', 'shipping', 'supply chain', 'warehouse', 'fleet'],
  'Travel': ['travel', 'hotel', 'flight', 'booking', 'tourism', 'hospitality'],
  'Mobility': ['mobility', 'ride', 'cab', 'transport', 'vehicle', 'automotive'],
  'Consulting': ['consulting', 'advisory', 'strategy', 'management consulting'],
  'Manufacturing': ['manufacturing', 'industrial', 'production', 'assembly', 'factory'],
};

/**
 * Get company size category based on heuristics
 */
export function getCompanySize(companyName) {
  if (!companyName || companyName === 'Not specified') {
    return { category: 'Unknown', label: 'Unknown', range: 'N/A' };
  }

  const normalizedName = companyName.toLowerCase().trim();

  // Check known enterprises
  if (KNOWN_ENTERPRISES.some(e => normalizedName.includes(e) || e.includes(normalizedName))) {
    return { category: 'Enterprise', label: 'Enterprise', range: '2000+' };
  }

  // Check known mid-size
  if (KNOWN_MIDSIZE.some(m => normalizedName.includes(m) || m.includes(normalizedName))) {
    return { category: 'Mid-size', label: 'Mid-size', range: '200-2000' };
  }

  // Default to Startup for unknown companies
  return { category: 'Startup', label: 'Startup', range: '<200' };
}

/**
 * Infer industry based on company name and JD text
 */
export function inferIndustry(companyName, jdText = '') {
  const combinedText = `${companyName} ${jdText}`.toLowerCase();

  for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (keywords.some(keyword => combinedText.includes(keyword))) {
      return industry;
    }
  }

  return 'Technology Services';
}

/**
 * Get typical hiring focus based on company size
 */
export function getHiringFocus(companySize) {
  const focusMap = {
    'Enterprise': {
      title: 'Structured Process',
      points: [
        'Heavy emphasis on DSA & algorithmic problem-solving',
        'Core CS fundamentals (OS, DBMS, Networks)',
        'System design for experienced roles',
        'Multiple interview rounds with standardized evaluation',
        'Behavioral assessments using STAR method',
      ],
      tip: 'Prepare thoroughly for DSA - most enterprise companies have online assessments as initial filters.',
    },
    'Mid-size': {
      title: 'Balanced Approach',
      points: [
        'Mix of DSA and practical coding challenges',
        'Focus on relevant tech stack proficiency',
        'Project discussions and architecture decisions',
        'Cultural fit and growth mindset evaluation',
        'May include take-home assignments',
      ],
      tip: 'Balance DSA prep with hands-on project work - mid-size companies value practical experience.',
    },
    'Startup': {
      title: 'Practical & Fast-paced',
      points: [
        'Emphasis on practical problem-solving ability',
        'Deep stack knowledge over breadth',
        'Real-world coding exercises or pair programming',
        'Quick iteration and ownership mindset',
        'Culture fit is often weighted heavily',
      ],
      tip: 'Showcase your ability to build and ship quickly - startups value doers over theorists.',
    },
    'Unknown': {
      title: 'General Preparation',
      points: [
        'Cover DSA fundamentals for technical rounds',
        'Prepare project explanations thoroughly',
        'Review core CS concepts',
        'Practice behavioral questions',
        'Research the specific company before interview',
      ],
      tip: 'Research the company to understand their interview style before the interview day.',
    },
  };

  return focusMap[companySize] || focusMap['Unknown'];
}

/**
 * Generate round mapping based on company size and detected skills
 */
export function generateRoundMapping(companySize, extractedSkills) {
  const categories = extractedSkills?.categories || [];
  const skills = extractedSkills?.skills || {};

  // Check for specific skill patterns
  const hasDSA = categories.includes('Core CS') || 
    Object.values(skills).some(cat => 
      cat.skills?.some(s => s.toLowerCase().includes('dsa') || s.toLowerCase().includes('algorithm'))
    );
  
  const hasWeb = categories.includes('Web');
  const hasReact = skills['Web']?.skills?.some(s => s.toLowerCase().includes('react'));
  const hasNode = skills['Web']?.skills?.some(s => s.toLowerCase().includes('node'));
  const hasCloud = categories.includes('Cloud/DevOps');
  const hasData = categories.includes('Data');

  // Round templates
  const rounds = [];

  if (companySize === 'Enterprise') {
    rounds.push({
      name: 'Round 1: Online Assessment',
      description: 'Automated test covering DSA, aptitude, and basic coding',
      focus: ['DSA Problems (2-3)', 'Aptitude Questions', 'Time-bound Coding'],
      why: 'Filters candidates at scale. Companies receive thousands of applications - this ensures only prepared candidates proceed.',
      duration: '60-90 minutes',
    });

    rounds.push({
      name: 'Round 2: Technical Interview (DSA)',
      description: 'Live coding round focused on data structures and algorithms',
      focus: ['Problem Solving', 'Code Optimization', 'Time/Space Analysis'],
      why: 'Tests your ability to think under pressure and communicate your approach clearly while coding.',
      duration: '45-60 minutes',
    });

    if (hasDSA || !hasWeb) {
      rounds.push({
        name: 'Round 3: Core CS / System Design',
        description: 'Deep dive into CS fundamentals or system design',
        focus: ['OS/DBMS/Networks', 'System Design (Sr.)', 'Architecture Patterns'],
        why: 'Evaluates foundational knowledge that helps you understand how systems work at scale.',
        duration: '45-60 minutes',
      });
    }

    if (hasWeb || hasCloud) {
      rounds.push({
        name: 'Round 3: Tech Stack Deep Dive',
        description: 'Focused discussion on your technical expertise',
        focus: hasWeb ? ['Frontend/Backend', 'API Design', 'Performance'] : ['Cloud Architecture', 'DevOps Practices', 'Scalability'],
        why: 'Verifies that you can apply your skills to real-world scenarios the team faces.',
        duration: '45-60 minutes',
      });
    }

    rounds.push({
      name: 'Round 4: Project & Behavioral',
      description: 'Discussion of past projects and behavioral assessment',
      focus: ['Project Deep Dive', 'STAR Method Questions', 'Team Collaboration'],
      why: 'Assesses how you work in teams, handle challenges, and whether your experience aligns with role requirements.',
      duration: '45-60 minutes',
    });

    rounds.push({
      name: 'Round 5: HR / Hiring Manager',
      description: 'Final round covering expectations and fit',
      focus: ['Salary Discussion', 'Career Goals', 'Company Culture Fit'],
      why: 'Ensures mutual alignment on expectations, growth path, and cultural compatibility.',
      duration: '30-45 minutes',
    });

  } else if (companySize === 'Mid-size') {
    rounds.push({
      name: 'Round 1: Technical Screening',
      description: 'Initial technical assessment - may be online or phone',
      focus: ['DSA Basics', 'Tech Stack Questions', 'Coding Exercise'],
      why: 'Quick filter to assess baseline technical competency before investing more interview time.',
      duration: '45-60 minutes',
    });

    if (hasWeb) {
      rounds.push({
        name: 'Round 2: Practical Coding',
        description: 'Hands-on coding task or take-home assignment',
        focus: hasReact ? ['React Component', 'State Management', 'UI/UX'] : ['API Development', 'Database Design', 'Code Quality'],
        why: 'Tests real-world coding skills - how you structure code, handle edge cases, and write maintainable software.',
        duration: 'Take-home: 2-4 hours or Live: 60 minutes',
      });
    } else {
      rounds.push({
        name: 'Round 2: Problem Solving',
        description: 'Technical problem-solving round',
        focus: ['Algorithm Design', 'Code Implementation', 'Edge Cases'],
        why: 'Evaluates problem-solving approach and ability to write clean, working code.',
        duration: '60 minutes',
      });
    }

    rounds.push({
      name: 'Round 3: Technical Discussion',
      description: 'Architecture and project discussion with team',
      focus: ['System Design', 'Project Walkthrough', 'Technical Decisions'],
      why: 'Assesses depth of understanding and ability to make sound technical decisions.',
      duration: '45-60 minutes',
    });

    rounds.push({
      name: 'Round 4: Culture Fit & HR',
      description: 'Cultural alignment and offer discussion',
      focus: ['Team Dynamics', 'Growth Mindset', 'Expectations'],
      why: 'Mid-size companies value culture highly - they want people who can grow with the company.',
      duration: '30-45 minutes',
    });

  } else if (companySize === 'Startup') {
    rounds.push({
      name: 'Round 1: Intro + Technical Chat',
      description: 'Casual technical discussion with founder/lead',
      focus: ['Background', 'Tech Interest', 'Problem Approach'],
      why: 'Startups want to quickly gauge if you are a fit - both technically and personally.',
      duration: '30-45 minutes',
    });

    if (hasWeb && (hasReact || hasNode)) {
      rounds.push({
        name: 'Round 2: Live Coding / Pair Programming',
        description: 'Build something together with the team',
        focus: hasReact ? ['React Feature', 'Component Design', 'Real-time Collaboration'] : ['API Endpoint', 'Database Query', 'Debug Session'],
        why: 'Simulates actual work environment - startups need people who can collaborate and ship fast.',
        duration: '60-90 minutes',
      });
    } else {
      rounds.push({
        name: 'Round 2: Practical Coding Task',
        description: 'Solve a real problem the company faces',
        focus: ['Practical Solution', 'Code Quality', 'Quick Iteration'],
        why: 'Tests your ability to deliver value quickly - the core skill startups need.',
        duration: '60-90 minutes',
      });
    }

    rounds.push({
      name: 'Round 3: Culture & Vision Fit',
      description: 'Discussion with founders about vision alignment',
      focus: ['Startup Mindset', 'Ownership', 'Long-term Vision'],
      why: 'At startups, every hire matters immensely. They need people who believe in the mission.',
      duration: '30-45 minutes',
    });

  } else {
    // Unknown company - generic rounds
    rounds.push({
      name: 'Round 1: Technical Screening',
      description: 'Initial technical assessment',
      focus: ['DSA Basics', 'Coding', 'Tech Knowledge'],
      why: 'Standard filter to assess technical baseline.',
      duration: '45-60 minutes',
    });

    rounds.push({
      name: 'Round 2: Technical Deep Dive',
      description: 'Detailed technical discussion',
      focus: ['Problem Solving', 'Projects', 'System Design'],
      why: 'Evaluates depth of technical knowledge and experience.',
      duration: '45-60 minutes',
    });

    rounds.push({
      name: 'Round 3: HR / Final',
      description: 'Behavioral and offer discussion',
      focus: ['Behavioral Questions', 'Expectations', 'Culture Fit'],
      why: 'Final assessment of overall fit and alignment.',
      duration: '30-45 minutes',
    });
  }

  return rounds;
}

/**
 * Generate complete company intel object
 */
export function generateCompanyIntel(company, role, jdText, extractedSkills) {
  const companySize = getCompanySize(company);
  const industry = inferIndustry(company, jdText);
  const hiringFocus = getHiringFocus(companySize.category);
  const roundMapping = generateRoundMapping(companySize.category, extractedSkills);

  return {
    company: company || 'Not specified',
    industry,
    size: companySize,
    hiringFocus,
    roundMapping,
    generatedAt: new Date().toISOString(),
    isHeuristic: true, // Flag to indicate this is demo/heuristic data
  };
}
