
import { useState } from "react"
import { seedOpportunities } from "./data/seedOpportunities"
import OpportunityList from "./components/OpportunityList"
import OpportunityFilters from "./components/OpportunityFilters"
import AddOpportunityForm from "./components/AddOpportunityForm"

function App() {
  const [opportunities, setOpportunities] = useState(seedOpportunities)
  const [savedIds, setSavedIds] = useState([])

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [availableOnly, setAvailableOnly] = useState(false)
  const [savedOnly, setSavedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("date")

  function handleToggleSave(id) {
    setSavedIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((savedId) => savedId !== id)
        : [...previousIds, id]
    )
  }

  function handleAddOpportunity(newOpportunity) {
    setOpportunities((previousOpportunities) => [
      newOpportunity,
      ...previousOpportunities,
    ])
  }

  function handleReset() {
    setSearch("")
    setCategory("All")
    setAvailableOnly(false)
    setSavedOnly(false)
    setSortBy("date")
  }

  const filteredOpportunities = opportunities
    .filter((opportunity) => {
      const searchTerm = search.trim().toLowerCase()

      const matchesSearch =
        opportunity.title.toLowerCase().includes(searchTerm) ||
        opportunity.city.toLowerCase().includes(searchTerm)

      const matchesCategory =
        category === "All" || opportunity.category === category

      const matchesAvailability =
        !availableOnly || opportunity.availableSeats > 0

      const matchesSaved =
        !savedOnly || savedIds.includes(opportunity.id)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesAvailability &&
        matchesSaved
      )
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title)
      }

      if (sortBy === "seats") {
        return b.availableSeats - a.availableSeats
      }

      return a.date.localeCompare(b.date)
    })

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      <header className="bg-black text-white p-8 text-center border-b-4 border-[#D4AF37]">
        <h1 className="text-4xl font-bold text-[#D4AF37]">
          Rwanda Opportunities Explorer 🇷🇼
        </h1>

        <p className="mt-3 text-gray-200">
          Discover workshops, career events and community activities.
        </p>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            Explore Opportunities
          </h2>

          <p className="font-semibold text-[#A88719]">
            Saved: {savedIds.length}
          </p>
        </div>

        <AddOpportunityForm
          onAddOpportunity={handleAddOpportunity}
        />

        <OpportunityFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          availableOnly={availableOnly}
          setAvailableOnly={setAvailableOnly}
          savedOnly={savedOnly}
          setSavedOnly={setSavedOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleReset}
        />

        <p className="text-gray-700 mb-5">
          Showing <strong>{filteredOpportunities.length}</strong> opportunities
        </p>

        <OpportunityList
          opportunities={filteredOpportunities}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
        />
      </main>
    </div>
  )
}

export default App
