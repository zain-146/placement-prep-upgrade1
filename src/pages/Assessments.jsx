import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Target, CheckCircle2, Calendar, HelpCircle, ArrowLeft, 
  ChevronDown, ChevronUp, Lightbulb, Tag, Copy, Download,
  Zap, ArrowRight, Building2, Users, Briefcase, Clock,
  Info, TrendingUp, MapPin
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { getCurrentAnalysis, setCurrentAnalysis, updateAnalysis } from '../utils/storage'

// Circular Progress Component for Readiness Score
function ReadinessScore({ score }) {
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const progress = ((100 - score) / 100) * circumference
  
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-primary-500'
    if (score >= 40) return 'text-yellow-500'
    return 'text-red-500'
  }
  
  const getStrokeColor = (score) => {
    if (score >= 80) return '#22c55e'
    if (score >= 60) return 'hsl(245, 58%, 51%)'
    if (score >= 40) return '#eab308'
    return '#ef4444'
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="180" height="180" className="-rotate-90">
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={getStrokeColor(score)}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-4xl font-bold transition-all duration-300 ${getScoreColor(score)}`}>{score}</span>
        <span className="text-sm text-gray-500">/ 100</span>
      </div>
    </div>
  )
}

// Skill Tag with Toggle Component
function SkillTag({ skill, confidence, onToggle }) {
  const isKnown = confidence === 'know'
  
  return (
    <button
      onClick={() => onToggle(skill)}
      className={`group relative px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
        isKnown 
          ? 'bg-green-100 border-green-400 text-green-700 hover:bg-green-200' 
          : 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100'
      }`}
    >
      <span className="flex items-center gap-1.5">
        {skill}
        <span className={`text-xs px-1.5 py-0.5 rounded ${
          isKnown ? 'bg-green-200 text-green-800' : 'bg-amber-200 text-amber-800'
        }`}>
          {isKnown ? '✓' : '?'}
        </span>
      </span>
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {isKnown ? 'Click: Need practice' : 'Click: I know this'}
      </span>
    </button>
  )
}

// Collapsible Section Component
function CollapsibleSection({ title, icon: Icon, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <Card>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <CardContent className="pt-0 border-t border-gray-100">
          {children}
        </CardContent>
      )}
    </Card>
  )
}

// Company Intel Card Component
function CompanyIntelCard({ companyIntel }) {
  if (!companyIntel) return null;

  const { company, industry, size, hiringFocus } = companyIntel;
  
  const getSizeColor = (category) => {
    switch (category) {
      case 'Enterprise': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Mid-size': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Startup': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="border-2 border-primary-100 bg-gradient-to-br from-white to-primary-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary-500" />
          Company Intel
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Company Info Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
            <Building2 className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500 mb-1">Company</p>
            <p className="font-semibold text-gray-900 text-sm truncate" title={company}>
              {company !== 'Not specified' ? company : 'Unknown'}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
            <Briefcase className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500 mb-1">Industry</p>
            <p className="font-semibold text-gray-900 text-sm">{industry}</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
            <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500 mb-1">Est. Size</p>
            <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full border ${getSizeColor(size.category)}`}>
              {size.label} ({size.range})
            </span>
          </div>
        </div>

        {/* Hiring Focus Section */}
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-primary-500" />
            <h4 className="font-semibold text-gray-900">Typical Hiring Focus: {hiringFocus.title}</h4>
          </div>
          <ul className="space-y-2 mb-4">
            {hiringFocus.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-1.5 flex-shrink-0"></span>
                {point}
              </li>
            ))}
          </ul>
          <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
            <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">{hiringFocus.tip}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Round Mapping Timeline Component
