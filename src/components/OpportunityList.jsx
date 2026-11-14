
import OpportunityCard from "./OpportunityCard"

function OpportunityList({ opportunities, savedIds, onToggleSave }) {
  if (opportunities.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        No opportunities found. Try changing your search or filters.
      </p>
    )
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {opportunities.map((opportunity) => (
        <OpportunityCard
          key={opportunity.id}
          opportunity={opportunity}
          isSaved={savedIds.includes(opportunity.id)}
          onToggleSave={onToggleSave}
        />
      ))}
    </section>
  )
}

export default OpportunityList
