// Skill categories with keywords for detection
const SKILL_CATEGORIES = {
  'Core CS': {
    keywords: ['dsa', 'data structures', 'algorithms', 'oop', 'object oriented', 'dbms', 'database management', 'os', 'operating system', 'networks', 'networking', 'computer networks', 'system design', 'design patterns'],
    color: 'bg-blue-100 text-blue-800'
  },
  'Languages': {
    keywords: ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'golang', 'go lang', 'rust', 'kotlin', 'swift', 'ruby', 'php', 'scala'],
    color: 'bg-green-100 text-green-800'
  },
  'Web': {
    keywords: ['react', 'reactjs', 'next.js', 'nextjs', 'node.js', 'nodejs', 'express', 'expressjs', 'rest', 'restful', 'graphql', 'angular', 'vue', 'vuejs', 'html', 'css', 'tailwind', 'bootstrap', 'webpack', 'vite'],
    color: 'bg-purple-100 text-purple-800'
  },
  'Data': {
    keywords: ['sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'redis', 'elasticsearch', 'cassandra', 'oracle', 'sqlite', 'dynamodb', 'firebase'],
    color: 'bg-yellow-100 text-yellow-800'
  },
  'Cloud/DevOps': {
    keywords: ['aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'cicd', 'jenkins', 'gitlab', 'github actions', 'terraform', 'ansible', 'linux', 'unix', 'nginx', 'apache'],
    color: 'bg-orange-100 text-orange-800'
  },
  'Testing': {
    keywords: ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'jest', 'mocha', 'chai', 'testing', 'unit test', 'integration test', 'e2e', 'end to end', 'tdd', 'bdd'],
    color: 'bg-pink-100 text-pink-800'
  }
};

// Normalize text for matching
function normalizeText(text) {
  return text.toLowerCase().replace(/[^a-z0-9+#.\s]/g, ' ');
}

// Extract skills from JD text
export function extractSkills(jdText) {
  const normalizedText = normalizeText(jdText);
  const extractedSkills = {};
  const foundCategories = new Set();

  for (const [category, { keywords, color }] of Object.entries(SKILL_CATEGORIES)) {
    const matchedSkills = [];
    
    for (const keyword of keywords) {
      // Create regex pattern for word boundary matching
      const pattern = new RegExp(`\\b${keyword.replace(/[+#.]/g, '\\$&')}\\b`, 'gi');
      if (pattern.test(normalizedText)) {
        // Capitalize first letter of each word for display
        const displayName = keyword.split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Avoid duplicates
        if (!matchedSkills.some(s => s.toLowerCase() === displayName.toLowerCase())) {
          matchedSkills.push(displayName);
        }
      }
    }
    
    if (matchedSkills.length > 0) {
      extractedSkills[category] = {
        skills: matchedSkills,
        color
      };
      foundCategories.add(category);
    }
  }

  // If no skills found, return general fresher stack
  if (Object.keys(extractedSkills).length === 0) {
    extractedSkills['General'] = {
      skills: ['Programming Basics', 'Problem Solving', 'Communication', 'Aptitude', 'Logical Reasoning'],
      color: 'bg-gray-100 text-gray-800'
    };
    foundCategories.add('General');
  }

  return {
    skills: extractedSkills,
    categories: Array.from(foundCategories),
    totalSkillCount: Object.values(extractedSkills).reduce((sum, cat) => sum + cat.skills.length, 0)
  };
}

// Calculate readiness score
export function calculateReadinessScore(extractedSkills, company, role, jdText) {
  let score = 35; // Base score
  
  // +5 per detected category (max 30)
  const categoryBonus = Math.min(extractedSkills.categories.length * 5, 30);
  score += categoryBonus;
  
  // +10 if company name provided
  if (company && company.trim().length > 0) {
    score += 10;
  }
  
  // +10 if role provided
  if (role && role.trim().length > 0) {
    score += 10;
  }
  
  // +10 if JD length > 800 chars
  if (jdText && jdText.length > 800) {
    score += 10;
  }
  
  // Cap at 100
  return Math.min(score, 100);
}

export { SKILL_CATEGORIES };