function RoundMappingTimeline({ roundMapping }) {
  if (!roundMapping || roundMapping.length === 0) return null;
  const [expandedRound, setExpandedRound] = useState(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-500" />
          Expected Interview Rounds
        </CardTitle>
        <p className="text-xs text-gray-500 mt-1">Based on company type and detected skills</p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-primary-200 to-gray-200"></div>
          
          {/* Timeline items */}
          <div className="space-y-4">
            {roundMapping.map((round, idx) => (
              <div key={idx} className="relative pl-14">
                {/* Timeline dot */}
                <div className={`absolute left-4 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                  idx === 0 
                    ? 'bg-primary-500 border-primary-500 text-white' 
                    : 'bg-white border-primary-300 text-primary-600'
                }`}>
                  {idx + 1}
                </div>
                
                {/* Round card */}
                <div 
                  className={`bg-white border rounded-lg transition-all cursor-pointer ${
                    expandedRound === idx ? 'border-primary-300 shadow-md' : 'border-gray-200 hover:border-primary-200 hover:shadow-sm'
                  }`}
                  onClick={() => setExpandedRound(expandedRound === idx ? null : idx)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{round.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{round.description}</p>
                        
                        {/* Focus tags */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {round.focus.map((item, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {round.duration}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedRound === idx ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    
                    {/* Expanded "Why this matters" section */}
                    {expandedRound === idx && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-start gap-2 p-3 bg-primary-50 rounded-lg">
                          <Info className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-primary-700 mb-1">Why this round matters</p>
                            <p className="text-sm text-primary-800">{round.why}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Click hint */}
        <p className="text-xs text-gray-400 text-center mt-4 pt-4 border-t border-gray-100">
          Click on any round to see why it matters
        </p>
      </CardContent>
    </Card>
  );
}

// Toast notification component
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
      <CheckCircle2 className="w-5 h-5 text-green-400" />
      {message}
    </div>
  )
}

function Assessments() {
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [skillConfidenceMap, setSkillConfidenceMap] = useState({})
  const [adjustedScore, setAdjustedScore] = useState(0)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const currentAnalysis = getCurrentAnalysis()
    if (currentAnalysis) {
      setAnalysis(currentAnalysis)
      // Initialize skill confidence map from stored data or default to 'practice'
      const storedMap = currentAnalysis.skillConfidenceMap || {}
      const allSkills = Object.values(currentAnalysis.extractedSkills.skills).flatMap(cat => cat.skills)
      const initialMap = {}
      allSkills.forEach(skill => {
        initialMap[skill] = storedMap[skill] || 'practice'
      })
      setSkillConfidenceMap(initialMap)
      // Use stored adjusted score or base score
      setAdjustedScore(currentAnalysis.adjustedReadinessScore ?? currentAnalysis.readinessScore)
    }
    setLoading(false)
  }, [])

  // Calculate adjusted score based on skill confidence
  const calculateAdjustedScore = useCallback((confidenceMap, baseScore) => {
    const skills = Object.keys(confidenceMap)
    let adjustment = 0
    skills.forEach(skill => {
      if (confidenceMap[skill] === 'know') {
        adjustment += 2
      } else {
        adjustment -= 2
      }
    })
    // Bound to 0-100
    return Math.max(0, Math.min(100, baseScore + adjustment))
  }, [])

  // Handle skill toggle
  const handleSkillToggle = (skill) => {
    const newConfidence = skillConfidenceMap[skill] === 'know' ? 'practice' : 'know'
    const newMap = { ...skillConfidenceMap, [skill]: newConfidence }
    setSkillConfidenceMap(newMap)
    
    // Calculate new score
    const newScore = calculateAdjustedScore(newMap, analysis.readinessScore)
    setAdjustedScore(newScore)
    
    // Persist changes
    const updates = {
      skillConfidenceMap: newMap,
      adjustedReadinessScore: newScore
    }
    updateAnalysis(analysis.id, updates)
    setCurrentAnalysis({ ...analysis, ...updates })
  }

  // Get weak skills (marked as 'practice')
  const getWeakSkills = () => {
    return Object.entries(skillConfidenceMap)
      .filter(([_, confidence]) => confidence === 'practice')
      .map(([skill]) => skill)
      .slice(0, 3)
  }

  // Export functions
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    setToast(`${label} copied to clipboard!`)
  }

  const generate7DayPlanText = () => {
    if (!analysis) return ''
    let text = `7-Day Preparation Plan\n${'='.repeat(40)}\n\n`
    text += `Company: ${analysis.company}\n`
    text += `Role: ${analysis.role}\n`
    text += `Generated: ${new Date(analysis.createdAt).toLocaleDateString()}\n\n`
    
    Object.entries(analysis.plan).forEach(([day, tasks]) => {
      text += `${day}\n${'-'.repeat(30)}\n`
      tasks.forEach(task => {
        text += `• ${task}\n`
      })
      text += '\n'
    })
    return text
  }

  const generateChecklistText = () => {
    if (!analysis) return ''
    let text = `Round-wise Preparation Checklist\n${'='.repeat(40)}\n\n`
    text += `Company: ${analysis.company}\n`
    text += `Role: ${analysis.role}\n\n`
    
    Object.entries(analysis.checklist).forEach(([round, items]) => {
      text += `${round}\n${'-'.repeat(30)}\n`
      items.forEach(item => {
        text += `[ ] ${item}\n`
      })
      text += '\n'
    })
    return text
  }

  const generateQuestionsText = () => {
    if (!analysis) return ''
    let text = `10 Likely Interview Questions\n${'='.repeat(40)}\n\n`
    text += `Company: ${analysis.company}\n`
    text += `Role: ${analysis.role}\n\n`
    
    analysis.questions.forEach((q, idx) => {
      text += `${idx + 1}. ${q.question}\n`
      text += `   Category: ${q.category}\n`
      text += `   Tip: ${q.tip}\n\n`
    })
    return text
  }

  const generateCompanyIntelText = () => {
    if (!analysis?.companyIntel) return ''
    const { company, industry, size, hiringFocus, roundMapping } = analysis.companyIntel
    
    let text = `COMPANY INTEL\n${'='.repeat(40)}\n\n`
    text += `Company: ${company}\n`
    text += `Industry: ${industry}\n`
    text += `Size Category: ${size.label} (${size.range} employees)\n\n`
    
    text += `Typical Hiring Focus: ${hiringFocus.title}\n${'-'.repeat(30)}\n`
    hiringFocus.points.forEach(point => {
      text += `• ${point}\n`
    })
    text += `\nTip: ${hiringFocus.tip}\n\n`
    
    text += `EXPECTED INTERVIEW ROUNDS\n${'-'.repeat(30)}\n\n`
    roundMapping.forEach((round, idx) => {
      text += `${idx + 1}. ${round.name}\n`
      text += `   ${round.description}\n`
      text += `   Duration: ${round.duration}\n`
      text += `   Focus: ${round.focus.join(', ')}\n`
      text += `   Why: ${round.why}\n\n`
    })
    
    return text
  }

  const downloadAsTxt = () => {
    if (!analysis) return
    
    let content = `Placement Readiness Analysis Report\n${'='.repeat(50)}\n\n`
    content += `Company: ${analysis.company}\n`
    content += `Role: ${analysis.role}\n`
    content += `Analyzed: ${new Date(analysis.createdAt).toLocaleDateString()}\n`
    content += `Base Readiness Score: ${analysis.readinessScore}/100\n`
    content += `Adjusted Score: ${adjustedScore}/100\n\n`
    
    // Company Intel section
    content += generateCompanyIntelText()
    
    // Skills section
    content += `\nKEY SKILLS EXTRACTED\n${'-'.repeat(40)}\n\n`
    Object.entries(analysis.extractedSkills.skills).forEach(([category, { skills }]) => {
      content += `${category}:\n`
      skills.forEach(skill => {
        const status = skillConfidenceMap[skill] === 'know' ? '✓ I know' : '? Need practice'
        content += `  • ${skill} [${status}]\n`
      })
      content += '\n'
    })
    
    // Weak areas
    const weakSkills = getWeakSkills()
    if (weakSkills.length > 0) {
      content += `\nTOP WEAK AREAS TO FOCUS\n${'-'.repeat(40)}\n`
      weakSkills.forEach((skill, idx) => {
        content += `${idx + 1}. ${skill}\n`
      })
      content += '\n'
    }
    
    content += '\n' + generate7DayPlanText()
    content += '\n' + generateChecklistText()
    content += '\n' + generateQuestionsText()
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `placement-prep-${analysis.company.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setToast('Report downloaded!')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Target className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">No Analysis Yet</h2>
        <p className="text-gray-600 mb-8">
          Analyze a job description to see your personalized preparation plan
        </p>
        <button
          onClick={() => navigate('/app/practice')}
          className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Analyze JD
        </button>
      </div>
    )
  }

  const { company, role, extractedSkills, checklist, plan, questions, readinessScore, createdAt, companyIntel } = analysis
  const weakSkills = getWeakSkills()

  return (
    <div className="max-w-4xl mx-auto">
      {/* Toast Notification */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/app/practice')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Analyze Another JD
        </button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-primary-900">
              {company !== 'Not specified' ? company : 'Analysis'} 
              {role !== 'Not specified' && ` - ${role}`}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Analyzed on {new Date(createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Export Tools */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700 mr-2">Export:</span>
            <button
              onClick={() => copyToClipboard(generate7DayPlanText(), '7-day plan')}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy 7-day plan
            </button>
            <button
              onClick={() => copyToClipboard(generateChecklistText(), 'Round checklist')}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy round checklist
            </button>
            <button
              onClick={() => copyToClipboard(generateQuestionsText(), '10 questions')}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy 10 questions
            </button>
            <button
              onClick={downloadAsTxt}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download as TXT
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Score and Skills Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Readiness Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-500" />
              Readiness Score
              <span className="text-xs font-normal text-gray-500 ml-2">(Live)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ReadinessScore score={adjustedScore} />
            <p className="mt-4 text-gray-600 text-center">
              {adjustedScore >= 80 && 'Excellent! You\'re well prepared.'}
              {adjustedScore >= 60 && adjustedScore < 80 && 'Good progress! Keep preparing.'}
              {adjustedScore >= 40 && adjustedScore < 60 && 'Getting there. Focus on weak areas.'}
              {adjustedScore < 40 && 'Needs work. Follow the plan below.'}
            </p>
            {adjustedScore !== readinessScore && (
              <p className="mt-2 text-xs text-gray-400">
                Base: {readinessScore} → Adjusted: {adjustedScore} 
                <span className={adjustedScore > readinessScore ? 'text-green-500' : 'text-amber-500'}>
                  {' '}({adjustedScore > readinessScore ? '+' : ''}{adjustedScore - readinessScore})
                </span>
              </p>
            )}
          </CardContent>
        </Card>

        {/* Extracted Skills with Toggles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary-500" />
              Key Skills Extracted
            </CardTitle>
            <p className="text-xs text-gray-500 mt-1">Click skills to mark confidence level</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(extractedSkills.skills).map(([category, { skills }]) => (
                <div key={category}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <SkillTag
                        key={idx}
                        skill={skill}
                        confidence={skillConfidenceMap[skill] || 'practice'}
                        onToggle={handleSkillToggle}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-400"></span> I know this
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-amber-300"></span> Need practice
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Intel + Round Mapping Section */}
      {companyIntel && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Company Intel Card */}
          <CompanyIntelCard companyIntel={companyIntel} />
          
          {/* Round Mapping Timeline */}
          <RoundMappingTimeline roundMapping={companyIntel.roundMapping} />
        </div>
      )}

      {/* Collapsible Sections */}
      <div className="space-y-4">
        {/* Round-wise Checklist */}
        <CollapsibleSection title="Round-wise Preparation Checklist" icon={CheckCircle2} defaultOpen={true}>
          <div className="space-y-6 pt-4">
            {Object.entries(checklist).map(([round, items]) => (
              <div key={round}>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                  {round}
                </h4>
                <ul className="space-y-2 ml-4">
                  {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <input
                        type="checkbox"
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                      />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* 7-Day Plan */}
        <CollapsibleSection title="7-Day Preparation Plan" icon={Calendar} defaultOpen={true}>
          <div className="space-y-6 pt-4">
            {Object.entries(plan).map(([day, tasks]) => (
              <div key={day} className="border-l-2 border-primary-200 pl-4">
                <h4 className="font-semibold text-primary-900 mb-3">{day}</h4>
                <ul className="space-y-2">
                  {tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                      <span className="text-primary-500 mt-0.5">•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        {/* Interview Questions */}
        <CollapsibleSection title="10 Likely Interview Questions" icon={HelpCircle} defaultOpen={true}>
          <div className="space-y-4 pt-4">
            {questions.map((q, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
                        {q.category}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>{q.tip}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      </div>

      {/* Demo Mode Disclaimer */}
      {companyIntel?.isHeuristic && (
        <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2">
          <Info className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <p className="text-xs text-gray-500">
            <span className="font-medium">Demo Mode:</span> Company intel and round mapping are generated heuristically based on company name patterns and detected skills. Actual interview processes may vary.
          </p>
        </div>
      )}

      {/* Action Next Box */}
      <Card className="mt-6 bg-gradient-to-r from-primary-50 to-indigo-50 border-primary-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">Action Next</h3>
              {weakSkills.length > 0 ? (
                <>
                  <p className="text-sm text-gray-600 mb-3">
                    Focus on these skills that need practice:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {weakSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                      >
                        {idx + 1}. {skill}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm text-green-600 mb-3 font-medium">
                  Great! You're confident in all skills. Time to practice!
                </p>
              )}
              <button
                onClick={() => {
                  window.scrollTo({ top: 600, behavior: 'smooth' })
                }}
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors"
              >
                Start Day 1 plan now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Assessments
