
import Button from "./Button"

function OpportunityFilters({
  search,
  setSearch,
  category,
  setCategory,
  availableOnly,
  setAvailableOnly,
  savedOnly,
  setSavedOnly,
  sortBy,
  setSortBy,
  onReset,
}) {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Search and Filter Opportunities
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <div>
          <label className="block font-medium mb-2">
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or city..."
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Community">Community</option>
            <option value="Career">Career</option>
            <option value="Arts">Arts</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="date">Earliest Date</option>
            <option value="title">Title A-Z</option>
            <option value="seats">Most Available Seats</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-5">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
          />
          Available only
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={savedOnly}
            onChange={(e) => setSavedOnly(e.target.checked)}
          />
          Saved only
        </label>
      </div>

      <div className="mt-5">
        <Button variant="secondary" onClick={onReset}>
          Reset Filters
        </Button>
      </div>
    </section>
  )
}

export default OpportunityFilters
