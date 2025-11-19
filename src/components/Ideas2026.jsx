import { useMemo } from 'react'

export default function Ideas2026({ data }) {
  const ideas = useMemo(() => {
    return data
      .map(row => row['2026 Ideas?'])
      .filter(text => text && text.trim() !== '')
      .map(text => text.trim())
  }, [data])

  // Categorize ideas by keywords
  const categorizedIdeas = useMemo(() => {
    const categories = {
      'Art & Creative': [],
      'Food & Dining': [],
      'Infrastructure': [],
      'Community & Events': [],
      'Other': []
    }

    ideas.forEach(idea => {
      const lowerIdea = idea.toLowerCase()
      let categorized = false

      if (lowerIdea.includes('art') || lowerIdea.includes('artwork') || lowerIdea.includes('art car') || lowerIdea.includes('playa art')) {
        categories['Art & Creative'].push(idea)
        categorized = true
      }
      if (lowerIdea.includes('food') || lowerIdea.includes('meal') || lowerIdea.includes('dinner') || lowerIdea.includes('bbq') || lowerIdea.includes('sausage') || lowerIdea.includes('sunrise food')) {
        categories['Food & Dining'].push(idea)
        categorized = true
      }
      if (lowerIdea.includes('tent') || lowerIdea.includes('ac') || lowerIdea.includes('power') || lowerIdea.includes('solar') || lowerIdea.includes('shade') || lowerIdea.includes('water') || lowerIdea.includes('infrastructure')) {
        categories['Infrastructure'].push(idea)
        categorized = true
      }
      if (lowerIdea.includes('party') || lowerIdea.includes('event') || lowerIdea.includes('community') || lowerIdea.includes('vibe') || lowerIdea.includes('gathering')) {
        categories['Community & Events'].push(idea)
        categorized = true
      }

      if (!categorized) {
        categories['Other'].push(idea)
      }
    })

    // Remove empty categories
    return Object.entries(categories)
      .filter(([_, items]) => items.length > 0)
      .map(([category, items]) => ({ category, items }))
  }, [ideas])

  return (
    <section className="fade-in mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center">2026 Ideas</h2>
      
      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-2" style={{ color: '#BAE1FF' }}>
            {ideas.length}
          </div>
          <div className="text-gray-400">Ideas for Next Year</div>
        </div>

        {/* Categorized Ideas */}
        {categorizedIdeas.length > 0 ? (
          <div className="space-y-6">
            {categorizedIdeas.map(({ category, items }) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-3 text-gray-300">
                  {category} ({items.length})
                </h3>
                <div className="space-y-3">
                  {items.map((idea, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-dark-bg rounded-lg border border-gray-700"
                    >
                      <div className="text-sm leading-relaxed text-gray-200">
                        {idea}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No ideas submitted
          </div>
        )}
      </div>
    </section>
  )
}

