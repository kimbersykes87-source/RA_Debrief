import { useState, useEffect } from 'react'
import { parseCSVData } from './utils/dataParser'
import SatisfactionDashboard from './components/SatisfactionDashboard'
import CategoryHeatmap from './components/CategoryHeatmap'
import RadarChartComponent from './components/RadarChart'
import FeeAnalysis from './components/FeeAnalysis'
import TextAnalysis from './components/TextAnalysis'
import VolunteerInterests from './components/VolunteerInterests'
import Shoutouts from './components/Shoutouts'
import Ideas2026 from './components/Ideas2026'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const parsedData = await parseCSVData()
        setData(parsedData)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-white text-xl">Loading data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-white text-xl text-red-400">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Fixed header bar when scrolled */}
        {isScrolled && (
          <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg border-b border-gray-800 transition-all duration-300">
            <div className="container mx-auto px-4">
              <div className="flex items-center py-3">
                <img 
                  src="/logo.svg" 
                  alt="Rubber Armstrong Logo" 
                  className="h-6 md:h-8 w-auto transition-all duration-300"
                />
              </div>
            </div>
          </header>
        )}

        {/* Main header when not scrolled */}
        <header className={`mb-12 text-center fade-in ${isScrolled ? 'mb-0' : ''}`}>
          {!isScrolled && (
            <>
              <div className="flex justify-center mb-6">
                <img 
                  src="/logo.svg" 
                  alt="Rubber Armstrong Logo" 
                  className="h-24 md:h-32 w-auto transition-all duration-300"
                />
              </div>
              <h2 className="text-2xl md:text-3xl text-gray-300">2025 Camp Report</h2>
            </>
          )}
        </header>
        
        <main className={`space-y-12 ${isScrolled ? 'pt-20' : ''}`}>
          <SatisfactionDashboard data={data} />
          <CategoryHeatmap data={data} />
          <RadarChartComponent data={data} />
          <FeeAnalysis data={data} />
          <TextAnalysis data={data} />
          <Shoutouts data={data} />
          <Ideas2026 data={data} />
          <VolunteerInterests data={data} />
        </main>
      </div>
    </div>
  )
}

export default App

