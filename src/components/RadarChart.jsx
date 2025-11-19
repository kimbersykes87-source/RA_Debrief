import { useMemo } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { getCategoryStats, categoryColumns } from '../utils/dataParser'

// Pastel colors for the radar chart
const RADAR_COLORS = {
  average: '#BAE1FF', // Pastel blue
  max: '#BAFFC9',      // Pastel green
  min: '#FFB3BA'       // Pastel pink
}

export default function RadarChartComponent({ data }) {
  const radarData = useMemo(() => {
    const stats = getCategoryStats(data)
    
    // Transform data for radar chart
    return categoryColumns.map(category => {
      const categoryStat = stats[category]
      return {
        category: category.replace(' & ', ' &\n'),
        average: categoryStat.average,
        max: 5,
        min: 1
      }
    })
  }, [data])

  // Calculate summary statistics
  const summary = useMemo(() => {
    const stats = getCategoryStats(data)
    const averages = categoryColumns.map(cat => stats[cat].average)
    return {
      highest: {
        category: categoryColumns[averages.indexOf(Math.max(...averages))],
        value: Math.max(...averages).toFixed(2)
      },
      lowest: {
        category: categoryColumns[averages.indexOf(Math.min(...averages))],
        value: Math.min(...averages).toFixed(2)
      },
      overallAverage: (averages.reduce((a, b) => a + b, 0) / averages.length).toFixed(2)
    }
  }, [data])

  return (
    <section className="fade-in mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Category Comparison</h2>
      
      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-center">Radar Chart - All Categories</h3>
        <ResponsiveContainer width="100%" height={500}>
          <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{ fill: '#fff', fontSize: 12 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 5]} 
              tick={{ fill: '#fff', fontSize: 10 }}
            />
            <Radar
              name="Average Rating"
              dataKey="average"
              stroke={RADAR_COLORS.average}
              fill={RADAR_COLORS.average}
              fillOpacity={0.6}
              animationBegin={0}
              animationDuration={1500}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #333',
                color: '#fff',
                borderRadius: '8px'
              }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value) => [`${value.toFixed(2)} / 5`, 'Average Rating']}
            />
            <Legend 
              wrapperStyle={{ color: '#fff', paddingTop: '20px' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-surface rounded-lg p-6 text-center">
          <div className="text-sm text-gray-400 mb-2">Highest Rated</div>
          <div className="text-2xl font-bold mb-1" style={{ color: RADAR_COLORS.max }}>
            {summary.highest.value}
          </div>
          <div className="text-sm text-gray-300">{summary.highest.category}</div>
        </div>
        
        <div className="bg-dark-surface rounded-lg p-6 text-center">
          <div className="text-sm text-gray-400 mb-2">Overall Average</div>
          <div className="text-2xl font-bold mb-1" style={{ color: RADAR_COLORS.average }}>
            {summary.overallAverage}
          </div>
          <div className="text-sm text-gray-300">Across all categories</div>
        </div>
        
        <div className="bg-dark-surface rounded-lg p-6 text-center">
          <div className="text-sm text-gray-400 mb-2">Lowest Rated</div>
          <div className="text-2xl font-bold mb-1" style={{ color: RADAR_COLORS.min }}>
            {summary.lowest.value}
          </div>
          <div className="text-sm text-gray-300">{summary.lowest.category}</div>
        </div>
      </div>
    </section>
  )
}

