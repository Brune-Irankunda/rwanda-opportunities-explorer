
import { useState, useEffect } from "react"
import { seedOpportunities } from "./data/seedOpportunities"
import Button from "./components/Button"
import OpportunityList from "./components/OpportunityList"
import OpportunityFilters from "./components/OpportunityFilters"
import AddOpportunityForm from "./components/AddOpportunityForm"

function loadData(key, fallback) {
  try {
    const storedData = localStorage.getItem(key)
    return storedData ? JSON.parse(storedData) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [opportunities, setOpportunities] = useState(() =>
    loadData("rwandaOpportunities", seedOpportunities)
  )

  const [savedIds, setSavedIds] = useState(() =>
    loadData("savedOpportunities", [])
  )

  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [availableOnly, setAvailableOnly] = useState(false)
  const [savedOnly, setSavedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("date")

  // Demo loading and error state
  const [demoStatus, setDemoStatus] = useState("ready")

  useEffect(() => {
    localStorage.setItem(
      "rwandaOpportunities",
      JSON.stringify(opportunities)
    )
  }, [opportunities])

  useEffect(() => {
    localStorage.setItem(
      "savedOpportunities",
      JSON.stringify(savedIds)
    )
  }, [savedIds])

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

        {/* Demo status buttons */}
        <section className="mb-6 bg-white p-5 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-black mb-3">
            Demo Application States
          </h3>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setDemoStatus("ready")}>
              Show Opportunities
            </Button>

            <Button
              variant="secondary"
              onClick={() => setDemoStatus("loading")}
            >
              Simulate Loading
            </Button>

            <Button
              variant="danger"
              onClick={() => setDemoStatus("error")}
            >
              Simulate Error
            </Button>
          </div>
        </section>

        {/* Conditional rendering */}
        {demoStatus === "loading" ? (
          <p className="text-center text-[#A88719] py-10 font-semibold">
            Loading opportunities... Please wait.
          </p>
        ) : demoStatus === "error" ? (
          <div className="text-center bg-red-50 text-red-700 p-6 rounded-xl">
            <p className="font-bold">Something went wrong!</p>
            <p>Please try again.</p>
          </div>
        ) : (
          <OpportunityList
            opportunities={filteredOpportunities}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        )}
      </main>
    </div>
  )
}

export default App
