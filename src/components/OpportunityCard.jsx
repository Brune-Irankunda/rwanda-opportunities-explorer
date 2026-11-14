
import Button from "./Button"
import Badge from "./Badge"

function OpportunityCard({ opportunity, isSaved, onToggleSave }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-[#D4AF37] p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-start gap-3 mb-4">
        <h2 className="text-xl font-bold text-black">
          {opportunity.title}
        </h2>

        {opportunity.featured && (
          <Badge color="yellow">Featured</Badge>
        )}
      </div>

      <Badge color="purple">
        {opportunity.category}
      </Badge>

      <p className="text-gray-600 my-4">
        {opportunity.description}
      </p>

      <div className="space-y-3 text-sm text-gray-700">
        <p> <strong>City:</strong> {opportunity.city}</p>

        <p> <strong>Date:</strong> {opportunity.date}</p>

        <p>
           <strong>Total Capacity:</strong> {opportunity.capacity}
        </p>

        <p>
           <strong>Available Seats:</strong> {opportunity.availableSeats}
        </p>

        <p>
           <strong>Price:</strong>{" "}
          {opportunity.price === 0
            ? "Free"
            : `${opportunity.price.toLocaleString()} RWF`}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        {opportunity.availableSeats === 0 ? (
          <Badge color="red">Fully Booked</Badge>
        ) : (
          <Badge color="green">Available</Badge>
        )}

        {opportunity.price === 0 && (
          <Badge color="green">Free</Badge>
        )}
      </div>

      <div className="mt-6">
        <Button
          variant={isSaved ? "secondary" : "primary"}
          onClick={() => onToggleSave(opportunity.id)}
        >
          {isSaved ? "Unsave Opportunity" : "Save Opportunity"}
        </Button>
      </div>

    </div>
  )
}

export default OpportunityCard
