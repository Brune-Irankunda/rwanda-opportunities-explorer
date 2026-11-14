
function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) {
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
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
