import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { getFeeData } from '../utils/dataParser'

// Pastel colors for fee types
const FEE_COLORS = {
  'Camp Fees': '#BAE1FF',    // Pastel blue
  'Tent Fees': '#BAFFC9',    // Pastel green
  'AC Fees': '#FFFFBA',      // Pastel yellow
  'Bike Fees': '#FFDFBA'     // Pastel orange
}

export default function FeeAnalysis({ data }) {
  const feeStats = useMemo(() => {
    return getFeeData(data)
  }, [data])

  // Transform data for bar chart (averages)
  const averageData = useMemo(() => {
    return Object.entries(feeStats).map(([feeType, stats]) => ({
      feeType: feeType.replace(' Fees', ''),
      average: stats.average,
      min: stats.min,
      max: stats.max,
      count: stats.count
    }))
  }, [feeStats])

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <section className="fade-in mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Fee Analysis</h2>
      
      {/* Average Fees Bar Chart */}
      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-center">Average Fees by Type</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={averageData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="feeType" 
              tick={{ fill: '#fff' }}
            />
            <YAxis 
              tick={{ fill: '#fff' }}
              label={{ value: 'Amount (USD)', angle: -90, position: 'insideLeft', fill: '#fff' }}
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
              formatter={(value) => formatCurrency(value)}
            />
            <Bar 
              dataKey="average" 
              animationBegin={0}
              animationDuration={1200}
            >
              {averageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={FEE_COLORS[entry.feeType + ' Fees'] || FEE_COLORS['Camp Fees']} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Fee Range Chart (Min/Max) */}
      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-center">Fee Range by Type</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={averageData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="feeType" 
              tick={{ fill: '#fff' }}
            />
            <YAxis 
              tick={{ fill: '#fff' }}
              label={{ value: 'Amount (USD)', angle: -90, position: 'insideLeft', fill: '#fff' }}
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
              formatter={(value) => formatCurrency(value)}
            />
            <Bar 
              dataKey="min" 
              fill="#FFB3BA"
              animationBegin={0}
              animationDuration={1000}
            />
            <Bar 
              dataKey="max" 
              fill="#BAFFC9"
              animationBegin={200}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {averageData.map((fee, index) => (
          <div key={index} className="bg-dark-surface rounded-lg p-6 text-center">
            <div className="text-sm text-gray-400 mb-2">{fee.feeType} Fees</div>
            <div className="text-3xl font-bold mb-2" style={{ color: FEE_COLORS[fee.feeType + ' Fees'] || FEE_COLORS['Camp Fees'] }}>
              {formatCurrency(fee.average)}
            </div>
            <div className="text-xs text-gray-500">
              Range: {formatCurrency(fee.min)} - {formatCurrency(fee.max)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {fee.count} responses
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

