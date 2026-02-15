import { generateCompanyIntel } from './companyIntel';

// Generate round-wise preparation checklist based on detected skills
export function generateChecklist(extractedSkills) {
  const categories = extractedSkills.categories;
  const skills = extractedSkills.skills;
  
  const checklist = {
    'Round 1: Aptitude / Basics': [
      'Practice quantitative aptitude (percentages, ratios, time & work)',
      'Solve logical reasoning puzzles daily',
      'Review verbal ability and reading comprehension',
      'Practice number series and pattern recognition',
      'Take timed aptitude mock tests',
      'Study basic probability and permutations',
    ],
    'Round 2: DSA + Core CS': [
      'Revise arrays, strings, and linked lists',
      'Practice tree and graph traversals',
      'Master dynamic programming patterns',
      'Study time and space complexity analysis',
      'Review sorting and searching algorithms',
      'Practice 2-3 DSA problems daily on LeetCode/GFG',
    ],
    'Round 3: Technical Interview': [
      'Prepare project explanations (architecture, challenges, solutions)',
      'Review your resume thoroughly - be ready to explain everything',
      'Practice explaining code you\'ve written',
      'Prepare for live coding on whiteboard/screen share',
      'Study system design basics (for experienced roles)',
    ],
    'Round 4: Managerial / HR': [
      'Prepare STAR format answers for behavioral questions',
      'Research the company culture and recent news',
      'Prepare questions to ask the interviewer',
      'Practice salary negotiation talking points',
      'Review your career goals and motivations',
      'Prepare for "Tell me about yourself" (2-min version)',
    ]
  };

  // Add category-specific items to Round 2 and 3
  if (categories.includes('Core CS')) {
    checklist['Round 2: DSA + Core CS'].push(
      'Review OOP concepts (inheritance, polymorphism, encapsulation)',
      'Study DBMS concepts (normalization, ACID, indexing)',
      'Revise OS concepts (processes, threads, deadlocks)'
    );
  }

  if (categories.includes('Web')) {
    checklist['Round 3: Technical Interview'].push(
      'Review frontend frameworks you\'ve used',
      'Understand REST API design principles',
      'Prepare to discuss state management patterns'
    );
  }

  if (categories.includes('Data')) {
    checklist['Round 3: Technical Interview'].push(
      'Practice SQL queries (joins, subqueries, aggregations)',
      'Review database design and normalization',
      'Understand indexing and query optimization'
    );
  }

  if (categories.includes('Cloud/DevOps')) {
    checklist['Round 3: Technical Interview'].push(
      'Review cloud services architecture',
      'Understand CI/CD pipelines',
      'Prepare to discuss containerization concepts'
    );
  }

  if (categories.includes('Testing')) {
    checklist['Round 3: Technical Interview'].push(
      'Review testing methodologies (unit, integration, e2e)',
      'Understand test automation frameworks',
      'Prepare to discuss test-driven development'
    );
  }

  return checklist;
}

// Generate 7-day preparation plan based on detected skills
export function generateSevenDayPlan(extractedSkills) {
  const categories = extractedSkills.categories;
  const allSkills = Object.values(extractedSkills.skills).flatMap(cat => cat.skills);
  
  const plan = {
    'Day 1-2: Basics + Core CS': [
      'Morning: Review fundamental programming concepts',
      'Afternoon: Study OOP principles with examples',
      'Evening: Practice basic coding problems (arrays, strings)',
      'Review: DBMS fundamentals (ER diagrams, normalization)',
      'Extra: OS concepts overview (process, memory management)',
    ],
    'Day 3-4: DSA + Coding Practice': [
      'Morning: Study data structures (stacks, queues, trees)',
      'Afternoon: Practice linked list and tree problems',
      'Evening: Dynamic programming introduction',
      'Focus: Time complexity analysis for all solutions',
      'Target: Solve 10-15 medium difficulty problems',
    ],
    'Day 5: Project + Resume Alignment': [
      'Morning: Document all your projects in detail',
      'Afternoon: Prepare project architecture explanations',
      'Evening: Update resume with relevant keywords',
      'Practice: 5-minute project presentation',
      'Review: Align skills mentioned in resume with JD',
    ],
    'Day 6: Mock Interview Questions': [
      'Morning: Practice technical interview questions',
      'Afternoon: Behavioral/HR question practice (STAR method)',
      'Evening: Mock interview with peer or online platform',
      'Focus: Communication clarity and confidence',
      'Prepare: Questions to ask the interviewer',
    ],
    'Day 7: Revision + Weak Areas': [
      'Morning: Revise weak topics identified during practice',
      'Afternoon: Quick review of all concepts',
      'Evening: Light practice - don\'t overburden',
      'Focus: Rest well and stay confident',
      'Final: Review company research and interview logistics',
    ]
  };

  // Add category-specific tasks
  if (categories.includes('Web')) {
    plan['Day 1-2: Basics + Core CS'].push('Review: Frontend/backend architecture patterns');
    plan['Day 3-4: DSA + Coding Practice'].push('Extra: Build a small feature with your stack');
  }

  if (categories.includes('Languages')) {
    const langs = extractedSkills.skills['Languages']?.skills || [];
    if (langs.length > 0) {
      plan['Day 1-2: Basics + Core CS'].push(`Focus: ${langs.slice(0, 2).join(', ')} syntax and features`);
    }
  }

  if (categories.includes('Data')) {
    plan['Day 3-4: DSA + Coding Practice'].push('Practice: Complex SQL queries and optimization');
  }

  if (categories.includes('Cloud/DevOps')) {
    plan['Day 5: Project + Resume Alignment'].push('Review: Cloud/DevOps tools you\'ve used');
  }

  if (categories.includes('Testing')) {
    plan['Day 5: Project + Resume Alignment'].push('Prepare: Testing strategies you\'ve implemented');
  }

  return plan;
}

