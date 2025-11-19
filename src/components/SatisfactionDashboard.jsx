import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { getRecommendRAScore, getReturning2026 } from '../utils/dataParser'

// Pastel colors for charts
const PASTEL_COLORS = [
  '#FFB3BA', // Pastel pink
  '#BAFFC9', // Pastel green
  '#BAE1FF', // Pastel blue
  '#FFFFBA', // Pastel yellow
  '#FFDFBA', // Pastel orange
  '#E0BBE4', // Pastel purple
  '#FEC8C1', // Pastel coral
  '#B4E4D9', // Pastel mint
]

const RETURNING_COLORS = {
  'Yes': '#BAFFC9',
  'Probably': '#BAE1FF',
  'Undecided': '#FFFFBA',
  'Unlikely': '#FFB3BA'
}

export default function SatisfactionDashboard({ data }) {
  const recommendData = useMemo(() => {
    const stats = getRecommendRAScore(data)
    return stats
  }, [data])

  const returningData = useMemo(() => {
    const stats = getReturning2026(data)
    return Object.entries(stats).map(([name, value]) => ({
      name,
      value
    })).filter(item => item.value > 0)
  }, [data])

  const totalResponses = data.length

  // Gauge chart data for Recommend RA score
  const gaugeData = [
    { name: 'Score', value: recommendData.average, fill: '#BAE1FF' },
    { name: 'Remaining', value: 10 - recommendData.average, fill: '#2a2a2a' }
  ]

  return (
    <section className="fade-in">
      <h2 className="text-3xl font-bold mb-8 text-center">Overall Satisfaction</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Recommend RA Gauge */}
        <div className="bg-dark-surface rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Recommend RA Score</h3>
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold mb-2" style={{ color: '#BAE1FF' }}>
              {recommendData.average.toFixed(1)}
            </div>
            <div className="text-gray-400 text-sm">out of 10</div>
            <div className="w-full mt-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={gaugeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {gaugeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid #333',
                      color: '#fff'
                    }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Returning 2026 Pie Chart */}
        <div className="bg-dark-surface rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Returning in 2026?</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={returningData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
              >
                {returningData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={RETURNING_COLORS[entry.name] || PASTEL_COLORS[index % PASTEL_COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #333',
                  color: '#fff'
                }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend 
                wrapperStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Response Count */}
      <div className="bg-dark-surface rounded-lg p-6 text-center">
        <div className="text-4xl font-bold mb-2" style={{ color: '#BAE1FF' }}>
          {totalResponses}
        </div>
        <div className="text-gray-400">Total Responses</div>
      </div>
    </section>
  )
}

