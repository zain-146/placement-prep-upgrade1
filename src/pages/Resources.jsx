import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { History, Trash2, Eye, Building2, Briefcase, Target, Clock, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '../components/ui/Card'
import { getHistory, deleteAnalysis, setCurrentAnalysis, clearHistory } from '../utils/storage'

function Resources() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    const data = getHistory()
    setHistory(data)
    setLoading(false)
  }

  const handleViewAnalysis = (analysis) => {
    setCurrentAnalysis(analysis)
    navigate('/app/assessments')
  }

  const handleDelete = (id, e) => {
    e.stopPropagation()
    if (confirm('Delete this analysis?')) {
      deleteAnalysis(id)
      loadHistory()
    }
  }

  const handleClearAll = () => {
    clearHistory()
    setHistory([])
    setShowClearConfirm(false)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-100 text-green-700'
    if (score >= 60) return 'bg-primary-100 text-primary-700'
    if (score >= 40) return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today at ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary-900 mb-2">Analysis History</h1>
          <p className="text-gray-600">View and manage your past JD analyses</p>
        </div>
        {history.length > 0 && (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Clear All History?</h3>
              </div>
              <p className="text-gray-600 mb-6">
                This will permanently delete all {history.length} analysis records. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete All
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {history.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <History className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No History Yet</h2>
          <p className="text-gray-600 mb-8">
            Your analyzed job descriptions will appear here
          </p>
          <button
            onClick={() => navigate('/app/practice')}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Analyze Your First JD
          </button>
        </div>
      ) : (
        /* History List */
        <div className="space-y-4">
          {history.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleViewAnalysis(item)}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.company !== 'Not specified' ? item.company : 'Untitled Analysis'}
                      </h3>
                      <span className={`px-2.5 py-1 rounded-full text-sm font-medium ${getScoreColor(item.readinessScore)}`}>
                        {item.readinessScore}%
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      {item.role !== 'Not specified' && (
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {item.role}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(item.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {item.extractedSkills.totalSkillCount} skills detected
                      </span>
                    </div>

                    {/* Skill tags preview */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {Object.values(item.extractedSkills.skills)
                        .flatMap(cat => cat.skills)
                        .slice(0, 5)
                        .map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      {item.extractedSkills.totalSkillCount > 5 && (
                        <span className="px-2 py-0.5 text-gray-400 text-xs">
                          +{item.extractedSkills.totalSkillCount - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewAnalysis(item)
                      }}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                      title="View details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Stats footer */}
      {history.length > 0 && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center text-sm text-gray-500">
          {history.length} analysis record{history.length !== 1 ? 's' : ''} saved locally
        </div>
      )}
    </div>
  )
}

export default Resources
