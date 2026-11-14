
import { useState } from "react"
import Button from "./Button"

function AddOpportunityForm({ onAddOpportunity }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Technology",
    city: "",
    date: "",
    description: "",
    capacity: "",
    price: "",
  })

  const [error, setError] = useState("")

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !formData.title.trim() ||
      !formData.city.trim() ||
      !formData.description.trim() ||
      !formData.date
    ) {
      setError("Please fill in all required fields.")
      return
    }

    if (Number.isNaN(Date.parse(formData.date))) {
      setError("Please enter a valid date.")
      return
    }

    if (
      formData.capacity === "" ||
      Number(formData.capacity) < 0 ||
      formData.price === "" ||
      Number(formData.price) < 0
    ) {
      setError("Capacity and price must be zero or greater.")
      return
    }

    const newOpportunity = {
      id: crypto.randomUUID(),
      title: formData.title.trim(),
      category: formData.category,
      city: formData.city.trim(),
      date: formData.date,
      description: formData.description.trim(),
      capacity: Number(formData.capacity),
      availableSeats: Number(formData.capacity),
      price: Number(formData.price),
      featured: false,
    }

    onAddOpportunity(newOpportunity)

    setFormData({
      title: "",
      category: "Technology",
      city: "",
      date: "",
      description: "",
      capacity: "",
      price: "",
    })

    setError("")
  }

  function handleClear() {
    setFormData({
      title: "",
      category: "Technology",
      city: "",
      date: "",
      description: "",
      capacity: "",
      price: "",
    })

    setError("")
  }

  return (
    <section className="bg-white p-6 rounded-xl shadow-md border border-[#D4AF37] mb-8">
      <h2 className="text-2xl font-bold text-black mb-5">
        Add a New Opportunity
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block font-medium mb-2">
              Opportunity Title *
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter opportunity title"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Community">Community</option>
              <option value="Career">Career</option>
              <option value="Arts">Arts</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              City *
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Kigali"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Capacity *
            </label>
            <input
              type="number"
              min="0"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Enter total places"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Price (RWF) *
            </label>
            <input
              type="number"
              min="0"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full border rounded-lg p-3"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe this opportunity..."
            rows="3"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {error && (
          <p className="text-red-600 font-medium" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          <Button type="submit">
            Add Opportunity
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={handleClear}
          >
            Clear Form
          </Button>
        </div>
      </form>
    </section>
  )
}

export default AddOpportunityForm
