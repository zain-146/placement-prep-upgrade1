import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Building2, Briefcase, Sparkles, Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'
import { extractSkills, calculateReadinessScore } from '../utils/skillExtractor'
import { generateAnalysis } from '../utils/analysisGenerator'
import { saveAnalysis, setCurrentAnalysis } from '../utils/storage'

function Practice() {
  const navigate = useNavigate()
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [jdText, setJdText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    // Validation
    if (!jdText.trim()) {
      setError('Please paste the job description to analyze')
      return
    }

    if (jdText.trim().length < 50) {
      setError('Job description seems too short. Please provide more details.')
      return
    }

    setError('')
    setIsAnalyzing(true)

    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 800))

    try {
      // Extract skills from JD
      const extractedSkills = extractSkills(jdText)
      
      // Calculate readiness score
      const readinessScore = calculateReadinessScore(extractedSkills, company, role, jdText)
      
      // Generate complete analysis
      const analysis = generateAnalysis(company, role, jdText, extractedSkills, readinessScore)
      
      // Save to localStorage
      saveAnalysis(analysis)
      setCurrentAnalysis(analysis)
      
      // Navigate to results
      navigate('/app/assessments')
    } catch (err) {
      setError('An error occurred during analysis. Please try again.')
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleClear = () => {
    setCompany('')
    setRole('')
    setJdText('')
    setError('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-900 mb-2">JD Analyzer</h1>
        <p className="text-gray-600">Paste a job description to get personalized preparation insights</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-500" />
            Analyze Job Description
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company and Role inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Building2 className="w-4 h-4" />
                Company Name
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., Google, Microsoft, TCS"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4" />
                Role / Position
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Software Engineer, Frontend Developer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          {/* JD Text area */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Job Description *
            </label>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the complete job description here...\n\nInclude requirements, responsibilities, qualifications, and any technical skills mentioned."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none font-mono text-sm"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{jdText.length} characters</span>
              <span>{jdText.length >= 800 ? '✓ Good length' : 'Tip: More details = better analysis'}</span>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Analyze JD
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              disabled={isAnalyzing}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Tips section */}
      <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
        <h3 className="font-semibold text-primary-900 mb-2">Tips for better analysis:</h3>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• Include the complete job description with all requirements</li>
          <li>• Technical skills, qualifications, and responsibilities help improve accuracy</li>
          <li>• Adding company name and role helps personalize preparation</li>
          <li>• Longer descriptions (800+ characters) provide more comprehensive insights</li>
        </ul>
      </div>
    </div>
  )
}

export default Practice
