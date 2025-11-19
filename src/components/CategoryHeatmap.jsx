import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { getCategoryStats, categoryColumns, ratingMap } from '../utils/dataParser'

// Pastel colors for rating levels
const RATING_COLORS = {
  'Glorious': '#BAFFC9', // Pastel green
  'Great': '#BAE1FF',    // Pastel blue
  'Good': '#FFFFBA',      // Pastel yellow
  'Needs attention': '#FFDFBA', // Pastel orange
  'Rough': '#FFB3BA'     // Pastel pink
}

export default function CategoryHeatmap({ data }) {
  const categoryData = useMemo(() => {
    const stats = getCategoryStats(data)
    
    // Transform data for stacked bar chart
    return categoryColumns.map(category => {
      const categoryStat = stats[category]
      return {
        category: category.replace(' & ', ' &\n'),
        ...categoryStat.distribution,
        average: categoryStat.average.toFixed(1)
      }
    })
  }, [data])

  // Calculate overall averages for comparison
  const overallStats = useMemo(() => {
    const stats = getCategoryStats(data)
    return categoryColumns.map(category => ({
      category,
      average: stats[category].average
    }))
  }, [data])

  return (
    <section className="fade-in mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Category Ratings</h2>
      
      {/* Stacked Bar Chart */}
      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-center">Rating Distribution by Category</h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={categoryData}
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="category" 
              angle={-45}
              textAnchor="end"
              height={120}
              tick={{ fill: '#fff', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#fff' }}
              label={{ value: 'Respondents', angle: -90, position: 'insideLeft', fill: '#fff' }}
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
            />
            <Legend 
              wrapperStyle={{ color: '#fff', paddingTop: '20px' }}
            />
            <Bar dataKey="Glorious" stackId="a" fill={RATING_COLORS['Glorious']} animationBegin={0} animationDuration={1000} />
            <Bar dataKey="Great" stackId="a" fill={RATING_COLORS['Great']} animationBegin={100} animationDuration={1000} />
            <Bar dataKey="Good" stackId="a" fill={RATING_COLORS['Good']} animationBegin={200} animationDuration={1000} />
            <Bar dataKey="Needs attention" stackId="a" fill={RATING_COLORS['Needs attention']} animationBegin={300} animationDuration={1000} />
            <Bar dataKey="Rough" stackId="a" fill={RATING_COLORS['Rough']} animationBegin={400} animationDuration={1000} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Average Scores Bar Chart */}
      <div className="bg-dark-surface rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6 text-center">Avg. Rating by Category</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={overallStats}
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="category" 
              angle={-45}
              textAnchor="end"
              height={120}
              tick={{ fill: '#fff', fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 5]}
              tick={{ fill: '#fff' }}
              label={{ value: 'Average Rating (1-5)', angle: -90, position: 'insideLeft', fill: '#fff' }}
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
              formatter={(value) => [`${value.toFixed(2)} / 5`, 'Average']}
            />
            <Bar 
              dataKey="average" 
              animationBegin={0}
              animationDuration={1200}
            >
              {overallStats.map((entry, index) => {
                // Color based on average score
                let color = RATING_COLORS['Rough']
                if (entry.average >= 4.5) color = RATING_COLORS['Glorious']
                else if (entry.average >= 3.5) color = RATING_COLORS['Great']
                else if (entry.average >= 2.5) color = RATING_COLORS['Good']
                else if (entry.average >= 1.5) color = RATING_COLORS['Needs attention']
                
                return <Cell key={`cell-${index}`} fill={color} />
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

