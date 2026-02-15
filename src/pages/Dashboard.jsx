import { useNavigate } from 'react-router-dom'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { Calendar, Clock, Play } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card'

// Skill data for radar chart
const skillData = [
  { skill: 'DSA', value: 75 },
  { skill: 'System Design', value: 60 },
  { skill: 'Communication', value: 80 },
  { skill: 'Resume', value: 85 },
  { skill: 'Aptitude', value: 70 },
]

// Upcoming assessments data
const assessments = [
  { title: 'DSA Mock Test', date: 'Tomorrow', time: '10:00 AM' },
  { title: 'System Design Review', date: 'Wed', time: '2:00 PM' },
  { title: 'HR Interview Prep', date: 'Friday', time: '11:00 AM' },
]

// Days of the week with activity status
const weekDays = [
  { day: 'M', active: true },
  { day: 'T', active: true },
  { day: 'W', active: false },
  { day: 'T', active: true },
  { day: 'F', active: true },
  { day: 'S', active: false },
  { day: 'S', active: false },
]

// Circular Progress Component
function CircularProgress({ value, max = 100, size = 180 }) {
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = ((max - value) / max) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(245, 58%, 51%)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold text-primary-900">{value}</span>
        <span className="text-sm text-gray-500">/ {max}</span>
      </div>
    </div>
  )
}

// Progress Bar Component
function ProgressBar({ value, max, className = '' }) {
  const percentage = (value / max) * 100
  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div
        className="bg-primary-500 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

function Dashboard() {
  const navigate = useNavigate()
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Readiness */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <CircularProgress value={72} max={100} />
            <p className="mt-4 text-gray-600 font-medium">Readiness Score</p>
          </CardContent>
        </Card>

        {/* Skill Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={skillData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#9ca3af', fontSize: 10 }}
                />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="hsl(245, 58%, 51%)"
                  fill="hsl(245, 58%, 51%)"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Continue Practice */}
        <Card>
          <CardHeader>
            <CardTitle>Continue Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium text-gray-900">Dynamic Programming</p>
                <p className="text-sm text-gray-500">Last topic</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-900 font-medium">3/10 completed</span>
              </div>
              <ProgressBar value={3} max={10} />
            </div>
            <button 
              onClick={() => navigate('/app/practice')}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
            >
              Continue
            </button>
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Problems Solved</span>
                <span className="text-gray-900 font-medium">12/20 this week</span>
              </div>
              <ProgressBar value={12} max={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-3">Activity</p>
              <div className="flex justify-between">
                {weekDays.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                        item.active
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {item.day}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Assessments - Full width on mobile, spans 2 cols on desktop */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessments.map((assessment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{assessment.title}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{assessment.date}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5" />
                        <span>{assessment.time}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/app/assessments')}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