// Generate interview questions based on detected skills
export function generateInterviewQuestions(extractedSkills) {
  const categories = extractedSkills.categories;
  const skills = extractedSkills.skills;
  const questions = [];

  // General questions (always included)
  questions.push({
    question: 'Tell me about yourself and your background.',
    category: 'General',
    tip: 'Keep it under 2 minutes, focus on relevant experience'
  });

  // Core CS questions
  if (categories.includes('Core CS')) {
    const csSkills = skills['Core CS']?.skills || [];
    
    if (csSkills.some(s => s.toLowerCase().includes('dsa') || s.toLowerCase().includes('algorithm'))) {
      questions.push({
        question: 'Explain the difference between BFS and DFS. When would you use each?',
        category: 'DSA',
        tip: 'Mention time/space complexity and real-world use cases'
      });
      questions.push({
        question: 'How would you optimize search in sorted data? What data structures would you consider?',
        category: 'DSA',
        tip: 'Discuss binary search, BST, and hash maps'
      });
    }
    
    if (csSkills.some(s => s.toLowerCase().includes('oop'))) {
      questions.push({
        question: 'Explain the four pillars of OOP with examples from your projects.',
        category: 'OOP',
        tip: 'Use concrete examples from your experience'
      });
    }
    
    if (csSkills.some(s => s.toLowerCase().includes('dbms'))) {
      questions.push({
        question: 'What is database normalization? Explain 1NF, 2NF, and 3NF.',
        category: 'DBMS',
        tip: 'Use a practical example to illustrate each normal form'
      });
    }
    
    if (csSkills.some(s => s.toLowerCase().includes('os'))) {
      questions.push({
        question: 'Explain the difference between process and thread. What is a deadlock?',
        category: 'OS',
        tip: 'Mention synchronization mechanisms and prevention strategies'
      });
    }
  }

  // Language-specific questions
  if (categories.includes('Languages')) {
    const langs = skills['Languages']?.skills || [];
    
    if (langs.some(s => s.toLowerCase() === 'java')) {
      questions.push({
        question: 'Explain the difference between HashMap and ConcurrentHashMap in Java.',
        category: 'Java',
        tip: 'Discuss thread safety and performance implications'
      });
    }
    
    if (langs.some(s => s.toLowerCase() === 'python')) {
      questions.push({
        question: 'What are Python decorators and how have you used them?',
        category: 'Python',
        tip: 'Provide a practical example from your experience'
      });
    }
    
    if (langs.some(s => s.toLowerCase() === 'javascript' || s.toLowerCase() === 'typescript')) {
      questions.push({
        question: 'Explain the event loop in JavaScript. How does async/await work?',
        category: 'JavaScript',
        tip: 'Discuss call stack, callback queue, and microtasks'
      });
    }
  }

  // Web questions
  if (categories.includes('Web')) {
    const webSkills = skills['Web']?.skills || [];
    
    if (webSkills.some(s => s.toLowerCase().includes('react'))) {
      questions.push({
        question: 'Explain state management options in React. When would you use Context vs Redux?',
        category: 'React',
        tip: 'Discuss trade-offs and your practical experience'
      });
      questions.push({
        question: 'What are React hooks? Explain useEffect lifecycle behavior.',
        category: 'React',
        tip: 'Mention dependency array and cleanup functions'
      });
    }
    
    if (webSkills.some(s => s.toLowerCase().includes('node'))) {
      questions.push({
        question: 'How does Node.js handle concurrent requests being single-threaded?',
        category: 'Node.js',
        tip: 'Discuss event loop, non-blocking I/O, and worker threads'
      });
    }
    
    if (webSkills.some(s => s.toLowerCase().includes('rest'))) {
      questions.push({
        question: 'What are REST API best practices? How do you handle versioning?',
        category: 'REST',
        tip: 'Mention HTTP methods, status codes, and idempotency'
      });
    }
  }

  // Data questions
  if (categories.includes('Data')) {
    const dataSkills = skills['Data']?.skills || [];
    
    if (dataSkills.some(s => s.toLowerCase().includes('sql') || s.toLowerCase().includes('mysql') || s.toLowerCase().includes('postgres'))) {
      questions.push({
        question: 'Explain indexing in databases. When does it help and when can it hurt performance?',
        category: 'SQL',
        tip: 'Discuss B-tree indexes, composite indexes, and write overhead'
      });
      questions.push({
        question: 'Write a SQL query to find the second highest salary in an employees table.',
        category: 'SQL',
        tip: 'Consider edge cases like duplicates and NULL values'
      });
    }
    
    if (dataSkills.some(s => s.toLowerCase().includes('mongo'))) {
      questions.push({
        question: 'When would you choose MongoDB over a relational database?',
        category: 'MongoDB',
        tip: 'Discuss schema flexibility, scalability, and use cases'
      });
    }
  }

  // Cloud/DevOps questions
  if (categories.includes('Cloud/DevOps')) {
    const cloudSkills = skills['Cloud/DevOps']?.skills || [];
    
    if (cloudSkills.some(s => s.toLowerCase().includes('docker'))) {
      questions.push({
        question: 'Explain the difference between Docker images and containers. What is a Dockerfile?',
        category: 'Docker',
        tip: 'Discuss layers, caching, and best practices'
      });
    }
    
    if (cloudSkills.some(s => s.toLowerCase().includes('kubernetes') || s.toLowerCase().includes('k8s'))) {
      questions.push({
        question: 'What problems does Kubernetes solve? Explain pods and deployments.',
        category: 'Kubernetes',
        tip: 'Discuss orchestration, scaling, and self-healing'
      });
    }
    
    if (cloudSkills.some(s => s.toLowerCase().includes('aws') || s.toLowerCase().includes('azure') || s.toLowerCase().includes('gcp'))) {
      questions.push({
        question: 'Describe your experience with cloud services. How would you design a scalable architecture?',
        category: 'Cloud',
        tip: 'Mention specific services you\'ve used and why'
      });
    }
    
    if (cloudSkills.some(s => s.toLowerCase().includes('ci/cd'))) {
      questions.push({
        question: 'Explain your CI/CD pipeline experience. What tools have you used?',
        category: 'CI/CD',
        tip: 'Discuss automation, testing stages, and deployment strategies'
      });
    }
  }

  // Testing questions
  if (categories.includes('Testing')) {
    questions.push({
      question: 'What is the testing pyramid? Explain unit, integration, and e2e testing.',
      category: 'Testing',
      tip: 'Discuss trade-offs between different testing levels'
    });
    questions.push({
      question: 'How do you decide what to test? What makes a good test?',
      category: 'Testing',
      tip: 'Mention test coverage, maintainability, and edge cases'
    });
  }

  // Always add behavioral questions
  questions.push({
    question: 'Tell me about a challenging project you worked on. How did you overcome obstacles?',
    category: 'Behavioral',
    tip: 'Use STAR method: Situation, Task, Action, Result'
  });
  
  questions.push({
    question: 'Where do you see yourself in 5 years?',
    category: 'HR',
    tip: 'Show ambition while aligning with company growth'
  });

  // Return top 10 questions, ensuring variety
  const selectedQuestions = [];
  const usedCategories = new Set();
  
  for (const q of questions) {
    if (selectedQuestions.length >= 10) break;
    if (!usedCategories.has(q.category) || selectedQuestions.length < 5) {
      selectedQuestions.push(q);
      usedCategories.add(q.category);
    }
  }

  // Fill remaining slots if needed
  for (const q of questions) {
    if (selectedQuestions.length >= 10) break;
    if (!selectedQuestions.includes(q)) {
      selectedQuestions.push(q);
    }
  }

  return selectedQuestions.slice(0, 10);
}

// Generate complete analysis
export function generateAnalysis(company, role, jdText, extractedSkills, readinessScore) {
  // Generate company intel with round mapping
  const companyIntel = generateCompanyIntel(company, role, jdText, extractedSkills);

  return {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    company: company || 'Not specified',
    role: role || 'Not specified',
    jdText,
    extractedSkills,
    checklist: generateChecklist(extractedSkills),
    plan: generateSevenDayPlan(extractedSkills),
    questions: generateInterviewQuestions(extractedSkills),
    readinessScore,
    companyIntel, // New: Company intel with round mapping
  };
}
