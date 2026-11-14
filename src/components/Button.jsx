
function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) {
  const styles = {
  primary: "bg-black text-[#D4AF37] hover:bg-gray-800",
  secondary: "bg-[#D4AF37] text-black hover:bg-[#B8962E]",
  danger: "bg-red-700 text-white hover:bg-red-800",
}

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${styles[variant]}`}
    >
      {children}
    </button>
  )
}

export default Button
