
import { useState } from "react"
import { seedOpportunities } from "./data/seedOpportunities"
import OpportunityList from "./components/OpportunityList"

function App() {
  const [opportunities] = useState(seedOpportunities)
  const [savedIds, setSavedIds] = useState([])

  function handleToggleSave(id) {
    setSavedIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((savedId) => savedId !== id)
        : [...previousIds, id]
    )
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-blue-700 text-white p-8 text-center">
        <h1 className="text-4xl font-bold">
          Rwanda Opportunities Explorer 🇷🇼
        </h1>
        <p className="mt-3">
          Discover workshops, career events and community activities.
        </p>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Explore Opportunities
          </h2>

          <p className="font-semibold text-blue-700">
            Saved: {savedIds.length}
          </p>
        </div>

        <OpportunityList
          opportunities={opportunities}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
        />
      </main>
    </div>
  )
}

export default App
