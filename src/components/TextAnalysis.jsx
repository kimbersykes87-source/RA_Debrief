import { useMemo } from 'react'

// Keywords for categorizing feedback
const IMPROVEMENT_CATEGORIES = {
  'Tents/AC': ['tent', 'ac', 'aircon', 'air con', 'shiftpod', 'waterproof', 'weather', 'rain'],
  'Food': ['food', 'dinner', 'meal', 'cook', 'eating', 'portion', 'hungry'],
  'Power': ['power', 'electrical', 'solar', 'outlet', 'socket', 'battery', 'inverter'],
  'Water': ['water', 'shower', 'taste', 'filter', 'chlorinated'],
  'Communication': ['communication', 'comms', 'notice', 'board', 'schedule', 'inform'],
  'Art Car': ['art car', 'artcar', 'mezcal', 'ss mezcal'],
  'Community': ['community', 'vibes', 'people', 'connect', 'silo', 'group'],
  'Other': []
}

export default function TextAnalysis({ data }) {
  // Extract and categorize "What Worked Well" responses
  const workedWell = useMemo(() => {
    return data
      .map(row => row['What worked particularly well?'])
      .filter(text => text && text.trim() !== '')
      .slice(0, 10) // Show top 10
  }, [data])

  // Extract and categorize "Improve for 2026" responses
  const improvements = useMemo(() => {
    const allImprovements = data
      .map(row => row['Improve for 2026'])
      .filter(text => text && text.trim() !== '')
    
    // Categorize improvements
    const categorized = {}
    Object.keys(IMPROVEMENT_CATEGORIES).forEach(category => {
      categorized[category] = []
    })

    allImprovements.forEach(text => {
      const lowerText = text.toLowerCase()
      let categorized_flag = false
      
      Object.entries(IMPROVEMENT_CATEGORIES).forEach(([category, keywords]) => {
        if (category !== 'Other' && keywords.some(keyword => lowerText.includes(keyword))) {
          categorized[category].push(text)
          categorized_flag = true
        }
      })
      
      if (!categorized_flag) {
        categorized['Other'].push(text)
      }
    })

    return categorized
  }, [data])

  // Extract Start/Stop/Continue responses
  const startStopContinue = useMemo(() => {
    const responses = data
      .map(row => row['Start / Stop / Continue'])
      .filter(text => text && text.trim() !== '')
    
    const categorized = {
      start: [],
      stop: [],
      continue: []
    }

    responses.forEach(text => {
      const lowerText = text.toLowerCase()
      const lines = text.split('\n').map(l => l.trim()).filter(l => l)
      
      lines.forEach(line => {
        const lowerLine = line.toLowerCase()
        if (lowerLine.startsWith('start') || lowerLine.startsWith('- start')) {
          categorized.start.push(line.replace(/^(start|start:|- start:?)\s*/i, '').trim())
        } else if (lowerLine.startsWith('stop') || lowerLine.startsWith('- stop')) {
          categorized.stop.push(line.replace(/^(stop|stop:|- stop:?)\s*/i, '').trim())
        } else if (lowerLine.startsWith('continue') || lowerLine.startsWith('- continue')) {
          categorized.continue.push(line.replace(/^(continue|continue:|- continue:?)\s*/i, '').trim())
        }
      })
    })

    return categorized
  }, [data])

  // Count improvements by category
  const improvementCounts = useMemo(() => {
    return Object.entries(improvements).map(([category, items]) => ({
      category,
      count: items.length
    })).filter(item => item.count > 0).sort((a, b) => b.count - a.count)
  }, [improvements])

  return (
    <section className="fade-in mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Qualitative Feedback</h2>

      {/* What Worked Well */}
      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-center">What Worked Particularly Well</h3>
        <div className="space-y-4">
          {workedWell.map((text, index) => (
            <div 
              key={index} 
              className="p-4 bg-dark-bg rounded-lg border border-gray-700 text-gray-200"
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap">{text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvements by Category */}
      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-center">Improvements for 2026 (by Category)</h3>
        
        {/* Category Counts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {improvementCounts.map(({ category, count }) => (
            <div key={category} className="bg-dark-bg rounded-lg p-4 text-center border border-gray-700">
              <div className="text-2xl font-bold mb-1" style={{ color: '#BAE1FF' }}>{count}</div>
              <div className="text-sm text-gray-400">{category}</div>
            </div>
          ))}
        </div>

        {/* Detailed Improvements */}
        <div className="space-y-6">
          {Object.entries(improvements)
            .filter(([category, items]) => items.length > 0)
            .map(([category, items]) => (
              <div key={category} className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-gray-300">{category}</h4>
                <div className="space-y-3">
                  {items.slice(0, 5).map((text, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-dark-bg rounded border border-gray-700 text-sm text-gray-300 leading-relaxed whitespace-pre-wrap"
                    >
                      {text}
                    </div>
                  ))}
                  {items.length > 5 && (
                    <div className="text-xs text-gray-500 italic">
                      + {items.length - 5} more {category.toLowerCase()} suggestions
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Start / Stop / Continue */}
      <div className="bg-dark-surface rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-6 text-center">Start / Stop / Continue</h3>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-dark-bg rounded-lg p-4 text-center border border-gray-700">
            <div className="text-3xl font-bold mb-1" style={{ color: '#BAFFC9' }}>
              {startStopContinue.start.length}
            </div>
            <div className="text-sm text-gray-400">Start</div>
          </div>
          <div className="bg-dark-bg rounded-lg p-4 text-center border border-gray-700">
            <div className="text-3xl font-bold mb-1" style={{ color: '#FFB3BA' }}>
              {startStopContinue.stop.length}
            </div>
            <div className="text-sm text-gray-400">Stop</div>
          </div>
          <div className="bg-dark-bg rounded-lg p-4 text-center border border-gray-700">
            <div className="text-3xl font-bold mb-1" style={{ color: '#BAE1FF' }}>
              {startStopContinue.continue.length}
            </div>
            <div className="text-sm text-gray-400">Continue</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Start */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-center" style={{ color: '#BAFFC9' }}>
              Start
            </h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {startStopContinue.start.length > 0 ? (
                startStopContinue.start.map((item, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-dark-bg rounded border border-gray-700 text-sm text-gray-300"
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic text-center py-4">No suggestions</div>
              )}
            </div>
          </div>

          {/* Stop */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-center" style={{ color: '#FFB3BA' }}>
              Stop
            </h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {startStopContinue.stop.length > 0 ? (
                startStopContinue.stop.map((item, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-dark-bg rounded border border-gray-700 text-sm text-gray-300"
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic text-center py-4">No suggestions</div>
              )}
            </div>
          </div>

          {/* Continue */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-center" style={{ color: '#BAE1FF' }}>
              Continue
            </h4>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {startStopContinue.continue.length > 0 ? (
                startStopContinue.continue.map((item, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-dark-bg rounded border border-gray-700 text-sm text-gray-300"
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500 italic text-center py-4">No suggestions</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

