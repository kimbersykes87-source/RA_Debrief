import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts'
import { getReturning2026 } from '../utils/dataParser'

// Pastel colors for volunteer roles
const VOLUNTEER_COLORS = [
  '#BAE1FF', // Pastel blue
  '#BAFFC9', // Pastel green
  '#FFFFBA', // Pastel yellow
  '#FFDFBA', // Pastel orange
  '#E0BBE4', // Pastel purple
  '#FEC8C1', // Pastel coral
  '#B4E4D9', // Pastel mint
  '#FFB3BA', // Pastel pink
]

// Common volunteer role keywords
const VOLUNTEER_ROLES = [
  'Build week',
  'Barbies',
  'Art-Car Drivers',
  'Cook Crews',
  'Planeteers',
  'Water team',
  'Power/solar team',
  'Shade & tents',
  'Bikes',
  'Logistics',
  'Comms/content',
  'DJ/performer',
  'Radiance Hour',
  'Strike/Packdown',
  'Finance/ops/admin',
  'Hen House',
  'Other'
]

export default function VolunteerInterests({ data }) {
  const volunteerData = useMemo(() => {
    const roleCounts = {}
    VOLUNTEER_ROLES.forEach(role => {
      roleCounts[role] = 0
    })

    data.forEach(row => {
      const helpText = row['Let me help with:']
      if (helpText && helpText.trim() !== '') {
        // Check for each role
        VOLUNTEER_ROLES.forEach(role => {
          if (role === 'Other') {
            // Check if it doesn't match any other role
            const matchesOther = VOLUNTEER_ROLES.slice(0, -1).some(r => 
              helpText.toLowerCase().includes(r.toLowerCase())
            )
            if (!matchesOther && helpText.length > 10) {
              roleCounts['Other']++
            }
          } else {
            // Check if the role is mentioned
            const roleVariations = [
              role.toLowerCase(),
              role.replace('/', ' ').toLowerCase(),
              role.replace(' & ', ' ').toLowerCase()
            ]
            if (roleVariations.some(variation => helpText.toLowerCase().includes(variation))) {
              roleCounts[role]++
            }
          }
        })
      }
    })

    return Object.entries(roleCounts)
      .map(([role, count]) => ({ role, count }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count)
  }, [data])

  // Get returning members data for context
  const returningData = useMemo(() => {
    return getReturning2026(data)
  }, [data])

  const totalVolunteers = useMemo(() => {
    return data.filter(row => {
      const helpText = row['Let me help with:']
      return helpText && helpText.trim() !== ''
    }).length
  }, [data])

  return (
    <section className="fade-in mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Volunteer Interests</h2>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-surface rounded-lg p-6 text-center">
          <div className="text-sm text-gray-400 mb-2">Total Volunteers</div>
          <div className="text-4xl font-bold" style={{ color: '#BAE1FF' }}>
            {totalVolunteers}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {((totalVolunteers / data.length) * 100).toFixed(0)}% of respondents
          </div>
        </div>
        
        <div className="bg-dark-surface rounded-lg p-6 text-center">
          <div className="text-sm text-gray-400 mb-2">Returning in 2026</div>
          <div className="text-4xl font-bold" style={{ color: '#BAFFC9' }}>
            {returningData['Yes'] + returningData['Probably']}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Likely to return
          </div>
        </div>
        
        <div className="bg-dark-surface rounded-lg p-6 text-center">
          <div className="text-sm text-gray-400 mb-2">Most Popular Role</div>
          <div className="text-2xl font-bold" style={{ color: '#FFFFBA' }}>
            {volunteerData[0]?.role || 'N/A'}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {volunteerData[0]?.count || 0} volunteers
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-center">Volunteer Interest by Role</h3>
        <ResponsiveContainer width="100%" height={Math.max(400, volunteerData.length * 40)}>
          <BarChart
            data={volunteerData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              type="number"
              tick={{ fill: '#fff' }}
            />
            <YAxis 
              dataKey="role" 
              type="category"
              tick={{ fill: '#fff', fontSize: 12 }}
              width={140}
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
            <Bar 
              dataKey="count" 
              animationBegin={0}
              animationDuration={1200}
            >
              {volunteerData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={VOLUNTEER_COLORS[index % VOLUNTEER_COLORS.length]} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Roles Grid */}
      <div className="bg-dark-surface rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6 text-center">Top Volunteer Roles</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {volunteerData.slice(0, 12).map((item, index) => (
            <div 
              key={index}
              className="bg-dark-bg rounded-lg p-4 border border-gray-700"
            >
              <div className="text-3xl font-bold mb-2" style={{ color: VOLUNTEER_COLORS[index % VOLUNTEER_COLORS.length] }}>
                {item.count}
              </div>
              <div className="text-sm text-gray-300">{item.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

