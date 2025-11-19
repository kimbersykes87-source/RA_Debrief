import { useMemo } from 'react'

export default function Shoutouts({ data }) {
  const shoutouts = useMemo(() => {
    return data
      .map(row => row['Shout-outs & gratitude'])
      .filter(text => text && text.trim() !== '')
      .map(text => text.trim())
  }, [data])

  // Extract names mentioned (simple extraction)
  const mentionedNames = useMemo(() => {
    const names = new Set()
    shoutouts.forEach(text => {
      // Common patterns: "Kimber", "Drew", "Benny", etc.
      const namePatterns = [
        /Kimber|Kimba|Kymber/gi,
        /Drew/gi,
        /Benny/gi,
        /Siona|Si/gi,
        /Gus|Gussy/gi,
        /Tim/gi,
        /James|Jimmy/gi,
        /Dallas/gi,
        /Adam/gi,
        /Jacob/gi,
        /Wes/gi,
        /Sean|Shaun/gi,
        /Laura/gi,
        /Ashley/gi,
        /Jeff/gi,
        /Jess/gi,
        /Nat/gi
      ]
      
      namePatterns.forEach(pattern => {
        const matches = text.match(pattern)
        if (matches) {
          matches.forEach(match => {
            // Capitalize first letter
            const name = match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
            names.add(name)
          })
        }
      })
    })
    return Array.from(names).sort()
  }, [shoutouts])

  return (
    <section className="fade-in mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Shout-outs & Gratitude</h2>
      
      <div className="bg-dark-surface rounded-lg p-6 mb-8">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-2" style={{ color: '#BAE1FF' }}>
            {shoutouts.length}
          </div>
          <div className="text-gray-400">Messages of Appreciation</div>
        </div>

        {/* Mentioned Names */}
        {mentionedNames.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-300">Frequently Mentioned</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {mentionedNames.map((name, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 bg-dark-bg rounded-full border border-gray-700 text-sm"
                  style={{ color: '#BAFFC9' }}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Shoutouts */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {shoutouts.map((text, index) => (
            <div 
              key={index}
              className="p-4 bg-dark-bg rounded-lg border border-gray-700"
            >
              <div className="text-sm leading-relaxed whitespace-pre-wrap text-gray-200">
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

