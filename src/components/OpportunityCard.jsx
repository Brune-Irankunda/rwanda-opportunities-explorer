
import Button from "./Button"
import Badge from "./badge"

function OpportunityCard({ opportunity, isSaved, onToggleSave }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition">

      {/* Opportunity title */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <h2 className="text-xl font-bold text-gray-800">
          {opportunity.title}
        </h2>

        {opportunity.featured && (
          <Badge color="yellow">Featured</Badge>
        )}
      </div>

      {/* Category */}
      <Badge color="purple">
        {opportunity.category}
      </Badge>

      {/* Description */}
      <p className="text-gray-600 my-4">
        {opportunity.description}
      </p>

      {/* Opportunity information */}
      <div className="space-y-2 text-sm text-gray-700">
        <p> City: {opportunity.city}</p>
        <p>Date: {opportunity.date}</p>

        <p>
          Available places: {opportunity.availableSeats}
        </p>

        <p>
           Price:{" "}
          {opportunity.price === 0
            ? "Free"
            : `${opportunity.price.toLocaleString()} RWF`}
        </p>
      </div>

      {/* Availability status */}
      <div className="flex flex-wrap gap-2 mt-4">
        {opportunity.availableSeats === 0 ? (
          <Badge color="red">Fully booked</Badge>
        ) : (
          <Badge color="green">Available</Badge>
        )}

        {opportunity.price === 0 && (
          <Badge color="green">Free</Badge>
        )}
      </div>

      {/* Save button */}
      <div className="mt-5">
        <Button
          variant={isSaved ? "secondary" : "primary"}
          onClick={() => onToggleSave(opportunity.id)}
        >
          {isSaved ? "Unsave" : "Save Opportunity"}
        </Button>
      </div>

    </div>
  )
}

export default OpportunityCard
